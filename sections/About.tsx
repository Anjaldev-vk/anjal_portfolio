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
];

const STATS = [
  { label: "years_exp", value: "3+", color: "#3fb950" },
  { label: "projects_built", value: "15+", color: "#58a6ff" },
  { label: "apis_shipped", value: "50+", color: "#a371f7" },
  { label: "coffee_cups", value: "∞", color: "#d29922" },
];

const BIO_LINES = [
  { text: '"""', color: "#f1fa8c" },
  { text: "Backend Developer specializing in Python, Django,", color: "#f1fa8c" },
  { text: "and Django REST Framework with hands-on experience", color: "#f1fa8c" },
  { text: "building scalable REST APIs and backend services.", color: "#f1fa8c" },
  { text: "\u00a0", color: "#f1fa8c" },
  { text: "Skilled in PostgreSQL database design, auth systems,", color: "#f1fa8c" },
  { text: "and API architecture. Strong focus on debugging,", color: "#f1fa8c" },
  { text: "optimizing queries, and delivering maintainable", color: "#f1fa8c" },
  { text: "production-ready applications.", color: "#f1fa8c" },
  { text: '"""', color: "#f1fa8c" },
  { text: "# Fun fact: I name my variables", color: "#6272a4", italic: true },
  { text: "# better than I name my plants.", color: "#6272a4", italic: true },
];

const BG_ROWS = [
  { k: '"education"', v: '"BCA (Bachelor of Computer Applications)"', vc: "#f1fa8c" },
  { k: '"university"', v: '"University of Calicut"', vc: "#58a6ff" },
  { k: '"batch"', v: '"2022 - 2025"', vc: "#3fb950" },
  { k: '"focus"', v: '["Python", "SQL", "API Design"]', vc: "#f1fa8c" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderTop: "1px solid #30363d",
        padding: "36px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 40px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#e6edf3",
              whiteSpace: "nowrap",
            }}
          >
            about.py
          </span>
          <div style={{ flex: 1, height: 1, background: "#30363d" }} />
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* ── Left: docstring bio ── */}
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              background: "#0d1117",
              border: "1px solid #30363d",
            }}
          >
            {/* Title bar */}
            <div
              style={{
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "#161b22",
                borderBottom: "1px solid #30363d",
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
                  background: "#0d1117",
                  borderRight: "1px solid #21262d",
                  color: "#484f58",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.82rem",
                  lineHeight: "1.9rem",
                  minWidth: "2.6rem",
                  textAlign: "right",
                  flexShrink: 0,
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

          {/* ── Right: terminal + background + stats ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Terminal */}
            <Terminal lines={terminalLines} title="terminal — anjal@dev" animate={true} />

            {/* background.json */}
            <div
              style={{
                borderRadius: 8,
                padding: "16px 20px",
                background: "#161b22",
                border: "1px solid #30363d",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.82rem",
              }}
            >
              <div
                style={{
                  color: "#7d8590",
                  marginBottom: 10,
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                background.json
              </div>
              <div style={{ color: "#f8f8f2" }}>{"{"}</div>
              {BG_ROWS.map((row) => (
                <div key={row.k} style={{ paddingLeft: 16, lineHeight: "1.85rem" }}>
                  <span style={{ color: "#58a6ff" }}>{row.k}</span>
                  <span style={{ color: "#f8f8f2" }}>: </span>
                  <span style={{ color: row.vc }}>{row.v}</span>
                  <span style={{ color: "#f8f8f2" }}>,</span>
                </div>
              ))}
              <div style={{ color: "#f8f8f2" }}>{"}"}</div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderRadius: 6,
                    padding: "12px 14px",
                    background: "#161b22",
                    border: "1px solid #30363d",
                    fontFamily: "JetBrains Mono, monospace",
                    transition: "border-color 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = s.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#30363d";
                  }}
                >
                  <div style={{ fontSize: "1.4rem", color: s.color, fontWeight: 700 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#7d8590", marginTop: 2 }}>
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