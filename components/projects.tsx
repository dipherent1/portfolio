"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Code,
  Linkedin,
} from "lucide-react";
import ProjectCard from "@/components/project-card";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  linkedinUrl?: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Echo — Activity Logger & Analytics",
      description:
        "Echo: An activity logger extension & Next.js platform. It captures browsing metadata, visualizes patterns with focus heatmaps, and uses AI to analyze content, calculating signal-to-noise ratios to distinguish deep work from distractions.",
      techStack: ["Next.js", "MongoDB", "Chrome Extension", "AI"],
      githubUrl: "https://github.com/dipherent1/Echo-platform",
      liveUrl: "https://v0-personal-productivity-tracker-kd.vercel.app/",
      image: "/image/echo.png",
    },
    {
      id: 2,
      title: "SupportHub AI",
      description:
        "AI co-pilot for support agents using Gemini for automated ticket triage and summarization. Features a real-time SPA front-end (Vue.js, Inertia.js), secure multi-tenancy, and high-performance background jobs with Laravel Jobs.",
      techStack: ["Laravel", "Vue.js", "Inertia.js", "Gemini", "Laragents"],
      githubUrl:
        "https://github.com/dipherent1/PHP_learning/tree/main/PHP/phase3/support-hub-ai",
      image: "/image/supporthub-ai-1.jpg",
    },
    {
      id: 3,
      title: "Hyprland AI Assistant",
      description:
        "Native AI desktop assistant for Linux built with Golang and the Flyt framework. Reduces workflow friction for common AI tasks like code generation and image analysis by over 75% by integrating directly with Google's Gemini API for multimodal interactions.",
      techStack: ["Golang", "Flyt", "Linux"],
      githubUrl: "https://github.com/dipherent1/ai_wraper",
      image: "/image/fedora-copilot.jpg",
      linkedinUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7385968582125576192/",
    },
    {
      id: 4,
      title: "Info-Stream: AI-Powered Alert Engine for Telegram",
      description:
        "A production-ready Telegram bot that transforms high-volume chats into a personalized intelligence feed. Features AI-powered semantic search with Gemini & pgvector, a decoupled microservices-style architecture, and a robust data layer using SQLAlchemy and the Unit of Work pattern.",
      techStack: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "pgvector",
        "SQLAlchemy",
        "Telethon",
        "AWS",
        "Sentry",
      ],
      githubUrl: "https://github.com/dipherent1/Tg_wrapper",
      image: "/image/info-image-1.jpg",
    },
    {
      id: 5,
      title: "Kesbekes 2.0",
      description:
        "Real-time Telegram Bot with Redis, Go, and AI filtering capabilities for content moderation and user interaction.",
      techStack: ["Go", "Redis", "Telegram API", "AI", "Docker"],
      githubUrl: "https://github.com/dipherent1/Kesbekes-2.0",
    },
    {
      id: 6,
      title: "Smart Bike Rack",
      description:
        "IoT system with ESP32 and Python backend for monitoring and managing bike racks with real-time status updates.",
      techStack: ["ESP32", "Python", "MQTT", "MongoDB", "React"],
      githubUrl: "https://github.com/IETP-Project-Smart-Bike-Rack/Smart-Rack",
      liveUrl: "https://sites.google.com/view/smartbikerack/description",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + projectsPerPage >= projects.length
        ? 0
        : prevIndex + projectsPerPage,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - projectsPerPage < 0
        ? Math.max(0, projects.length - projectsPerPage)
        : prevIndex - projectsPerPage,
    );
  };

  const currentProjects = projects.slice(
    currentIndex,
    Math.min(currentIndex + projectsPerPage, projects.length),
  );

  return (
    <Container>
      <SectionHeading
        title="Projects"
        subtitle="A showcase of my recent work and technical capabilities"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            technologies={project.techStack}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            imageSrc={project.image || ""}
            linkedinUrl={project.linkedinUrl}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 hover-glow"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 hover-glow"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </Container>
  );
}
