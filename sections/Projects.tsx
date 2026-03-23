"use client";
import { useState } from "react";

const PROJECTS = [
  {
    file: "pocket_planner.py",
    icon: " ",
    name: "Pocket Planner",
    desc: "Mobile productivity application with backend services for task scheduling, reminders, and daily tracking. Features REST API endpoints for Flutter mobile clients.",
    language: "Python",
    stars: 12,
    forks: 3,
    tags: ["Django", "DRF", "Flutter", "PostgreSQL"],
    github: "https://github.com/Anjaldev-vk/Pocket-planner",
    demo: "#",
    color: "#3fb950",
    highlights: ["REST APIs", "Task Mgmt", "PostgreSQL Schema"],
  },
  {
    file: "shopco_ecommerce.py",
    icon: " ",
    name: "ShopCo",
    desc: "Men's fashion e-commerce platform supporting product catalogs, shopping carts, and order workflows. Integrated with a React frontend.",
    language: "Python",
    stars: 18,
    forks: 5,
    tags: ["Django", "DRF", "React", "Redux", "PostgreSQL"],
    github: "https://github.com/Anjaldev-vk/shop.co_backend",
    demo: "#",
    color: "#58a6ff",
    highlights: ["Backend Architecture", "React Frontend", "Order Flow"],
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="projects"
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
      <div className="section-container">
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
            projects/
          </span>
          <div style={{ flex: 1, height: 1, background: "#30363d" }} />
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.8rem",
            marginBottom: 20,
            color: "#6272a4",
            fontStyle: "italic",
          }}
        >
          # pinned repositories
        </div>

        {/* Project cards grid */}
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div
              key={project.file}
              className="project-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                padding: "24px",
                borderRadius: 8,
                background: "#0d1117",
                border: `1px solid ${hovered === project.file ? project.color : "#30363d"}`,
                boxShadow: hovered === project.file ? `0 0 20px ${project.color}22` : "none",
                transform: hovered === project.file ? "translateY(-3px)" : "translateY(0)",
                transition: "all 0.22s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={() => setHovered(project.file)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{project.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: project.color,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.72rem",
                      color: "#7d8590",
                      marginTop: 2,
                    }}
                  >
                    📄 {project.file}
                  </div>
                </div>
                {/* Language badge */}
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.72rem",
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: `${project.color}18`,
                    border: `1px solid ${project.color}44`,
                    color: project.color,
                    flexShrink: 0,
                  }}
                >
                  ● {project.language}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.82rem",
                  lineHeight: "1.6",
                  color: "#c9d1d9",
                  margin: 0,
                }}
              >
                {project.desc}
              </p>

              {/* Highlights */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.72rem",
                      padding: "3px 10px",
                      borderRadius: 4,
                      background: `${project.color}12`,
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                    }}
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "#30363d" }} />

              {/* Footer row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.76rem",
                    color: "#7d8590",
                  }}
                >
                  <span>★ {project.stars}</span>
                  <span>⑂ {project.forks}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "flex-end" }}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="code-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn"
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.76rem",
                    borderColor: project.color,
                    color: project.color,
                  }}
                >
                    View Code
                </a>
                <a
                  href={project.demo}
                  className="cta-btn secondary"
                  style={{ padding: "6px 14px", fontSize: "0.76rem" }}
                >
                   Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div style={{ marginTop: 24, textAlign: "center" as const }}>
          <a
            href="https://github.com/Anjaldev-vk"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn secondary"
          >
            <span style={{ color: "#7d8590" }}>$</span> git clone github.com/anjal-dev --all
          </a>
        </div>
      </div>
    </section>
  );
}