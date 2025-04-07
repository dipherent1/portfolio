import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Extras from "@/components/extras"
import Contact from "@/components/contact"
import MatrixRain from "@/components/ui/matrix-rain"
import ThreeDBackground from "@/components/ui/3d-background"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-off-black text-white overflow-hidden">
      <ThreeDBackground />
      <MatrixRain />
      <ScrollArea className="h-screen snap-y snap-mandatory">
        <section id="home" className="snap-start h-screen">
          <Hero />
        </section>
        <section id="about" className="snap-start min-h-screen py-20">
          <About />
        </section>
        <section id="skills" className="snap-start min-h-screen py-20">
          <Skills />
        </section>
        <section id="projects" className="snap-start min-h-screen py-20">
          <Projects />
        </section>
        <section id="experience" className="snap-start min-h-screen py-20">
          <Experience />
        </section>
        <section id="extras" className="snap-start min-h-screen py-20">
          <Extras />
        </section>
        <section id="contact" className="snap-start min-h-screen py-20">
          <Contact />
        </section>
      </ScrollArea>
    </main>
  )
}

