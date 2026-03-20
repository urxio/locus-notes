"use client"

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Syncs the .dark class and body helper class whenever the theme changes.
 * Must live *inside* NextThemesProvider so it can call useTheme().
 *
 * "terminal" is a dark-based theme — we co-apply .dark so that Tailwind
 * `dark:` utility classes continue to work, then let the .terminal CSS
 * variables override the palette on top.
 */
function DarkClassSync() {
  const { theme } = useTheme()

  useEffect(() => {
    const htmlEl = document.documentElement
    const isDark = theme === "dark" || theme === "terminal"

    if (theme === "terminal") {
      // Ensure .dark is present so `dark:` Tailwind classes apply
      htmlEl.classList.add("dark")
    } else if (theme === "light") {
      // Explicitly clean up .dark (next-themes removes "terminal" class but
      // won't remove the .dark we added manually)
      htmlEl.classList.remove("dark")
    }
    // For "dark" theme, next-themes manages .dark itself — no action needed.

    document.body.classList.toggle("dark-theme-active", isDark)
  }, [theme])

  return null
}

export function EnhancedThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider {...props}>
      <DarkClassSync />
      {children}
    </NextThemesProvider>
  )
}
