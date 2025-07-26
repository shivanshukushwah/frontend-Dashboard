"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Activity, AlertTriangle, Shield, Zap, Pause, Play } from "lucide-react"

interface RealtimeEvent {
  id: number
  type: string
  platform: string
  severity: string
  timestamp: string
  action: string
}

export function RealtimeMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([])

  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(
      () => {
        const newEvent = {
          id: Date.now(),
          type: ["threat", "spam", "harassment", "toxicity"][Math.floor(Math.random() * 4)],
          platform: ["Discord", "Gaming", "Forum", "Chat"][Math.floor(Math.random() * 4)],
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
          timestamp: new Date().toLocaleTimeString(),
          action: "blocked",
        }

        setRealtimeEvents((prev) => [newEvent, ...prev.slice(0, 9)])
      },
      2000 + Math.random() * 3000,
    )

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "threat":
        return "🚨"
      case "spam":
        return "📧"
      case "harassment":
        return "😠"
      case "toxicity":
        return "☠️"
      default:
        return "⚠️"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Real-time Monitor</span>
            </CardTitle>
            <CardDescription>Live abuse detection and prevention</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsMonitoring(!isMonitoring)}>
              {isMonitoring ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </>
              )}
            </Button>
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${isMonitoring ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <span className="text-xs text-gray-500">{isMonitoring ? "Live" : "Paused"}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {realtimeEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Monitoring for abuse patterns...</p>
            </div>
          ) : (
            realtimeEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg animate-in slide-in-from-top-2 duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getTypeIcon(event.type)}</span>
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {event.type} detected on {event.platform}
                    </p>
                    <p className="text-xs text-gray-500">Action: Content {event.action}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                  <span className="text-xs text-gray-500">{event.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {isMonitoring && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-600">Processing: 47 msg/sec</span>
                </div>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-gray-600">Blocked: 3 threats</span>
                </div>
              </div>
              <span className="text-gray-500">Last update: now</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
