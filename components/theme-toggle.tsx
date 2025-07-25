"use client"

import * as React from "react"
import { Monitor, Moon, Sun, Palette, Eye, Zap } from 'lucide-react'
import { useThemeContext } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
  "blue-dark": Zap,
  "purple-dark": Palette,
  "high-contrast": Eye,
}

const themeLabels = {
  light: "Light",
  dark: "Dark", 
  system: "System",
  "blue-dark": "Blue Dark",
  "purple-dark": "Purple Dark",
  "high-contrast": "High Contrast",
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted, availableThemes } = useThemeContext()

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  const currentTheme = resolvedTheme || theme || "light"
  const CurrentIcon = themeIcons[currentTheme as keyof typeof themeIcons] || Sun

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CurrentIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <Palette className="h-4 w-4" />
          <span>Choose Theme</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="grid grid-cols-1 gap-1 p-1">
          {Array.isArray(availableThemes) ? availableThemes.map((themeOption) => {
            const Icon = themeIcons[themeOption as keyof typeof themeIcons] || Sun
            const label = themeLabels[themeOption as keyof typeof themeLabels] || themeOption
            const isActive = theme === themeOption
            
            return (
              <DropdownMenuItem
                key={themeOption}
                onClick={() => setTheme(themeOption)}
                className={`flex items-center justify-between cursor-pointer ${
                  isActive ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                {isActive && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            )
          }) : null}
        </div>
        
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Current: {themeLabels[currentTheme as keyof typeof themeLabels] || currentTheme}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}