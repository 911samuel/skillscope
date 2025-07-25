import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillScope - Smart Skill Profiler",
  description:
    "Know Your Strengths, Unlock New Opportunities. A modern AI-powered web application that analyzes user skill profiles and suggests new areas to explore.",
  keywords:
    "skills, AI, career development, professional growth, skill assessment",
  authors: [{ name: "SkillScope Team" }],
  openGraph: {
    title: "SkillScope - Smart Skill Profiler",
    description: "Know Your Strengths, Unlock New Opportunities",
    type: "website",
  },
  creator: "Samuel ABAYIZERA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
