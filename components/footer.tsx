"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import GlassCard from "@/components/ui/glass-card"
import TerminalBox from "@/components/ui/terminal-box"
import { 
  Github, 
  Linkedin, 
  Mail, 
  Send, 
  Code, 
  Terminal, 
  Cpu, 
  ChevronRight,
  ExternalLink,
  Heart,
  MapPin,
  Calendar,
  Clock
} from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [terminalCommand, setTerminalCommand] = useState("echo 'Hello, World!'")
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real implementation, you would send this to your backend
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }
  
  const handleTerminalCommand = () => {
    const commands = [
      "cd /home/visitor/projects",
      "git clone https://github.com/dipherent1/portfolio.git",
      "npm install && npm run dev",
      "echo 'Thanks for visiting!'",
      "python -c 'print(\"Hello from Python!\")'",
      "curl -s https://api.github.com/users/dipherent1",
      "find . -name '*.js' | wc -l"
    ]
    
    setTerminalCommand(commands[Math.floor(Math.random() * commands.length)])
  }
  
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 mt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Binyam Mulat</h3>
            <p className="text-gray-400 mb-4">
              Backend Developer & Mechatronics Engineer passionate about building robust systems and exploring the intersection of software and hardware.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-white/20 hover:border-terminal-green hover:bg-terminal-green/10 hover:scale-110 transition-all duration-300"
                onClick={() => window.open('https://github.com/dipherent1', '_blank')}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-white/20 hover:border-terminal-green hover:bg-terminal-green/10 hover:scale-110 transition-all duration-300"
                onClick={() => window.open('https://www.linkedin.com/in/binyam-mulat-2838a6249/', '_blank')}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-white/20 hover:border-terminal-green hover:bg-terminal-green/10 hover:scale-110 transition-all duration-300"
                onClick={() => window.open('mailto:binyammulat244@gmail.com', '_blank')}
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name} className="group">
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-terminal-green transition-colors duration-200 flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 text-terminal-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on new projects and blog posts.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-terminal-green/50"
                required
              />
              <Button 
                type="submit" 
                size="sm"
                className="absolute right-1 top-1 bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green"
                disabled={subscribed}
              >
                {subscribed ? "Subscribed!" : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
          
          {/* Column 4: Location & Availability */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Location & Availability</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-terminal-green mt-0.5" />
                <div>
                  <p className="text-white">Addis Ababa, Ethiopia</p>
                  <p className="text-gray-400 text-xs">Available for remote work</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-4 w-4 mr-2 text-terminal-green mt-0.5" />
                <div>
                  <p className="text-white">Working Hours</p>
                  <p className="text-gray-400 text-xs">Mon-Fri: 9AM-6PM EAT</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 text-terminal-green mt-0.5" />
                <div>
                  <p className="text-white">Response Time</p>
                  <p className="text-gray-400 text-xs">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tech Stack Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <span className="text-gray-400 text-sm">Built with:</span>
            {[
              { name: "Next.js", icon: <Code className="h-4 w-4" /> },
              { name: "TypeScript", icon: <Terminal className="h-4 w-4" /> },
              { name: "Tailwind CSS", icon: <Cpu className="h-4 w-4" /> },
              { name: "Shadcn UI", icon: <ExternalLink className="h-4 w-4" /> }
            ].map((tech) => (
              <div 
                key={tech.name}
                className="flex items-center bg-black/30 px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300 hover:border-terminal-green/50 hover:text-terminal-green transition-colors duration-200"
              >
                {tech.icon}
                <span className="ml-1">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Terminal Box */}
        <div className="mb-8">
          <TerminalBox title="visitor@binyam:~$" className="h-[80px]">
            <div className="text-sm font-mono">
              <div className="flex">
                <span className="text-terminal-green mr-2">$</span>
                <span className="text-white">{terminalCommand}</span>
              </div>
              <div className="mt-2 flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
                  onClick={handleTerminalCommand}
                >
                  Run Random Command
                </Button>
              </div>
            </div>
          </TerminalBox>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-white/10 pt-6">
          <p className="flex items-center justify-center">
            © {currentYear} Binyam Mulat. Made with 
            <Heart className="h-3 w-3 mx-1 text-terminal-green animate-pulse" /> 
            in Addis Ababa, Ethiopia
          </p>
          <p className="mt-2">
            <span className="text-terminal-green">const</span> <span className="text-white">future</span> = <span className="text-terminal-green">await</span> <span className="text-white">buildSomethingAmazing()</span>;
          </p>
        </div>
      </Container>
    </footer>
  )
}
