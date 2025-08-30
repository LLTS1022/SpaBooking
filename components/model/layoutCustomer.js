import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import Logout from "./logout.js";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";

const name = "Massage at Home";
export const siteTitle = "Customer Backend";

export default function Layout({ children, home }) {
  return (
    <div
      className={styles.container}
      style={{
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* sticky top bar */}
      <header className={styles.header}>
        <div className="topbar">
          <div className="brandCrumbs">
            <Link href="/" aria-label="Home"></Link>
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

      {/* full-page grid: sidebar + scrollable content */}
      <main className="main-admin-layout">
        {/* NOTE: use className="adminMenu" to match the CSS below */}
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
              <Link href="/customer-backend/">Dashboard</Link>
            </li>
            <li>
              <Link href="/customer-backend/orders" className="pill">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/customer-backend/profile" className="pill">
                Profile Info
              </Link>
            </li>
            <li>
              <Link href="/customer-backend/review" className="pill">
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

        <section className="contentArea">{children}</section>
      </main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <div className=""> Footer goes here </div>

      {/* modern theme + layout styles */}
      <style jsx>{`
        :root {
          --pink-600: #ff4fa3;
          --pink-700: #e13d91;
          --pink-50: #ffe6f2;
          --ink: #0f172a;
          --muted: #64748b;
          --border: #f3d0e1;
          --white: #ffffff;
        }

        html,
        body,
        #__next {
          height: 100%;
        }

        body {
          margin: 0;
          background: var(--pink-50);
          color: var(--ink);
          font: 14px/1.45 ui-sans-serif, system-ui, -apple-system, Segoe UI,
            Roboto, Arial;
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
        }
        .brandCrumbs {
          display: flex;
          align-items: center;
          gap: 16px;
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
          color: #cbd5e1;
        }
        .strong {
          font-weight: 700;
          letter-spacing: 0.2px;
        }
        .actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .search {
          display: flex;
          gap: 8px;
          background: #faf5f9;
          padding: 8px 12px;
          border-radius: 12px;
          border: 1px solid #f8d3e6;
        }
        .search input {
          border: 0;
          outline: 0;
          background: transparent;
          width: 260px;
        }
        .filterBtn {
          border: 0;
          background: transparent;
          font-size: 18px;
          cursor: pointer;
        }

        /* Grid */
        .main-admin-layout {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          height: calc(100vh - 58px);
          overflow: hidden;
          gap: 24px;
          padding: 20px;
        }

        /* Sidebar */
        .adminMenu {
          background: linear-gradient(
            180deg,
            var(--pink-600) 0%,
            var(--pink-700) 100%
          );
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 14px;
          height: 100%;
          overflow-y: auto;
          box-shadow: 0 6px 16px rgba(225, 61, 145, 0.18);
        }
        .navList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
        }
        .navList :global(a) {
          display: block;
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--white);
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.2px;
          transition: transform 0.12s ease, background-color 0.2s ease,
            box-shadow 0.2s ease;
        }
        .navList :global(a:hover) {
          transform: translateX(2px);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
        }

        /* Emphasized pills for key links */
        .navList :global(.pill) {
          background: var(--white);
          color: var(--pink-600);
          text-align: center;
        }
        .navList :global(.pill:hover) {
          background: #ffe9f3;
          color: var(--pink-700);
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.35),
            inset 0 0 0 1px #ffd4ea;
        }

        /* Logout */
        .logoutLink {
          color: var(--white);
          font-weight: 700;
          text-decoration: none;
          opacity: 0.9;
        }
        .logoutLink:hover {
          opacity: 1;
        }

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
          .main-admin-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .adminMenu {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}
