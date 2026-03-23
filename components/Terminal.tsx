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
}

export default function Terminal({ lines, title = "bash", animate = true, className = "" }: TerminalProps) {
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
          <span style={{ color: "#3fb950" }}>$</span>
          <span style={{ color: "#e6edf3" }}>{line.text}</span>
        </div>
      );
    }
    return (
      <div key={i} style={{ color: "#58a6ff", paddingLeft: "12px" }}>
        {line.text}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: "#f85149" }} />
        <span className="terminal-dot" style={{ background: "#d29922" }} />
        <span className="terminal-dot" style={{ background: "#3fb950" }} />
        <span className="font-mono text-xs ml-2" style={{ color: "#7d8590" }}>
          {title}
        </span>
      </div>
      <div className="terminal-body">
        {visibleLines.map((line, i) => renderLine(line, i))}
        {currentText && (
          <div className="flex items-start gap-1">
            <span style={{ color: "#3fb950" }}>$</span>
            <span style={{ color: "#e6edf3" }}>
              {currentText}
              <span className="cursor" />
            </span>
          </div>
        )}
        {!currentText && showCursor && (
          <div className="flex items-start gap-1">
            <span style={{ color: "#3fb950" }}>$</span>
            <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
