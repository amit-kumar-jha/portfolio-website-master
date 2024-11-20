import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import chatty from "@/public/chatty.png";
import vericapDb from "@/public/vericapDb.png";
import resumeBuilder from "@/public/resumeBuilder.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "ReactJS Developer",
    location: "Ahmedabad,Gujarat",
    description:
      "Engineered and refined intricate React components for extensive web applications, significantly enhancing user experience through intuitive designs.",
    icon: React.createElement(CgWorkAlt),
    date: "Nov,2021 - May,2023",
  },
  {
    title: "Front-End Engineer",
    location: "Bengaluru, Karnataka",
    description:
      "Created and implemented visually striking and adaptive user interfaces through the extensive use of Material Ul components, streamlining design and component development processes.",
    icon: React.createElement(CgWorkAlt),
    date: "May,2023 - June,2024",
  },
] as const;

export const projectsData = [
  {
    title: "Vericap",
    description:
      "I worked as a Frontend Engineer at Vericap, where I contributed to building tools and infrastructure that empower investors to source, screen, and manage carbon investments.",
    tags: ["React", "TypeScript", "Next.js", "Material UI", "React Query"],
    imageUrl: vericapDb,
  },
  {
    title: "Chatty (Chat App)",
    description:
      "This application provides real-time messaging capabilities with emoji support, user authentication, and more. It's built with Next.js, React, and several other modern libraries.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Pusher", "Next Auth"],
    imageUrl: chatty,
  },
  {
    title: "Resume Builder",
    description:
      "A public web app for creating Resume. It has number of templates and form to create a good ATS verified resume.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer", "ThreeJS"],
    imageUrl: resumeBuilder,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Redux",
  "Redux Saga",
  "React Query",
  "Material UI",
  "Bootstrap",
  "Framer Motion",
  "ThreeJs",
] as const;
