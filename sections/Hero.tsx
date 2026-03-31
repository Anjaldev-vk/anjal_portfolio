"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const CODE_LINES = [
  { text: "# ─────────────────────────────────────────", type: "comment" },
  { text: "# Software Developer  — Anjal Dev VK", type: "comment" },
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

function renderTokens(text: string, type: string, theme: "dark" | "light") {
  const colors = {
    keyword: "var(--syntax-keyword)",
    string: "var(--syntax-string)",
    comment: "var(--syntax-comment)",
    fn: "var(--syntax-fn)",
    type: "var(--syntax-type)",
    var: "var(--syntax-var)",
    plain: "var(--text)",
    punct: "var(--syntax-punct)",
  };

  if (type === "comment") return <span style={{ color: colors.comment, fontStyle: "italic" }}>{text}</span>;
  if (type === "blank") return <span>&nbsp;</span>;
  
  if (type === "keyword" || type === "def" || type === "string") {
    return (
      <span>
        {text.split(/("(?:[^"\\]|\\.)*"|True|False|None|def|return|print|class|self|[(]|[)]|[:]|[,]|\[|\])/g).map((part, i) => {
          if (/^"(?:[^"\\]|\\.)*"$/.test(part)) return <span key={i} style={{ color: colors.string }}>{part}</span>;
          if (/^(def|return|print|class|self|if|else|for|while|import|from|as)$/.test(part)) return <span key={i} style={{ color: colors.keyword }}>{part}</span>;
          if (/^(True|False|None)$/.test(part)) return <span key={i} style={{ color: colors.keyword }}>{part}</span>;
          if (/^[(]|[)]|[:]|[,]|\[|\]$/.test(part)) return <span key={i} style={{ color: colors.punct }}>{part}</span>;
          if (type === "def" && !/^\s+$/.test(part) && !/^(def|self)$/.test(part)) {
             const fnMatch = part.match(/^(\w+)/);
             if (fnMatch) return <span key={i} style={{ color: colors.fn }}>{part}</span>;
          }
          if (type === "keyword" && part === "BackendDeveloper") return <span key={i} style={{ color: colors.type }}>{part}</span>;
          return <span key={i} style={{ color: colors.plain }}>{part}</span>;
        })}
      </span>
    );
  }

  return <span style={{ color: colors.plain }}>{text}</span>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Hero({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const colors = {
    background: "var(--editor-bg)",
    border: "var(--border)",
    titleBar: isDark ? "#161b22" : "#efefef",
    textMuted: "var(--muted)",
    lineNumbers: "var(--line-number-bg)",
    lineNumberText: "var(--muted)",
  };
  const [visibleCount, setVisibleCount] = useState(0);
  const [currentTyping, setCurrentTyping] = useState("");
  const [typingIdx, setTypingIdx] = useState(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const runAnimation = async () => {
      await sleep(300);
      for (let i = 0; i < CODE_LINES.length; i++) {
        const line = CODE_LINES[i];
        setTypingIdx(i);
        if (line.type === "blank") {
          setVisibleCount((c) => c + 1);
          setCurrentTyping("");
          await sleep(50);
          continue;
        }

        if (line.type === "comment") {
          setCurrentTyping(line.text);
          setVisibleCount((c) => c + 1);
          setCurrentTyping("");
          await sleep(30);
          continue;
        }

        for (let c = 0; c <= line.text.length; c++) {
          setCurrentTyping(line.text.slice(0, c));
          await sleep(5 + Math.random() * 5); // Fastest typing
          if (c > 20 && c % 10 === 0) await sleep(5);
        }
        setVisibleCount((c) => c + 1);
        setCurrentTyping("");
        await sleep(40);
      }
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
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
        padding: "80px 0",
        boxSizing: "border-box",
      }}
    >
      <div className="section-container" style={{ maxWidth: "1000px" }}>
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

        {/* Code editor container */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            background: colors.background,
            border: `1px solid ${colors.border}`,
            boxShadow: isDark ? "0 16px 64px rgba(0,0,0,0.6)" : "0 12px 32px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          {!isDark && (
            <div 
              style={{
                position: "absolute",
                left: 0,
                top: 40,
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
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              background: colors.titleBar,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.75rem",
                color: "#7d8590",
                marginLeft: 8,
              }}
            >
              main.py — portfolio
            </span>
          </div>

          {/* Code area with embedded image */}
          <div style={{ display: "flex", position: "relative", minHeight: "450px" }}>
            {/* Line numbers */}
            <div
              style={{
                userSelect: "none",
                padding: "20px 14px",
                background: colors.lineNumbers,
                borderRight: `1px solid ${colors.border}`,
                color: colors.lineNumberText,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.82rem",
                lineHeight: "1.82rem",
                minWidth: "3rem",
                textAlign: "right",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code content */}
            <div
              className="code-block-font hero-code-area"
              style={{
                padding: "20px 0 20px 30px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.92rem",
                lineHeight: "1.82rem",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                flex: 1,
                position: "relative"
              }}
            >
              <div style={{ position: "relative", zIndex: 2 }}>
                {/* Part 1: Top of code (Lines 1-3 Comments) */}
                {CODE_LINES.slice(0, Math.min(visibleCount, 3)).map((line, i) => (
                  <div key={i}>{renderTokens(line.text, line.type, theme)}</div>
                ))}

                {/* Mobile-only inline photo - Now placed AFTER lines 1-3 */}
                {visibleCount > 3 && (
                  <div 
                    className="hero-image-mobile"
                    style={{
                      margin: "24px 0",
                      width: "100%",
                      maxWidth: "240px", 
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: `1px solid ${colors.border}`,
                      display: "none",
                      boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img src="/hero-profile.jpeg" alt="Anjal Dev V K" style={{ width: "100%", height: "auto" }} />
                  </div>
                )}

                {/* Part 2: Remaining lines */}
                {visibleCount > 3 && CODE_LINES.slice(3, visibleCount).map((line, i) => (
                  <div key={i + 3}>{renderTokens(line.text, line.type, theme)}</div>
                ))}

                {visibleCount < CODE_LINES.length && (
                  <div>
                    {renderTokens(currentTyping, CODE_LINES[typingIdx]?.type || "plain", theme)}
                    <span className="cursor" />
                  </div>
                )}
                {visibleCount >= CODE_LINES.length && (
                  <div><span className="cursor" /></div>
                )}
              </div>

              {/* Desktop-only Embedded Image (Floating) */}
              <div 
                className="hero-image-desktop"
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "50%",
                  transform: visibleCount > 5 ? "translateY(-50%)" : "translateY(-40%)",
                  width: "280px", 
                  height: "360px", 
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `1px solid ${colors.border}`,
                  boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.7)" : "0 15px 30px rgba(0,0,0,0.15)",
                  zIndex: 1,
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease",
                  opacity: visibleCount > 5 ? 1 : 0, 
                }}
              >
                <img 
                  src="/hero-profile.jpeg" 
                  alt="Anjal Dev V K"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
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
            marginTop: 32,
            opacity: 0,
          }}
        >
          <a href="#contact" className="cta-btn">
            <span style={{ color: "#7d8590" }}>$</span> ./hire_me.sh
          </a>
          <a href="#projects" className="cta-btn secondary">
            <span style={{ color: "#7d8590" }}>$</span> python view_projects.py
          </a>
          <a href="/Anjal_Dev_Resume.pdf" download className="cta-btn secondary">
            <span style={{ color: "#7d8590" }}>$</span> cat Anjal_Dev_Resume.pdf
          </a>
        </div>
      </div>
    </section>
  );
}