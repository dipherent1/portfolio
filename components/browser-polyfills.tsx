"use client"

import { useEffect, useLayoutEffect } from "react"

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

export default function BrowserPolyfills() {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || typeof window.IntersectionObserver === "function") {
      return
    }

    const FallbackIntersectionObserver = class {
      private callback: IntersectionObserverCallback
      private targets = new Set<Element>()
      private timer: number

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback
        this.timer = window.setInterval(() => this.check(), 200)
      }

      observe(target: Element) {
        this.targets.add(target)
        this.check()
      }

      unobserve(target: Element) {
        this.targets.delete(target)
      }

      disconnect() {
        this.targets.clear()
        window.clearInterval(this.timer)
      }

      takeRecords(): IntersectionObserverEntry[] {
        return []
      }

      private check() {
        const entries: IntersectionObserverEntry[] = []

        this.targets.forEach((target) => {
          if (!target.isConnected) {
            this.targets.delete(target)
            return
          }

          const boundingClientRect = target.getBoundingClientRect()
          const isIntersecting =
            boundingClientRect.top < window.innerHeight &&
            boundingClientRect.bottom > 0

          entries.push({
            boundingClientRect,
            intersectionRatio: isIntersecting ? 1 : 0,
            intersectionRect: boundingClientRect,
            isIntersecting,
            rootBounds: null,
            target,
            time: Date.now(),
          })
        })

        if (entries.length > 0) {
          this.callback(entries, this as unknown as IntersectionObserver)
        }
      }
    }

    window.IntersectionObserver = FallbackIntersectionObserver as unknown as typeof IntersectionObserver
  }, [])

  return null
}
