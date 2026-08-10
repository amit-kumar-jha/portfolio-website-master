"use client";

import dynamic from "next/dynamic";

// Layout components
const SmoothScroll = dynamic(
  () => import("@/components/layout/SmoothScroll"),
  { ssr: false }
);
const Navigation = dynamic(
  () => import("@/components/layout/Navigation"),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  { ssr: false }
);
const PageLoader = dynamic(
  () => import("@/components/layout/PageLoader"),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/layout/Footer"),
  { ssr: false }
);

// Section components
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import AIEngineering from "@/components/sections/AIEngineering";
import Architecture from "@/components/sections/Architecture";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <PageLoader />
      <CustomCursor />
      <Navigation />

      <main>
        <Hero />
        <About />
        <Stats />
        <Experience />
        <Projects />
        <Skills />
        <AIEngineering />
        <Architecture />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
