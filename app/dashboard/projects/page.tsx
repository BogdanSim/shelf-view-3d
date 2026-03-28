"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NewProjectDialog } from "@/components/new-project-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Search, 
  Grid3X3, 
  List, 
  MoreVertical,
  Copy,
  Pencil,
  Download,
  Archive,
  Trash2,
  Layers,
  FolderOpen
} from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    name: "Summer Beverage Display",
    thumbnail: "/placeholder.svg",
    lastModified: "2024-01-15",
    status: "Draft",
    shelfType: "Gondola",
    productsCount: 24
  },
  {
    id: 2,
    name: "New Product Launch",
    thumbnail: "/placeholder.svg",
    lastModified: "2024-01-14",
    status: "Exported",
    shelfType: "End Cap",
    productsCount: 18
  },
  {
    id: 3,
    name: "Q1 Planogram",
    thumbnail: "/placeholder.svg",
    lastModified: "2024-01-12",
    status: "Draft",
    shelfType: "Wall Unit",
    productsCount: 42
  },
  {
    id: 4,
    name: "Holiday Promotion",
    thumbnail: "/placeholder.svg",
    lastModified: "2024-01-08",
    status: "Exported",
    shelfType: "Cooler",
    productsCount: 15
  },
  {
    id: 5,
    name: "Snack Aisle Refresh",
    thumbnail: "/placeholder.svg",
    lastModified: "2024-01-05",
    status: "Archived",
    shelfType: "Gondola",
    productsCount: 36
  },
  {
    id: 6,
    name: "Energy Drinks Display",
    thumbnail: "/placeholder.svg",
    lastModified: "2024-01-03",
    status: "Draft",
    shelfType: "End Cap",
    productsCount: 12
  },
]

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.status.toLowerCase() === filter
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">{projects.length} projects total</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowNewProjectDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-9 w-64 bg-input border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 bg-input border-border">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="exported">Exported</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="text-foreground"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="text-foreground"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <Card className="border-border/50 bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4 text-center">
              {searchQuery ? "Try a different search term" : "Create your first shelf project to get started"}
            </p>
            <Link href="/dashboard/editor">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="border-border/50 bg-card overflow-hidden group">
              <Link href={`/dashboard/editor?project=${project.id}`}>
                <div className="aspect-video bg-muted/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <Layers className="h-10 w-10" />
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/dashboard/editor?project=${project.id}`}>
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors truncate">
                      {project.name}
                    </h3>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    {project.shelfType}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    project.status === "Exported" 
                      ? "bg-green-500/10 text-green-500" 
                      : project.status === "Archived"
                      ? "bg-muted text-muted-foreground"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Modified {new Date(project.lastModified).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Shelf Type</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Products</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Modified</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-4">
                      <Link href={`/dashboard/editor?project=${project.id}`} className="flex items-center gap-3">
                        <div className="h-10 w-14 rounded bg-muted/50 flex items-center justify-center">
                          <Layers className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-foreground hover:text-primary transition-colors">
                          {project.name}
                        </span>
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{project.shelfType}</td>
                    <td className="p-4 text-sm text-muted-foreground">{project.productsCount}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(project.lastModified).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === "Exported" 
                          ? "bg-green-500/10 text-green-500" 
                          : project.status === "Archived"
                          ? "bg-muted text-muted-foreground"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* New Project Dialog */}
      <NewProjectDialog 
        open={showNewProjectDialog} 
        onOpenChange={setShowNewProjectDialog} 
      />
    </div>
  )
}
