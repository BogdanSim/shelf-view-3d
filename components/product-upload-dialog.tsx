"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
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
  Upload, 
  FileUp, 
  Check, 
  Package,
  ArrowLeft,
  ArrowRight
} from "lucide-react"
import { Product3DPreview } from "@/components/product-3d-preview"

interface ProductUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categories = ["Beverages", "Snacks", "Dairy", "Household", "Personal Care", "Frozen", "Canned Goods"]
const materials = ["Metallic", "Plastic", "Glass", "Cardboard", "Paper"]

export function ProductUploadDialog({ open, onOpenChange }: ProductUploadDialogProps) {
  const [step, setStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    category: "",
    size: "",
    weight: "",
    width: "",
    height: "",
    depth: "",
    barcode: "",
    tags: "",
    color: "#3498db",
    material: ""
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const canProceed = () => {
    if (step === 1) return uploadProgress === 100
    if (step === 2) return productData.name && productData.brand && productData.category
    if (step === 3) return productData.material && productData.color
    return true
  }

  const handleClose = () => {
    setStep(1)
    setFile(null)
    setUploadProgress(0)
    setProductData({
      name: "",
      brand: "",
      category: "",
      size: "",
      weight: "",
      width: "",
      height: "",
      depth: "",
      barcode: "",
      tags: "",
      color: "#3498db",
      material: ""
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Upload Custom Product</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add your own 3D product model to the library
          </DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 py-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= s 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-12 h-0.5 mx-1 ${
                  step > s ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Upload Model */}
        {step === 1 && (
          <div className="space-y-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
            >
              {!file ? (
                <>
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-foreground font-medium mb-1">
                    Drag and drop your 3D model here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supported formats: GLB, glTF, OBJ, FBX (max 50MB)
                  </p>
                  <label>
                    <input
                      type="file"
                      accept=".glb,.gltf,.obj,.fbx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button variant="outline" className="border-border cursor-pointer" asChild>
                      <span>
                        <FileUp className="mr-2 h-4 w-4" />
                        Choose File
                      </span>
                    </Button>
                  </label>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Package className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {uploadProgress < 100 && (
                    <div className="max-w-xs mx-auto">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}
                  {uploadProgress === 100 && (
                    <div className="flex items-center justify-center gap-2 text-green-500">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Upload complete</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              GLB is recommended for best compatibility. Files are optimized automatically.
            </p>
          </div>
        )}

        {/* Step 2: Product Details */}
        {step === 2 && (
          <div className="space-y-4">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="name">Product Name *</FieldLabel>
                  <Input
                    id="name"
                    placeholder="e.g., Cola Classic 330ml"
                    className="bg-input border-border"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="brand">Brand *</FieldLabel>
                  <Input
                    id="brand"
                    placeholder="e.g., Coca-Cola"
                    className="bg-input border-border"
                    value={productData.brand}
                    onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="category">Category *</FieldLabel>
                  <Select 
                    value={productData.category} 
                    onValueChange={(value) => setProductData({ ...productData, category: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="size">Size/Volume</FieldLabel>
                  <Input
                    id="size"
                    placeholder="e.g., 330ml"
                    className="bg-input border-border"
                    value={productData.size}
                    onChange={(e) => setProductData({ ...productData, size: e.target.value })}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="width">Width (cm)</FieldLabel>
                  <Input
                    id="width"
                    type="number"
                    placeholder="6.6"
                    className="bg-input border-border"
                    value={productData.width}
                    onChange={(e) => setProductData({ ...productData, width: e.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="height">Height (cm)</FieldLabel>
                  <Input
                    id="height"
                    type="number"
                    placeholder="12.2"
                    className="bg-input border-border"
                    value={productData.height}
                    onChange={(e) => setProductData({ ...productData, height: e.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="depth">Depth (cm)</FieldLabel>
                  <Input
                    id="depth"
                    type="number"
                    placeholder="6.6"
                    className="bg-input border-border"
                    value={productData.depth}
                    onChange={(e) => setProductData({ ...productData, depth: e.target.value })}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="barcode">Barcode/EAN (optional)</FieldLabel>
                <Input
                  id="barcode"
                  placeholder="e.g., 5449000000996"
                  className="bg-input border-border"
                  value={productData.barcode}
                  onChange={(e) => setProductData({ ...productData, barcode: e.target.value })}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="tags">Tags (comma-separated)</FieldLabel>
                <Input
                  id="tags"
                  placeholder="e.g., Coca-Cola, 330ml, Can, Beverage"
                  className="bg-input border-border"
                  value={productData.tags}
                  onChange={(e) => setProductData({ ...productData, tags: e.target.value })}
                />
              </Field>
            </FieldGroup>
          </div>
        )}

        {/* Step 3: Texture & Appearance */}
        {step === 3 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
              <Product3DPreview color={productData.color} type="can" />
            </div>
            <div className="space-y-4">
              <Field>
                <FieldLabel htmlFor="material">Material Type *</FieldLabel>
                <Select 
                  value={productData.material} 
                  onValueChange={(value) => setProductData({ ...productData, material: value })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((mat) => (
                      <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="color">Base Color</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    className="w-12 h-10 p-1 bg-input border-border cursor-pointer"
                    value={productData.color}
                    onChange={(e) => setProductData({ ...productData, color: e.target.value })}
                  />
                  <Input
                    value={productData.color}
                    onChange={(e) => setProductData({ ...productData, color: e.target.value })}
                    className="flex-1 bg-input border-border"
                  />
                </div>
              </Field>

              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Upload custom texture/label (optional)
                </p>
                <Button variant="outline" size="sm" className="border-border">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
              <Product3DPreview color={productData.color} type="can" />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Product Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground">{productData.name || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand</span>
                  <span className="text-foreground">{productData.brand || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-foreground">{productData.category || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <span className="text-foreground">{productData.size || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="text-foreground">
                    {productData.width && productData.height && productData.depth 
                      ? `${productData.width} x ${productData.height} x ${productData.depth} cm`
                      : "—"
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material</span>
                  <span className="text-foreground">{productData.material || "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Color</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded" 
                      style={{ backgroundColor: productData.color }} 
                    />
                    <span className="text-foreground">{productData.color}</span>
                  </div>
                </div>
              </div>
              {file && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{file.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : handleClose()}
            className="border-border"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleClose}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Check className="mr-2 h-4 w-4" />
              Save to Library
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
