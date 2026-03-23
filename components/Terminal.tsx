"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface TerminalLine {
  type: "command" | "output" | "blank";
  text: string;
}

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  animate?: boolean;
  className?: string;
  theme: "dark" | "light";
}

export default function Terminal({ lines, title = "bash", animate = true, className = "", theme }: TerminalProps) {
  const isDark = theme === "dark";
  const colors = {
    background: isDark ? "#0d1117" : "#f6f8fa",
    border: isDark ? "#30363d" : "#e1e4e8",
    header: isDark ? "#161b22" : "#eeeeee",
    textCommand: isDark ? "#3fb950" : "#22863a",
    textOutput: isDark ? "#58a6ff" : "#005cc5",
    textPlain: isDark ? "#e6edf3" : "#24292e",
    textMuted: isDark ? "#7d8590" : "#6a737d",
  };
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateLines();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animateLines = async () => {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.type === "blank") {
        setVisibleLines((prev) => [...prev, line]);
        await sleep(200);
        continue;
      }
      if (line.type === "command") {
        setShowCursor(true);
        // Type out character by character
        for (let c = 0; c <= line.text.length; c++) {
          setCurrentText(line.text.slice(0, c));
          await sleep(35 + Math.random() * 30);
        }
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText("");
        await sleep(300);
      } else {
        // output line - just appear
        await sleep(100);
        setVisibleLines((prev) => [...prev, line]);
      }
    }
    setShowCursor(false);
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const renderLine = (line: TerminalLine, i: number) => {
    if (line.type === "blank") return <div key={i} className="h-3" />;
    if (line.type === "command") {
      return (
        <div key={i} className="flex items-start gap-1">
          <span style={{ color: colors.textCommand }}>$</span>
          <span style={{ color: colors.textPlain }}>{line.text}</span>
        </div>
      );
    }
    return (
      <div key={i} style={{ color: colors.textOutput, paddingLeft: "12px" }}>
        {line.text}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`terminal-window ${className}`} style={{ background: colors.background, border: `1px solid ${colors.border}` }}>
      <div className="terminal-header" style={{ background: colors.header, borderBottom: `1px solid ${colors.border}` }}>
        <span className="terminal-dot" style={{ background: "#f85149" }} />
        <span className="terminal-dot" style={{ background: "#d29922" }} />
        <span className="terminal-dot" style={{ background: "#3fb950" }} />
        <span className="font-mono text-xs ml-2" style={{ color: colors.textMuted }}>
          {title}
        </span>
      </div>
      <div className="terminal-body" style={{ background: colors.background }}>
        {visibleLines.map((line, i) => renderLine(line, i))}
        {currentText && (
          <div className="flex items-start gap-1">
            <span style={{ color: colors.textCommand }}>$</span>
            <span style={{ color: colors.textPlain }}>
              {currentText}
              <span className="cursor" />
            </span>
          </div>
        )}
        {!currentText && showCursor && (
          <div className="flex items-start gap-1">
            <span style={{ color: colors.textCommand }}>$</span>
            <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
