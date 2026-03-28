"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Download, 
  Users,
  Calendar
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

const viewsData = [
  { name: "Mon", views: 120, exports: 24 },
  { name: "Tue", views: 180, exports: 32 },
  { name: "Wed", views: 150, exports: 28 },
  { name: "Thu", views: 220, exports: 45 },
  { name: "Fri", views: 280, exports: 52 },
  { name: "Sat", views: 90, exports: 18 },
  { name: "Sun", views: 75, exports: 12 },
]

const monthlyData = [
  { name: "Jan", projects: 8, products: 45 },
  { name: "Feb", projects: 12, products: 68 },
  { name: "Mar", projects: 15, products: 92 },
  { name: "Apr", projects: 18, products: 110 },
  { name: "May", projects: 22, products: 145 },
  { name: "Jun", projects: 28, products: 178 },
]

const exportTypeData = [
  { name: "PNG", value: 45, color: "#4361ee" },
  { name: "JPEG", value: 30, color: "#7209b7" },
  { name: "WebP", value: 15, color: "#3a0ca3" },
  { name: "PDF", value: 10, color: "#560bad" },
]

const topProjects = [
  { name: "Summer Campaign 2024", views: 1240, exports: 89 },
  { name: "Product Launch - Q2", views: 980, exports: 67 },
  { name: "Retail Display - Walmart", views: 756, exports: 45 },
  { name: "Brand Refresh Preview", views: 543, exports: 34 },
  { name: "Holiday Collection", views: 421, exports: 28 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your project performance and export metrics
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18.2%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exports</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+4</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Across 3 teams
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Views & Exports</CardTitle>
                <CardDescription>
                  Daily activity over the selected period
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stackId="1"
                      stroke="#4361ee" 
                      fill="#4361ee" 
                      fillOpacity={0.4}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="exports" 
                      stackId="2"
                      stroke="#7209b7" 
                      fill="#7209b7" 
                      fillOpacity={0.4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Export Formats</CardTitle>
                <CardDescription>
                  Distribution by file type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={exportTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {exportTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Growth</CardTitle>
              <CardDescription>
                Projects and products created over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="projects" fill="#4361ee" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="products" fill="#7209b7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Projects</CardTitle>
              <CardDescription>
                Projects with the most engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProjects.map((project, index) => (
                  <div key={project.name} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{project.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {project.views.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {project.exports} exports
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      +{Math.floor(Math.random() * 20 + 5)}%
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
