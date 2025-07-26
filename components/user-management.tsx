"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Ban, AlertTriangle, Search, MoreHorizontal, Eye, MessageSquare } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
	{
		id: "user_12345",
		username: "gamer_pro_2024",
		email: "user@example.com",
		trustScore: 85,
		status: "active",
		joinDate: "2024-01-15",
		lastActive: "2 hours ago",
		violations: 2,
		platforms: ["Discord", "Gaming"],
		riskLevel: "low",
	},
	{
		id: "user_67890",
		username: "toxic_player",
		email: "toxic@example.com",
		trustScore: 23,
		status: "suspended",
		joinDate: "2023-12-01",
		lastActive: "1 day ago",
		violations: 8,
		platforms: ["Gaming", "Forum"],
		riskLevel: "high",
	},
	{
		id: "user_54321",
		username: "helpful_user",
		email: "helpful@example.com",
		trustScore: 96,
		status: "active",
		joinDate: "2023-08-20",
		lastActive: "30 minutes ago",
		violations: 0,
		platforms: ["Discord", "Chat", "Forum"],
		riskLevel: "low",
	},
	{
		id: "user_98765",
		username: "spam_bot_001",
		email: "spam@example.com",
		trustScore: 12,
		status: "banned",
		joinDate: "2024-01-10",
		lastActive: "3 days ago",
		violations: 15,
		platforms: ["Forum"],
		riskLevel: "critical",
	},
]

const moderators = [
	{
		id: "mod_001",
		username: "admin_sarah",
		email: "sarah@shadowblock.com",
		role: "Senior Moderator",
		actionsToday: 23,
		accuracy: 98.5,
		status: "online",
		permissions: ["ban", "review", "analytics"],
	},
	{
		id: "mod_002",
		username: "mod_alex",
		email: "alex@shadowblock.com",
		role: "Moderator",
		actionsToday: 15,
		accuracy: 96.2,
		status: "offline",
		permissions: ["review", "warn"],
	},
]

