"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string | string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  delayBeforeDelete?: number
  delayBeforeType?: number
  loop?: boolean
}

export default function TypingEffect({
  text,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBeforeDelete = 2000,
  delayBeforeType = 500,
  loop = true,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = Array.isArray(text) ? text : [text]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        timeout = setTimeout(() => {
          // Do nothing, just delay
        }, delayBeforeType)
      } else {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
      }
    } else {
      const currentText = texts[currentIndex]
      if (displayText.length === currentText.length) {
        if (!loop && currentIndex === texts.length - 1) return

        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, delayBeforeDelete)
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [
    displayText,
    currentIndex,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBeforeDelete,
    delayBeforeType,
    loop,
  ])

  return (
    <span className={className}>
      {displayText}
      <span className="typing-cursor"></span>
    </span>
  )
}

