"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TabBar from "@/components/TabBar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import { useActiveSection } from "@/hooks/useActiveSection";
import { gsap } from "@/lib/gsap";

const SECTION_IDS = ["hero", "about", "skills", "projects", "contact"];
const SECTION_FILES: Record<string, string> = {
  hero: "main.py",
  about: "about.py",
  skills: "skills.py",
  projects: "projects/",
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
};

const MENU_ITEMS = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

export default function Home() {
  const activeSection = useActiveSection(SECTION_IDS);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState("explorer");

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
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#1e1e1e",
        color: "#cccccc",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        fontSize: "13px",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── TITLE BAR ─────────────────────────────────── */}
      <div
        style={{
          height: 30,
          background: "#323233",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #252526",
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
                color: "#cccccc",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#3c3c3c"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Centered title */}
        <div style={{ flex: 1, textAlign: "center", fontSize: "12px", color: "#cccccc", opacity: 0.8 }}>
          main.py — portfolio — Anjal Dev VK
        </div>
        {/* Window controls */}
        <div className="hidden md:flex items-center" style={{ flexShrink: 0 }}>
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
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = hover; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {icon}
            </div>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", padding: "0 12px", fontSize: "16px" }}
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
            background: "#333333",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 4,
            borderRight: "1px solid #252526",
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

          {/* Bottom icons (account + settings) */}
          <div style={{ flex: 1 }} />
          {(["account", "settings"] as const).map((key) => (
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
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#cccccc"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}
            >
              {ActivityIcons[key]}
            </div>
          ))}
        </div>

        {/* ── SIDEBAR (Explorer panel) ───────────────── */}
        <div
          ref={sidebarRef}
          className="hidden md:flex flex-col"
          style={{
            width: 240,
            background: "#252526",
            borderRight: "1px solid #1e1e1e",
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
              color: "#cccccc",
              background: "#2d2d30",
            }}
          >
            ▾ portfolio
          </div>
          <Sidebar activeSection={activeSection} />
        </div>

        {/* ── EDITOR AREA ───────────────────────────── */}
        <div ref={editorRef} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tab bar */}
          <TabBar activeSection={activeSection} />

          {/* Breadcrumb */}
          <div
            style={{
              height: 22,
              background: "#1e1e1e",
              borderBottom: "1px solid #252526",
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
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#1e1e1e",
              userSelect: "text",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />

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
        <StatusBarItem text="✓  0" />
        <StatusBarItem text="⚠  0" />
        <div style={{ flex: 1 }} />
        {/* Right items */}
        <StatusBarItem text={`${SECTION_FILES[activeSection]}`} />
        <StatusBarItem text="Python 3.11" />
        <StatusBarItem text="UTF-8" />
        <StatusBarItem text="LF" />
        <StatusBarItem text="Spaces: 4" />
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
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, maxHeight: "70vh", overflow: "auto", padding: "12px 0", background: "#252526" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#bbb", borderBottom: "1px solid #3c3c3c", marginBottom: 8 }}>
              Explorer
            </div>
            {SECTION_IDS.map((id) => (
              <div
                key={id}
                style={{ padding: "6px 24px", color: activeSection === id ? "#ffffff" : "#cccccc", background: activeSection === id ? "#37373d" : "transparent", cursor: "pointer", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}
                onClick={() => {
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                🐍 {SECTION_FILES[id]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBarItem({ icon, text }: { icon?: string; text: string }) {
  return (
    <div
      style={{
        padding: "0 8px",
        height: 22,
        display: "flex",
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
