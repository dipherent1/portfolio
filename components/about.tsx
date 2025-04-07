import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import TerminalBox from "@/components/ui/terminal-box"
import { Code, GraduationCap, Briefcase } from "lucide-react"

export default function About() {
  return (
    <Container>
      <SectionHeading
        title="About Me"
        subtitle="Backend developer and mechatronics enthusiast with a passion for building robust systems"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="flex flex-col justify-center hover-scale">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg">
              Hello! I'm <span className="gradient-text font-semibold">Binyam Mulat Abegaz</span>, a backend developer
              with a strong foundation in mechatronics engineering. I specialize in building scalable and efficient
              backend systems using modern technologies.
            </p>
            <p>
              My journey in tech began with a fascination for how software and hardware interact. This led me to explore
              mechatronics engineering, where I gained hands-on experience with embedded systems and IoT devices.
            </p>
            <p>
              Currently, I'm focused on developing robust backend solutions and exploring AI applications. I'm
              passionate about clean code, system architecture, and creating technology that solves real-world problems.
            </p>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <TerminalBox title="stats.sh" className="hover-glow">
            <div className="space-y-2">
              <p>
                <span className="text-white">$</span> DSA problems solved: <span className="text-white">250+</span>
              </p>
              <p>
                <span className="text-white">$</span> Languages mastered:{" "}
                <span className="text-white">Python, Go, C++, JavaScript</span>
              </p>
              <p>
                <span className="text-white">$</span> Projects completed: <span className="text-white">15+</span>
              </p>
              <p>
                <span className="text-white">$</span> Years of experience: <span className="text-white">3+</span>
              </p>
            </div>
          </TerminalBox>

          <GlassCard className="hover-scale">
            <h3 className="text-xl font-bold mb-4 gradient-text">Timeline</h3>
            <div className="space-y-4">
              <div className="flex hover:translate-x-1 transition-transform">
                <div className="mr-4 mt-1">
                  <GraduationCap className="h-5 w-5 text-mint-green" />
                </div>
                <div>
                  <h4 className="font-bold">BSc in Mechatronics Engineering</h4>
                  <p className="text-sm text-gray-400">Addis Ababa University • 2018-2023</p>
                </div>
              </div>

              <div className="flex hover:translate-x-1 transition-transform">
                <div className="mr-4 mt-1">
                  <Code className="h-5 w-5 text-mint-green" />
                </div>
                <div>
                  <h4 className="font-bold">Started Learning Backend Development</h4>
                  <p className="text-sm text-gray-400">Self-taught • 2020</p>
                </div>
              </div>

              <div className="flex hover:translate-x-1 transition-transform">
                <div className="mr-4 mt-1">
                  <Briefcase className="h-5 w-5 text-mint-green" />
                </div>
                <div>
                  <h4 className="font-bold">Backend Intern</h4>
                  <p className="text-sm text-gray-400">Eskalate LLC • 2022</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Container>
  )
}

