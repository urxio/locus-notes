"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Watches the <html> class attribute with a MutationObserver.
 * When "terminal" is set by next-themes, co-applies ".dark" so Tailwind
 * `dark:` utility classes continue to work (terminal is a dark-based theme).
 * When switching away to "light", removes the manually-added ".dark".
 * The observer fires AFTER next-themes has already committed its class change,
 * avoiding the child-effect-before-parent-effect race.
 */
function useDarkClassSync() {
  useEffect(() => {
    const htmlEl = document.documentElement

    const sync = () => {
      const hasTerminal = htmlEl.classList.contains("terminal")
      const hasDark = htmlEl.classList.contains("dark")
      // Read the authoritative stored theme to distinguish
      // "dark was added by me for terminal" vs "user chose dark theme"
      const stored = localStorage.getItem("locus-notes-theme")

      if (hasTerminal && !hasDark) {
        htmlEl.classList.add("dark")
      } else if (!hasTerminal && hasDark && stored === "light") {
        htmlEl.classList.remove("dark")
      }

      document.body.classList.toggle(
        "dark-theme-active",
        hasTerminal || hasDark
      )
    }

    // Run once on mount to catch the initial stored theme
    sync()

    const observer = new MutationObserver(sync)
    observer.observe(htmlEl, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])
}

export function EnhancedThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useDarkClassSync()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
