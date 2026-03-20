"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LightModeIcon, DarkModeIcon } from "@/components/theme-icons"
import { Terminal } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const CYCLE: Record<string, string> = {
  light: "dark",
  dark: "terminal",
  terminal: "light",
}

const LABELS: Record<string, string> = {
  light: "Light",
  dark: "Dark",
  terminal: "Terminal",
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
        <span className="sr-only">Toggle theme</span>
        <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />
      </Button>
    )
  }

  const current = theme ?? "dark"
  const next = CYCLE[current] ?? "dark"

  function icon() {
    if (current === "light")    return <DarkModeIcon    className="h-5 w-5 text-indigo-600 transition-transform duration-300 hover:rotate-12" />
    if (current === "terminal") return <LightModeIcon   className="h-5 w-5 text-red-400   transition-transform duration-300 hover:rotate-45" />
    /* dark */                  return <LightModeIcon   className="h-5 w-5 text-yellow-400 transition-transform duration-300 hover:rotate-45" />
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(next)}
            className="w-9 h-9 rounded-full transition-all duration-300 ease-in-out"
            aria-label={`Switch to ${LABELS[next]} mode`}
          >
            {icon()}
            <span className="sr-only">Cycle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{LABELS[current]} — switch to {LABELS[next]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
