"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ThemeContextProvider } from "@/contexts/theme-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </ThemeProvider>
  )
}