// pages/api/admin/therapists.js
export default async function handler(req, res) {
  const PHP = "https://tsm.spagram.com/api/models.php";
  const { method, query, body } = req;

  // Handle OPTIONS (keeps tools / preflights happy)
  if (method === "OPTIONS") {
    res.setHeader("Allow", "GET,PUT,DELETE,OPTIONS");
    return res.status(204).end();
  }

  // Small helper: fetch with timeout
  const withTimeout = async (url, options = {}, ms = 10000) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try {
      const r = await fetch(url, {
        ...options,
        signal: ctrl.signal,
        cache: "no-store",
      });
      return r;
    } finally {
      clearTimeout(t);
    }
  };

  try {
    if (method === "GET") {
      const params = new URLSearchParams({
        page: String(Number(query.page) || 1),
        limit: String(Math.min(Math.max(Number(query.limit) || 25, 1), 100)),
        q: String(query.q || ""),
      });
      const url = `${PHP}?${params.toString()}`;
      const r = await withTimeout(url);
      const j = await r.json();

      // Wrap the response in the expected format for the frontend
      if (r.ok && Array.isArray(j)) {
        return res.status(200).json({
          success: 1,
          data: j,
          message: "Therapists loaded successfully",
        });
      } else {
        return res.status(r.status).json({
          success: 0,
          data: [],
          message: j?.message || "Failed to load therapists",
        });
      }
    }

    if (method === "PUT" || method === "DELETE") {
      const idNum = Number(query.id);
      if (!Number.isInteger(idNum) || idNum <= 0) {
        return res
          .status(400)
          .json({ success: "0", message: "Missing or invalid id" });
      }

      // PHP expects JSON body only for PUT with {status}
      let fetchOpts = { method, headers: {} };

      if (method === "PUT") {
        const status = body?.status;
        if (!["active", "suspended"].includes(status)) {
          return res.status(400).json({ success: "0", message: "Bad status" });
        }
        fetchOpts.headers["Content-Type"] = "application/json";
        fetchOpts.body = JSON.stringify({ status });
      }

      const url = `${PHP}?id=${encodeURIComponent(String(idNum))}`;
      const r = await withTimeout(url, fetchOpts);

      try {
        const j = await r.json();

        // Handle different response formats from PHP backend
        if (method === "PUT") {
          // For PUT requests, check if the status was actually updated
          if (j?.success === 1 || j?.success === "1") {
            // PHP returned success response - assume update was successful
            return res.status(200).json({
              success: 1,
              data: {},
              message: `Therapist ${
                body?.status === "suspended" ? "suspended" : "activated"
              } successfully`,
            });
          } else {
            // PHP returned error or unexpected format
            return res.status(r.status).json({
              success: 0,
              data: [],
              message: j?.message || "Failed to update therapist status",
            });
          }
        } else if (method === "DELETE") {
          // For DELETE requests, check if deletion was successful
          if (j?.success === 1 || j?.success === "1") {
            // PHP returned success response - assume deletion was successful
            return res.status(200).json({
              success: 1,
              data: [],
              message: "Therapist deleted successfully",
            });
          } else {
            // PHP returned error or unexpected format
            return res.status(r.status).json({
              success: 0,
              data: [],
              message: j?.message || "Failed to delete therapist",
            });
          }
        }
      } catch (parseError) {
        // JSON parsing failed
        return res.status(502).json({
          success: 0,
          data: [],
          message: "Invalid response from backend",
        });
      }
    }

    res.setHeader("Allow", "GET,PUT,DELETE,OPTIONS");
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    const status = err.name === "AbortError" ? 504 : 502;
    return res
      .status(status)
      .json({ success: "0", message: err.message || "Upstream error" });
  }
}
