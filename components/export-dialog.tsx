"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Download, 
  Zap,
  Image as ImageIcon,
  CheckCircle,
  Layers
} from "lucide-react"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const resolutions = [
  { value: "1080p", label: "1080p (1920x1080)" },
  { value: "2k", label: "2K (2560x1440)" },
  { value: "4k", label: "4K (3840x2160)" },
  { value: "custom", label: "Custom" },
]

const formats = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
]

const backgrounds = [
  { value: "transparent", label: "Transparent (PNG only)" },
  { value: "white", label: "White" },
  { value: "custom", label: "Custom Color" },
  { value: "environment", label: "Store Environment" },
]

const cameraAngles = [
  { value: "current", label: "Current View" },
  { value: "front", label: "Front" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "top", label: "Top" },
  { value: "all", label: "All Angles (4 images)" },
]

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const [resolution, setResolution] = useState("1080p")
  const [customWidth, setCustomWidth] = useState("1920")
  const [customHeight, setCustomHeight] = useState("1080")
  const [quality, setQuality] = useState("standard")
  const [format, setFormat] = useState("png")
  const [jpegQuality, setJpegQuality] = useState([85])
  const [background, setBackground] = useState("white")
  const [customBgColor, setCustomBgColor] = useState("#ffffff")
  const [cameraAngle, setCameraAngle] = useState("current")
  const [includePriceTags, setIncludePriceTags] = useState(false)
  const [includeLabels, setIncludeLabels] = useState(false)
  const [includeDimensions, setIncludeDimensions] = useState(false)
  const [includeWatermark, setIncludeWatermark] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)
  const [capturedDataURL, setCapturedDataURL] = useState<string | null>(null)

  const captureCanvas = (): string | null => {
    // The Three.js canvas has preserveDrawingBuffer:true, grab it directly
    const canvas = document.querySelector("#shelf-canvas canvas") as HTMLCanvasElement | null
               ?? document.querySelector("canvas") as HTMLCanvasElement | null
    if (!canvas) return null
    const mime = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png"
    const q = format === "jpeg" ? jpegQuality[0] / 100 : 1
    return canvas.toDataURL(mime, q)
  }

  const handleQuickExport = () => {
    const dataURL = captureCanvas()
    setCapturedDataURL(dataURL)
    setExportComplete(true)
  }

  const handleHDRender = () => {
    setIsExporting(true)
    setExportProgress(0)
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          const dataURL = captureCanvas()
          setCapturedDataURL(dataURL)
          setExportComplete(true)
          return 100
        }
        return prev + 3
      })
    }, 200)
  }

  const handleDownload = () => {
    if (!capturedDataURL) return
    const a = document.createElement("a")
    a.href = capturedDataURL
    a.download = `shelf-mockup.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleClose = () => {
    setExportComplete(false)
    setExportProgress(0)
    setIsExporting(false)
    setCapturedDataURL(null)
    onOpenChange(false)
  }

  if (exportComplete) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md bg-card border-border">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Export Complete!</h3>
            <p className="text-muted-foreground text-center mb-6">
              Your shelf visualization has been rendered successfully.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="border-border" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleDownload}
                disabled={!capturedDataURL}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Export Shelf Visualization</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Configure your export settings and render your shelf mockup.
          </DialogDescription>
        </DialogHeader>

        {isExporting ? (
          <div className="py-12">
            <div className="flex flex-col items-center">
              <Layers className="h-12 w-12 text-primary animate-pulse mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {quality === "hd" ? "Rendering HD Image..." : "Exporting..."}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {quality === "hd" 
                  ? "This may take up to 30 seconds" 
                  : "Almost there..."
                }
              </p>
              <div className="w-full max-w-xs">
                <Progress value={exportProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {exportProgress}%
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preview */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Preview</h4>
              <div 
                className="aspect-video rounded-lg border border-border flex items-center justify-center"
                style={{ 
                  backgroundColor: background === "custom" ? customBgColor : 
                                   background === "white" ? "#ffffff" : 
                                   background === "transparent" ? "transparent" : "#1a1a2e"
                }}
              >
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Preview will appear here</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Render credits remaining: <span className="text-foreground font-medium">47/50</span> this month
              </p>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-xs">Resolution</FieldLabel>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutions.map((res) => (
                        <SelectItem key={res.value} value={res.value}>
                          {res.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {resolution === "custom" && (
                  <div className="grid grid-cols-2 gap-2">
                    <Field>
                      <FieldLabel className="text-xs">Width</FieldLabel>
                      <Input
                        type="number"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        className="bg-input border-border h-8"
                      />
                    </Field>
                    <Field>
                      <FieldLabel className="text-xs">Height</FieldLabel>
                      <Input
                        type="number"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                        className="bg-input border-border h-8"
                      />
                    </Field>
                  </div>
                )}

                <Field>
                  <FieldLabel className="text-xs">Quality</FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={quality === "standard" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setQuality("standard")}
                      className="border-border justify-start"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Standard (Instant)
                    </Button>
                    <Button
                      variant={quality === "hd" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setQuality("hd")}
                      className="border-border justify-start"
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      HD (1 credit)
                    </Button>
                  </div>
                </Field>

                <Field>
                  <FieldLabel className="text-xs">Format</FieldLabel>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {format === "jpeg" && (
                  <Field>
                    <FieldLabel className="text-xs">JPEG Quality ({jpegQuality[0]}%)</FieldLabel>
                    <Slider
                      value={jpegQuality}
                      onValueChange={setJpegQuality}
                      min={60}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </Field>
                )}

                <Field>
                  <FieldLabel className="text-xs">Background</FieldLabel>
                  <Select value={background} onValueChange={setBackground}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {backgrounds.map((bg) => (
                        <SelectItem 
                          key={bg.value} 
                          value={bg.value}
                          disabled={bg.value === "transparent" && format !== "png"}
                        >
                          {bg.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {background === "custom" && (
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customBgColor}
                      onChange={(e) => setCustomBgColor(e.target.value)}
                      className="w-10 h-8 p-1 bg-input border-border cursor-pointer"
                    />
                    <Input
                      value={customBgColor}
                      onChange={(e) => setCustomBgColor(e.target.value)}
                      className="flex-1 bg-input border-border h-8"
                    />
                  </div>
                )}

                <Field>
                  <FieldLabel className="text-xs">Camera Angle</FieldLabel>
                  <Select value={cameraAngle} onValueChange={setCameraAngle}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cameraAngles.map((angle) => (
                        <SelectItem key={angle.value} value={angle.value}>
                          {angle.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>

              <div className="space-y-2">
                <FieldLabel className="text-xs">Include</FieldLabel>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="priceTags" 
                      checked={includePriceTags}
                      onCheckedChange={(checked) => setIncludePriceTags(checked as boolean)}
                    />
                    <label htmlFor="priceTags" className="text-sm text-foreground cursor-pointer">
                      Price tags
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="labels" 
                      checked={includeLabels}
                      onCheckedChange={(checked) => setIncludeLabels(checked as boolean)}
                    />
                    <label htmlFor="labels" className="text-sm text-foreground cursor-pointer">
                      Shelf labels
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="dimensions" 
                      checked={includeDimensions}
                      onCheckedChange={(checked) => setIncludeDimensions(checked as boolean)}
                    />
                    <label htmlFor="dimensions" className="text-sm text-foreground cursor-pointer">
                      Dimensions overlay
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="watermark" 
                      checked={includeWatermark}
                      onCheckedChange={(checked) => setIncludeWatermark(checked as boolean)}
                    />
                    <label htmlFor="watermark" className="text-sm text-foreground cursor-pointer">
                      Brand watermark
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isExporting && (
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={handleClose} className="border-border">
              Cancel
            </Button>
            <Button variant="outline" onClick={handleQuickExport} className="border-border">
              <Zap className="mr-2 h-4 w-4" />
              Quick Export
            </Button>
            <Button 
              onClick={handleHDRender}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              HD Render
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
