import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anjal Dev VK — Python & Django Engineer",
  description:
    "Portfolio of Anjal Dev VK — a Python and Django backend engineer based in Kerala, India. Building clean APIs, scalable systems, and beautiful software.",
  keywords: ["Python", "Django", "DRF", "Backend Developer", "Kerala", "India"],
  openGraph: {
    title: "Anjal Dev VK — Python & Django Engineer",
    description:
      "Portfolio of Anjal Dev VK — Python and Django backend engineer based in Kerala, India.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
