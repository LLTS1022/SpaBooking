import AdminLayout from "@/components/admin/AdminLayout";
export default function AdminHome() {
  return (
    <AdminLayout title="Dashboard">
      {/* KPI Cards */}
      <section className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>New Users</p>
          <div className={styles.cardValue}>370</div>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Shop Items</p>
          <div className={styles.cardValue}>342</div>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Today's Sale</p>
          <div className={styles.cardValue}>13</div>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Earnings</p>
          <div className={styles.cardValue}>$300</div>
        </div>
      </section>

      {/* Charts area (placeholders – swap with Recharts/Chart.js later) */}
      <section className={styles.widgets}>
        <div className={styles.widget} style={{ height: 320 }}>
          <strong>User Statistics</strong>
          <div
            style={{
              height: 260,
              marginTop: 10,
              borderRadius: 12,
              background:
                "linear-gradient(180deg, rgba(255,99,132,.08), rgba(255,99,132,.02))",
              boxShadow: "inset 0 0 0 1px rgba(255,99,132,.15)",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 8,
              fontSize: 12,
              color: "#7d7d8c",
            }}
          >
            <span>
              Weekly Users <b style={{ color: "#1e2124" }}>10,840</b>
            </span>
            <span>
              Monthly Users <b style={{ color: "#1e2124" }}>1,020,321</b>
            </span>
            <span>Trend ⤴</span>
          </div>
        </div>
        <div className={styles.widget}>
          <strong>Top 5 Products</strong>
          <div
            style={{
              height: 260,
              marginTop: 10,
              borderRadius: 12,
              background:
                "radial-gradient(circle, rgba(255,99,132,.12), rgba(255,99,132,.03))",
              boxShadow: "inset 0 0 0 1px rgba(255,99,132,.15)",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              fontSize: 12,
              color: "#7d7d8c",
              marginTop: 6,
            }}
          >
            <span className={styles.badge}>Paleo Bars</span>
            <span className={styles.badge}>Bow Ties</span>
            <span className={styles.badge}>Pocket Squares</span>
            <span className={styles.badge}>Wood Sunglasses</span>
            <span className={styles.badge}>Leggings</span>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Task</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "#000001",
                project: "Alpha project",
                task: "100%",
                date: "Oct 27",
                status: "Done",
              },
              {
                id: "#000002",
                project: "Beta project",
                task: "3%",
                date: "Oct 26",
                status: "Pending",
              },
              {
                id: "#000003",
                project: "Gamma project",
                task: "100%",
                date: "Oct 25",
                status: "Done",
              },
              {
                id: "#000004",
                project: "Alpha project",
                task: "30%",
                date: "Oct 25",
                status: "Pending",
              },
              {
                id: "#000005",
                project: "Beta project",
                task: "100%",
                date: "Oct 25",
                status: "Done",
              },
              {
                id: "#000006",
                project: "Gamma project",
                task: "100%",
                date: "Oct 20",
                status: "Done",
              },
            ].map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.project}</td>
                <td>{r.task}</td>
                <td>{r.date}</td>
                <td>
                  <span className={styles.badge}>{r.status}</span>
                </td>
                <td>
                  <a href="#" title="View">
                    🔍
                  </a>
                  &nbsp;&nbsp;
                  <a href="#" title="Edit">
                    ✏️
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
}
