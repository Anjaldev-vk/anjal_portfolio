"use client";
import { useRef } from "react";
import Terminal from "@/components/Terminal";

const terminalLines = [
  { type: "command" as const, text: "whoami" },
  { type: "output" as const, text: "Anjal Dev V K | Backend Developer" },
  { type: "blank" as const, text: "" },
  { type: "command" as const, text: "cat experience.md" },
  { type: "output" as const, text: "Backend Developer Intern — Bridgeon Calicut (2025 - Present)" },
  { type: "output" as const, text: "• Engineered RESTful API endpoints using Django REST Framework" },
  { type: "output" as const, text: "• Optimized PostgreSQL queries and indexing strategies" },
  { type: "output" as const, text: "• Implemented JWT authentication and role-based access control" },
  { type: "blank" as const, text: "" },
  { type: "command" as const, text: "curl -O Anjal_Dev_Resume.pdf" },
  { type: "output" as const, text: "  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current" },
  { type: "output" as const, text: "                                 Dload  Upload   Total   Spent    Left  Speed" },
  { type: "output" as const, text: "100  124k  100  124k    0     0   452k      0 --:--:-- --:--:-- --:--:--  454k" },
];

const STATS = [
  { label: "years_exp", value: "1+", color: "#3fb950" },
  { label: "projects_built", value: "5+", color: "#58a6ff" },
  { label: "apis_shipped", value: "50+", color: "#a371f7" },
  { label: "coffee_cups", value: "∞", color: "#d29922" },
];

const BIO_LINES = [
  { text: '"""', color: "var(--syntax-string)" },
  { text: "Backend Developer specializing in Python, Django,", color: "var(--syntax-string)" },
  { text: "and Django REST Framework with hands-on experience", color: "var(--syntax-string)" },
  { text: "building scalable REST APIs and backend services.", color: "var(--syntax-string)" },
  { text: "\u00a0", color: "var(--syntax-string)" },
  { text: "Skilled in PostgreSQL database design, auth systems,", color: "var(--syntax-string)" },
  { text: "and API architecture. Strong focus on debugging,", color: "var(--syntax-string)" },
  { text: "optimizing queries, and delivering maintainable", color: "var(--syntax-string)" },
  { text: "production-ready applications.", color: "var(--syntax-string)" },
  { text: '"""', color: "var(--syntax-string)" },
  { text: "# Fun fact: I name my variables", color: "var(--syntax-comment)", italic: true },
  { text: "# better than I name my plants.", color: "var(--syntax-comment)", italic: true },
];

const BG_ROWS = [
  { k: '"education"', v: '"BCA (Bachelor of Computer Applications)"', vc: "var(--syntax-string)" },
  { k: '"university"', v: '"University of Calicut"', vc: "var(--syntax-keyword)" },
  { k: '"batch"', v: '"2022 - 2025"', vc: "var(--syntax-keyword)" },
  { k: '"focus"', v: '["Python", "SQL", "API Design"]', vc: "var(--syntax-string)" },
];

export default function About({ theme }: { theme: "dark" | "light" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";
  const colors = {
    background: isDark ? "#0d1117" : "#ffffff",
    border: isDark ? "#30363d" : "#e1e4e8",
    titleBar: isDark ? "#161b22" : "#efefef",
    text: isDark ? "#e6edf3" : "#24292e",
    textMuted: isDark ? "#7d8590" : "#6a737d",
    cardBg: "var(--editor-bg)",
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderTop: `1px solid ${colors.border}`,
        padding: "36px 0",
        boxSizing: "border-box",
      }}
    >
      <div className="section-container">
        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: colors.text,
              whiteSpace: "nowrap",
            }}
          >
            about.py
          </span>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
        </div>

        {/* Two-column grid */}
        <div className="about-grid">
          {/* ── Left: docstring bio + resume ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                background: colors.background,
                border: `1px solid ${colors.border}`,
              }}
            >
            {/* Title bar */}
            <div
              style={{
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: colors.titleBar,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
              ))}
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.75rem",
                  color: "#7d8590",
                  marginLeft: 5,
                }}
              >
                about.py
              </span>
            </div>

            {/* Code body */}
            <div style={{ display: "flex" }}>
              {/* Line numbers */}
              <div
                style={{
                  userSelect: "none",
                  padding: "20px 13px",
                  background: isDark ? "#0d1117" : colors.titleBar,
                  borderRight: `1px solid ${colors.border}`,
                  color: colors.textMuted,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.82rem",
                  lineHeight: "1.9rem",
                  minWidth: "2.6rem",
                  textAlign: "right",
                }}
                aria-hidden="true"
              >
                {BIO_LINES.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code text */}
              <div
                style={{
                  padding: "20px 22px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.84rem",
                  lineHeight: "1.9rem",
                  flex: 1,
                  overflowX: "auto",
                }}
              >
                {BIO_LINES.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      color: line.color,
                      fontStyle: (line as any).italic ? "italic" : "normal",
                    }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Download CTA (Left Column) */}
          <div style={{ padding: "0 4px" }}>
            <a
              href="/Anjal_Dev_Resume.pdf"
              download
              className="cta-btn secondary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                textDecoration: "none",
                padding: "12px 24px",
                fontSize: "0.9rem",
                borderRadius: 6,
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                transition: "all 0.2s",
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#58a6ff";
                (e.currentTarget as HTMLElement).style.background = isDark ? "#1c2128" : "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = colors.border;
                (e.currentTarget as HTMLElement).style.background = colors.cardBg;
              }}
            >
              <span style={{ color: colors.textMuted }}>$</span> cat Anjal_Dev_Resume.pdf (Download Resume)
            </a>
          </div>
        </div>

        {/* ── Right Column: terminal + background + stats ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Terminal */}
            <Terminal lines={terminalLines} title="terminal — anjal@dev" animate={true} theme={theme} />

            {/* background.json */}
            <div
              style={{
                borderRadius: 8,
                padding: "16px 20px",
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.82rem",
              }}
            >
              <div
                style={{
                  color: colors.textMuted,
                  marginBottom: 10,
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                background.json
              </div>
              <div style={{ color: colors.text }}>{"{"}</div>
              {BG_ROWS.map((row) => (
                <div key={row.k} style={{ paddingLeft: 16, lineHeight: "1.85rem" }}>
                  <span style={{ color: "var(--syntax-var)" }}>{row.k}</span>
                  <span style={{ color: colors.text }}>: </span>
                  <span style={{ color: row.vc }}>{row.v}</span>
                  <span style={{ color: "var(--syntax-punct)" }}>,</span>
                </div>
              ))}
              <div style={{ color: colors.text }}>{"}"}</div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderRadius: 6,
                    padding: "12px 14px",
                    background: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    fontFamily: "JetBrains Mono, monospace",
                    transition: "border-color 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = s.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = colors.border;
                  }}
                >
                  <div style={{ fontSize: "1.4rem", color: s.color, fontWeight: 700 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: colors.textMuted, marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}