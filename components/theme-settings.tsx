"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useThemeContext } from "@/contexts/theme-context"
import { Monitor, Moon, Sun, Palette, Eye, Zap, Settings } from 'lucide-react'

const themePresets = [
  {
    id: "light",
    name: "Light",
    description: "Clean and bright interface",
    icon: Sun,
    preview: "bg-white border-gray-200",
  },
  {
    id: "dark", 
    name: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
    preview: "bg-slate-900 border-slate-700",
  },
  {
    id: "blue-dark",
    name: "Blue Dark",
    description: "Professional blue theme",
    icon: Zap,
    preview: "bg-blue-950 border-blue-800",
  },
  {
    id: "purple-dark",
    name: "Purple Dark", 
    description: "Creative purple theme",
    icon: Palette,
    preview: "bg-purple-950 border-purple-800",
  },
  {
    id: "high-contrast",
    name: "High Contrast",
    description: "Maximum accessibility",
    icon: Eye,
    preview: "bg-white border-black border-2",
  },
]

export function ThemeSettings() {
  const { theme, setTheme, resolvedTheme, isSystem, mounted } = useThemeContext()
  const [autoSwitch, setAutoSwitch] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading theme settings...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const currentTheme = resolvedTheme || theme || "light"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Theme Settings</span>
          </CardTitle>
          <CardDescription>
            Customize the appearance of your ShadowBlock dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Theme Display */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Current Theme</p>
              <p className="text-sm text-muted-foreground">
                {currentTheme === "system" ? `System (${resolvedTheme})` : currentTheme}
              </p>
            </div>
            <Badge variant="outline" className="capitalize">
              {currentTheme}
            </Badge>
          </div>

          {/* System Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Follow System Theme</Label>
              <p className="text-sm text-muted-foreground">
                Automatically switch between light and dark based on your system settings
              </p>
            </div>
            <Switch
              checked={isSystem}
              onCheckedChange={(checked) => setTheme(checked ? "system" : theme)}
            />
          </div>

          <Separator />

          {/* Theme Presets */}
          <div className="space-y-4">
            <Label className="text-base">Theme Presets</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themePresets.map((preset) => {
                const Icon = preset.icon
                const isActive = theme === preset.id
                
                return (
                  <Card
                    key={preset.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isActive ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setTheme(preset.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full ${preset.preview} flex items-center justify-center`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{preset.name}</p>
                            {isActive && (
                              <Badge variant="default" className="text-xs">
                                Active
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {preset.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Advanced Settings */}
          <div className="space-y-4">
            <Label className="text-base">Advanced Settings</Label>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Theme Switching</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically switch to dark theme during evening hours
                </p>
              </div>
              <Switch
                checked={autoSwitch}
                onCheckedChange={setAutoSwitch}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme("light")}
              className="flex-1"
            >
              <Sun className="h-4 w-4 mr-2" />
              Light
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme("dark")}
              className="flex-1"
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme("system")}
              className="flex-1"
            >
              <Monitor className="h-4 w-4 mr-2" />
              System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}