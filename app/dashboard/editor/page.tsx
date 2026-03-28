"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Save, 
  Download,
  ArrowLeft,
  PanelLeftClose,
  PanelRightClose,
  Grid3X3,
  Ruler
} from "lucide-react"
import Link from "next/link"
import { useEditorStore } from "@/lib/editor-store"
import { EditorScene } from "@/components/editor/editor-scene"
import { ProductsPanel } from "@/components/editor/products-panel"
import { PropertiesPanel } from "@/components/editor/properties-panel"
import { ExportDialog } from "@/components/export-dialog"

export default function EditorPage() {
  const {
    projectName,
    setProjectName,
    undo,
    redo,
    viewMode,
    setViewMode,
    gridSnap,
    setGridSnap,
    shelfConfig,
    measureMode,
    setMeasureMode,
  } = useEditorStore()
  
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          
          {isEditingName ? (
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
              className="w-48 h-8 bg-input border-border"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              {projectName}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-r-none text-muted-foreground hover:text-foreground"
              onClick={undo}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-l-none text-muted-foreground hover:text-foreground"
              onClick={redo}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border border-border rounded-md">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-r-none text-muted-foreground hover:text-foreground">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="px-2 text-xs text-muted-foreground">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none text-muted-foreground hover:text-foreground">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border border-border rounded-md">
            {(["3d", "front", "side", "top"] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "secondary" : "ghost"}
                size="sm"
                className={`h-8 text-xs capitalize ${
                  mode === "3d" ? "rounded-r-none" : 
                  mode === "top" ? "rounded-l-none" : "rounded-none"
                } ${viewMode === mode ? "" : "text-muted-foreground"}`}
                onClick={() => setViewMode(mode)}
              >
                {mode === "3d" ? "Free" : mode}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            onClick={() => setShowExportDialog(true)}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Products */}
        <div className={`${leftPanelOpen ? "w-72" : "w-0"} transition-all duration-300 border-r border-border bg-card overflow-hidden shrink-0`}>
          <ProductsPanel />
        </div>

        {/* Center - 3D Viewport */}
        <div className="flex-1 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 z-10 text-muted-foreground hover:text-foreground"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          >
            <PanelLeftClose className={`h-4 w-4 transition-transform ${!leftPanelOpen ? "rotate-180" : ""}`} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 text-muted-foreground hover:text-foreground"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
          >
            <PanelRightClose className={`h-4 w-4 transition-transform ${!rightPanelOpen ? "rotate-180" : ""}`} />
          </Button>

          <EditorScene />

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-card/80 backdrop-blur-sm border-t border-border flex items-center justify-between px-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Shelf: {shelfConfig.width} x {shelfConfig.height} x {shelfConfig.depth} cm</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={gridSnap ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => setGridSnap(!gridSnap)}
              >
                <Grid3X3 className="h-3 w-3" />
                Grid Snap
              </Button>
              <Button
                variant={measureMode ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => setMeasureMode(!measureMode)}
              >
                <Ruler className="h-3 w-3" />
                Measure
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className={`${rightPanelOpen ? "w-80" : "w-0"} transition-all duration-300 border-l border-border bg-card overflow-hidden shrink-0`}>
          <PropertiesPanel />
        </div>
      </div>

      <ExportDialog open={showExportDialog} onOpenChange={setShowExportDialog} />
    </div>
  )
}
