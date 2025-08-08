"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TypingEffect from "@/components/ui/typing-effect"
import { ArrowDown, Github, Linkedin } from "lucide-react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/20 to-mint-green/20 z-[-1] gradient-animate"></div>

      <div className="mb-6 relative w-32 h-32 rounded-full overflow-hidden border-2 border-terminal-green shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,0,0.7)] transition-all duration-500 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/30 to-mint-green/30 z-10 mix-blend-overlay"></div>
        <Image src="/image/sho.jpg" alt="Binyam Mulat Abegaz" fill className="object-cover" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        <span className="block">Hi, I'm</span>
        <span className="gradient-text">Binyam Mulat Abegaz</span>
      </h1>

      <div className="h-8 md:h-12 my-4">
        <TypingEffect
          text={["Fullstack Developer", "Mechatronics Engineer", "AI Explorer"]}
          className="text-xl md:text-3xl font-jetbrains"
        />
      </div>

      <p className="max-w-xl text-gray-300 mb-8">
        Building robust backend systems and exploring the intersection of software and hardware.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button
          size="lg"
          className="bg-gradient-to-r from-deep-blue to-mint-green text-black hover:bg-gradient-to-l transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,173,0.5)]"
          data-text="Explore My Code"
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        >
          Explore My Code
        </Button>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/20 hover:border-terminal-green hover:bg-terminal-green/10 hover:scale-110 transition-all duration-300"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/20 hover:border-terminal-green hover:bg-terminal-green/10 hover:scale-110 transition-all duration-300"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="hover:bg-terminal-green/10 transition-colors"
        >
          <ArrowDown className="h-6 w-6 text-terminal-green" />
          <span className="sr-only">Scroll Down</span>
        </Button>
      </div>
    </div>
  )
}

