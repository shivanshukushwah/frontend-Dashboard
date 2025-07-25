"use client"

import React from "react"

import { Shield, Activity, Zap, Eye, BarChart3, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

const loadingSteps = [
  { id: 1, label: "Initializing AI Models", icon: Shield, duration: 1000 },
  { id: 2, label: "Loading Threat Database", icon: Activity, duration: 800 },
  { id: 3, label: "Connecting to Platforms", icon: Zap, duration: 1200 },
  { id: 4, label: "Analyzing User Patterns", icon: Users, duration: 900 },
  { id: 5, label: "Preparing Analytics", icon: BarChart3, duration: 700 },
  { id: 6, label: "Finalizing Dashboard", icon: Eye, duration: 600 },
]

export default function Loading() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let stepIndex = 0
    let progressValue = 0

    const runStep = () => {
      if (stepIndex < loadingSteps.length) {
        setCurrentStep(stepIndex)

        const step = loadingSteps[stepIndex]
        const stepProgress = ((stepIndex + 1) / loadingSteps.length) * 100

        // Animate progress for current step
        const progressInterval = setInterval(() => {
          progressValue += 2
          setProgress(Math.min(progressValue, stepProgress))

          if (progressValue >= stepProgress) {
            clearInterval(progressInterval)
            stepIndex++

            if (stepIndex < loadingSteps.length) {
              setTimeout(runStep, 200)
            } else {
              setIsComplete(true)
            }
          }
        }, step.duration / 50)
      }
    }

    runStep()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Shield className="h-10 w-10 text-white" />
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-purple-400/40 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ShadowBlock</h1>
            <p className="text-gray-600 dark:text-gray-400">AI-Powered Content Moderation System</p>
          </div>
        </div>

        {/* Loading Progress */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6 space-y-6">
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading Progress</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Current Step */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {currentStep < loadingSteps.length && (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      {React.createElement(loadingSteps[currentStep].icon, {
                        className: "h-4 w-4 text-white",
                      })}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {loadingSteps[currentStep].label}
                      </p>
                      <div className="flex space-x-1 mt-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}

                {isComplete && (
                  <>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">System Ready!</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Redirecting to dashboard...</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Loading Steps List */}
            <div className="space-y-2">
              {loadingSteps.map((step, index) => {
                const isCompleted = index < currentStep || isComplete
                const isCurrent = index === currentStep && !isComplete
                const isPending = index > currentStep && !isComplete

                return (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                      isCurrent
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : isCompleted
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "bg-gray-50 dark:bg-gray-800/50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500"
                          : isCurrent
                            ? "bg-blue-500 animate-pulse"
                            : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      {React.createElement(step.icon, {
                        className: `h-3 w-3 ${isCompleted || isCurrent ? "text-white" : "text-gray-500"}`,
                      })}
                    </div>
                    <span
                      className={`text-xs transition-all duration-300 ${
                        isCompleted
                          ? "text-green-700 dark:text-green-400 line-through"
                          : isCurrent
                            ? "text-blue-700 dark:text-blue-400 font-medium"
                            : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isCompleted && (
                      <div className="ml-auto">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-1 bg-white rounded-full transform rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AI Models: Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Database: Connected</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>APIs: Ready</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Securing digital communities with advanced AI technology
          </p>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-green-400/10 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  )
}
