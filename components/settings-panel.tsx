"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Slider } from "./ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Shield, Globe, Bell, Database, Zap, Save } from "lucide-react"

export function SettingsPanel() {
  const [moderationSensitivity, setModerationSensitivity] = useState([75])
  const [autoBlock, setAutoBlock] = useState(true)
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("UTC")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure moderation policies and system behavior</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="moderation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="moderation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Moderation Policies</span>
              </CardTitle>
              <CardDescription>Configure how the AI moderation system behaves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Moderation Sensitivity</Label>
                  <p className="text-sm text-gray-600 mb-4">Adjust how strict the moderation system should be</p>
                  <Slider
                    value={moderationSensitivity}
                    onValueChange={setModerationSensitivity}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Lenient</span>
                    <span>Current: {moderationSensitivity[0]}%</span>
                    <span>Strict</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Auto-Block Content</Label>
                        <p className="text-sm text-gray-600">Automatically block detected abuse</p>
                      </div>
                      <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Real-time Monitoring</Label>
                        <p className="text-sm text-gray-600">Monitor content as it's posted</p>
                      </div>
                      <Switch checked={realTimeMonitoring} onCheckedChange={setRealTimeMonitoring} />
                    </div>

                    <div>
                      <Label className="text-base font-medium">Default Action</Label>
                      <Select defaultValue="block">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="block">Block Content</SelectItem>
                          <SelectItem value="flag">Flag for Review</SelectItem>
                          <SelectItem value="warn">Warn User</SelectItem>
                          <SelectItem value="delay">Delay Message</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Escalation Threshold</Label>
                      <Select defaultValue="3">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 violation</SelectItem>
                          <SelectItem value="3">3 violations</SelectItem>
                          <SelectItem value="5">5 violations</SelectItem>
                          <SelectItem value="10">10 violations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Review Queue Priority</Label>
                      <Select defaultValue="severity">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="severity">By Severity</SelectItem>
                          <SelectItem value="time">By Time</SelectItem>
                          <SelectItem value="platform">By Platform</SelectItem>
                          <SelectItem value="user">By User Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-medium">False Positive Handling</Label>
                      <Select defaultValue="learn">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="learn">Learn and Adapt</SelectItem>
                          <SelectItem value="manual">Manual Review</SelectItem>
                          <SelectItem value="ignore">Ignore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Categories</CardTitle>
              <CardDescription>Enable or disable specific abuse detection categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Cyberbullying", enabled: true, description: "Detect bullying and harassment" },
                  { name: "Hate Speech", enabled: true, description: "Identify discriminatory language" },
                  { name: "Threats", enabled: true, description: "Detect violent threats" },
                  { name: "Spam", enabled: true, description: "Block repetitive content" },
                  { name: "Grooming", enabled: true, description: "Detect predatory behavior" },
                  { name: "Self-Harm", enabled: false, description: "Identify self-harm content" },
                  { name: "Toxicity", enabled: true, description: "General toxic behavior" },
                  { name: "NSFW Content", enabled: false, description: "Adult content detection" },
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    <Switch defaultChecked={category.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>Configure when and how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable Notifications</Label>
                  <p className="text-sm text-gray-600">Receive alerts for moderation events</p>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                {[
                  { name: "High Severity Threats", enabled: true, description: "Critical abuse detection" },
                  { name: "System Alerts", enabled: true, description: "System status and errors" },
                  { name: "Daily Reports", enabled: false, description: "Daily moderation summary" },
                  { name: "User Reports", enabled: true, description: "New user-submitted reports" },
                  { name: "False Positives", enabled: false, description: "Potential false positive alerts" },
                ].map((notification) => (
                  <div
                    key={notification.name}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{notification.name}</p>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                    <Switch defaultChecked={notification.enabled} />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email Notifications</Label>
                    <Input type="email" placeholder="admin@example.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>Slack Webhook URL</Label>
                    <Input placeholder="https://hooks.slack.com/..." className="mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Platform Integrations</span>
              </CardTitle>
              <CardDescription>Connect ShadowBlock with external platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {[
                  { name: "Discord Bot", status: "connected", description: "Monitor Discord servers" },
                  { name: "Slack Integration", status: "disconnected", description: "Workplace chat monitoring" },
                  { name: "Gaming Platform API", status: "connected", description: "Game chat moderation" },
                  { name: "Forum Integration", status: "pending", description: "Forum post monitoring" },
                  { name: "WhatsApp Business", status: "disconnected", description: "Business chat moderation" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          integration.status === "connected"
                            ? "bg-green-500"
                            : integration.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {integration.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure external API integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>OpenAI API Key</Label>
                  <Input type="password" placeholder="sk-..." className="mt-2" />
                </div>
                <div>
                  <Label>Perspective API Key</Label>
                  <Input type="password" placeholder="AIza..." className="mt-2" />
                </div>
                <div>
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://your-app.com/webhook" className="mt-2" />
                </div>
                <div>
                  <Label>Rate Limit (requests/min)</Label>
                  <Input type="number" defaultValue="100" className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Localization Settings</span>
              </CardTitle>
              <CardDescription>Configure language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium">Default Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      <SelectItem value="JST">Japan Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Supported Languages for Moderation</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Japanese",
                    "Chinese",
                    "Korean",
                    "Arabic",
                    "Russian",
                    "Hindi",
                  ].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <Switch defaultChecked={["English", "Spanish", "French"].includes(lang)} />
                      <span className="text-sm">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Custom Response Messages</Label>
                <p className="text-sm text-gray-600 mb-3">Customize automated response messages</p>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm">Blocked Content Message</Label>
                    <Textarea
                      placeholder="This message violates our community guidelines and has been blocked."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Warning Message</Label>
                    <Textarea
                      placeholder="Please review our community guidelines. Continued violations may result in account restrictions."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Advanced Configuration</span>
              </CardTitle>
              <CardDescription>Advanced system settings and performance tuning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Settings</h4>
                  <div>
                    <Label>Processing Queue Size</Label>
                    <Input type="number" defaultValue="1000" className="mt-2" />
                  </div>
                  <div>
                    <Label>Cache Duration (minutes)</Label>
                    <Input type="number" defaultValue="60" className="mt-2" />
                  </div>
                  <div>
                    <Label>Batch Processing Size</Label>
                    <Input type="number" defaultValue="50" className="mt-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Security Settings</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Audit Logging</Label>
                      <p className="text-sm text-gray-600">Log all moderation actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Encrypt Sensitive Data</Label>
                      <p className="text-sm text-gray-600">Encrypt user messages in logs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label>Data Retention (days)</Label>
                    <Input type="number" defaultValue="90" className="mt-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Model Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Model</Label>
                    <Select defaultValue="roberta">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="roberta">RoBERTa-large</SelectItem>
                        <SelectItem value="bert">BERT-base</SelectItem>
                        <SelectItem value="t5">T5-small</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Confidence Threshold</Label>
                    <Input type="number" step="0.01" defaultValue="0.85" className="mt-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Backup & Recovery</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Automatic Backups</p>
                    <p className="text-sm text-gray-600">Daily backup of configuration and logs</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Export Settings</p>
                    <p className="text-sm text-gray-600">Download current configuration</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
