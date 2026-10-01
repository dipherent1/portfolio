import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="about" className="py-24">
          <About />
        </section>
        <section id="experience" className="py-24">
          <Experience />
        </section>
        <section id="projects" className="py-24">
          <Projects />
        </section>
        <section id="skills" className="py-24">
          <Skills />
        </section>
        <section id="contact" className="py-24">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