export function UserManagement() {
	const [searchTerm, setSearchTerm] = useState("")
	const [statusFilter, setStatusFilter] = useState("all")
	const [riskFilter, setRiskFilter] = useState("all")
	const [selectedUser, setSelectedUser] = useState(null)

	const getTrustScoreColor = (score: number) => {
		if (score >= 80) return "text-green-600 bg-green-100"
		if (score >= 60) return "text-yellow-600 bg-yellow-100"
		if (score >= 40) return "text-orange-600 bg-orange-100"
		return "text-red-600 bg-red-100"
	}

	const getRiskLevelColor = (level: string) => {
		switch (level) {
			case "low":
				return "bg-green-100 text-green-800"
			case "medium":
				return "bg-yellow-100 text-yellow-800"
			case "high":
				return "bg-orange-100 text-orange-800"
			case "critical":
				return "bg-red-100 text-red-800"
			default:
				return "bg-gray-100 text-gray-800"
		}
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800"
			case "suspended":
				return "bg-yellow-100 text-yellow-800"
			case "banned":
				return "bg-red-100 text-red-800"
			case "pending":
				return "bg-blue-100 text-blue-800"
			default:
				return "bg-gray-100 text-gray-800"
		}
	}

	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesStatus = statusFilter === "all" || user.status === statusFilter
		const matchesRisk = riskFilter === "all" || user.riskLevel === riskFilter
		return matchesSearch && matchesStatus && matchesRisk
	})

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
				<div>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
					<p className="text-gray-600 dark:text-gray-400">Manage users, moderators, and trust scores</p>
				</div>
				<div className="flex items-center space-x-3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search users..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 w-64"
						/>
					</div>
					<Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="suspended">Suspended</SelectItem>
							<SelectItem value="banned">Banned</SelectItem>
						</SelectContent>
					</Select>
					<Select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Risk</SelectItem>
							<SelectItem value="low">Low Risk</SelectItem>
							<SelectItem value="medium">Medium Risk</SelectItem>
							<SelectItem value="high">High Risk</SelectItem>
							<SelectItem value="critical">Critical</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Tabs defaultValue="users" className="space-y-6">
				<TabsList>
					<TabsTrigger value="users">Users</TabsTrigger>
					<TabsTrigger value="moderators">Moderators</TabsTrigger>
					<TabsTrigger value="trust-scores">Trust Scores</TabsTrigger>
				</TabsList>

				<TabsContent value="users" className="space-y-4">
					<div className="grid gap-4">
						{filteredUsers.map((user) => (
							<Card key={user.id} className="hover:shadow-md transition-shadow">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
												<User className="h-6 w-6 text-white" />
											</div>
											<div>
												<h3 className="font-semibold text-lg">{user.username}</h3>
												<p className="text-sm text-gray-600">{user.email}</p>
												<div className="flex items-center space-x-2 mt-1">
													<Badge className={getStatusColor(user.status)}>{user.status}</Badge>
													<Badge className={getRiskLevelColor(user.riskLevel)}>{user.riskLevel} risk</Badge>
												</div>
											</div>
										</div>

										<div className="flex items-center space-x-6">
											<div className="text-center">
												<p className="text-sm text-gray-500">Trust Score</p>
												<Badge className={getTrustScoreColor(user.trustScore)}>{user.trustScore}/100</Badge>
											</div>
											<div className="text-center">
												<p className="text-sm text-gray-500">Violations</p>
												<p className="font-semibold text-lg">{user.violations}</p>
											</div>
											<div className="text-center">
												<p className="text-sm text-gray-500">Last Active</p>
												<p className="text-sm">{user.lastActive}</p>
											</div>

											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="outline" size="sm">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>
														<Eye className="h-4 w-4 mr-2" />
														View Profile
													</DropdownMenuItem>
													<DropdownMenuItem>
														<MessageSquare className="h-4 w-4 mr-2" />
														View Messages
													</DropdownMenuItem>
													<DropdownMenuItem>
														<AlertTriangle className="h-4 w-4 mr-2" />
														Issue Warning
													</DropdownMenuItem>
													<DropdownMenuItem className="text-red-600">
														<Ban className="h-4 w-4 mr-2" />
														Suspend User
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>

									<div className="mt-4 pt-4 border-t">
										<div className="flex items-center justify-between text-sm">
											<div>
												<span className="text-gray-500">Platforms: </span>
												<span className="font-medium">{user.platforms.join(", ")}</span>
											</div>
											<div>
												<span className="text-gray-500">Joined: </span>
												<span className="font-medium">{user.joinDate}</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="moderators" className="space-y-4">
					<div className="grid gap-4">
						{moderators.map((mod) => (
							<Card key={mod.id}>
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
												<Shield className="h-6 w-6 text-white" />
											</div>
											<div>
												<h3 className="font-semibold text-lg">{mod.username}</h3>
												<p className="text-sm text-gray-600">{mod.email}</p>
												<Badge variant="outline" className="mt-1">
													{mod.role}
												</Badge>
											</div>
										</div>

										<div className="flex items-center space-x-6">
											<div className="text-center">
												<p className="text-sm text-gray-500">Actions Today</p>
												<p className="font-semibold text-lg">{mod.actionsToday}</p>
											</div>
											<div className="text-center">
												<p className="text-sm text-gray-500">Accuracy</p>
												<p className="font-semibold text-lg">{mod.accuracy}%</p>
											</div>
											<div className="text-center">
												<p className="text-sm text-gray-500">Status</p>
												<div className="flex items-center space-x-1">
													<div
														className={`w-2 h-2 rounded-full ${
															mod.status === "online" ? "bg-green-500" : "bg-gray-400"
														}`}
													></div>
													<span className="text-sm capitalize">{mod.status}</span>
												</div>
											</div>
										</div>
									</div>

									<div className="mt-4 pt-4 border-t">
										<div className="flex items-center space-x-4">
											<span className="text-sm text-gray-500">Permissions:</span>
											<div className="flex space-x-2">
												{mod.permissions.map((permission) => (
													<Badge key={permission} variant="secondary" className="text-xs">
														{permission}
													</Badge>
												))}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="trust-scores">
					<Card>
						<CardHeader>
							<CardTitle>Trust Score Analytics</CardTitle>
							<CardDescription>User behavior and trust score distribution</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
								<div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
									<p className="text-2xl font-bold text-green-600">67%</p>
									<p className="text-sm text-gray-600">High Trust (80+)</p>
								</div>
								<div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
									<p className="text-2xl font-bold text-yellow-600">23%</p>
									<p className="text-sm text-gray-600">Medium Trust (60-79)</p>
								</div>
								<div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
									<p className="text-2xl font-bold text-orange-600">8%</p>
									<p className="text-sm text-gray-600">Low Trust (40-59)</p>
								</div>
								<div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
									<p className="text-2xl font-bold text-red-600">2%</p>
									<p className="text-sm text-gray-600">Critical (&lt;40)</p>
								</div>
							</div>

							<div className="space-y-4">
								<h4 className="font-semibold">Trust Score Factors</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="p-4 border rounded-lg">
										<h5 className="font-medium mb-2">Positive Factors</h5>
										<ul className="text-sm space-y-1 text-gray-600">
											<li>• Account age and verification</li>
											<li>• Positive community interactions</li>
											<li>• Helpful content contributions</li>
											<li>• No violation history</li>
										</ul>
									</div>
									<div className="p-4 border rounded-lg">
										<h5 className="font-medium mb-2">Negative Factors</h5>
										<ul className="text-sm space-y-1 text-gray-600">
											<li>• Policy violations</li>
											<li>• User reports against account</li>
											<li>• Suspicious activity patterns</li>
											<li>• Repeated warnings</li>
										</ul>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
