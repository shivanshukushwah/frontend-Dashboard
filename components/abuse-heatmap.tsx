// import React from "react"

"use client"
import React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, AlertTriangle, Globe, Filter } from "lucide-react"

// Mock data for demonstration
const abuseData = [
  { region: "North America", incidents: 2847, severity: "high", lat: 45.0, lng: -100.0 },
  { region: "Europe", incidents: 1923, severity: "medium", lat: 50.0, lng: 10.0 },
  { region: "Asia Pacific", incidents: 3421, severity: "high", lat: 35.0, lng: 105.0 },
  { region: "South America", incidents: 892, severity: "low", lat: -15.0, lng: -60.0 },
  { region: "Africa", incidents: 567, severity: "low", lat: 0.0, lng: 20.0 },
  { region: "Middle East", incidents: 1234, severity: "medium", lat: 25.0, lng: 45.0 },
]

const platformData = [
  { platform: "Discord Servers", incidents: 1847, growth: "+12%" },
  { platform: "Gaming Platforms", incidents: 1523, growth: "-8%" },
  { platform: "Social Forums", incidents: 923, growth: "+23%" },
  { platform: "Chat Applications", incidents: 734, growth: "+5%" },
  { platform: "Educational Platforms", incidents: 234, growth: "-15%" },
]

export function AbuseHeatmap() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [timeRange, setTimeRange] = useState("7d")
  const [abuseType, setAbuseType] = useState("all")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Abuse Heatmap</h2>
          <p className="text-gray-600 dark:text-gray-400">Geographic distribution of abuse incidents and patterns</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={abuseType} onValueChange={setAbuseType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cyberbullying">Cyberbullying</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Global Abuse Distribution</span>
            </CardTitle>
            <CardDescription>Interactive map showing abuse incidents by region</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for actual map implementation */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">Interactive Map Visualization</p>
                <p className="text-sm text-gray-500">Integrate with Mapbox or Leaflet.js for live map</p>
              </div>

              {/* Mock data points */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-red-600 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Breakdown</CardTitle>
            <CardDescription>Abuse incidents by geographic region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {abuseData.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">{region.region}</p>
                      <p className="text-xs text-gray-500">{region.incidents} incidents</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(region.severity)}>{region.severity}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Hotspots</CardTitle>
            <CardDescription>Abuse incidents by platform type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{platform.platform}</p>
                    <p className="text-sm text-gray-600">{platform.incidents} incidents</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={platform.growth.startsWith("+") ? "destructive" : "default"}>
                      {platform.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>Abuse patterns and emerging threats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-800 dark:text-red-400">High Alert</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Cyberbullying incidents increased by 23% in gaming platforms this week
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-400">Trending</span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  New harassment patterns detected in educational platforms
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-400">Global Pattern</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Peak abuse hours: 3-6 PM local time across all regions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Geographic Analysis</CardTitle>
          <CardDescription>Comprehensive breakdown of abuse patterns by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Region</th>
                  <th className="text-left p-3">Total Incidents</th>
                  <th className="text-left p-3">Cyberbullying</th>
                  <th className="text-left p-3">Harassment</th>
                  <th className="text-left p-3">Spam</th>
                  <th className="text-left p-3">Threats</th>
                  <th className="text-left p-3">Trend</th>
                </tr>
              </thead>
             <tbody>
  {[
    {
      region: "North America",
      total: 2847,
      cyberbullying: 1234,
      harassment: 892,
      spam: 567,
      threats: 154,
      trend: "+12%",
    },
    {
      region: "Asia Pacific",
      total: 3421,
      cyberbullying: 1567,
      harassment: 1023,
      spam: 678,
      threats: 153,
      trend: "+18%",
    },
    {
      region: "Europe",
      total: 1923,
      cyberbullying: 823,
      harassment: 567,
      spam: 423,
      threats: 110,
      trend: "-5%",
    },
    {
      region: "South America",
      total: 892,
      cyberbullying: 345,
      harassment: 267,
      spam: 234,
      threats: 46,
      trend: "+8%",
    },
    {
      region: "Africa",
      total: 567,
      cyberbullying: 234,
      harassment: 178,
      spam: 123,
      threats: 32,
      trend: "+15%",
    },
    {
      region: "Middle East",
      total: 1234,
      cyberbullying: 567,
      harassment: 345,
      spam: 267,
      threats: 55,
      trend: "+3%",
    }
  ].map((row, index) => (
    <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-slate-800">
      <td className="p-3 font-medium">{row.region}</td>
      <td className="p-3">{row.total.toLocaleString()}</td>
      <td className="p-3">{row.cyberbullying.toLocaleString()}</td>
      <td className="p-3">{row.harassment.toLocaleString()}</td>
      <td className="p-3">{row.spam.toLocaleString()}</td>
      <td className="p-3">{row.threats.toLocaleString()}</td>
      <td className="p-3">
        <span className={`${row.trend.startsWith("+") ? "text-red-600" : "text-green-600"}`}>
          {row.trend}
        </span>
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
