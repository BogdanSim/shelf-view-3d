"use client"

import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  Save, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Download,
  Share2,
  MoreHorizontal,
  Grid3X3,
  Eye,
  Layers,
  Settings2,
  ChevronLeft
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useEditorStore } from "@/lib/editor-store"
import Link from "next/link"

const EditorScene = dynamic(
  () => import("@/components/editor/editor-scene").then(mod => mod.EditorScene),
  { ssr: false }
)

const ProductsPanel = dynamic(
  () => import("@/components/editor/products-panel").then(mod => mod.ProductsPanel),
  { ssr: false }
)

const PropertiesPanel = dynamic(
  () => import("@/components/editor/properties-panel").then(mod => mod.PropertiesPanel),
  { ssr: false }
)

const ExportDialog = dynamic(
  () => import("@/components/export-dialog").then(mod => mod.ExportDialog),
  { ssr: false }
)

// Mock project data
const projectsData: Record<string, { name: string; lastModified: string }> = {
  "1": { name: "Summer Campaign 2024", lastModified: "2 hours ago" },
  "2": { name: "Product Launch - Q2", lastModified: "Yesterday" },
  "3": { name: "Retail Display - Walmart", lastModified: "3 days ago" },
}

export default function EditorProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit")
  const [showGrid, setShowGrid] = useState(true)
  const { undo, redo, canUndo, canRedo, selectedProduct } = useEditorStore()

  const project = projectsData[projectId] || { name: "Untitled Project", lastModified: "Just now" }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Toolbar */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="font-semibold">{project.name}</h1>
            <p className="text-xs text-muted-foreground">Last saved {project.lastModified}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border bg-muted/50 p-1">
            <Button 
              variant={viewMode === "edit" ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("edit")}
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant={viewMode === "preview" ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("preview")}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo}>
            <Redo2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">100%</span>
          <Button variant="ghost" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowGrid(!showGrid)}
            className={showGrid ? "bg-muted" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate Project</DropdownMenuItem>
              <DropdownMenuItem>Project Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Version History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Products */}
        {viewMode === "edit" && (
          <div className="w-72 border-r flex flex-col">
            <Tabs defaultValue="products" className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger 
                  value="products"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Products
                </TabsTrigger>
                <TabsTrigger 
                  value="layers"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Layers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="products" className="flex-1 m-0 overflow-hidden">
                <ProductsPanel />
              </TabsContent>
              <TabsContent value="layers" className="flex-1 m-0 p-4">
                <p className="text-sm text-muted-foreground">
                  Scene layers will appear here
                </p>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Center - 3D Canvas */}
        <div className="flex-1 relative">
          <EditorScene showGrid={showGrid} />
        </div>

        {/* Right Panel - Properties */}
        {viewMode === "edit" && (
          <div className="w-80 border-l overflow-y-auto">
            <PropertiesPanel />
          </div>
        )}
      </div>

      {/* Export Dialog */}
      <ExportDialog open={showExportDialog} onOpenChange={setShowExportDialog} />
    </div>
  )
}
