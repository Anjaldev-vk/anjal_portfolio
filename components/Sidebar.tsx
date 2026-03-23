"use client";

interface SidebarItem {
  name: string;
  sectionId: string;
  indent?: number;
  isFolder?: boolean;
  expanded?: boolean;
}

const TREE: SidebarItem[] = [
  { name: "portfolio", sectionId: "hero", isFolder: true, expanded: true },
  { name: "main.py", sectionId: "hero", indent: 1 },
  { name: "about.py", sectionId: "about", indent: 1 },
  { name: "skills.py", sectionId: "skills", indent: 1 },
  { name: "projects", sectionId: "projects", indent: 1, isFolder: true, expanded: true },
  { name: "pocket_planner.py", sectionId: "projects", indent: 2 },
  { name: "shopco_ecommerce.py", sectionId: "projects", indent: 2 },
  // { name: "task_manager.py", sectionId: "projects", indent: 2 },
  // { name: "blog_cms.py", sectionId: "projects", indent: 2 },
  { name: "contact.py", sectionId: "contact", indent: 1 },
  { name: "Anjal_Dev_Resume.pdf", sectionId: "resume", indent: 1 },
];

// File icon colors matching VS Code
const pyIcon = (
  <svg width="14" height="14" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <path d="M15.9 3C9.4 3 9.8 5.8 9.8 5.8V9h6.3v1H6.5S3 9.7 3 16.2s3 6.5 3 6.5H8v-3.1S7.9 16 11 16H22s2.8 0 2.8-2.8V8.8S25.3 3 15.9 3z" fill="#3572A5"/>
    <path d="M16 29c6.5 0 6.1-2.8 6.1-2.8V23h-6.3v-1h9.6S29 22.3 29 15.8s-3-6.5-3-6.5H24v3.1S24.1 16 21 16H10s-2.8 0-2.8 2.8v4.4S6.7 29 16 29z" fill="#FFD43B"/>
    <circle cx="13" cy="7" r="1.5" fill="#fff"/>
    <circle cx="19" cy="25" r="1.5" fill="#3572A5"/>
  </svg>
);

const folderClosedIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M1 3.5C1 2.67 1.67 2 2.5 2H6l1.5 2H13.5C14.33 4 15 4.67 15 5.5V12.5C15 13.33 14.33 14 13.5 14H2.5C1.67 14 1 13.33 1 12.5V3.5z" fill="#e8ab53"/>
  </svg>
);

const folderOpenIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M1 3.5C1 2.67 1.67 2 2.5 2H6l1.5 2H13.5C14.33 4 15 4.67 15 5.5V6H2L1 9V3.5z" fill="#dcb67a"/>
    <path d="M1 7h14L13 13H1L2.5 7z" fill="#e8ab53"/>
  </svg>
);

const chevronDown = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M7.976 10.072l-4.357-4.357.62-.618L7.976 8.853l3.737-3.756.62.618z"/>
  </svg>
);

const chevronRight = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M10.072 8.024L5.715 3.667l.618-.62L10.72 8.024l-4.387 4.977-.618-.62z"/>
  </svg>
);

const pdfIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" fill="#FF4F4F"/>
    <path d="M14 2v6h6" fill="#FF4F4F" opacity="0.3"/>
    <text x="7" y="18" fill="white" style={{ fontSize: "6px", fontWeight: "bold", fontFamily: "sans-serif" }}>PDF</text>
  </svg>
);

interface SidebarProps {
  activeSection: string;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.name === "Anjal_Dev_Resume.pdf") {
      const link = document.createElement("a");
      link.href = "/Anjal_Dev_Resume.pdf";
      link.download = "Anjal_Dev_VK_Anjal_Dev_Resume.pdf";
      link.click();
      return;
    }
    scrollTo(item.sectionId);
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        paddingTop: 4,
      }}
    >
      {TREE.map((item, i) => {
        const isActive = activeSection === item.sectionId && !item.isFolder && item.indent === 1 && item.name === `${activeSection}.py` || (activeSection === item.sectionId && !item.isFolder);
        const depth = item.indent ?? 0;

        return (
          <div
            key={i}
            onClick={() => handleItemClick(item)}
            style={{
              height: 22,
              display: "flex",
              alignItems: "center",
              paddingLeft: `${depth * 12 + 4}px`,
              gap: 4,
              cursor: "pointer",
              background: isActive ? "#37373d" : "transparent",
              color: isActive ? "#ffffff" : "#cccccc",
              fontSize: "13px",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              position: "relative",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.background = "#2a2d2e";
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Active indicator */}
            {isActive && (
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "#007acc" }} />
            )}

            {/* Chevron for folders */}
            <span style={{ color: "#cccccc", opacity: 0.7, width: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.isFolder ? (item.expanded ? chevronDown : chevronRight) : <span style={{ width: 12 }} />}
            </span>

            {/* Icon */}
            {item.isFolder ? (item.expanded ? folderOpenIcon : folderClosedIcon) : (item.name.endsWith(".pdf") ? pdfIcon : pyIcon)}

            {/* Name */}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", fontSize: "13px" }}>
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
