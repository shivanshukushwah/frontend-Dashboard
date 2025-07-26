"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
  resolvedTheme?: string
  isSystem: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)
  const [isSystem, setIsSystem] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Example logic: detect system theme preference
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    setIsSystem(theme === "light" || theme === "dark" ? false : mq.matches)
    // Optionally, listen for system changes:
    const handler = (e: MediaQueryListEvent) => setIsSystem(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted, isSystem }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useThemeContext must be used within a ThemeProvider")
  return context
}