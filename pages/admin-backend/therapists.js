import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/layout";
import styles from "../../components/admin/layout.module.css";

export default function TherapistsPage() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 25;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(
        `/api/admin/therapists?page=${page}&limit=${limit}`,
        { cache: "no-store" }
      );
      const j = await res.json();
      const ok =
        res.ok &&
        (j?.success === 1 || j?.success === "1" || j?.success === true);
      if (!ok) throw new Error(j?.message || `HTTP ${res.status}`);
      setRows(Array.isArray(j.data) ? j.data : []);
    } catch (e) {
      setErr(e.message || "Failed to load therapists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/therapists?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const j = await res.json();
      const ok =
        res.ok &&
        (j?.success === 1 || j?.success === "1" || j?.success === true);
      if (!ok) throw new Error(j?.message || `HTTP ${res.status}`);
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (e) {
      alert(`Update failed: ${e.message}`);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete therapist? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/therapists?id=${id}`, {
        method: "DELETE",
      });
      const j = await res.json();
      const ok =
        res.ok &&
        (j?.success === 1 || j?.success === "1" || j?.success === true);
      if (!ok) throw new Error(j?.message || `HTTP ${res.status}`);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert(`Delete failed: ${e.message}`);
    }
  };

  return (
    <AdminLayout
      title="Therapists"
      breadcrumbs={[
        { label: "Admin", href: "/admin-backend" },
        { label: "Therapists" },
      ]}
    >
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}
      {!loading && !err && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Zip</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.city}</td>
                <td>{r.zip}</td>
                <td>
                  <span className={styles.badge}>{r.status}</span>
                </td>
                <td style={{ display: "flex", gap: 8 }}>
                  {r.status === "suspended" ? (
                    <button onClick={() => updateStatus(r.id, "active")}>
                      Activate
                    </button>
                  ) : (
                    <button onClick={() => updateStatus(r.id, "suspended")}>
                      Suspend
                    </button>
                  )}
                  <button onClick={() => remove(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* (Optional) simple pager */}
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </AdminLayout>
  );
}
