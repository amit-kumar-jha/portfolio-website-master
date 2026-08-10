import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amit Jha — Full Stack Engineer & AI Application Developer",
  description:
    "Full Stack Engineer with 5+ years building production-grade AI-powered applications, enterprise SaaS platforms, and scalable cloud infrastructure. Expert in React, Next.js, Node.js, TypeScript, OpenAI, and AWS.",
  keywords: [
    "Full Stack Engineer",
    "AI Application Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "OpenAI",
    "AI Agent Builder",
    "SaaS",
    "AWS",
    "Portfolio",
  ],
  authors: [{ name: "Amit Jha" }],
  openGraph: {
    title: "Amit Jha — Full Stack Engineer & AI Application Developer",
    description:
      "Building production-grade AI systems, enterprise SaaS, and scalable cloud infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Jha — Full Stack Engineer & AI Application Developer",
    description:
      "Building production-grade AI systems, enterprise SaaS, and scalable cloud infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans noise-overlay">{children}</body>
    </html>
  );
}
