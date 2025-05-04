"use client"

import type React from "react"

import { useState } from "react"
import { useForm, ValidationError } from '@formspree/react'
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send, AlertCircle, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Using Formspree hook with your form ID
  const [formspreeState, handleFormspreeSubmit] = useForm("xpwporvg")
  const { submitting, succeeded, errors } = formspreeState

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create form data for Formspree submission
    const formData = new FormData()
    formData.append('name', formState.name)
    formData.append('email', formState.email)
    formData.append('subject', formState.subject || 'New contact form submission')
    formData.append('message', formState.message)

    // Submit the form using Formspree
    await handleFormspreeSubmit(e)

    // If submission was successful, reset the form
    if (succeeded) {
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Clear success message after 8 seconds
      setTimeout(() => {
        // Reset the Formspree state (this is not directly possible with the hook)
        // We'll rely on the UI to handle this
      }, 8000)
    }
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
              <ValidationError prefix="Name" field="name" errors={errors} className="text-red-400 text-sm mt-1" />
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
              <ValidationError prefix="Email" field="email" errors={errors} className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                Subject (optional)
              </label>
              <Input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
              <ValidationError prefix="Subject" field="subject" errors={errors} className="text-red-400 text-sm mt-1" />
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
              <ValidationError prefix="Message" field="message" errors={errors} className="text-red-400 text-sm mt-1" />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-terminal-green text-black hover:bg-terminal-green/80 transition-all"
            >
              {submitting ? (
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

            {succeeded && (
              <div className="text-terminal-green text-center flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <ValidationError errors={errors} className="text-red-400 text-center flex items-center justify-center">
              {(error) => (
                <>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </>
              )}
            </ValidationError>
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
                href="mailto:binyammulat244@gmail.com"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                <span>binyammulat244@gmail.com</span>
              </a>

              <a
                href="https://github.com/dipherent1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors group"
              >
                <Github className="h-5 w-5 mr-3" />
                <span>github.com/dipherent1</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs terminal-text">
                  $ git clone https://github.com/dipherent1
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/binyam-mulat-2838a6249/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors group"
              >
                <Linkedin className="h-5 w-5 mr-3" />
                <span>linkedin.com/in/binyam-mulat-2838a6249</span>
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

