"use client";
import { useState } from "react";

const SKILLS = [
  {
    category: "programming",
    label: "# Programming",
    color: "#3fb950",
    icon: " ",
    items: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 90 },
      { name: "HTML5/CSS3", level: 88 },
    ],
  },
  {
    category: "backend",
    label: "# Backend & APIs",
    color: "#58a6ff",
    icon: " ",
    items: [
      { name: "Django", level: 92 },
      { name: "Django REST Framework", level: 95 },
      { name: "REST API Development", level: 94 },
      { name: "Middleware", level: 80 },
    ],
  },
  {
    category: "database",
    label: "# Databases",
    color: "#a371f7",
    icon: " ",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "Database Design", level: 85 },
      { name: "Query Optimization", level: 82 },
      { name: "Indexing & Joins", level: 78 },
    ],
  },
  {
    category: "frontend",
    label: "# Frontend",
    color: "#f1fa8c",
    icon: " ",
    items: [
      { name: "React.js", level: 75 },
      { name: "Redux", level: 70 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 80 },
    ],
  },
  {
    category: "tools",
    label: "# Dev Tools & Concepts",
    color: "#d29922",
    icon: " ",
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "Postman", level: 92 },
      { name: "API Security", level: 85 },
      { name: "OOP / Debugging", level: 88 },
    ],
  },
];

