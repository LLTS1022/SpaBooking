import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./layout.module.css";
import utilStyles from "../../styles/utils.module.css";

export const siteTitle = "Customer Backend";

export default function Layout({ children, home }) {
  const router = useRouter();
  const isActive = (href) => router.pathname === href;

  return (
   <div className={styles.containerAdmin}>
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
              <button className="filterBtn" aria-label="Filters">⋯</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main two-column layout */}
      <main className="main-admin-layout">
        {/* Pink gradient sidebar */}
        <aside className="adminMenu">
          <ul className="navList">
            <Image
              priority
              src="/images/logo.png"
              className={utilStyles.borderCircle}
              height={36}
              width={120}
              alt="TRISTATE Massage & Spa"
            />

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
                className={isActive("/customer-backend/profile") ? "active" : ""}
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

        {/* Scrollable content */}
        <section className="contentArea">{children}</section>
      </main>

      {!home && (
        <div className="backToHome">
          <Link href="/">← Back to home</Link>
        </div>
      )}

      {/* Theme + layout styles (merged) */}
      <style jsx>{`
        :root {
          --pink-600: #ff4fa3;
          --pink-700: #e13d91;
          --pink-50: #ffe6f2;
          --ink: #0f172a;
          --muted: #64748b;
          --border: #f3d0e1;
          --white: #ffffff;

          /* from admin-backend-design */
          --bg-pink: #fff6fb;
          --sidebar-contrast: #ffe3ee;
          --sidebar-accent: #ff4d6b;
          --accent: #a18cd1;
          --header-h: 64px;
        }

        html, body, #__next {
          height: 100%;
        }
        body {
          margin: 0;
          background: var(--pink-50);
          color: var(--ink);
          font: 14px/1.45 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        }

        /* Topbar */
        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 22px;
          background: var(--white);
          border-bottom: 1px solid var(--border);
          backdrop-filter: saturate(180%) blur(6px);
          height: var(--header-h);
          box-shadow: 0 4px 12px -3px #f8bacf22;
        }
        .brandCrumbs { display: flex; align-items: center; gap: 16px; }
        .logoTopbar { display: inline-flex; }

        .crumbs { font-size: 13px; white-space: nowrap; }
        .muted { color: var(--muted); }
        .sep { margin: 0 6px; color: #cbd5e1; }
        .strong { font-weight: 700; letter-spacing: 0.2px; }

        .actions { display: flex; align-items: center; gap: 14px; }
        .search {
          display: flex; gap: 8px;
          background: #faf5f9;
          padding: 8px 12px;
          border-radius: 12px;
          border: 1px solid #f8d3e6;
        }
        .search input { border: 0; outline: 0; background: transparent; width: 260px; }
        .filterBtn { border: 0; background: transparent; font-size: 18px; cursor: pointer; color: var(--sidebar-accent); }

        /* Grid */
        .main-admin-layout {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          height: calc(100vh - var(--header-h));
          overflow: hidden;
          gap: 24px;
          padding: 20px;
        }

        /* Sidebar */
        .adminMenu {
          background: linear-gradient(180deg, var(--pink-600) 0%, var(--pink-700) 100%);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 14px;
          height: 100%;
          overflow-y: auto;
          box-shadow: 0 6px 16px rgba(225, 61, 145, 0.18);
        }
        .navList { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
        .navList :global(a) {
          display: block;
          padding: 12px 14px;
          border-radius: 12px;
          color: var(--white);
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.2px;
          transition: transform .12s ease, background-color .2s ease, box-shadow .2s ease;
        }
        .navList :global(a:hover) {
          transform: translateX(2px);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
        }
        /* Active state using router */
        .navList :global(a.active) {
          background: var(--white);
          color: var(--pink-600);
          box-shadow: 0 2px 8px rgba(255,255,255,.35), inset 0 0 0 1px #ffd4ea;
        }
        .logoutLink {
          color: var(--white);
          font-weight: 700;
          text-decoration: none;
          opacity: 0.92;
        }
        .logoutLink:hover { opacity: 1; }

        /* Content */
        .contentArea {
          height: 100%;
          overflow: auto;
          padding: 24px;
          background: var(--pink-50);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: 0 6px 16px rgba(255, 79, 163, 0.08) inset;
        }

        /* Responsive tweaks */
        @media (max-width: 900px) {
          .main-admin-layout { grid-template-columns: 1fr; height: auto; }
          .adminMenu { height: auto; }
          .search input { width: 180px; }
        }
      `}</style>
    </div>
  );
}
