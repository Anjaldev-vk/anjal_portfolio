"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

const CODE_SAMPLES = [
  {
    language: "python",
    code: `def calculate_wpm(chars, time_sec):
    if time_sec == 0:
        return 0
    minutes = time_sec / 60
    words = chars / 5
    return round(words / minutes)

def typing_game():
    print("Welcome to the Typing Test!")
    # Start typing now...`,
  },
  {
    language: "python",
    code: `class TypingTest:
    def __init__(self, text):
        self.text = text
        self.start_time = None
        self.end_time = None

    def start(self):
        self.start_time = time.time()

    def stop(self):
        self.end_time = time.time()
        return self.calculate_metrics()`,
  },
  {
    language: "python",
    code: `import random
import time

def get_snippet():
    snippets = [
        "print('Hello, Python!')",
        "x = [i for i in range(10)]",
        "y = list(filter(lambda x: x > 5, x))"
    ]
    return random.choice(snippets)

if __name__ == "__main__":
    snippet = get_snippet()
    print(f"Type this: {snippet}")`,
  }
];

export default function TypingTest() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  
  const targetCode = CODE_SAMPLES[sampleIndex].code;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetGame = useCallback(() => {
    setUserInput("");
    setStartTime(null);
    setNow(null);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setSampleIndex((prev) => (prev + 1) % CODE_SAMPLES.length);
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (startTime && !isFinished) {
      const interval = setInterval(() => {
        setNow(Date.now());
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, isFinished]);

  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length === targetCode.length && userInput.length > 0) {
      setIsFinished(true);
    }

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetCode[i]) correct++;
    }
    setAccuracy(userInput.length > 0 ? Math.floor((correct / userInput.length) * 100) : 100);

    // Calculate WPM
    if (startTime && now) {
      const timeSec = (now - startTime) / 1000;
      if (timeSec > 0) {
        const words = userInput.length / 5;
        const minutes = timeSec / 60;
        setWpm(Math.round(words / minutes));
      }
    }
  }, [userInput, targetCode, startTime, now]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isFinished) return;
    
    // Handle Enter key for new lines
    if (e.key === "Enter") {
        // Find next target char
        const nextChar = targetCode[userInput.length];
        if (nextChar === "\n") {
            setUserInput(prev => prev + "\n");
        }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;
    const value = e.target.value;
    
    // Only allow typing if it matches the length (no pasting or skipping)
    // Actually, let's just use the value directly for simplicity, but we'll show errors
    setUserInput(value);
  };

  return (
    <section
      id="typing-test"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderTop: "1px solid #30363d",
        padding: "64px 0",
        boxSizing: "border-box",
        background: "#0d1117",
      }}
    >
      <div className="section-container" ref={containerRef}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#e6edf3",
              whiteSpace: "nowrap",
            }}
          >
            typing_test.py
          </span>
          <div style={{ flex: 1, height: 1, background: "#30363d" }} />
          <button 
            onClick={resetGame}
            className="cta-btn secondary"
            style={{ padding: "6px 16px", fontSize: "0.8rem" }}
          >
            Reset Test
          </button>
        </div>

        {/* Game Container */}
        <div
          style={{
            position: "relative",
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "8px",
            padding: "24px",
            minHeight: "300px",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            cursor: "text",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Hidden Input */}
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
            }}
            autoFocus
          />

          {/* Code Display */}
          <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", color: "#6e7681" }}>
            {targetCode.split("").map((char, index) => {
              let color = "#6e7681";
              let background = "transparent";
              const isTyped = index < userInput.length;
              const isCurrent = index === userInput.length;

              if (isTyped) {
                const isCorrect = userInput[index] === char;
                color = isCorrect ? "#3fb950" : "#f85149";
                background = isCorrect ? "transparent" : "#f8514922";
              }

              return (
                <span
                  key={index}
                  style={{
                    color,
                    background,
                    borderBottom: isCurrent ? "2px solid #58a6ff" : "none",
                    transition: "all 0.1s ease",
                  } as any}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Finished Overlay */}
          {isFinished && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(13, 17, 23, 0.9)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                zIndex: 10,
                animation: "fadeIn 0.5s ease forwards",
              }}
            >
              <h3 style={{ color: "#3fb950", fontSize: "1.5rem", margin: 0 }}>Test Complete!</h3>
              <div style={{ display: "flex", gap: 32 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{wpm}</div>
                  <div style={{ fontSize: "0.8rem", color: "#8b949e" }}>WPM</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{accuracy}%</div>
                  <div style={{ fontSize: "0.8rem", color: "#8b949e" }}>Accuracy</div>
                </div>
              </div>
              <button 
                onClick={resetGame}
                className="cta-btn"
                style={{ padding: "10px 24px" }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 20,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.9rem",
            color: "#8b949e",
          }}
        >
          <div>
            Time: <span style={{ color: "#e6edf3" }}>{startTime && now ? ((now - startTime) / 1000).toFixed(1) : "0.0"}s</span>
          </div>
          <div>
            WPM: <span style={{ color: "#58a6ff" }}>{wpm}</span>
          </div>
          <div>
            Accuracy: <span style={{ color: accuracy < 90 ? "#f85149" : "#3fb950" }}>{accuracy}%</span>
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            marginTop: 40,
            padding: "16px",
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "6px",
            fontSize: "0.85rem",
            color: "#8b949e",
            fontStyle: "italic",
          }}
        >
          # Instruction: Click inside the dark area and start typing to begin the test. 
          The timer starts on your first keypress. Try to match the code exactly!
        </div>
      </div>
    </section>
  );
}
