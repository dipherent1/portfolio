import type React from "react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import { Code, Brain, Server } from "lucide-react"

interface TimelineItemProps {
  title: string
  company: string
  period: string
  description: string
  icon: React.ReactNode
}

function TimelineItem({ title, company, period, description, icon }: TimelineItemProps) {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-deep-blue/30 to-terminal-green/30 border border-terminal-green/30 hover:shadow-[0_0_15px_rgba(0,255,173,0.5)] transition-all">
          {icon}
        </div>
        <div className="w-px h-full bg-gradient-to-b from-terminal-green to-transparent"></div>
      </div>
      <GlassCard className="flex-1 mb-8 transition-all duration-300 hover:translate-x-2 depth-card">
        <div className="depth-content">
          <h3 className="text-xl font-bold gradient-text">{title}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">{company}</span>
            <span className="text-gray-400 text-sm">{period}</span>
          </div>
          <p className="text-gray-300">{description}</p>
        </div>
      </GlassCard>
    </div>
  )
}

export default function Experience() {
  const experiences = [
    {
      title: "AI Engineer",
      company: "ICOG Labs",
      period: "Jan 2023 - Present",
      description:
        "Working on MCP servers and training different AI models. Implementing and optimizing machine learning pipelines for various applications. Collaborating with research teams on cutting-edge AI solutions.",
      icon: <Brain className="h-5 w-5 text-terminal-green" />,
    },
    {
      title: "Backend Intern",
      company: "Eskalate LLC",
      period: "Jun 2022 - Sep 2022",
      description:
        "Developed RESTful APIs using Django and FastAPI. Implemented database models and optimized queries for improved performance. Collaborated with the frontend team to integrate APIs.",
      icon: <Server className="h-5 w-5 text-terminal-green" />,
    },
    {
      title: "CGI Club Vice President",
      company: "Addis Ababa University",
      period: "Sep 2021 - Jun 2022",
      description:
        "Led a team of 15 members in organizing coding competitions and workshops. Mentored junior students in programming and software development. Collaborated with other clubs for tech events.",
      icon: <Code className="h-5 w-5 text-terminal-green" />,
    },
  ]

  return (
    <Container>
      <SectionHeading title="Experience" subtitle="My professional journey and achievements" />

      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={index}
            title={exp.title}
            company={exp.company}
            period={exp.period}
            description={exp.description}
            icon={exp.icon}
          />
        ))}
      </div>
    </Container>
  )
}

