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

  const [chatId, setChatId] = useState<string | null>(null)
  const [botToken, setBotToken] = useState<string | null>(null)
  const [showChatIdHelper, setShowChatIdHelper] = useState(false)

  // Using Formspree hook with your form ID
  const [formspreeState, handleFormspreeSubmit] = useForm("xpwporvg")
  const { submitting, succeeded, errors } = formspreeState

  // Function to get chat ID
  const getChatId = async () => {
    try {
      // Use manually set token, environment variable, or a placeholder
      const token = botToken || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN";
      const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
      const data = await response.json();

      if (data.ok && data.result.length > 0) {
        // Get the most recent message's chat ID
        const updates = data.result;
        for (let i = updates.length - 1; i >= 0; i--) {
          if (updates[i].message && updates[i].message.chat) {
            setChatId(updates[i].message.chat.id.toString());
            return;
          }
        }
      }

      // If no chat ID found
      alert("No messages found. Please send a message to your bot first, then try again.");
    } catch (error) {
      console.error("Error getting chat ID:", error);
      alert("Error getting chat ID. Check console for details.");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const sendToTelegram = async (formData: any) => {
    try {
      // Use manually set token, environment variable, or a placeholder
      const token = botToken || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN";
      // Use the chat ID from state if available, otherwise use environment variable
      const userChatId = chatId || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "YOUR_CHAT_ID";

      console.log("Sending to Telegram with token:", token.substring(0, 5) + "..." + token.substring(token.length - 5));
      console.log("Sending to chat ID:", userChatId);

      // Format the message for Telegram
      const text = `
📬 New Contact Form Submission

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📝 Subject: ${formData.subject || 'No Subject'}
📄 Message:

${formData.message}
      `;

      // Send to Telegram Bot API
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

      try {
        const telegramResponse = await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: userChatId,
            text: text,
            parse_mode: 'HTML'
          })
        });

        if (!telegramResponse.ok) {
          const errorText = await telegramResponse.text();
          console.error('Telegram API error:', errorText);
          return false;
        }

        const telegramResult = await telegramResponse.json();
        console.log('Telegram notification sent:', telegramResult);
        return telegramResult.ok;
      } catch (error) {
        console.error('Network error when sending to Telegram:', error);
        return false;
      }
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create form data for Formspree submission
    const formData = {
      name: formState.name,
      email: formState.email,
      subject: formState.subject || 'New contact form submission',
      message: formState.message
    }

    // Submit the form using Formspree
    await handleFormspreeSubmit(e)

    // If submission was successful, try to send to Telegram and reset the form
    if (succeeded) {
      // Try to send to Telegram in the background
      sendToTelegram(formData).catch(error => {
        console.error('Failed to send to Telegram:', error);
        // We don't need to show this error to the user as the form was still submitted successfully
      });

      // Reset the form
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
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatIdHelper(!showChatIdHelper)}
                className="w-full border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
              >
                {showChatIdHelper ? "Hide" : "Show"} Telegram Setup Helper
              </Button>

              {showChatIdHelper && (
                <div className="mt-4 p-4 bg-black/30 border border-terminal-green/20 rounded-md">
                  <h4 className="text-sm font-bold mb-2 text-terminal-green">Telegram Bot Setup</h4>
                  <ol className="text-xs text-gray-300 space-y-2 list-decimal pl-4">
                    <li>Create a new bot or revoke token for existing bot via <span className="text-terminal-green">@BotFather</span> on Telegram</li>
                    <li>Enter your bot token below or add it to <span className="text-terminal-green">.env.local</span> as <span className="text-terminal-green">NEXT_PUBLIC_TELEGRAM_BOT_TOKEN</span></li>
                    <li>Send a message to your bot (e.g., "Hello")</li>
                    <li>Click the button below to get your chat ID</li>
                  </ol>

                  <div className="mt-3">
                    <div className="text-xs text-gray-400 mb-2">Enter your Telegram Bot Token:</div>
                    <div className="flex">
                      <input
                        type="password"
                        placeholder="Enter your bot token"
                        className="flex-1 bg-black/30 border border-white/10 rounded-l px-3 py-1 text-white text-xs focus:outline-none focus:border-terminal-green/50"
                        onChange={(e) => setBotToken(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-l-none border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10 text-xs py-1 px-2"
                        onClick={() => {
                          if (botToken) {
                            alert(`Bot token set successfully!`);
                          }
                        }}
                      >
                        Set
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={getChatId}
                      className="mr-2 border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
                    >
                      Get Chat ID
                    </Button>

                    {chatId && (
                      <div className="text-xs">
                        <span className="text-gray-400">Your Chat ID:</span>
                        <span className="text-terminal-green ml-1 font-mono">{chatId}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const testMessage = {
                          name: "Test User",
                          email: "test@example.com",
                          subject: "Test Message",
                          message: "This is a test message from your portfolio website."
                        };
                        sendToTelegram(testMessage)
                          .then(success => {
                            if (success) {
                              alert("Test message sent successfully! Check your Telegram.");
                            } else {
                              alert("Failed to send test message. Check console for details.");
                            }
                          })
                          .catch(error => {
                            console.error("Error sending test message:", error);
                            alert("Error sending test message. Check console for details.");
                          });
                      }}
                      className="w-full border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
                    >
                      Send Test Message
                    </Button>
                  </div>

                  {chatId ? (
                    <div className="mt-3 text-xs text-gray-400">
                      <p>Add this chat ID to your <code className="text-terminal-green">.env.local</code> file as <code className="text-terminal-green">NEXT_PUBLIC_TELEGRAM_CHAT_ID</code></p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-2">Or manually enter your chat ID:</div>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Enter your chat ID"
                          className="flex-1 bg-black/30 border border-white/10 rounded-l px-3 py-1 text-white text-xs focus:outline-none focus:border-terminal-green/50"
                          onChange={(e) => setChatId(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-l-none border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10 text-xs py-1 px-2"
                          onClick={() => {
                            if (chatId) {
                              alert(`Chat ID set to: ${chatId}`);
                            }
                          }}
                        >
                          Set
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} Binyam Mulat Abegaz. All rights reserved.
            </p>
          </div>
        </GlassCard>
      </div>
    </Container>
  )
}

