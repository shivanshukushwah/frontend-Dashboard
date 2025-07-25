"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Loader2, HelpCircle, Shield } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ChatbotWidgetProps {
  isOpen?: boolean
  onToggle?: () => void
  position?: "bottom-right" | "bottom-left" | "embedded"
}

const quickSuggestions = [
  "How do I report a user?",
  "What types of content are blocked?",
  "How accurate is the AI detection?",
  "How to appeal a moderation decision?",
  "What are trust scores?",
  "How to export reports?",
]

const botResponses = {
  "how do i report a user":
    "To report a user, go to the Users tab, find the user, and click the 'Report' button. You can also report directly from the moderation interface when reviewing flagged content.",
  "what types of content are blocked":
    "ShadowBlock detects and blocks: cyberbullying, harassment, spam, threats, hate speech, toxicity, and inappropriate content. Our AI continuously learns to identify new patterns.",
  "how accurate is the ai detection":
    "Our AI moderation system maintains a 97.8% accuracy rate with only 1.9% false positives. The system continuously improves through machine learning and human feedback.",
  "how to appeal a moderation decision":
    "Users can appeal moderation decisions through the Appeals section. Each appeal is reviewed by human moderators within 24 hours.",
  "what are trust scores":
    "Trust scores (0-100) indicate user reliability based on account age, positive interactions, violation history, and community contributions. Higher scores mean lower risk.",
  "how to export reports":
    "Use the Export button in any section to download data as CSV, Excel, or PDF. You can customize date ranges and filter criteria before exporting.",
}

export function ChatbotWidget({ isOpen = false, onToggle, position = "bottom-right" }: ChatbotWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! I'm ShadowBot, your AI moderation assistant. How can I help you today?",
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    // Fallback responses based on keywords
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm here to help! You can ask me about reporting users, understanding moderation decisions, trust scores, or exporting data. What specific topic would you like to know about?"
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with regarding ShadowBlock?"
    }

    // Default response
    return "I understand you're asking about moderation. Could you be more specific? I can help with reporting users, understanding our AI detection, trust scores, appeals process, or data exports."
  }

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim()
    if (!messageContent) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageContent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(
      () => {
        const botResponse = generateBotResponse(messageContent)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: botResponse,
          timestamp: new Date(),
          suggestions: Math.random() > 0.5 ? quickSuggestions.slice(0, 2) : undefined,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4 z-50",
    "bottom-left": "fixed bottom-4 left-4 z-50",
    embedded: "relative",
  }

  if (!isOpen && position !== "embedded") {
    return (
      <Button
        onClick={onToggle}
        className={`${positionClasses[position]} w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg`}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card
      className={`${position !== "embedded" ? positionClasses[position] : ""} w-96 h-[500px] shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-sm">ShadowBot</CardTitle>
            <p className="text-xs text-blue-100">AI Moderation Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          {position !== "embedded" && (
            <Button variant="ghost" size="sm" onClick={onToggle} className="h-6 w-6 p-0 text-white hover:bg-white/20">
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(500px-60px)]">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === "user" ? "bg-blue-600" : "bg-gradient-to-r from-purple-500 to-blue-500"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages[messages.length - 1]?.suggestions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs h-7 bg-white/50 dark:bg-slate-800/50"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about moderation..."
                className="flex-1 bg-white/50 dark:bg-slate-800/50"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSendMessage("What types of content are blocked?")}
                className="text-xs h-6 text-gray-600 dark:text-gray-400"
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Help
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSendMessage("How accurate is the AI detection?")}
                className="text-xs h-6 text-gray-600 dark:text-gray-400"
              >
                <Shield className="h-3 w-3 mr-1" />
                AI Info
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
