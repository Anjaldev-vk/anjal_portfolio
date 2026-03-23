"use client";
import { useState } from "react";

const CONTACT_INFO = [
  {
    key: "email",
    label: "email",
    value: '"mkmanjal@gmail.com"',
    display: "mkmanjal@gmail.com",
    link: "mailto:mkmanjal@gmail.com",
    color: "#3fb950",
  },
  {
    key: "phone",
    label: "phone",
    value: '"+91 9946051136"',
    display: "+91 9946051136",
    link: "tel:+919946051136",
    color: "#58a6ff",
  },
  {
    key: "github",
    label: "github",
    value: '"github.com/Anjaldev-vk"',
    display: "github.com/Anjaldev-vk",
    link: "https://github.com/Anjaldev-vk",
    color: "#a371f7",
  },
  {
    key: "linkedin",
    label: "linkedin",
    value: '"linkedin.com/in/anjaldev-vk"',
    display: "linkedin.com/in/anjaldev-vk",
    link: "https://www.linkedin.com/in/anjaldev-vk",
    color: "#d29922",
  },
];

const CODE_LINE_COUNT = 14;

export default function Contact({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const colors = {
    background: "var(--background)",
    border: "var(--border)",
    titleBar: isDark ? "#161b22" : "#efefef",
    text: "var(--text)",
    textMuted: "var(--muted)",
    editorBg: "var(--editor-bg)",
    lineNumberBg: "var(--line-number-bg)",
  };
  const [hovered, setHovered] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("mkmanjal@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
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
              whiteSpace: "nowrap",
            }}
          >
            contact.py
          </span>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
        </div>

        {/* Code editor */}
        <div
          style={{
            borderRadius: 8,
            overflow: "hidden",
            background: colors.editorBg,
            border: `1px solid ${colors.border}`,
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.05)",
            marginBottom: 20,
            position: "relative",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 14px",
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
                color: colors.textMuted,
                marginLeft: 6,
              }}
            >
              contact.py
            </span>
          </div>

          {/* Light Mode Cell Marker */}
          {!isDark && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 32,
                bottom: 0,
                width: 5,
                background: "var(--cell-marker)",
                zIndex: 10,
                borderRadius: "0 2px 2px 0",
              }}
            />
          )}

          {/* Code area */}
          <div style={{ display: "flex" }}>
            {/* Line numbers */}
            <div
              style={{
                userSelect: "none",
                padding: "20px 13px",
                background: colors.lineNumberBg,
                borderRight: `1px solid ${colors.border}`,
                color: colors.textMuted,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.82rem",
                lineHeight: "1.85rem",
                minWidth: "2.8rem",
                textAlign: "right",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {Array.from({ length: CODE_LINE_COUNT }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code content */}
            <div
              style={{
                padding: "20px 0 20px 26px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.88rem",
                lineHeight: "1.85rem",
                flex: 1,
              }}
            >
              <div style={{ color: "var(--syntax-comment)", fontStyle: "italic" }}># Want to work together?</div>
              <div>&nbsp;</div>
              <div>
                <span style={{ color: "var(--syntax-keyword)" }}>import</span>
                <span style={{ color: colors.text }}> webbrowser</span>
              </div>
              <div>&nbsp;</div>
              <div>
                <span style={{ color: "var(--syntax-keyword)" }}>def</span>
                <span style={{ color: "var(--syntax-fn)" }}> reach_out</span>
                <span style={{ color: "var(--syntax-punct)" }}>():</span>
              </div>

              {CONTACT_INFO.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingLeft: 20,
                    paddingRight: 16,
                    background: hovered === item.key ? `${item.color}0d` : "transparent",
                    borderRadius: 3,
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHovered(item.key)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => item.link && window.open(item.link, "_blank")}
                >
                  <span className="contact-label" style={{ color: "var(--syntax-var)" }}>{item.label}</span>
                  <span style={{ color: "var(--syntax-operator)" }}> = </span>
                  <span
                    className="contact-value"
                    style={{
                      color: item.color,
                      textDecoration: "underline",
                      textDecorationColor: `${item.color}55`,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}

              <div>&nbsp;</div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: "var(--syntax-keyword)" }}>return </span>
                <span style={{ color: "var(--syntax-string)" }}>"Let&apos;s build something great 🚀"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <button onClick={copyEmail} className="cta-btn">
            {copied ? "  Copied!" : "  Copy Email"}
          </button>
          <a
            href="https://github.com/Anjaldev-vk"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn secondary"
          >
            GitHub Profile
          </a>
          <a
            href="https://www.linkedin.com/in/anjaldev-vk"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
            style={{ borderColor: "#a371f7", color: "#a371f7" }}
          >
            LinkedIn
          </a>
        </div>

        {/* Availability banner */}
        <div
          style={{
            borderRadius: 8,
            padding: "14px 20px",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.82rem",
            textAlign: "center" as const,
            background: "rgba(63, 185, 80, 0.06)",
            border: "1px solid rgba(63, 185, 80, 0.25)",
          }}
        >
          <span style={{ color: "#3fb950" }}>●</span>
          <span style={{ color: colors.text, marginLeft: 8 }}>
            Currently{" "}
            <span style={{ color: "#3fb950", fontWeight: 600 }}>available</span>{" "}
            for freelance and full-time remote opportunities
          </span>
        </div>
      </div>
    </section>
  );
}