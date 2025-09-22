// components/admin/therapists.js
import { useState, useEffect } from "react";
import styles from "./layout.module.css";

const API = "/api/admin/therapists"; // ← therapists proxy

export default function Therapists() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch(`${API}?limit=25&page=1`, { cache: "no-store" });
      const j = await res.json();
      const ok =
        res.ok &&
        (j?.success === 1 || j?.success === "1" || j?.success === true);
      if (!ok) throw new Error(j?.message || `HTTP ${res.status}`);
      setRows(Array.isArray(j.data) ? j.data : []);
    } catch (e) {
      console.error("Error fetching therapists:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this therapist?")) return;
    try {
      const res = await fetch(`${API}?id=${id}`, { method: "DELETE" });
      const j = await res.json();
      const ok =
        res.ok &&
        (j?.success === 1 || j?.success === "1" || j?.success === true);
      if (ok) setRows((u) => u.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSuspend = async (id, currentStatus) => {
    const newStatus =
      (currentStatus || "active") === "active" ? "suspended" : "active";
    try {
      const res = await fetch(`${API}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const j = await res.json();
      const ok =
        res.ok &&
        (j?.success === 1 || j?.success === "1" || j?.success === true);
      if (ok) {
        setRows((u) =>
          u.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p>Loading therapists...</p>;

  return (
    <div>
      <h2>Manage Therapists</h2>
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
          {rows.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td>{t.city}</td>
              <td>{t.zip}</td>
              <td>
                <span className={styles.badge}>{t.status || "active"}</span>
              </td>
              <td>
                <button
                  onClick={() => handleSuspend(t.id, t.status || "active")}
                >
                  {(t.status || "active") === "active"
                    ? "Suspend"
                    : "Reactivate"}
                </button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
