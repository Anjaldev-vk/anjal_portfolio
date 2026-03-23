"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const CODE_LINES = [
  { text: "# ─────────────────────────────────────────", type: "comment" },
  { text: "# Developer Portfolio — Anjal Dev VK", type: "comment" },
  { text: "# ─────────────────────────────────────────", type: "comment" },
  { text: "", type: "blank" },
  { text: "class BackendDeveloper:", type: "keyword" },
  { text: '    name       = "Anjal Dev V K"', type: "string" },
  { text: '    role       = "Python & Django Specialist"', type: "string" },
  { text: '    location   = "Kerala, India"', type: "string" },
  { text: "    focus      = ['REST APIs', 'Scalable Systems']", type: "string" },
  { text: "", type: "blank" },
  { text: "    def build_api(self, tech_stack):", type: "def" },
  { text: '        return f"Building with {tech_stack}..."', type: "string" },
  { text: "", type: "blank" },
  { text: "    def optimize_queries(self):", type: "def" },
  { text: '        print("Optimizing PostgreSQL performance.")', type: "string" },
];

function renderTokens(text: string, type: string) {
  if (type === "comment")
    return <span style={{ color: "#6272a4", fontStyle: "italic" }}>{text}</span>;
  if (type === "blank") return <span>&nbsp;</span>;
  if (type === "keyword") {
    return (
      <span>
        {text.split(/(class|True|False|None|=)/g).map((part, i) => {
          if (["class", "True", "False", "None", "="].includes(part))
            return <span key={i} style={{ color: "#ff79c6" }}>{part}</span>;
          return <span key={i} style={{ color: "#e6edf3" }}>{part}</span>;
        })}
      </span>
    );
  }
  if (type === "def") {
    return (
      <span>
        {text.split(/(def|self)/g).map((part, i) => {
          if (part === "def") return <span key={i} style={{ color: "#ff79c6" }}>{part}</span>;
          if (part === "self") return <span key={i} style={{ color: "#a371f7" }}>{part}</span>;
          const fnMatch = part.match(/^(\s+)(\w+)(\(.*\):)(.*)$/);
          if (fnMatch) {
            return (
              <span key={i}>
                <span style={{ color: "#e6edf3" }}>{fnMatch[1]}</span>
                <span style={{ color: "#50fa7b" }}>{fnMatch[2]}</span>
                <span style={{ color: "#f8f8f2" }}>{fnMatch[3]}</span>
                <span style={{ color: "#e6edf3" }}>{fnMatch[4]}</span>
              </span>
            );
          }
          return <span key={i} style={{ color: "#e6edf3" }}>{part}</span>;
        })}
      </span>
    );
  }
  if (type === "string") {
    return (
      <span>
        {text
          .split(/("(?:[^"\\]|\\.)*"|True|False|None|def|return|print)/g)
          .map((part, i) => {
            if (part.startsWith('"') && part.endsWith('"'))
              return <span key={i} style={{ color: "#f1fa8c" }}>{part}</span>;
            if (["True", "False", "None"].includes(part))
              return <span key={i} style={{ color: "#ff79c6" }}>{part}</span>;
            if (["def", "return", "print"].includes(part))
              return <span key={i} style={{ color: "#50fa7b" }}>{part}</span>;
            return <span key={i} style={{ color: "#e6edf3" }}>{part}</span>;
          })}
      </span>
    );
  }
  return <span style={{ color: "#e6edf3" }}>{text}</span>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Hero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [currentTyping, setCurrentTyping] = useState("");
  const [typingIdx, setTypingIdx] = useState(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const runAnimation = async () => {
      await sleep(500);
      for (let i = 0; i < CODE_LINES.length; i++) {
        const line = CODE_LINES[i];
        setTypingIdx(i);
        if (line.type === "blank") {
          setVisibleCount((c) => c + 1);
          setCurrentTyping("");
          await sleep(150);
          continue;
        }
        for (let c = 0; c <= line.text.length; c++) {
          setCurrentTyping(line.text.slice(0, c));
          await sleep(18 + Math.random() * 18);
        }
        setVisibleCount((c) => c + 1);
        setCurrentTyping("");
        await sleep(100);
      }
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.45, ease: "power2.out" }
        );
      }
    };
    runAnimation();
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "32px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#7d8590",
          }}
        >
          <span style={{ color: "#3fb950" }}>portfolio</span>
          <span>/</span>
          <span style={{ color: "#58a6ff" }}>main.py</span>
        </div>

        {/* Code editor */}
        <div
          style={{
            borderRadius: 8,
            overflow: "hidden",
            background: "#0d1117",
            border: "1px solid #30363d",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 14px",
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
                marginLeft: 6,
              }}
            >
              main.py — portfolio
            </span>
          </div>

          {/* Code area */}
          <div style={{ display: "flex", overflowX: "auto" }}>
            {/* Line numbers */}
            <div
              style={{
                userSelect: "none",
                padding: "18px 13px",
                background: "#0d1117",
                borderRight: "1px solid #21262d",
                color: "#484f58",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.82rem",
                lineHeight: "1.72rem",
                minWidth: "2.8rem",
                textAlign: "right",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {Array.from({ length: CODE_LINES.length }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code content */}
            <div
              style={{
                padding: "18px 0 18px 26px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.88rem",
                lineHeight: "1.72rem",
                whiteSpace: "pre",
                flex: 1,
              }}
            >
              {CODE_LINES.slice(0, visibleCount).map((line, i) => (
                <div key={i}>{renderTokens(line.text, line.type)}</div>
              ))}
              {visibleCount < CODE_LINES.length && (
                <div>
                  {renderTokens(currentTyping, CODE_LINES[typingIdx]?.type || "plain")}
                  <span className="cursor" />
                </div>
              )}
              {visibleCount >= CODE_LINES.length && (
                <div><span className="cursor" /></div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 22,
            opacity: 0,
          }}
        >
          <a href="#contact" className="cta-btn">
            <span style={{ color: "#7d8590" }}>$</span> ./hire_me.sh
          </a>
          <a href="#projects" className="cta-btn secondary">
            <span style={{ color: "#7d8590" }}>$</span> python view_projects.py
          </a>
        </div>
      </div>
    </section>
  );
}