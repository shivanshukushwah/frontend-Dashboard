"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  Users,
  TrendingUp,
  MessageSquare,
  Eye,
  Ban,
  Activity,
  Zap,
  Settings,
  Bell,
  Download,
  RefreshCw,
  Filter,
  Search,
  BarChart3,
  Map,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useThemeContext } from "@/contexts/theme-context"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { ModerationInterface } from "@/components/moderation-interface"
import { AbuseHeatmap } from "@/components/abuse-heatmap"
import { RealtimeMonitor } from "@/components/realtime-monitor"
import { UserManagement } from "@/components/user-management"
import { SettingsPanel } from "@/components/settings-panel"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface SystemStats {
  totalMessages: number
  blockedContent: number
  activeUsers: number
  threatsPrevented: number
  moderationAccuracy: number
  responseTime: number
  uptime: number
  falsePositives: number
}

interface RealtimeData {
  messagesPerSecond: number
  threatsDetected: number
  activeRooms: number
  cpuUsage: number
  memoryUsage: number
  queueSize: number
}

interface ThreatAlert {
  id: string
  type: "critical" | "high" | "medium" | "low"
  message: string
  platform: string
  timestamp: string
  severity: string
  user?: string
}

export default function Page() {
  const { theme, resolvedTheme, mounted } = useThemeContext()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // System Statistics
  const [stats, setStats] = useState<SystemStats>({
    totalMessages: 1247832,
    blockedContent: 8934,
    activeUsers: 45672,
    threatsPrevented: 234,
    moderationAccuracy: 97.8,
    responseTime: 0.3,
    uptime: 99.9,
    falsePositives: 1.9,
  })

  // Real-time Data
  const [realtimeData, setRealtimeData] = useState<RealtimeData>({
    messagesPerSecond: 0,
    threatsDetected: 0,
    activeRooms: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    queueSize: 0,
  })

  // Threat Alerts
  const [threatAlerts, setThreatAlerts] = useState<ThreatAlert[]>([])

  // Recent Activity
  const [recentActivity, setRecentActivity] = useState([
    {
      id: "1",
      type: "threat",
      message: "Critical threat detected in Gaming Room #42",
      time: "2 min ago",
      severity: "critical",
      platform: "Discord",
      user: "user_12345",
    },
    {
      id: "2",
      type: "spam",
      message: "Spam pattern blocked in Chat #15",
      time: "5 min ago",
      severity: "medium",
      platform: "Slack",
      user: "user_67890",
    },
    {
      id: "3",
      type: "harassment",
      message: "Harassment prevented in Forum #8",
      time: "8 min ago",
      severity: "high",
      platform: "Forum",
      user: "user_54321",
    },
    {
      id: "4",
      type: "toxicity",
      message: "Toxic content filtered in Room #23",
      time: "12 min ago",
      severity: "low",
      platform: "Gaming",
      user: "user_98765",
    },
  ])

  // System Performance Metrics
  const [performanceMetrics, setPerformanceMetrics] = useState({
    apiLatency: 45,
    databaseConnections: 23,
    activeWebsockets: 156,
    errorRate: 0.02,
    throughput: 1247,
  })

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true)

      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsLoading(false)
    }

    initializeData()
  }, [])

  // Real-time data updates
  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      setRealtimeData((prev) => ({
        messagesPerSecond: Math.floor(Math.random() * 50) + 10,
        threatsDetected: Math.floor(Math.random() * 5),
        activeRooms: Math.floor(Math.random() * 100) + 200,
        cpuUsage: Math.floor(Math.random() * 30) + 20,
        memoryUsage: Math.floor(Math.random() * 40) + 30,
        queueSize: Math.floor(Math.random() * 20) + 5,
      }))

      // Update performance metrics
      setPerformanceMetrics((prev) => ({
        apiLatency: Math.floor(Math.random() * 20) + 35,
        databaseConnections: Math.floor(Math.random() * 10) + 20,
        activeWebsockets: Math.floor(Math.random() * 50) + 130,
        errorRate: Math.random() * 0.05,
        throughput: Math.floor(Math.random() * 200) + 1100,
      }))

      // Occasionally add new threat alerts
      if (Math.random() < 0.3) {
        const newAlert: ThreatAlert = {
          id: Date.now().toString(),
          type: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as ThreatAlert["type"],
          message: [
            "Suspicious activity detected",
            "Multiple violations from single user",
            "Coordinated harassment campaign identified",
            "Spam bot network discovered",
            "Hate speech pattern emerging",
          ][Math.floor(Math.random() * 5)],
          platform: ["Discord", "Gaming", "Forum", "Chat"][Math.floor(Math.random() * 4)],
          timestamp: new Date().toLocaleTimeString(),
          severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)],
          user: `user_${Math.floor(Math.random() * 99999)}`,
        }

        setThreatAlerts((prev) => [newAlert, ...prev.slice(0, 4)])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isLoading])

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update stats with new random values
    setStats((prev) => ({
      ...prev,
      totalMessages: prev.totalMessages + Math.floor(Math.random() * 1000),
      blockedContent: prev.blockedContent + Math.floor(Math.random() * 50),
      activeUsers: prev.activeUsers + Math.floor(Math.random() * 100) - 50,
      threatsPrevented: prev.threatsPrevented + Math.floor(Math.random() * 10),
    }))

    setRefreshing(false)
  }

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "low":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
    }
  }

  // Get activity type icon
  const getActivityIcon = (type: string) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ShadowBlock</h2>
            <p className="text-gray-600 dark:text-gray-400">Initializing AI-Powered Content Moderation...</p>
            <div className="w-64 mx-auto">
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ShadowBlock</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Content Moderation</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search threats, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/50 dark:bg-slate-800/50"
                />
              </div>

              {/* Time Range Selector */}
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32 bg-white/50 dark:bg-slate-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>

              {/* System Status */}
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                System Active
              </Badge>

              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/50 dark:bg-slate-800/50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative bg-white/50 dark:bg-slate-800/50">
                <Bell className="h-4 w-4" />
                {threatAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    {threatAlerts.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Real-time Stats Bar */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-300">Messages/sec:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{realtimeData.messagesPerSecond}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-gray-600 dark:text-gray-300">Threats detected:</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{realtimeData.threatsDetected}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-300">Active rooms:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{realtimeData.activeRooms}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <span className="text-gray-600 dark:text-gray-300">CPU:</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">{realtimeData.cpuUsage}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-600 dark:text-gray-300">Queue:</span>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">{realtimeData.queueSize}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()} • Uptime: {stats.uptime}%
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add the dashboard link here */}
        <div className="mb-6">
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Go to Dashboard
          </Link>
        </div>

        {/* Threat Alerts Banner */}
        {threatAlerts.length > 0 && (
          <div className="mb-6">
            <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-400">Active Threat Alerts</h3>
                      <p className="text-sm text-red-600 dark:text-red-300">
                        {threatAlerts.length} new threat{threatAlerts.length > 1 ? "s" : ""} detected
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-100 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900/20 bg-transparent"
                  >
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMessages.toLocaleString()}</div>
              <p className="text-xs text-blue-100">+12% from last month</p>
              <div className="mt-2">
                <Progress value={85} className="h-1 bg-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Content</CardTitle>
              <Ban className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blockedContent.toLocaleString()}</div>
              <p className="text-xs text-red-100">-8% from last month</p>
              <div className="mt-2">
                <Progress value={65} className="h-1 bg-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-green-100">+23% from last month</p>
              <div className="mt-2">
                <Progress value={92} className="h-1 bg-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.moderationAccuracy}%</div>
              <p className="text-xs text-purple-100">+0.3% from last month</p>
              <div className="mt-2">
                <Progress value={stats.moderationAccuracy} className="h-1 bg-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {performanceMetrics.apiLatency}ms
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">API Latency</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {performanceMetrics.databaseConnections}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">DB Connections</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {performanceMetrics.activeWebsockets}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">WebSockets</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {(performanceMetrics.errorRate * 100).toFixed(2)}%
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Error Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {performanceMetrics.throughput}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Throughput/min</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Moderation</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Heatmap</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RealtimeMonitor />

              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm hover:bg-gray-100/50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getActivityIcon(activity.type)}</span>
                          <div>
                            <p className="text-sm font-medium">{activity.message}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {activity.platform}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">User: {activity.user}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getSeverityColor(activity.severity)}>{activity.severity}</Badge>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{realtimeData.cpuUsage}%</span>
                    </div>
                    <Progress value={realtimeData.cpuUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>{realtimeData.memoryUsage}%</span>
                    </div>
                    <Progress value={realtimeData.memoryUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Queue Size</span>
                      <span>{realtimeData.queueSize}</span>
                    </div>
                    <Progress value={(realtimeData.queueSize / 50) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                    <span className="font-semibold">{stats.responseTime}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">False Positives</span>
                    <span className="font-semibold">{stats.falsePositives}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{stats.uptime}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Threats Prevented</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{stats.threatsPrevented}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Alert Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="moderation">
            <ModerationInterface />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="heatmap">
            <AbuseHeatmap />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-gray-900 dark:text-white">ShadowBlock</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">© 2024 AI-Powered Content Moderation</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Version 2.1.0</span>
              <span>•</span>
              <span>API Status: Online</span>
              <span>•</span>
              <span>Theme: {resolvedTheme || theme}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
