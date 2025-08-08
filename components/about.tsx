"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import TerminalBox from "@/components/ui/terminal-box"
import { Button } from "@/components/ui/button"
import {
  Code,
  GraduationCap,
  Briefcase,
  User,
  Terminal,
  Heart,
  Coffee,
  Music,
  Book,
  Globe,
  ChevronRight,
  Download
} from "lucide-react"

export default function About() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'bio' | 'interests' | 'journey'>('bio');

  return (
    <Container>
      <SectionHeading
        title="About Me"
        subtitle="Backend heavy fullstack developer and mechatronics enthusiast with a passion for building robust systems"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Image and Quick Info - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-deep-blue to-mint-green rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/20">
              <Image
                src="/image/sho.jpg"
                alt="Binyam Mulat"
                fill
                className={`object-cover transition-all duration-700 ${imageLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'}`}
                onLoad={() => setImageLoaded(true)}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold gradient-text">Binyam Mulat Abegaz</h3>
                <p className="text-sm text-gray-300">Fullstack Developer & Mechatronics Engineer</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-black/50 border-terminal-green/50 text-terminal-green hover:bg-terminal-green/20"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <TerminalBox title="whoami" className="hover-glow">
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-terminal-green">$</span> Location: <span className="text-white">Addis Ababa, Ethiopia</span>
              </p>
              <p>
                <span className="text-terminal-green">$</span> Education: <span className="text-white">BSc in Mechatronics Engineering</span>
              </p>
              <p>
                <span className="text-terminal-green">$</span> Languages: <span className="text-white">Python, Go, C++, Typescript</span>
              </p>
              <p>
                <span className="text-terminal-green">$</span> Experience: <span className="text-white">2+ years in software development</span>
              </p>
              <p>
                <span className="text-terminal-green">$</span> Interests: <span className="text-white">AI, IoT, Robotics, Backend Systems</span>
              </p>
            </div>
          </TerminalBox>
        </div>

        {/* Content Area - 7 columns */}
        <div className="lg:col-span-7">
          <GlassCard className="h-full">
            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-6">
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'bio' ? 'text-terminal-green border-b-2 border-terminal-green' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('bio')}
              >
                <User className="h-4 w-4 mr-2" />
                Bio
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'journey' ? 'text-terminal-green border-b-2 border-terminal-green' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('journey')}
              >
                <Terminal className="h-4 w-4 mr-2" />
                Journey
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'interests' ? 'text-terminal-green border-b-2 border-terminal-green' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('interests')}
              >
                <Heart className="h-4 w-4 mr-2" />
                Interests
              </button>
            </div>

            {/* Bio Tab */}
            {activeTab === 'bio' && (
              <div className="prose prose-invert max-w-none animate-fadeIn">
                <p className="text-lg">
                  Hello! I'm <span className="gradient-text font-semibold">Binyam Mulat Abegaz</span>, a Fullstack developer
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
                <p>
                  With expertise in Python, Go, and various backend frameworks, I enjoy building systems that are not only
                  functional but also maintainable and scalable. My background in mechatronics gives me a unique perspective
                  on how software interacts with the physical world, which is particularly valuable in IoT and embedded systems projects.
                </p>
              </div>
            )}

            {/* Journey Tab */}
            {activeTab === 'journey' && (
              <div className="animate-fadeIn">
                <div className="mb-6">
                  <h3 className="text-lg font-bold gradient-text mb-4">Professional Timeline</h3>
                  <div className="space-y-6">
                    
                    <div className="flex hover:translate-x-1 transition-transform">
                      <div className="mr-4 mt-1">
                        <Briefcase className="h-5 w-5 text-mint-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Backend Dev</h4>
                        <p className="text-sm text-gray-400">Enmamar • 2025</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Built a fast, scalable learning platform with integrated video streaming using FastAPI and Redis for real-time performance.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex hover:translate-x-1 transition-transform">
                      <div className="mr-4 mt-1">
                        <Briefcase className="h-5 w-5 text-mint-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">AI Engineer</h4>
                        <p className="text-sm text-gray-400">ICOG Labs • 2023-2024</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Working on MCP servers and training different AI models. Implementing and optimizing machine learning pipelines for various applications.
                        </p>
                      </div>
                    </div>

                    <div className="flex hover:translate-x-1 transition-transform">
                      <div className="mr-4 mt-1">
                        <Briefcase className="h-5 w-5 text-mint-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Backend Intern</h4>
                        <p className="text-sm text-gray-400">Eskalate LLC • 2022</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Developed RESTful APIs using Golang. Implemented database models and optimized queries for improved performance.
                        </p>
                      </div>
                    </div>

                    

                    <div className="flex hover:translate-x-1 transition-transform">
                      <div className="mr-4 mt-1">
                        <Code className="h-5 w-5 text-mint-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Started Learning Backend Development</h4>
                        <p className="text-sm text-gray-400">Self-taught • 2022</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Began learning Python and web development frameworks. Built several personal projects to practice skills.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold gradient-text mb-4">Education</h3>
                  <div className="space-y-6">
                    <div className="flex hover:translate-x-1 transition-transform">
                      <div className="mr-4 mt-1">
                        <GraduationCap className="h-5 w-5 text-mint-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">BSc in Mechatronics Engineering</h4>
                        <p className="text-sm text-gray-400">Addis Ababa University • 2022-2024</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Focused on the integration of mechanical, electronic, and software systems. Completed a capstone project on Smart Bike Rack system.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interests Tab */}
            {activeTab === 'interests' && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 bg-terminal-green/20 p-2 rounded-full">
                        <Terminal className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Backend Development</h4>
                        <p className="text-sm text-gray-300">
                          I enjoy building robust, scalable backend systems and APIs that power modern applications.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 mt-1 bg-terminal-green/20 p-2 rounded-full">
                        <Code className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">AI & Machine Learning</h4>
                        <p className="text-sm text-gray-300">
                          Fascinated by how AI can solve complex problems and create intelligent systems.
                        </p>
                      </div>
                    </div>

                    {/* <div className="flex items-start">
                      <div className="mr-3 mt-1 bg-terminal-green/20 p-2 rounded-full">
                        <Coffee className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Coffee & Coding</h4>
                        <p className="text-sm text-gray-300">
                          There's nothing better than solving complex problems with a good cup of coffee.
                        </p>
                      </div>
                    </div> */}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 bg-terminal-green/20 p-2 rounded-full">
                        <Book className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Favorites</h4>
                        <p className="text-sm text-gray-300">
                          I enjoy listening to podcasts and audiobooks.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 mt-1 bg-terminal-green/20 p-2 rounded-full">
                        <Music className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Music</h4>
                        <p className="text-sm text-gray-300">
                          Music helps me focus while coding. I enjoy a wide range of genres from classical to electronic.
                        </p>
                      </div>
                    </div>

                    {/* <div className="flex items-start">
                      <div className="mr-3 mt-1 bg-terminal-green/20 p-2 rounded-full">
                        <Globe className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h4 className="font-bold">Open Source</h4>
                        <p className="text-sm text-gray-300">
                          I believe in the power of open source and try to contribute whenever I can.
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-bold gradient-text mb-4">Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center hover:border-terminal-green/50 transition-colors">
                      <div className="text-3xl font-bold text-terminal-green">700+</div>
                      <div className="text-sm text-gray-400">DSA Problems Solved</div>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center hover:border-terminal-green/50 transition-colors">
                      <div className="text-3xl font-bold text-terminal-green">10+</div>
                      <div className="text-sm text-gray-400">Projects Completed</div>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center hover:border-terminal-green/50 transition-colors">
                      <div className="text-3xl font-bold text-terminal-green">2+</div>
                      <div className="text-sm text-gray-400">Years Experience</div>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center hover:border-terminal-green/50 transition-colors">
                      <div className="text-3xl font-bold text-terminal-green">4+</div>
                      <div className="text-sm text-gray-400">Technologies Mastered</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </Container>
  )
}

