"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "light" | "dark" | "system" | "blue-dark" | "purple-dark" | "high-contrast"


interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
  resolvedTheme?: string
  isSystem: boolean
  availableThemes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)
  const [isSystem, setIsSystem] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia("(prefers-color-scheme: dark)")

    if (theme === "system") {
      setIsSystem(true)
      setTheme(mq.matches ? "dark" : "light")
    } else {
      setIsSystem(false)
    }

    const handler = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        setTheme(e.matches ? "dark" : "light")
      }
    }

    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  // Step 3: Define availableThemes Array
  const availableThemes: Theme[] = ["light", "dark", "system", "blue-dark", "purple-dark", "high-contrast"]

  // Step 4: Pass availableThemes in the Provider
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        mounted,
        isSystem,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useThemeContext must be used within a ThemeProvider")
  return context
}