function SkillBar({ name, level, color, theme }: { name: string; level: number; color: string; theme: "dark" | "light" }) {
  const [hovered, setHovered] = useState(false);
  const isDark = theme === "dark";
  return (
    <div
      style={{ marginBottom: 14 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 7,
          marginBottom: 4,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.78rem",
          color: hovered ? color : "#c9d1d9",
          transition: "color 0.2s",
          width: "100%",
        }}
      >
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={name}>{name}</span>
        <span style={{ color, flexShrink: 0 }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: "#21262d", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}66, ${color})`,
            borderRadius: 3,
            boxShadow: hovered ? `0 0 7px ${color}99` : "none",
            transition: "box-shadow 0.2s",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const colors = {
    background: "var(--editor-bg)",
    border: "var(--border)",
    titleBar: isDark ? "#161b22" : "#f6f8fa",
    text: "var(--text)",
    textMuted: "var(--muted)",
    cardBg: "var(--surface)",
    tokenKeyword: "var(--syntax-keyword)",
    tokenString: "var(--syntax-string)",
    tokenPlain: "var(--text)",
    tokenComment: "var(--syntax-comment)",
    tabBg: isDark ? "#161b22" : "#f1f3f5",
    lineNumbersBg: "var(--line-number-bg)",
  };
  const [activeTab, setActiveTab] = useState("backend");
  const active = SKILLS.find((s) => s.category === activeTab) || SKILLS[0];
  const codeLineCount = SKILLS.length + 4;

  return (
    <section
      id="skills"
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
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: colors.text,
            }}
          >
            skills.py
          </span>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
        </div>

        {/* Grid */}
        <div className="skills-grid">
          {/* ── Left: code panel ── */}
          <div
            className="skills-code-panel"
            style={{
              borderRadius: 8,
              overflow: "hidden",
              background: colors.background,
              border: `1px solid ${colors.border}`,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Light Mode Cell Marker */}
            {!isDark && (
              <div 
                style={{
                  position: "absolute",
                  left: 0,
                  top: 33,
                  bottom: 0,
                  width: 5,
                  background: "var(--cell-marker)",
                  zIndex: 10,
                  borderRadius: "0 2px 2px 0",
                }}
              />
            )}
            {/* Title bar */}
            <div
              style={{
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: colors.titleBar,
                borderBottom: `1px solid ${colors.border}`,
                flexShrink: 0,
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
                skills.py
              </span>
            </div>

            {/* Code body */}
            <div style={{ display: "flex", flex: 1 }}>
              {/* Line numbers */}
              <div
                className="skill-line-numbers"
                style={{
                  userSelect: "none",
                  padding: "20px 13px",
                  background: colors.lineNumbersBg,
                  borderRight: `1px solid ${colors.border}`,
                  color: colors.textMuted,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.82rem",
                  lineHeight: "2.15rem",
                  minWidth: "2.6rem",
                  textAlign: "right",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {Array.from({ length: codeLineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code content */}
              <div
                className="skills-code-content"
                style={{
                  padding: "16px 16px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.85rem",
                  lineHeight: "2.15rem",
                  flex: 1,
                  overflowX: "hidden",
                  background: colors.background,
                }}
              >
                <div>
                  <span style={{ color: "var(--syntax-var)" }}>SKILLS</span>
                  <span style={{ color: "var(--syntax-operator)" }}> = </span>
                  <span style={{ color: "var(--syntax-punct)" }}>{"{"}</span>
                </div>
                {SKILLS.map((s) => (
                  <div
                    key={s.category}
                    onClick={() => setActiveTab(s.category)}
                    style={{
                      paddingLeft: 16,
                      borderLeft:
                        activeTab === s.category
                          ? `2px solid ${s.color}`
                          : "2px solid transparent",
                      transition: "border-color 0.15s",
                      cursor: "pointer",
                      color: activeTab === s.category ? s.color : colors.text,
                    }}
                  >
                    <span style={{ color: colors.tokenString }}>"{s.category}"</span>
                    <span style={{ color: "var(--syntax-punct)" }}>: </span>
                    <span style={{ color: s.color }}>[...]</span>
                    <span style={{ color: "var(--syntax-punct)" }}>,</span>
                  </div>
                ))}
                <div>
                  <span style={{ color: "var(--syntax-punct)" }}>{"}"}</span>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: "var(--syntax-comment)",
                    fontStyle: "italic",
                    fontSize: "0.76rem",
                  }}
                >
                  # click a key to explore
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: skill bars + learning ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Skill bars panel */}
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                background: colors.background,
                border: `1px solid ${colors.border}`,
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              {/* Tabs */}
              <div
                className="skills-tabs-container"
                style={{
                  display: "flex",
                  overflowX: "auto",
                  background: colors.titleBar,
                  borderBottom: `1px solid ${colors.border}`,
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  flexShrink: 0,
                }}
              >
                {SKILLS.map((s) => (
                  <button
                    key={s.category}
                    onClick={() => setActiveTab(s.category)}
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.78rem",
                      padding: "9px 12px",
                      whiteSpace: "nowrap",
                      background: activeTab === s.category ? "#0d1117" : "transparent",
                      color: activeTab === s.category ? s.color : "#7d8590",
                      borderBottom:
                        activeTab === s.category
                          ? `2px solid ${s.color}`
                          : "2px solid transparent",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {s.icon} {s.category}
                  </button>
                ))}
              </div>

              {/* Skill bars */}
              <div className="skills-bars-panel" style={{ padding: "18px 20px", flex: 1 }}>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.8rem",
                    color: "#6272a4",
                    fontStyle: "italic",
                    marginBottom: 18,
                  }}
                >
                  {active.label}
                </div>
                {active.items.map((item) => (
                  <SkillBar key={item.name} name={item.name} level={item.level} color={active.color} theme={theme} />
                ))}
              </div>
            </div>

            {/* Currently learning */}
            <div
              style={{
                borderRadius: 8,
                padding: "16px 24px",
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  color: colors.tokenComment,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.78rem",
                  fontStyle: "italic",
                  marginBottom: 12,
                }}
              >
                # currently learning
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                {["AWS", "DSA",  "GraphQL", "Kubernetes"].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.78rem",
                      padding: "5px 14px",
                      borderRadius: 4,
                      border: `1px solid ${isDark ? "rgba(248, 81, 73, 0.4)" : "rgba(207, 34, 46, 0.4)"}`,
                      color: isDark ? "#f85149" : "#cf222e",
                      background: isDark ? "rgba(248, 81, 73, 0.08)" : "rgba(207, 34, 46, 0.05)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}