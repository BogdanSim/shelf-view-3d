"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  FolderOpen, 
  Download, 
  Package, 
  HardDrive,
  TrendingUp,
  ArrowRight,
  Layers
} from "lucide-react"
import Link from "next/link"

const stats = [
  { 
    label: "Total Projects", 
    value: "12", 
    change: "+2 this month",
    icon: FolderOpen,
    trend: "up"
  },
  { 
    label: "Exports This Month", 
    value: "47", 
    change: "+12 vs last month",
    icon: Download,
    trend: "up"
  },
  { 
    label: "Products Used", 
    value: "156", 
    change: "of 500",
    icon: Package,
    trend: "neutral"
  },
  { 
    label: "Storage Used", 
    value: "2.4 GB", 
    change: "of 5 GB",
    icon: HardDrive,
    trend: "neutral"
  },
]

const recentProjects = [
  {
    id: 1,
    name: "Summer Beverage Display",
    thumbnail: "/placeholder.svg",
    lastEdited: "2 hours ago",
    status: "Draft",
    shelfType: "Gondola"
  },
  {
    id: 2,
    name: "New Product Launch",
    thumbnail: "/placeholder.svg",
    lastEdited: "Yesterday",
    status: "Exported",
    shelfType: "End Cap"
  },
  {
    id: 3,
    name: "Q1 Planogram",
    thumbnail: "/placeholder.svg",
    lastEdited: "3 days ago",
    status: "Draft",
    shelfType: "Wall Unit"
  },
  {
    id: 4,
    name: "Holiday Promotion",
    thumbnail: "/placeholder.svg",
    lastEdited: "1 week ago",
    status: "Exported",
    shelfType: "Cooler"
  },
]

const quickActions = [
  { label: "Browse Products", href: "/dashboard/products", icon: Package },
  { label: "New Shelf Layout", href: "/dashboard/editor", icon: Layers },
  { label: "View Exports", href: "/dashboard/exports", icon: Download },
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, John</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your projects.</p>
        </div>
        <Link href="/dashboard/editor">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Recent Projects</CardTitle>
                <CardDescription>Your latest shelf visualizations</CardDescription>
              </div>
              <Link href="/dashboard/projects">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {recentProjects.map((project) => (
                  <Link 
                    key={project.id} 
                    href={`/dashboard/editor?project=${project.id}`}
                    className="group"
                  >
                    <div className="rounded-lg border border-border/50 bg-secondary/30 overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                      <div className="aspect-video bg-muted/50 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          <Layers className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                            {project.name}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            project.status === "Exported" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{project.shelfType}</span>
                          <span>{project.lastEdited}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription>Shortcuts to common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-border/50 bg-secondary/30 hover:bg-secondary hover:border-primary/50 text-foreground"
                  >
                    <action.icon className="mr-3 h-4 w-4 text-primary" />
                    {action.label}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Usage Card */}
          <Card className="border-border/50 bg-card mt-6">
            <CardHeader>
              <CardTitle className="text-foreground">Plan Usage</CardTitle>
              <CardDescription>Professional Plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">HD Renders</span>
                  <span className="text-foreground">47/50</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "94%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="text-foreground">2.4/5 GB</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "48%" }} />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full border-border/50 text-foreground">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
