"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { LightModeIcon, DarkModeIcon } from "@/components/theme-icons"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const THEMES = [
  { key: "light",    label: "Light",    Icon: LightModeIcon },
  { key: "dark",     label: "Dark",     Icon: DarkModeIcon  },
  { key: "terminal", label: "Terminal", Icon: Terminal      },
] as const

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <div className="h-7 w-[72px] rounded-lg bg-muted animate-pulse" />
  }

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-black/10 dark:bg-white/[0.06]">
      {THEMES.map(({ key, label, Icon }) => {
        const active = theme === key
        return (
          <button
            key={key}
            onClick={() => setTheme(key)}
            title={label}
            aria-label={`Switch to ${label} mode`}
            className={cn(
              "w-6 h-6 rounded-md flex items-center justify-center transition-all",
              active
                ? "bg-white dark:bg-zinc-700 shadow-sm text-[#374151] dark:text-zinc-100"
                : "text-[#9ca3af] dark:text-zinc-600 hover:text-[#374151] dark:hover:text-zinc-400"
            )}
          >
            <Icon className="w-3 h-3" />
          </button>
        )
      })}
    </div>
  )
}
