// components/layout.js
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./layout.module.css";

// ✅ Client-only widget (safe on SSR)
const CrispWithNoSSR = dynamic(
  () => import("../crisp").then((m) => m.default || m),
  { ssr: false }
);

export default function AdminLayout({
  title = "Dashboard",
  breadcrumbs = [],
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dummy search with debounce
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const t = setTimeout(() => {
      setSearchResults(
        [
          { id: 1, label: "Dashboard" },
          { id: 2, label: "Users" },
          { id: 3, label: "Settings" },
        ].filter((i) =>
          i.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  return (
    <div
      className={[
        styles.containerAdmin,
        darkMode ? styles.dark : styles.light,
      ].join(" ")}
    >
      <Head>
        <title>{title} • Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Optional client-only widget */}
      <CrispWithNoSSR />

      {/* Topbar */}
      <div className={styles.topbar}>
        <button
          className={styles.hamburger}
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          type="button"
        >
          ☰
        </button>

        <nav className={styles.crumbs}>
          {breadcrumbs.length ? (
            breadcrumbs.map((c, i) => (
              <span key={i} className={styles.crumb}>
                {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
                {i < breadcrumbs.length - 1 && (
                  <span className={styles.sep}>/</span>
                )}
              </span>
            ))
          ) : (
            <>
              <Link href="/therapists">Therapists</Link>
              <span className={styles.sep}>/</span>
              <Link href="/admin-backend">Dashboards</Link>
              <span className={styles.sep}>/</span>
              <span className={styles.muted}>Home</span>
            </>
          )}
        </nav>

        <div className={styles.searchWrap} ref={searchRef}>
          <input
            className={styles.search}
            placeholder="Search or enter website name"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className={styles.searchResults}>
              {searchResults.map((result) => (
                <li key={result.id} className={styles.searchResultItem}>
                  {result.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className={styles.iconBtn}
          aria-label="Notifications"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          ref={notificationsRef}
          type="button"
        >
          🔔
          {notificationsOpen && (
            <div className={styles.dropdown}>
              <p>No new notifications</p>
            </div>
          )}
        </button>

        <button
          className={styles.avatar}
          aria-label="Account"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          ref={userMenuRef}
          type="button"
        >
          me
          {userMenuOpen && (
            <div className={styles.dropdown}>
              <Link href="/profile">Profile</Link>
              <button onClick={() => alert("Logging out...")} type="button">
                Logout
              </button>
            </div>
          )}
        </button>

        <button
          className={styles.themeToggle}
          aria-label="Toggle dark mode"
          onClick={() => setDarkMode(!darkMode)}
          type="button"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Shell */}
      <div
        className={styles.shell}
        style={{ gridTemplateColumns: sidebarOpen ? "230px 1fr" : "0 1fr" }}
      >
        {/* Sidebar */}
        <aside
          className={styles.sidebar}
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <Image
                src="/images/logo.png"
                alt="TRISTATE"
                width={120}
                height={32}
              />
            </div>
          </div>

          <ul className={styles.menu}>
            <li>
              <Link href="/admin-backend">Dashboard</Link>
            </li>
            <li>
              <Link href="#">Extra Apps</Link>
            </li>
            <li>
              <Link href="#">Widgets</Link>
            </li>
            <li className={styles.section}>Elements</li>
            <li>
              <Link href="#">Forms</Link>
            </li>
            <li>
              <Link href="#">Charts</Link>
            </li>
            <li>
              <Link href="/admin-backend/therapists">Therapists</Link>
            </li>
            <li>
              <Link href="/admin-backend/users">Users</Link>
            </li>
            <li>
              <Link href="#">Tables</Link>
            </li>
            <li>
              <Link href="#">Icons</Link>
            </li>
            <li className={styles.section}>Maps</li>
            <li>
              <Link href="#">Pages</Link>
            </li>
            <li>
              <Link href="#">Multilevel</Link>
            </li>
            <li className={styles.logout}>
              <Link href="/admin-backend/logout">Logout</Link>
            </li>
          </ul>
        </aside>

        {/* Content */}
        <main className={styles.content}>{children}</main>
      </div>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} • Crafted with Next.js
      </footer>
    </div>
  );
}
