"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import TerminalBox from "@/components/ui/terminal-box"
import { Button } from "@/components/ui/button"
import { Terminal, ChevronRight, X, Maximize2, Minimize2, ArrowDown } from "lucide-react"

// Define terminal command types and interfaces
interface TerminalCommand {
  name: string
  description: string
  action: (args: string[]) => string
}

interface TerminalHistoryItem {
  input?: string
  output: string
  isCommand?: boolean
  timestamp?: number
}

const MAX_HISTORY = 500 // Maximum number of history items to prevent memory issues

export default function Extras() {
  // Terminal state
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>([
    { output: 'Welcome to Binyam\'s terminal. Type "help" for available commands.', timestamp: Date.now() },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalOutputRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Command definitions
  const commands: Record<string, TerminalCommand> = {
    help: {
      name: "help",
      description: "Display available commands",
      action: () => {
        const cmdList = Object.values(commands)
          .map((cmd) => `  ${cmd.name.padEnd(12)} - ${cmd.description}`)
          .join("\n")
        return `Available commands:\n${cmdList}`
      },
    },
    about: {
      name: "about",
      description: "Display information about me",
      action: () => `Binyam Mulat Abegaz
Backend Developer & Mechatronics Engineer
Passionate about building robust systems and exploring the intersection of software and hardware.`,
    },
    skills: {
      name: "skills",
      description: "List my technical skills",
      action: () => `Technical Skills:
- Backend: Golang, FastAPI, Django, MongoDB, PostgreSQL
- AI/ML: AI Agent Development, Machine Learning, NLP, Computer Vision
- Programming: Python, C, C++, JavaScript
- Mechatronics: Arduino, ESP-32, Solidworks`,
    },
    projects: {
      name: "projects",
      description: "Show my projects",
      action: () => `Projects:
1. Kesbekes 2.0 - Real-time Telegram Bot
2. Smart Bike Rack - IoT system
3. Kesbekes WebApp - Scheduling with NLP
4. AI Code Assistant - Code analysis tool`,
    },
    contact: {
      name: "contact",
      description: "Display contact information",
      action: () => `Contact Information:
Email: binyam@example.com
GitHub: github.com/binyam
LinkedIn: linkedin.com/in/binyam`,
    },
    clear: {
      name: "clear",
      description: "Clear the terminal",
      action: () => {
        setTerminalHistory([])
        return ""
      },
    },
    exit: {
      name: "exit",
      description: "Close the terminal",
      action: () => {
        setTimeout(() => {
          setShowTerminal(false)
          setTerminalHistory([
            { output: 'Welcome to Binyam\'s terminal. Type "help" for available commands.', timestamp: Date.now() },
          ])
        }, 500)
        return "Exiting terminal..."
      },
    },
    echo: {
      name: "echo",
      description: "Echo the provided text",
      action: (args) => args.join(" "),
    },
    date: {
      name: "date",
      description: "Display current date and time",
      action: () => new Date().toString(),
    },
    whoami: {
      name: "whoami",
      description: "Display current user",
      action: () => "visitor@binyam-portfolio",
    },
    ls: {
      name: "ls",
      description: "List directory contents",
      action: () => `about.md
projects/
skills.json
contact.txt
resume.pdf`,
    },
    cat: {
      name: "cat",
      description: "Display file contents",
      action: (args) => {
        if (args.length === 0) return "Usage: cat <filename>"

        const filename = args[0].toLowerCase()
        if (filename === "about.md") {
          return commands.about.action([])
        } else if (filename === "skills.json") {
          return `{
  "backend": ["Golang", "FastAPI", "Django", "MongoDB", "PostgreSQL"],
  "ai_ml": ["AI Agent Development", "Machine Learning", "NLP, Computer Vision"],
  "programming": ["Python", "C", "C++, JavaScript, TypeScript"]
}`
        } else if (filename === "contact.txt") {
          return commands.contact.action([])
        } else {
          return `cat: ${args[0]}: No such file or directory`
        }
      },
    },
    lorem: {
      name: "lorem",
      description: "Generate lorem ipsum text",
      action: (args) => {
        const count = args.length > 0 ? Number.parseInt(args[0]) : 1
        const paragraphs = []
        for (let i = 0; i < Math.min(count, 10); i++) {
          paragraphs.push(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          )
        }
        return paragraphs.join("\n\n")
      },
    },
    matrix: {
      name: "matrix",
      description: "Display a matrix animation",
      action: () => {
        const rows = 10
        const cols = 40
        const matrix = []

        for (let i = 0; i < rows; i++) {
          let row = ""
          for (let j = 0; j < cols; j++) {
            const rand = Math.random()
            if (rand < 0.4) {
              row += "0 "
            } else if (rand < 0.7) {
              row += "1 "
            } else if (rand < 0.9) {
              row += "# "
            } else {
              row += "$ "
            }
          }
          matrix.push(row)
        }

        return matrix.join("\n")
      },
    },
    history: {
      name: "history",
      description: "Show command history",
      action: () => {
        if (commandHistory.length === 0) {
          return "No commands in history."
        }

        return commandHistory
          .map((cmd, index) => `  ${(commandHistory.length - index).toString().padStart(3, " ")}  ${cmd}`)
          .join("\n")
      },
    },
  }

  // Focus input when terminal is shown
  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showTerminal])

  // Check scroll position
  const checkScrollPosition = () => {
    if (terminalOutputRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = terminalOutputRef.current
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10
      setIsScrolledToBottom(isAtBottom)
    }
  }

  // Handle scroll events
  const handleScroll = () => {
    checkScrollPosition()

    // Show scroll indicator when not at bottom
    if (!isScrolledToBottom) {
      setShowScrollIndicator(true)

      // Hide indicator after 2 seconds of no scrolling
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setShowScrollIndicator(false)
      }, 2000)
    }
  }

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalOutputRef.current && isScrolledToBottom) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight
    }

    // Clean up timeout
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [terminalHistory, isScrolledToBottom])

  // Add scroll event listener
  useEffect(() => {
    const outputElement = terminalOutputRef.current
    if (outputElement) {
      outputElement.addEventListener("scroll", handleScroll)
      return () => {
        outputElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Handle terminal command execution
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const input = terminalInput.trim()
    if (!input) return

    // Add command to history
    const newCommandHistory = [input, ...commandHistory.slice(0, 99)] // Keep last 100 commands
    setCommandHistory(newCommandHistory)
    setHistoryIndex(-1)

    // Parse command and arguments
    const [cmd, ...args] = input.split(" ")
    const cmdLower = cmd.toLowerCase()

    // Add command to terminal history
    const newHistory = [...terminalHistory, { input, output: "", isCommand: true, timestamp: Date.now() }]

    // Execute command if it exists
    if (cmdLower in commands) {
      const output = commands[cmdLower].action(args)
      if (output) {
        newHistory.push({ output, timestamp: Date.now() })
      }
    } else {
      newHistory.push({
        output: `Command not found: ${cmd}. Type "help" for available commands.`,
        timestamp: Date.now(),
      })
    }

    // Limit history size to prevent memory issues
    const limitedHistory = newHistory.slice(-MAX_HISTORY)
    setTerminalHistory(limitedHistory)
    setTerminalInput("")

    // Ensure we're scrolled to bottom after command execution
    setIsScrolledToBottom(true)
  }

  // Handle keyboard navigation for command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setTerminalInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()

      // Simple tab completion for commands
      const input = terminalInput.toLowerCase()
      if (input) {
        const matches = Object.keys(commands).filter((cmd) => cmd.startsWith(input))
        if (matches.length === 1) {
          setTerminalInput(matches[0])
        } else if (matches.length > 1) {
          // Show possible completions
          setTerminalHistory([
            ...terminalHistory,
            { output: `Possible completions: ${matches.join(", ")}`, timestamp: Date.now() },
          ])
        }
      }
    }
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Scroll to bottom
  const scrollToBottom = () => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight
      setIsScrolledToBottom(true)
    }
  }

  return (
    <Container>
      <SectionHeading title="Extras" subtitle="Interactive terminal experience" />

      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Terminal className="h-5 w-5 text-terminal-green mr-2" />
          <span>Terminal Console</span>
        </h3>

        {showTerminal ? (
          <div
            className={`transition-all duration-300 ${
              isFullscreen ? "fixed inset-4 z-50 flex flex-col" : "h-[400px] flex flex-col"
            }`}
          >
            <TerminalBox
              title="binyam@portfolio:~$"
              className="flex-grow flex flex-col overflow-hidden relative"
              customHeader={
                <div className="flex items-center ml-auto">
                  <button onClick={toggleFullscreen} className="p-1 hover:bg-white/10 rounded">
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => {
                      commands.exit.action([])
                      setShowTerminal(false)
                    }}
                    className="p-1 hover:bg-white/10 rounded ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              }
            >
              <div className="relative flex-grow flex flex-col">
                <div ref={terminalOutputRef} className="flex-grow overflow-auto terminal-background p-2 rounded">
                  {terminalHistory.map((item, index) => (
                    <div
                      key={`${index}-${item.timestamp}`}
                      className={`whitespace-pre-wrap mb-1 ${item.isCommand ? "terminal-command" : ""}`}
                    >
                      {item.isCommand && (
                        <span className="flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 text-terminal-green mt-1 flex-shrink-0" />
                          <span className="text-terminal-green mr-2">$</span>
                          <span className="terminal-text-gradient overflow-x-auto scrollbar-thin">{item.input}</span>
                        </span>
                      )}
                      {item.output && (
                        <div className="pl-5 terminal-output overflow-x-auto scrollbar-thin">{item.output}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Scroll to bottom button */}
                {showScrollIndicator && !isScrolledToBottom && (
                  <button
                    onClick={scrollToBottom}
                    className="absolute bottom-16 right-4 bg-black/50 text-terminal-green p-2 rounded-full hover:bg-black/70 transition-all"
                    aria-label="Scroll to bottom"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                )}

                <form onSubmit={handleTerminalSubmit} className="flex items-center terminal-input-container">
                  <ChevronRight className="h-4 w-4 text-terminal-green mr-1" />
                  <span className="text-terminal-green mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-transparent outline-none terminal-input"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </form>
              </div>
            </TerminalBox>
          </div>
        ) : (
          <GlassCard className="h-[400px] flex flex-col items-center justify-center depth-card">
            <div className="depth-content">
              <Terminal className="h-16 w-16 text-terminal-green mb-4" />
              <h4 className="text-xl font-bold mb-2 gradient-text">Terminal Easter Egg</h4>
              <p className="text-gray-400 text-center mb-4">
                Discover more about me through an interactive terminal experience
              </p>
              <Button
                onClick={() => setShowTerminal(true)}
                className="bg-gradient-to-r from-deep-blue to-mint-green text-black hover:bg-gradient-to-l transition-all duration-300 hover:scale-105"
                data-text="Launch Terminal"
              >
                Launch Terminal
              </Button>
            </div>
          </GlassCard>
        )}
      </div>
    </Container>
  )
}

