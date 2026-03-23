"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TabBar from "@/components/TabBar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import TypingTest from "@/sections/TypingTest";
import { useActiveSection } from "@/hooks/useActiveSection";
import { gsap } from "@/lib/gsap";

const SECTION_IDS = ["hero", "about", "skills", "projects", "typing-test", "contact"];
const SECTION_FILES: Record<string, string> = {
  hero: "main.py",
  about: "about.py",
  skills: "skills.py",
  projects: "projects/",
  "typing-test": "typing_test.py",
  contact: "contact.py",
};

// VS Code activity bar icons (SVG paths)
const ActivityIcons = {
  explorer: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13.5 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5L13.5 3z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M13 3v6h6" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  git: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M6 8.5v7M8.5 6h7M8.5 18h4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  extensions: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <rect x="12" y="3" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M3 3h9v9H3z" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M12 12l4-4m0 0v3m0-3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  account: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  ),
  settings: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  theme: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
};

const MENU_ITEMS = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

export default function Home() {
  const activeSection = useActiveSection(SECTION_IDS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";
  const colors = {
    background: isDark ? "#1e1e1e" : "#f3f3f3",
    foreground: isDark ? "#cccccc" : "#333333",
    sidebar: isDark ? "#252526" : "#f3f3f3",
    activityBar: isDark ? "#333333" : "#2c2c2c",
    titleBar: isDark ? "#161b22" : "#f3f3f3",
    border: isDark ? "#252526" : "#dfdfdf",
    tabActive: isDark ? "#1e1e1e" : "#ffffff",
    tabInactive: isDark ? "#2d2d30" : "#ececec",
    breadcrumb: isDark ? "#1e1e1e" : "#ffffff",
    statusBar: isDark ? "#007acc" : "#007acc",
    editorBackground: isDark ? "#1e1e1e" : "#ffffff",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sidebarRef.current, { x: -260, opacity: 0 });
      gsap.to(sidebarRef.current, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 });
      gsap.set(editorRef.current, { opacity: 0 });
      gsap.to(editorRef.current, { opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.35 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      data-theme={theme}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: colors.background,
        color: colors.foreground,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        fontSize: "13px",
        overflow: "hidden",
        userSelect: "none",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {/* ── TITLE BAR ─────────────────────────────────── */}
      <div
        style={{
          height: 30,
          background: colors.titleBar,
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${colors.border}`,
          flexShrink: 0,
          gap: 0,
        }}
      >
        {/* App icon */}
        <div style={{ width: 48, display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
            <path d="M65.4 3.8L27 41.6l-17-12.9L0 35.2l17 13L0 61.4l10 6.5L27 54.9l38.4 37.9 16.6-8.5V12.3L65.4 3.8zm4.8 72.8L38.7 50l31.5-26.5v53z" fill="#007ACC" />
          </svg>
        </div>
        {/* Menu items */}
        <div className="hidden md:flex items-center h-full">
          {MENU_ITEMS.map((item) => (
            <div
              key={item}
              style={{
                padding: "0 8px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                cursor: "default",
                fontSize: "12px",
                color: isDark ? "#cccccc" : "#333333",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "#3c3c3c" : "#e5e5e5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Centered search bar */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              width: "max(300px, 40%)",
              height: 22,
              background: isDark ? "#252526" : "#ffffff",
              border: `1px solid ${isDark ? "#3c3c3c" : "#dfdfdf"}`,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: 8,
              color: isDark ? "#cccccc" : "#616161",
              fontSize: "12px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>main.py - Portfolio - Anjal_Dev_VK</span>
          </div>
        </div>
        {/* Layout icons and Window controls */}
        <div className="hidden md:flex items-center" style={{ flexShrink: 0, gap: 4, paddingRight: 4 }}>
          {/* Layout control icons */}
          {[
            <svg key="sidebar" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5l.5-.5h13l.5.5v11l-.5.5h-13l-.5-.5v-11zM2 13h3V3H2v10zm4 0h8V3H6v10z"/></svg>,
            <svg key="panel" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14.5 2l.5.5v11l-.5.5h-13l-.5-.5v-11l.5-.5h13zM14 3H2v7h12V3zm0 8H2v2h12v-2z"/></svg>,
            <svg key="layout" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5l.5-.5h13l.5.5v11l-.5.5h-13l-.5-.5v-11zM14 3H9v10h5V3zM8 3H2v10h6V3z"/></svg>
          ].map((icon, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: 4,
                color: isDark ? "#cccccc" : "#616161",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "#3c3c3c" : "#e5e5e5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {icon}
            </div>
          ))}
          <div style={{ width: 1, height: 16, background: isDark ? "#3c3c3c" : "#dfdfdf", margin: "0 4px" }} />
          {[
            { icon: "─", hover: "#3c3c3c", title: "Minimize" },
            { icon: "☐", hover: "#3c3c3c", title: "Maximize" },
            { icon: "✕", hover: "#e81123", title: "Close" },
          ].map(({ icon, hover, title }) => (
            <div
              key={title}
              title={title}
              style={{
                width: 46,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default",
                fontSize: "12px",
                transition: "background 0.1s",
                color: isDark ? "#cccccc" : "#333333",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = title === "Close" ? "#e81123" : (isDark ? "#3c3c3c" : "#e5e5e5"); }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {icon}
            </div>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ background: "none", border: "none", color: isDark ? "#cccccc" : "#333333", cursor: "pointer", padding: "0 12px", fontSize: "16px" }}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* ── MAIN BODY (activity + sidebar + editor) ──── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── ACTIVITY BAR ──────────────────────────── */}
        <div
          className="hidden md:flex"
          style={{
            width: 48,
            background: colors.activityBar,
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 4,
            borderRight: `1px solid ${colors.border}`,
            flexShrink: 0,
          }}
        >
          {/* Top icons */}
          {(["explorer", "search", "git", "extensions"] as const).map((key) => (
            <div
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              onClick={() => setActiveActivity(key)}
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: activeActivity === key ? "#ffffff" : "#858585",
                borderLeft: activeActivity === key ? "2px solid #ffffff" : "2px solid transparent",
                transition: "color 0.15s",
                position: "relative",
              }}
              onMouseEnter={(e) => { if (activeActivity !== key) (e.currentTarget as HTMLElement).style.color = "#cccccc"; }}
              onMouseLeave={(e) => { if (activeActivity !== key) (e.currentTarget as HTMLElement).style.color = "#858585"; }}
            >
              {ActivityIcons[key]}
            </div>
          ))}

          {/* Bottom icons (account + settings + theme) */}
          <div style={{ flex: 1 }} />
          {(["account"] as const).map((key) => (
            <div
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#858585",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = isDark ? "#cccccc" : "#333333"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}
            >
              {ActivityIcons[key]}
            </div>
          ))}
          <div
            title="Switch Theme"
            onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#858585",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = isDark ? "#cccccc" : "#333333"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}
          >
            {ActivityIcons.theme}
          </div>
        </div>

        {/* ── SIDEBAR (Explorer panel) ───────────────── */}
        <div
          ref={sidebarRef}
          className="hidden md:flex flex-col"
          style={{
            width: 240,
            background: colors.sidebar,
            borderRight: `1px solid ${colors.border}`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Panel title */}
          <div
            style={{
              padding: "8px 12px 6px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#bbbbbb",
              borderBottom: "1px solid #3c3c3c",
            }}
          >
            Explorer
          </div>
          {/* Portfolio label */}
          <div
            style={{
              padding: "4px 12px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: isDark ? "#cccccc" : "#333333",
              background: isDark ? "#2d2d30" : "#e8e8e8",
            }}
          >
            ▾ portfolio
          </div>
          <Sidebar activeSection={activeSection} theme={theme} />
        </div>

        {/* ── EDITOR AREA ───────────────────────────── */}
        <div ref={editorRef} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tab bar */}
          <TabBar activeSection={activeSection} theme={theme} />

          {/* Breadcrumb */}
          <div
            style={{
              height: 22,
              background: colors.breadcrumb,
              borderBottom: `1px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 4,
              fontSize: "12px",
              color: "#858585",
              flexShrink: 0,
            }}
          >
            <span>portfolio</span>
            <span style={{ opacity: 0.5 }}>›</span>
            <span style={{ color: "#cccccc" }}>{SECTION_FILES[activeSection]}</span>
          </div>

          {/* Scrollable content */}
          <main className="editor-main" style={{ background: colors.background }}>
            <Hero theme={theme} />
            <About theme={theme} />
            <Skills theme={theme} />
            <Projects theme={theme} />
            <TypingTest theme={theme} />
            <Contact theme={theme} />

            <footer
              style={{
                textAlign: "center",
                padding: "32px 16px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#555",
                borderTop: "1px solid #2d2d30",
              }}
            >
              <span style={{ color: "#4ec9b0" }}># Built with Django, React, and a lot of ☕</span>
              <br />
              <span style={{ color: "#666", marginTop: 4, display: "block" }}>
                © 2025 <span style={{ color: "#3fb950" }}>Anjal Dev VK</span> — Kerala, India
              </span>
            </footer>
          </main>
        </div>
      </div>

      {/* ── STATUS BAR ────────────────────────────────── */}
      <div
        style={{
          height: 22,
          background: "#007acc",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 0,
          flexShrink: 0,
          fontSize: "12px",
          color: "#ffffff",
        }}
      >
        {/* Left items */}
        <StatusBarItem icon="⎇" text="main" />
        <StatusBarItem text="✓  0" extraClass="statusbar-hide-mobile" />
        <StatusBarItem text="⚠  0" extraClass="statusbar-hide-mobile" />
        <div style={{ flex: 1 }} />
        {/* Right items */}
        <StatusBarItem text={`${SECTION_FILES[activeSection]}`} extraClass="statusbar-hide-mobile" />
        <StatusBarItem text="Python 3.11" extraClass="statusbar-hide-mobile" />
        <StatusBarItem text="UTF-8" extraClass="statusbar-hide-mobile" />
        <StatusBarItem text="LF" extraClass="statusbar-hide-mobile" />
        <StatusBarItem text="Spaces: 4" extraClass="statusbar-hide-mobile" />
        <StatusBarItem text="Ln 1, Col 1" />
        <StatusBarItem icon="🔔" text="" />
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.6)" }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-drawer open"
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, maxHeight: "70vh", overflow: "auto", padding: "12px 0", background: colors.sidebar }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: "8px 16px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: isDark ? "#bbb" : "#666",
              borderBottom: `1px solid ${colors.border}`,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>Explorer</span>
              <div
                onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
                style={{ cursor: "pointer", color: "#858585", display: "flex", alignItems: "center" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = isDark ? "#cccccc" : "#333333"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            {SECTION_IDS.map((id) => (
              <div
                key={id}
                style={{
                  padding: "6px 24px",
                  color: activeSection === id ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#cccccc" : "#333333"),
                  background: activeSection === id ? (isDark ? "#37373d" : "#e8e8e8") : "transparent",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono', monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => {
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path>
                  <path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
                </svg>
                <span>{SECTION_FILES[id]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBarItem({ icon, text, extraClass }: { icon?: string; text: string; extraClass?: string }) {
  return (
    <div
      className={extraClass}
      style={{
        padding: "0 8px",
        height: 22,
        display: extraClass ? undefined : "flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      {icon && <span style={{ fontSize: "11px" }}>{icon}</span>}
      {text && <span>{text}</span>}
    </div>
  );
}
