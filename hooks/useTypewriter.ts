"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function useTypewriter(
  lines: string[],
  startDelay: number = 0,
  charDelay: number = 0.03,
  lineDelay: number = 0.4
) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!lines.length) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: startDelay });
      lines.forEach((line, i) => {
        // Add the line (empty initially)
        tl.call(() => setDisplayedLines((prev) => [...prev, ""]));
        // Type it out char by char
        const chars = line.split("");
        chars.forEach((_, ci) => {
          tl.call(
            () => {
              setDisplayedLines((prev) => {
                const next = [...prev];
                next[i] = line.slice(0, ci + 1);
                return next;
              });
            },
            [],
            `>=${lineDelay * i + charDelay * ci}`
          );
        });
      });
      tl.call(() => setDone(true));
    });
    return () => ctx.revert();
  }, []);

  return { displayedLines, done };
}
