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

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const [hovered, setHovered] = useState(false);
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
          marginBottom: 5,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.8rem",
          color: hovered ? color : "#c9d1d9",
          transition: "color 0.2s",
        }}
      >
        <span>{name}</span>
        <span style={{ color }}>{level}%</span>
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

export default function Skills() {
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
        {/* Header */}
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
            skills.py
          </span>
          <div style={{ flex: 1, height: 1, background: "#30363d" }} />
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {/* ── Left: code panel ── */}
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              background: "#0d1117",
              border: "1px solid #30363d",
              display: "flex",
              flexDirection: "column",
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
                style={{
                  userSelect: "none",
                  padding: "20px 13px",
                  background: "#0d1117",
                  borderRight: "1px solid #21262d",
                  color: "#484f58",
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
                style={{
                  padding: "20px 24px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.88rem",
                  lineHeight: "2.15rem",
                  flex: 1,
                }}
              >
                <div>
                  <span style={{ color: "#8be9fd" }}>SKILLS</span>
                  <span style={{ color: "#ff79c6" }}> = </span>
                  <span style={{ color: "#f8f8f2" }}>{"{"}</span>
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
                    }}
                  >
                    <span style={{ color: "#f1fa8c" }}>"{s.category}"</span>
                    <span style={{ color: "#ff79c6" }}>: </span>
                    <span style={{ color: s.color }}>[...]</span>
                    <span style={{ color: "#f8f8f2" }}>,</span>
                  </div>
                ))}
                <div>
                  <span style={{ color: "#f8f8f2" }}>{"}"}</span>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: "#6272a4",
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
                background: "#0d1117",
                border: "1px solid #30363d",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  overflowX: "auto",
                  background: "#161b22",
                  borderBottom: "1px solid #30363d",
                  scrollbarWidth: "none" as const,
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
                      padding: "9px 16px",
                      whiteSpace: "nowrap" as const,
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
              <div style={{ padding: "22px 28px", flex: 1 }}>
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
                  <SkillBar key={item.name} name={item.name} level={item.level} color={active.color} />
                ))}
              </div>
            </div>

            {/* Currently learning */}
            <div
              style={{
                borderRadius: 8,
                padding: "16px 24px",
                background: "#161b22",
                border: "1px solid #30363d",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  color: "#6272a4",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.78rem",
                  fontStyle: "italic",
                  marginBottom: 12,
                }}
              >
                # currently learning
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                {["AWS", "GraphQL", "Kubernetes"].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.78rem",
                      padding: "5px 14px",
                      borderRadius: 4,
                      border: "1px solid rgba(248, 81, 73, 0.4)",
                      color: "#f85149",
                      background: "rgba(248, 81, 73, 0.08)",
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