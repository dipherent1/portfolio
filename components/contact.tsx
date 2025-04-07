"use client"

import type React from "react"

import { useState } from "react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Message sent successfully! I'll get back to you soon.")
      setFormState({
        name: "",
        email: "",
        message: "",
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("")
      }, 5000)
    }, 1500)
  }

  return (
    <Container>
      <SectionHeading title="Contact" subtitle="Get in touch with me for collaborations or opportunities" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <GlassCard>
          <h3 className="text-xl font-bold mb-6 text-terminal-green">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-terminal-green text-black hover:bg-terminal-green/80 transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </span>
              )}
            </Button>

            {submitMessage && <div className="text-terminal-green text-center">{submitMessage}</div>}
          </form>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6 text-terminal-green">Connect With Me</h3>

            <p className="text-gray-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:binyam@example.com"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                <span>binyam@example.com</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors group"
              >
                <Github className="h-5 w-5 mr-3" />
                <span>github.com/binyam</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs terminal-text">
                  $ git clone https://github.com/binyam
                </span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors group"
              >
                <Linkedin className="h-5 w-5 mr-3" />
                <span>linkedin.com/in/binyam</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs terminal-text">
                  $ open connection
                </span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} Binyam Mulat Abegaz. All rights reserved.
            </p>
          </div>
        </GlassCard>
      </div>
    </Container>
  )
}

