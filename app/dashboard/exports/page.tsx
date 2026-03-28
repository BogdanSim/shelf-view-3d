"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  Download, 
  Eye,
  Calendar,
  Image as ImageIcon,
  Trash2
} from "lucide-react"
import { useState } from "react"

const exports = [
  {
    id: 1,
    name: "Summer Beverage Display - Front View",
    project: "Summer Beverage Display",
    date: "2024-01-15",
    resolution: "4K",
    format: "PNG",
    size: "8.4 MB",
    quality: "HD"
  },
  {
    id: 2,
    name: "Summer Beverage Display - Side View",
    project: "Summer Beverage Display",
    date: "2024-01-15",
    resolution: "4K",
    format: "PNG",
    size: "7.9 MB",
    quality: "HD"
  },
  {
    id: 3,
    name: "New Product Launch - All Angles",
    project: "New Product Launch",
    date: "2024-01-14",
    resolution: "2K",
    format: "JPEG",
    size: "3.2 MB",
    quality: "Standard"
  },
  {
    id: 4,
    name: "Q1 Planogram - Front View",
    project: "Q1 Planogram",
    date: "2024-01-12",
    resolution: "1080p",
    format: "PNG",
    size: "2.1 MB",
    quality: "Standard"
  },
  {
    id: 5,
    name: "Holiday Promotion - Perspective",
    project: "Holiday Promotion",
    date: "2024-01-08",
    resolution: "4K",
    format: "PNG",
    size: "9.8 MB",
    quality: "HD"
  },
  {
    id: 6,
    name: "Energy Drinks Display - Top View",
    project: "Energy Drinks Display",
    date: "2024-01-05",
    resolution: "2K",
    format: "WebP",
    size: "1.8 MB",
    quality: "HD"
  },
]

export default function ExportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredExports = exports.filter((exp) => {
    const matchesSearch = exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || exp.quality.toLowerCase() === filter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Exports</h1>
          <p className="text-muted-foreground">{exports.length} exports total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exports..."
            className="pl-9 bg-input border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-32 bg-input border-border">
            <SelectValue placeholder="Quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="hd">HD</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Exports Grid */}
      {filteredExports.length === 0 ? (
        <Card className="border-border/50 bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No exports found</h3>
            <p className="text-muted-foreground text-center">
              {searchQuery ? "Try a different search term" : "Your exported images will appear here"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredExports.map((exp) => (
            <Card key={exp.id} className="border-border/50 bg-card overflow-hidden group">
              <div className="aspect-video bg-muted/30 relative flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant="secondary" 
                    className={exp.quality === "HD" 
                      ? "bg-primary/20 text-primary" 
                      : "bg-secondary text-secondary-foreground"
                    }
                  >
                    {exp.quality}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground text-sm truncate mb-1">
                  {exp.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{exp.project}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{exp.resolution} • {exp.format}</span>
                  <span>{exp.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(exp.date).toLocaleDateString()}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
