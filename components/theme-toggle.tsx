"use client"

import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="p-2 rounded-md border hover:bg-accent transition-all"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
