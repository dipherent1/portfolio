"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import TerminalBox from "@/components/ui/terminal-box";
import { Button } from "@/components/ui/button";
import {
  Code,
  Brain,
  Server,
  Briefcase,
  Calendar,
  MapPin,
  Award,
  ChevronRight,
  ExternalLink,
  Terminal,
} from "lucide-react";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  location?: string;
  achievements?: string[];
  skills?: string[];
  link?: string;
  active?: boolean;
  onClick?: () => void;
}

function TimelineItem({
  title,
  company,
  period,
  description,
  icon,
  location,
  achievements,
  skills,
  link,
  active,
  onClick,
}: TimelineItemProps) {
  return (
    <div className="flex experience-timeline-item">
      <div className="flex flex-col items-center mr-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-deep-blue/30 to-terminal-green/30 border ${active ? "border-terminal-green" : "border-terminal-green/30"} hover:shadow-[0_0_15px_rgba(0,255,173,0.5)] transition-all cursor-pointer experience-icon`}
          onClick={onClick}
        >
          {icon}
        </div>
        <div className="w-px h-full bg-gradient-to-b from-terminal-green to-transparent"></div>
      </div>
      <GlassCard
        className={`flex-1 mb-8 transition-all duration-300 hover:translate-x-2 depth-card experience-card ${active ? "active" : ""}`}
        onClick={onClick}
      >
        <div className="depth-content">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold gradient-text">{title}</h3>
              <div className="flex items-center mb-1">
                <Briefcase className="h-4 w-4 text-terminal-green mr-1" />
                <span className="text-white">{company}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <Calendar className="h-4 w-4 text-terminal-green mr-1" />
                <span className="text-gray-400 text-sm">{period}</span>
              </div>
              {location && (
                <div className="flex items-center justify-end">
                  <MapPin className="h-4 w-4 text-terminal-green mr-1" />
                  <span className="text-gray-400 text-sm">{location}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-300 mt-3 mb-3">{description}</p>

          {active && achievements && achievements.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-terminal-green mb-2 flex items-center">
                <Award className="h-4 w-4 mr-1" /> Key Achievements
              </h4>
              <ul className="space-y-1">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="h-3 w-3 text-terminal-green mt-1 mr-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active && skills && skills.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-terminal-green mb-2 flex items-center">
                <Code className="h-4 w-4 mr-1" /> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-black/30 border border-white/10 rounded-full text-xs hover:bg-terminal-green/20 hover:border-terminal-green/50 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {active && link && (
            <div className="mt-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-terminal-green hover:underline flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View Project/Company
              </a>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState<number | null>(0);
  const [showTerminal, setShowTerminal] = useState(false);

  const experiences = [
    {
      title: "AI System Engineer",
      company: "Costrym",
      period: "10/2025 - 11/2025",
      location: "Addis Ababa, Ethiopia",
      description:
        "Architected backend infrastructure and built agentic systems for financial data analysis and cost optimization.",
      icon: <Brain className="h-5 w-5 text-terminal-green" />,
      achievements: [
        "Architected the core backend infrastructure using Laravel to orchestrate autonomous multi-agent workflows, enabling the system to reason through complex financial data for cost optimization",
        "Engineered a hybrid agentic architecture using Laravel, Laragent, and Vizra to autonomously categorize and analyze thousands of financial transaction records",
        "Developed a specialized microservice using FastAPI and LangChain with Model Context Protocol (MCP) support for high-performance context exchange between LLMs and external data tools",
      ],
      skills: [
        "Laravel",
        "Laragent",
        "Vizra",
        "FastAPI",
        "LangChain",
        "MCP",
        "Microservices",
        "Docker",
      ],
      link: "https://costrym.com/",
    },
    {
      title: "AI Engineer",
      company: "ICOG Labs",
      period: "Jan 2023 - 2024",
      location: "Addis Ababa, Ethiopia",
      description:
        "Working on MCP servers and training different AI models. Implementing and optimizing machine learning pipelines for various applications. Collaborating with research teams on cutting-edge AI solutions.",
      icon: <Brain className="h-5 w-5 text-terminal-green" />,
      achievements: [
        "Developed and deployed 5+ AI models that improved prediction accuracy by 30%",
        "Optimized machine learning pipelines reducing inference time by 40%",
        "Collaborated with research teams on implementing state-of-the-art NLP solutions",
        "Mentored 3 junior engineers in AI development practices",
      ],
      skills: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "NLP",
        "Computer Vision",
        "Docker",
        "Kubernetes",
      ],
      link: "https://www.icog-labs.com/",
    },
    {
      title: "Kifiya AI Mastery Program",
      company: "Kifiya Financial Technology",
      period: "Sep 2025",
      location: "Addis Ababa, Ethiopia",
      description:
        "Completed an intensive 3-month AI Mastery program focused on machine learning engineering, data engineering, deployment, and generative AI for fintech applications.",
      icon: <Brain className="h-5 w-5 text-terminal-green" />,
      achievements: [
        "Trained in Data Engineering: ETL, DBT transformations, DVC and infrastructure setup for data pipelines",
        "Deployment and MLOps: Docker, GitHub CI/CD, model deployment, unit testing and dashboard building",
        "Machine Learning & Generative AI: exploratory data analysis, predictive modeling, RAG, prompt & context engineering, and LLM fine-tuning",
      ],
      skills: [
        "Python",
        "SQL",
        "Data Engineering",
        "Docker",
        "CI/CD",
        "MLOps",
        "RAG",
        "Prompt Engineering",
      ],
      link: "https://kifiya.com/",
    },
    {
      title: "Enmamar Backend Developer",
      company: "Enmamar",
      period: "Jan 2025",
      location: "Addis Ababa, Ethiopia",
      description:
        "Developing and maintaining backend systems for Enmamar's Learning platform. Implementing RESTful APIs and optimizing database performance. Collaborating with frontend developers to ensure seamless integration.",
      icon: <Brain className="h-5 w-5 text-terminal-green" />,
      achievements: [
        "Designed and implemented a scalable RESTful API architecture",
        "Optimized database queries using Redis, improving response times by 30%",
        "Improved security by using rate limiting by IP and input validation",
        "Collaborated with frontend teams to enhance user experience",
        "Implemented security best practices, reducing vulnerabilities by 40%",
      ],
      skills: ["FastAPI", "Chapa"],
      link: "https://enmamar.com/",
    },
    {
      title: "Backend Intern",
      company: "Eskalate LLC",
      period: "Jun 2022 - Sep 2022",
      location: "Addis Ababa, Ethiopia",
      description:
        "Developed RESTful APIs using Django and FastAPI. Implemented database models and optimized queries for improved performance. Collaborated with the frontend team to integrate APIs.",
      icon: <Server className="h-5 w-5 text-terminal-green" />,
      achievements: [
        "Built 10+ RESTful API endpoints with comprehensive documentation",
        "Optimized database queries resulting in 25% faster response times",
        "Implemented authentication and authorization systems using JWT",
        "Participated in code reviews and contributed to team coding standards",
      ],
      skills: [
        "Python",
        "Django",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Git",
      ],
      link: "https://www.eskalate.io/",
    },
    {
      title: "CGI Club Vice President",
      company: "Addis Ababa University",
      period: "Sep 2021 - Jun 2022",
      location: "Addis Ababa, Ethiopia",
      description:
        "Led a team of 15 members in organizing coding competitions and workshops. Mentored junior students in programming and software development. Collaborated with other clubs for tech events.",
      icon: <Code className="h-5 w-5 text-terminal-green" />,
      achievements: [
        "Organized 5 successful coding competitions with 100+ participants",
        "Conducted 10+ workshops on programming fundamentals and web development",
        "Increased club membership by 40% through outreach and quality programming",
        "Established partnerships with 3 tech companies for sponsorship and mentorship",
      ],
      skills: [
        "Leadership",
        "Event Management",
        "Public Speaking",
        "Mentoring",
        "Programming",
        "Web Development",
      ],
      link: "https://www.aau.edu.et/",
    },
  ];

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };

  return (
    <Container>
      <SectionHeading
        title="Experience"
        subtitle="My professional journey and achievements"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                title={exp.title}
                company={exp.company}
                period={exp.period}
                location={exp.location}
                description={exp.description}
                icon={exp.icon}
                achievements={exp.achievements}
                skills={exp.skills}
                link={exp.link}
                active={activeExperience === index}
                onClick={() => setActiveExperience(index)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="sticky top-24">
            <h3 className="text-xl font-bold gradient-text mb-4">
              Experience Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-terminal-green mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Years of Experience</h4>
                  <p className="text-gray-400">
                    3+ years in software development
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Code className="h-5 w-5 text-terminal-green mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Core Expertise</h4>
                  <p className="text-gray-400">
                    Automation, Backend Development, AI/ML, System Architecture
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                className="w-full border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10"
                onClick={toggleTerminal}
              >
                <Terminal className="h-4 w-4 mr-2" />
                View Experience as JSON
              </Button>
            </div>
          </GlassCard>

          {showTerminal && (
            <TerminalBox title="experience.json" className="sticky top-96">
              <div className="text-xs font-mono overflow-auto max-h-[300px] p-2">
                <pre className="text-gray-300">
                  {JSON.stringify(
                    {
                      name: "Binyam Mulat",
                      title: "Backend Developer, AI & Automation Engineer",
                      yearsOfExperience: 3,
                      experience: experiences.map((exp) => ({
                        role: exp.title,
                        company: exp.company,
                        period: exp.period,
                        skills: exp.skills,
                      })),
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </TerminalBox>
          )}
        </div>
      </div>
    </Container>
  );
}
