"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CheckCircle, XCircle, Clock, User, MessageSquare, Flag, Ban, Eye, Search } from "lucide-react"

const flaggedContent = [
  {
    id: 1,
    type: "cyberbullying",
    content: "You're such a loser, nobody likes you...",
    user: "user_12345",
    platform: "Discord",
    room: "Gaming Room #42",
    timestamp: "2024-01-20 14:30:22",
    severity: "high",
    confidence: 0.94,
    status: "pending",
  },
  {
    id: 2,
    type: "harassment",
    content: "Stop messaging me or I'll find where you live",
    user: "user_67890",
    platform: "Chat App",
    room: "Private Chat",
    timestamp: "2024-01-20 14:25:15",
    severity: "critical",
    confidence: 0.98,
    status: "pending",
  },
  {
    id: 3,
    type: "spam",
    content: "Click here for FREE MONEY!!! Limited time offer!!!",
    user: "user_54321",
    platform: "Forum",
    room: "General Discussion",
    timestamp: "2024-01-20 14:20:08",
    severity: "medium",
    confidence: 0.89,
    status: "pending",
  },
]

const userReports = [
  {
    id: 1,
    reporter: "user_abc123",
    reported: "user_def456",
    reason: "Harassment",
    description: "This user has been sending threatening messages",
    timestamp: "2024-01-20 13:45:30",
    status: "under_review",
  },
  {
    id: 2,
    reporter: "user_ghi789",
    reported: "user_jkl012",
    reason: "Spam",
    description: "Posting the same message repeatedly",
    timestamp: "2024-01-20 13:30:15",
    status: "resolved",
  },
]

export function ModerationInterface() {
  const [selectedContent, setSelectedContent] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")

  const handleApprove = (id: number) => {
    console.log("Approved content:", id)
  }

  const handleReject = (id: number) => {
    console.log("Rejected content:", id)
  }

  const handleBanUser = (userId: string) => {
    console.log("Banned user:", userId)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cyberbullying":
        return "bg-red-100 text-red-800"
      case "harassment":
        return "bg-purple-100 text-purple-800"
      case "spam":
        return "bg-yellow-100 text-yellow-800"
      case "threats":
        return "bg-red-100 text-red-800"
      case "toxicity":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Moderation</h2>
          <p className="text-gray-600 dark:text-gray-400">Review and manage flagged content and user reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterType} onChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cyberbullying">Cyberbullying</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
              <SelectItem value="threats">Threats</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="flagged" className="space-y-6">
        <TabsList>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          <TabsTrigger value="reports">User Reports</TabsTrigger>
          <TabsTrigger value="history">Moderation History</TabsTrigger>
        </TabsList>

        <TabsContent value="flagged" className="space-y-4">
          <div className="grid gap-4">
            {flaggedContent.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge className={getSeverityColor(item.severity)}>{item.severity.toUpperCase()}</Badge>
                      <Badge variant="outline" className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                      <span className="text-sm text-gray-500">Confidence: {(item.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{item.timestamp}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm font-mono">{item.content}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">User:</span>
                        <p className="font-medium">{item.user}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Platform:</span>
                        <p className="font-medium">{item.platform}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Room:</span>
                        <p className="font-medium">{item.room}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <Badge variant="outline" className="ml-1">
                          {item.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Context
                        </Button>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          User Profile
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(item.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Block
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleBanUser(item.user)}>
                          <Ban className="h-4 w-4 mr-2" />
                          Ban User
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            {userReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">User Report #{report.id}</CardTitle>
                    <Badge variant={report.status === "resolved" ? "default" : "secondary"}>
                      {report.status.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Reporter:</span>
                        <p className="font-medium">{report.reporter}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Reported User:</span>
                        <p className="font-medium">{report.reported}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Reason:</span>
                        <p className="font-medium">{report.reason}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-500 text-sm">Description:</span>
                      <p className="mt-1">{report.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-gray-500">{report.timestamp}</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          View Messages
                        </Button>
                        <Button variant="outline" size="sm">
                          <Flag className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                        {report.status !== "resolved" && <Button size="sm">Resolve</Button>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Moderation History</CardTitle>
              <CardDescription>Recent moderation actions and decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Content Blocked",
                    user: "user_12345",
                    reason: "Cyberbullying",
                    moderator: "admin_001",
                    time: "2 hours ago",
                  },
                  {
                    action: "User Banned",
                    user: "user_67890",
                    reason: "Repeated Harassment",
                    moderator: "admin_002",
                    time: "4 hours ago",
                  },
                  {
                    action: "Content Approved",
                    user: "user_54321",
                    reason: "False Positive",
                    moderator: "admin_001",
                    time: "6 hours ago",
                  },
                  {
                    action: "Warning Issued",
                    user: "user_98765",
                    reason: "Spam",
                    moderator: "admin_003",
                    time: "8 hours ago",
                  },
                ].map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          entry.action.includes("Banned")
                            ? "bg-red-500"
                            : entry.action.includes("Blocked")
                              ? "bg-orange-500"
                              : entry.action.includes("Warning")
                                ? "bg-yellow-500"
                                : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium">{entry.action}</p>
                        <p className="text-sm text-gray-600">
                          User: {entry.user} • Reason: {entry.reason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{entry.time}</p>
                      <p className="text-xs text-gray-400">by {entry.moderator}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
