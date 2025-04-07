import type React from "react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import { Server, Brain, Code, Cpu, PenToolIcon as Tool } from "lucide-react"

interface SkillCategoryProps {
  title: string
  icon: React.ReactNode
  skills: string[]
}

function SkillCategory({ title, icon, skills }: SkillCategoryProps) {
  return (
    <GlassCard className="h-full depth-card">
      <div className="depth-content">
        <div className="flex items-center mb-4 text-terminal-green">
          {icon}
          <h3 className="text-xl font-bold ml-2 gradient-text">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-black/30 border border-white/10 rounded-full text-sm hover:bg-terminal-green/20 hover:border-terminal-green/50 transition-colors hover:translate-y-[-2px] hover:shadow-[0_0_10px_rgba(0,255,173,0.3)] inline-block"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export default function Skills() {
  const skillCategories = [
    {
      title: "Backend",
      icon: <Server className="h-6 w-6" />,
      skills: ["Golang", "FastAPI", "Django", "MongoDB", "PostgreSQL", "Redis", "RESTful APIs", "GraphQL"],
    },
    {
      title: "AI/ML",
      icon: <Brain className="h-6 w-6" />,
      skills: [
        "AI Agent Development",
        "Machine Learning",
        "NLP (Gemini API)",
        "Computer Vision",
        "TensorFlow",
        "PyTorch",
      ],
    },
    {
      title: "Programming",
      icon: <Code className="h-6 w-6" />,
      skills: ["Python", "C", "C++", "JavaScript", "TypeScript", "SQL", "Data Structures", "Algorithms"],
    },
    {
      title: "Mechatronics/IoT",
      icon: <Cpu className="h-6 w-6" />,
      skills: ["Arduino", "ESP-32", "Solidworks", "Embedded Systems", "Sensors", "Actuators", "PCB Design"],
    },
    {
      title: "Tools",
      icon: <Tool className="h-6 w-6" />,
      skills: ["Git", "GitHub", "Docker", "CI/CD", "Linux", "Bash", "VS Code", "Postman"],
    },
  ]

  return (
    <Container>
      <SectionHeading title="Skills" subtitle="My technical toolkit and areas of expertise" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => (
          <SkillCategory key={category.title} title={category.title} icon={category.icon} skills={category.skills} />
        ))}
      </div>
    </Container>
  )
}

