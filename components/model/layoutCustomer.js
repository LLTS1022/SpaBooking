import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import utilStyles from "../../styles/utils.module.css";

export const siteTitle = "Customer Backend";

export default function Layout({ children, home }) {
  const router = useRouter();
  const isActive = (href) => router.pathname === href;

  return (
    <div className="dashboard-root">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Customer dashboard" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Topbar */}
      <header>
        <div className="topbar">
          <div className="brandCrumbs">
            <span className="logoTopbar">
              <Image
                priority
                src="/images/logo.png"
                className={utilStyles.borderCircle}
                height={36}
                width={120}
                alt="Massage at Home"
              />
            </span>

            <div className="crumbs">
              <span className="muted">Therapists</span>
              <span className="sep">/</span>
              <span className="muted">Dashboards</span>
              <span className="sep">/</span>
              <span className="strong">{home ? "Home" : "Page"}</span>
            </div>
          </div>

          <div className="actions">
            <div className="search">
              <input type="search" placeholder="Search" aria-label="Search" />
              <button className="filterBtn" aria-label="Filters">
                ⋯
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main two-column layout */}
      <main className="main-admin-layout">
        <aside className="admin-menu">
          <div className="sideLogo">
            <Image
              priority
              src="/images/logo.png"
              height={28}
              width={110}
              alt="Massage at Home"
            />
          </div>

          <ul className="navList">
            <li>
              <Link
                href="/customer-backend/"
                className={isActive("/customer-backend/") ? "active" : ""}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/customer-backend/orders"
                className={isActive("/customer-backend/orders") ? "active" : ""}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/customer-backend/profile"
                className={
                  isActive("/customer-backend/profile") ? "active" : ""
                }
              >
                Profile Info
              </Link>
            </li>
            <li>
              <Link
                href="/customer-backend/review"
                className={isActive("/customer-backend/review") ? "active" : ""}
              >
                Review
              </Link>
            </li>
            <li>
              <Link href="/logout" className="logoutLink">
                Logout
              </Link>
            </li>
          </ul>
        </aside>

        <section className="contentWrap">
          <div className="contentArea">{children}</div>
        </section>
      </main>

      {!home && (
        <div className="backToHome">
          <Link href="/">← Back to home</Link>
        </div>
      )}

      <style jsx>{`
        :root {
          --bg-pink: #fff6fb; /* page background */
          --sidebar-contrast: #ffe3ee; /* soft pink panel */
          --sidebar-accent: #ff4d6b; /* accents / logout */
          --accent: #a18cd1; /* active link */
          --ink: #1e293b;
          --muted: #64748b;
          --header-h: 64px;
        }

        html,
        body,
        #__next,
        .dashboard-root {
          height: 100%;
        }
        body {
          margin: 0;
        }

        .dashboard-root {
          min-height: 100vh;
          width: 100vw;
          background: var(--bg-pink);
          color: var(--ink);
          font: 15px/1.45 Inter, ui-sans-serif, system-ui, -apple-system,
            Segoe UI, Roboto, Arial;
        }

        /* Header */
        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 32px;
          background: #fff;
          border-bottom: 1px solid #f4a6c3;
          height: var(--header-h);
          box-shadow: 0 4px 12px -3px #f8bacf22;
        }
        .brandCrumbs {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .logoTopbar {
          display: none;
        }
        .crumbs {
          font-size: 13px;
          white-space: nowrap;
        }
        .muted {
          color: var(--muted);
        }
        .sep {
          margin: 0 6px;
          color: #fbb6ce;
        }
        .strong {
          font-weight: 600;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .search {
          display: flex;
          gap: 8px;
          background: var(--bg-pink);
          padding: 8px 12px;
          border-radius: 14px;
          box-shadow: 0 2px 8px -2px #fd6595aa;
        }
        .search input {
          border: 0;
          outline: 0;
          background: transparent;
          width: 230px;
        }
        .filterBtn {
          border: 0;
          background: transparent;
          font-size: 18px;
          cursor: pointer;
          color: var(--sidebar-accent);
        }

        /* Main layout */
        .main-admin-layout {
          display: grid;
          grid-template-columns: 270px 1fr;
          height: calc(100vh - var(--header-h));
        }

        /* Sidebar */
        .admin-menu {
          background: linear-gradient(
            135deg,
            var(--sidebar-contrast) 82%,
            #ffd8e6 100%
          );
          box-shadow: 4px 0 16px -8px #f57ca8aa;
          padding: 28px 18px 26px;
          display: flex;
          flex-direction: column;
          min-height: 0;
          border-right: none;
        }
        .sideLogo {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 0 16px;
          margin-bottom: 12px;
          border-bottom: 1px solid #ffd2e4;
        }
        .navList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .navList :global(a) {
          display: block;
          background: transparent;
          padding: 13px 18px;
          border-radius: 14px;
          font-size: 16px;
          color: var(--ink);
          font-weight: 500;
          transition: 0.22s all cubic-bezier(0.45, 0.07, 0.52, 1.14);
          box-shadow: 0 2px 8px rgba(248, 186, 207, 0.04);
          text-decoration: none;
        }
        .navList :global(a:hover),
        .navList :global(a.active) {
          background: var(--accent);
          color: #fff;
          transform: scale(1.04) translateX(5px);
          box-shadow: 0 4px 20px -4px #a18cd130;
        }
        .logoutLink {
          margin-top: 14px;
          padding: 13px 18px;
          display: block;
          font-size: 15px;
          font-weight: 700;
          border-radius: 14px;
          color: var(--sidebar-accent);
          background: #ffe0e6;
          transition: background 0.22s;
        }
        .logoutLink:hover {
          background: #ffb3c6;
          color: #c0395f;
        }

        /* Content wrapper gives contrast+round corner against pink sidebar */
        .contentWrap {
          background: transparent;
          padding: 28px 32px;
        }
        .contentArea {
          height: 100%;
          overflow: auto;
          padding: 32px 38px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 10px 40px -12px rgba(255, 77, 107, 0.28);
        }

        .backToHome {
          margin: 3rem 0 0;
        }
      `}</style>
    </div>
  );
}
