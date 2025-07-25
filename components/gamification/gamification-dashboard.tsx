"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Award, Zap, Crown, Gift } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: Date
  points: number
}

interface UserLevel {
  current: number
  xp: number
  xpToNext: number
  title: string
}

const achievements: Achievement[] = [
  {
    id: "1",
    name: "First Strike",
    description: "Block your first piece of harmful content",
    icon: "🛡️",
    rarity: "common",
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date("2024-01-15"),
    points: 100,
  },
  {
    id: "2",
    name: "Guardian Angel",
    description: "Protect 100 users from harmful content",
    icon: "👼",
    rarity: "rare",
    progress: 87,
    maxProgress: 100,
    unlocked: false,
    points: 500,
  },
  {
    id: "3",
    name: "Threat Hunter",
    description: "Detect 1000 threats accurately",
    icon: "🎯",
    rarity: "epic",
    progress: 743,
    maxProgress: 1000,
    unlocked: false,
    points: 1000,
  },
  {
    id: "4",
    name: "Perfect Moderator",
    description: "Maintain 99% accuracy for 30 days",
    icon: "⭐",
    rarity: "legendary",
    progress: 23,
    maxProgress: 30,
    unlocked: false,
    points: 2500,
  },
]

const userStats = {
  level: { current: 12, xp: 2847, xpToNext: 653, title: "Senior Moderator" },
  totalPoints: 15420,
  rank: 47,
  totalUsers: 1247,
  streakDays: 15,
  badges: 23,
  achievements: 12,
}

const leaderboard = [
  { rank: 1, name: "Alex Chen", points: 25430, level: 18, badge: "👑" },
  { rank: 2, name: "Sarah Johnson", points: 23890, level: 17, badge: "🥈" },
  { rank: 3, name: "Mike Rodriguez", points: 22150, level: 16, badge: "🥉" },
  { rank: 4, name: "Emma Wilson", points: 20980, level: 15, badge: "🏅" },
  { rank: 5, name: "David Kim", points: 19750, level: 15, badge: "🏅" },
]

export function GamificationDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gamification Center</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your moderation achievements and compete with others</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <Crown className="h-3 w-3 mr-1" />
            Level {userStats.level.current}
          </Badge>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* User Level Progress */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Level {userStats.level.current}</CardTitle>
                  <CardDescription className="text-blue-100">{userStats.level.title}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">Total Points</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {userStats.level.current + 1}</span>
                  <span>
                    {userStats.level.xp}/{userStats.level.xp + userStats.level.xpToNext} XP
                  </span>
                </div>
                <Progress
                  value={(userStats.level.xp / (userStats.level.xp + userStats.level.xpToNext)) * 100}
                  className="h-3 bg-blue-400"
                />
                <div className="text-xs text-blue-100">{userStats.level.xpToNext} XP needed for next level</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">#{userStats.rank}</div>
                <p className="text-xs text-gray-600">of {userStats.totalUsers.toLocaleString()} users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Zap className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{userStats.streakDays}</div>
                <p className="text-xs text-gray-600">days active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                <Award className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{userStats.badges}</div>
                <p className="text-xs text-gray-600">total badges</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Star className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{userStats.achievements}</div>
                <p className="text-xs text-gray-600">unlocked</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements
                  .filter((a) => a.unlocked)
                  .slice(0, 3)
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{achievement.name}</h4>
                          <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">+{achievement.points}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${achievement.unlocked ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`text-4xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{achievement.name}</h3>
                        <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                        {achievement.unlocked && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            <Trophy className="h-3 w-3 mr-1" />
                            Unlocked
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>

                      {!achievement.unlocked && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                        </div>
                      )}

                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Unlocked on {achievement.unlockedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">+{achievement.points}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>Top moderators this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-4 p-4 rounded-lg ${
                      user.rank <= 3
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800"
                        : "bg-gray-50 dark:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1
                            ? "bg-yellow-500 text-white"
                            : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        }`}
                      >
                        {user.rank <= 3 ? user.badge : user.rank}
                      </div>
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Level {user.level}</p>
                      </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Your Position */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-400">Your Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
                  {userStats.rank}
                </div>
                <div>
                  <h4 className="font-semibold">You</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Level {userStats.level.current}</p>
                </div>
                <div className="flex-1"></div>
                <div className="text-right">
                  <div className="font-bold text-lg">{userStats.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>Redeem your points for exclusive rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Custom Badge", cost: 1000, icon: "🏆", description: "Design your own profile badge" },
                  { name: "Priority Support", cost: 2500, icon: "⚡", description: "24/7 priority customer support" },
                  {
                    name: "Advanced Analytics",
                    cost: 5000,
                    icon: "📊",
                    description: "Unlock detailed analytics dashboard",
                  },
                  { name: "Custom Theme", cost: 3000, icon: "🎨", description: "Create your own dashboard theme" },
                  { name: "API Access", cost: 7500, icon: "🔧", description: "Full API access for integrations" },
                  { name: "Exclusive Title", cost: 10000, icon: "👑", description: "Unlock legendary moderator title" },
                ].map((reward, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-3">{reward.icon}</div>
                      <h3 className="font-semibold mb-2">{reward.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          {reward.cost.toLocaleString()} pts
                        </Badge>
                        <Button
                          size="sm"
                          disabled={userStats.totalPoints < reward.cost}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Gift className="h-3 w-3 mr-1" />
                          Redeem
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
