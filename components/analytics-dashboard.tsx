"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Download, Filter, TrendingUp, AlertTriangle, Shield, Users } from "lucide-react"

const threatData = [
  { name: "Mon", cyberbullying: 45, harassment: 32, spam: 78, threats: 12, toxicity: 56 },
  { name: "Tue", cyberbullying: 52, harassment: 28, spam: 65, threats: 18, toxicity: 43 },
  { name: "Wed", cyberbullying: 38, harassment: 41, spam: 82, threats: 9, toxicity: 67 },
  { name: "Thu", cyberbullying: 61, harassment: 35, spam: 71, threats: 15, toxicity: 52 },
  { name: "Fri", cyberbullying: 48, harassment: 29, spam: 89, threats: 22, toxicity: 74 },
  { name: "Sat", cyberbullying: 73, harassment: 46, spam: 95, threats: 31, toxicity: 88 },
  { name: "Sun", cyberbullying: 67, harassment: 38, spam: 76, threats: 19, toxicity: 61 },
]

const platformData = [
  { name: "Discord", value: 35, color: "#5865F2" },
  { name: "Gaming Platforms", value: 28, color: "#00D4AA" },
  { name: "Forums", value: 18, color: "#FF6B6B" },
  { name: "Chat Apps", value: 12, color: "#4ECDC4" },
  { name: "Social Media", value: 7, color: "#45B7D1" },
]

const accuracyData = [
  { time: "00:00", accuracy: 96.2, falsePositives: 3.1 },
  { time: "04:00", accuracy: 97.1, falsePositives: 2.8 },
  { time: "08:00", accuracy: 98.3, falsePositives: 1.9 },
  { time: "12:00", accuracy: 97.8, falsePositives: 2.3 },
  { time: "16:00", accuracy: 98.1, falsePositives: 2.1 },
  { time: "20:00", accuracy: 97.5, falsePositives: 2.7 },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive abuse detection and prevention metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.3%</div>
            <p className="text-xs text-gray-600">+0.5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positives</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1.9%</div>
            <p className="text-xs text-gray-600">-0.3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0.3s</div>
            <p className="text-xs text-gray-600">Average detection time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">45.7K</div>
            <p className="text-xs text-gray-600">Active this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Types Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Threat Detection by Type</CardTitle>
            <CardDescription>Weekly breakdown of detected abuse types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cyberbullying" stackId="a" fill="#ef4444" />
                <Bar dataKey="harassment" stackId="a" fill="#f97316" />
                <Bar dataKey="spam" stackId="a" fill="#eab308" />
                <Bar dataKey="threats" stackId="a" fill="#dc2626" />
                <Bar dataKey="toxicity" stackId="a" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Abuse by Platform</CardTitle>
            <CardDescription>Distribution of detected abuse across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Accuracy */}
        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
            <CardDescription>Accuracy and false positive rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="falsePositives" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Abuse Trend Analysis</CardTitle>
            <CardDescription>Overall abuse detection trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="cyberbullying"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="harassment"
                  stackId="1"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="toxicity"
                  stackId="1"
                  stroke="#7c3aed"
                  fill="#7c3aed"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
          <CardDescription>Comprehensive breakdown of moderation statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Metric</th>
                  <th className="text-left p-2">Current</th>
                  <th className="text-left p-2">Previous</th>
                  <th className="text-left p-2">Change</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    metric: "Total Messages Processed",
                    current: "1,247,832",
                    previous: "1,112,456",
                    change: "+12.2%",
                    status: "good",
                  },
                  { metric: "Threats Detected", current: "8,934", previous: "9,721", change: "-8.1%", status: "good" },
                  { metric: "False Positives", current: "234", previous: "312", change: "-25.0%", status: "excellent" },
                  {
                    metric: "Response Time (avg)",
                    current: "0.3s",
                    previous: "0.4s",
                    change: "-25.0%",
                    status: "excellent",
                  },
                  { metric: "User Reports", current: "156", previous: "203", change: "-23.2%", status: "good" },
                ].map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{row.metric}</td>
                    <td className="p-2">{row.current}</td>
                    <td className="p-2 text-gray-600">{row.previous}</td>
                    <td className="p-2">
                      <span className={`${row.change.startsWith("+") ? "text-red-600" : "text-green-600"}`}>
                        {row.change}
                      </span>
                    </td>
                    <td className="p-2">
                      <Badge variant={row.status === "excellent" ? "default" : "secondary"}>{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
