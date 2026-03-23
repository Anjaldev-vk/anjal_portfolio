"use client";

const TABS = [
  { name: "main.py", sectionId: "hero" },
  { name: "about.py", sectionId: "about" },
  { name: "skills.py", sectionId: "skills" },
  { name: "projects", sectionId: "projects" },
  { name: "typing_test.py", sectionId: "typing-test" },
  { name: "contact.py", sectionId: "contact" },
];

// Python file icon (small, inline)
const PyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <path d="M15.9 3C9.4 3 9.8 5.8 9.8 5.8V9h6.3v1H6.5S3 9.7 3 16.2s3 6.5 3 6.5H8v-3.1S7.9 16 11 16H22s2.8 0 2.8-2.8V8.8S25.3 3 15.9 3z" fill="#3572A5"/>
    <path d="M16 29c6.5 0 6.1-2.8 6.1-2.8V23h-6.3v-1h9.6S29 22.3 29 15.8s-3-6.5-3-6.5H24v3.1S24.1 16 21 16H10s-2.8 0-2.8 2.8v4.4S6.7 29 16 29z" fill="#FFD43B"/>
    <circle cx="13" cy="7" r="1.5" fill="#fff"/>
    <circle cx="19" cy="25" r="1.5" fill="#3572A5"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M1 3.5C1 2.67 1.67 2 2.5 2H6l1.5 2H13.5C14.33 4 15 4.67 15 5.5V6H2L1 9V3.5z" fill="#dcb67a"/>
    <path d="M1 7h14L13 13H1L2.5 7z" fill="#e8ab53"/>
  </svg>
);

interface TabBarProps {
  activeSection: string;
}

export default function TabBar({ activeSection }: TabBarProps) {
  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isFolder = (tab: typeof TABS[number]) => !tab.name.endsWith(".py");

  return (
    <div
      className="tab-bar-container"
      style={{
        height: 35,
        background: "#2d2d30",
        display: "flex",
        alignItems: "stretch",
        overflowX: "auto",
        overflowY: "hidden",
        borderBottom: "1px solid #252526",
        flexShrink: 0,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeSection === tab.sectionId;
        return (
          <div
            key={tab.sectionId}
            onClick={() => scrollTo(tab.sectionId)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 20px 0 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontSize: "13px",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              borderRight: "1px solid #252526",
              position: "relative",

              // Active vs inactive
              background: isActive ? "#1e1e1e" : "#2d2d30",
              color: isActive ? "#ffffff" : "#969696",
              borderTop: isActive ? "1px solid #007acc" : "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = "#cccccc";
                (e.currentTarget as HTMLElement).style.background = "#333333";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = "#969696";
                (e.currentTarget as HTMLElement).style.background = "#2d2d30";
              }
            }}
          >
            {isFolder(tab) ? <FolderIcon /> : <PyIcon />}
            <span>{tab.name}</span>

            {/* Close button */}
            <span
              style={{
                position: "absolute",
                right: 4,
                top: "50%",
                transform: "translateY(-50%)",
                width: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                fontSize: "14px",
                color: isActive ? "#858585" : "transparent",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#cccccc";
                (e.currentTarget as HTMLElement).style.background = "#5c5c5c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = isActive ? "#858585" : "transparent";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
              onClick={(e) => e.stopPropagation()}
            >
              ×
            </span>
          </div>
        );
      })}
    </div>
  );
}
