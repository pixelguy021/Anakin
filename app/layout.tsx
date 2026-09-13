import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anakin — Multilingual Locale Grounding Agent",
  description:
    "AI Agent for UC-2: Source authentic in-market phrasing at scale across 242 languages. Browse live regional content, reason through multi-step locale tasks, and power language_expansion's localize mode.",
  keywords: [
    "multilingual AI",
    "locale grounding",
    "language expansion",
    "NLP",
    "Southeast Asia AI",
    "translationese",
    "AI agent",
  ],
  openGraph: {
    title: "Anakin — Multilingual Locale Grounding Agent",
    description:
      "Authentic in-market phrasing across 242 languages. Not translation — real web-sourced locale text.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
