"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Settings2,
  Sun,
  Trash2,
  RotateCcw,
  Camera
} from "lucide-react"
import { useEditorStore } from "@/lib/editor-store"

export function PropertiesPanel() {
  const { 
    selectedProductId, 
    products, 
    updateProduct, 
    removeProduct,
    shelfConfig, 
    updateShelfConfig,
    sceneConfig,
    updateSceneConfig
  } = useEditorStore()

  const selectedProduct = products.find(p => p.id === selectedProductId)

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="properties" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid grid-cols-2 bg-muted">
          <TabsTrigger value="properties" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="scene" className="gap-2">
            <Sun className="h-4 w-4" />
            Scene
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="flex-1 flex flex-col mt-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            {selectedProduct ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-muted-foreground capitalize">
                    {selectedProduct.type}
                  </p>
                </div>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Position
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Field>
                      <FieldLabel className="text-xs">X (cm)</FieldLabel>
                      <Input
                        type="number"
                        step="0.1"
                        value={(selectedProduct.position[0] * 100).toFixed(1)}
                        onChange={(e) => updateProduct(selectedProduct.id, {
                          position: [parseFloat(e.target.value) / 100, selectedProduct.position[1], selectedProduct.position[2]]
                        })}
                        className="bg-input border-border h-8 text-sm"
                      />
                    </Field>
                    <Field>
                      <FieldLabel className="text-xs">Y (cm)</FieldLabel>
                      <Input
                        type="number"
                        step="0.1"
                        value={(selectedProduct.position[1] * 100).toFixed(1)}
                        onChange={(e) => updateProduct(selectedProduct.id, {
                          position: [selectedProduct.position[0], parseFloat(e.target.value) / 100, selectedProduct.position[2]]
                        })}
                        className="bg-input border-border h-8 text-sm"
                      />
                    </Field>
                    <Field>
                      <FieldLabel className="text-xs">Z (cm)</FieldLabel>
                      <Input
                        type="number"
                        step="0.1"
                        value={(selectedProduct.position[2] * 100).toFixed(1)}
                        onChange={(e) => updateProduct(selectedProduct.id, {
                          position: [selectedProduct.position[0], selectedProduct.position[1], parseFloat(e.target.value) / 100]
                        })}
                        className="bg-input border-border h-8 text-sm"
                      />
                    </Field>
                  </div>
                </FieldGroup>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Rotation
                  </h4>
                  <Field>
                    <FieldLabel className="text-xs">Y Rotation (0-360°)</FieldLabel>
                    <Slider
                      value={[(selectedProduct.rotation[1] * 180) / Math.PI]}
                      onValueChange={([value]) => updateProduct(selectedProduct.id, {
                        rotation: [selectedProduct.rotation[0], (value * Math.PI) / 180, selectedProduct.rotation[2]]
                      })}
                      min={0}
                      max={360}
                      step={1}
                      className="mt-2"
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Facing
                  </h4>
                  <Field>
                    <FieldLabel className="text-xs">Quantity (1-20)</FieldLabel>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-border"
                        onClick={() => updateProduct(selectedProduct.id, {
                          quantity: Math.max(1, selectedProduct.quantity - 1)
                        })}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={selectedProduct.quantity}
                        onChange={(e) => updateProduct(selectedProduct.id, {
                          quantity: Math.min(20, Math.max(1, parseInt(e.target.value) || 1))
                        })}
                        className="bg-input border-border h-8 text-sm text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-border"
                        onClick={() => updateProduct(selectedProduct.id, {
                          quantity: Math.min(20, selectedProduct.quantity + 1)
                        })}
                      >
                        +
                      </Button>
                    </div>
                  </Field>
                </FieldGroup>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => removeProduct(selectedProduct.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove from Shelf
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Shelf Configuration</h3>
                  <p className="text-xs text-muted-foreground">
                    Select a product to edit its properties
                  </p>
                </div>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Shelf Type
                  </h4>
                  <Select 
                    value={shelfConfig.type}
                    onValueChange={(value) => updateShelfConfig({ type: value as typeof shelfConfig.type })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gondola">Gondola</SelectItem>
                      <SelectItem value="endcap">End Cap</SelectItem>
                      <SelectItem value="wallunit">Wall Unit</SelectItem>
                      <SelectItem value="cooler">Cooler</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Dimensions (cm)
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Field>
                      <FieldLabel className="text-xs">Width</FieldLabel>
                      <Input
                        type="number"
                        value={shelfConfig.width}
                        onChange={(e) => updateShelfConfig({ width: parseInt(e.target.value) || 120 })}
                        className="bg-input border-border h-8 text-sm"
                      />
                    </Field>
                    <Field>
                      <FieldLabel className="text-xs">Height</FieldLabel>
                      <Input
                        type="number"
                        value={shelfConfig.height}
                        onChange={(e) => updateShelfConfig({ height: parseInt(e.target.value) || 180 })}
                        className="bg-input border-border h-8 text-sm"
                      />
                    </Field>
                    <Field>
                      <FieldLabel className="text-xs">Depth</FieldLabel>
                      <Input
                        type="number"
                        value={shelfConfig.depth}
                        onChange={(e) => updateShelfConfig({ depth: parseInt(e.target.value) || 40 })}
                        className="bg-input border-border h-8 text-sm"
                      />
                    </Field>
                  </div>
                </FieldGroup>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Shelves
                  </h4>
                  <Field>
                    <FieldLabel className="text-xs">Number of Shelves (2-8)</FieldLabel>
                    <Slider
                      value={[shelfConfig.numberOfShelves]}
                      onValueChange={([value]) => updateShelfConfig({ numberOfShelves: value })}
                      min={2}
                      max={8}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-center text-sm text-muted-foreground mt-1">
                      {shelfConfig.numberOfShelves} shelves
                    </div>
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Material
                  </h4>
                  <Select 
                    value={shelfConfig.material}
                    onValueChange={(value) => updateShelfConfig({ material: value as typeof shelfConfig.material })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wood">Wood</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="white">White Laminate</SelectItem>
                    </SelectContent>
                  </Select>
                  <Field className="mt-3">
                    <FieldLabel className="text-xs">Color Override</FieldLabel>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={shelfConfig.color}
                        onChange={(e) => updateShelfConfig({ color: e.target.value })}
                        className="w-10 h-8 p-1 bg-input border-border cursor-pointer"
                      />
                      <Input
                        value={shelfConfig.color}
                        onChange={(e) => updateShelfConfig({ color: e.target.value })}
                        className="flex-1 bg-input border-border h-8 text-sm"
                      />
                    </div>
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Display Options
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FieldLabel className="text-sm">Show Price Tags</FieldLabel>
                      <Switch
                        checked={shelfConfig.showPriceTags}
                        onCheckedChange={(checked) => updateShelfConfig({ showPriceTags: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <FieldLabel className="text-sm">Show Shelf Labels</FieldLabel>
                      <Switch
                        checked={shelfConfig.showShelfLabels}
                        onCheckedChange={(checked) => updateShelfConfig({ showShelfLabels: checked })}
                      />
                    </div>
                  </div>
                </FieldGroup>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="scene" className="flex-1 flex flex-col mt-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              <FieldGroup>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Lighting
                </h4>
                <Field>
                  <FieldLabel className="text-xs">Ambient Intensity</FieldLabel>
                  <Slider
                    value={[sceneConfig.ambientIntensity]}
                    onValueChange={([value]) => updateSceneConfig({ ambientIntensity: value })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="mt-2"
                  />
                </Field>
                <Field className="mt-3">
                  <FieldLabel className="text-xs">Directional Light Intensity</FieldLabel>
                  <Slider
                    value={[sceneConfig.directionalIntensity]}
                    onValueChange={([value]) => updateSceneConfig({ directionalIntensity: value })}
                    min={0}
                    max={2}
                    step={0.1}
                    className="mt-2"
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Background
                </h4>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={sceneConfig.backgroundColor}
                    onChange={(e) => updateSceneConfig({ backgroundColor: e.target.value })}
                    className="w-10 h-8 p-1 bg-input border-border cursor-pointer"
                  />
                  <Input
                    value={sceneConfig.backgroundColor}
                    onChange={(e) => updateSceneConfig({ backgroundColor: e.target.value })}
                    className="flex-1 bg-input border-border h-8 text-sm"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {["#1a1a2e", "#ffffff", "#f0f0f0", "#2c3e50", "#0f0f23"].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateSceneConfig({ backgroundColor: color })}
                      className={`h-8 w-8 rounded border-2 transition-colors ${
                        sceneConfig.backgroundColor === color ? "border-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Camera Presets
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {(["front", "left", "right", "top", "perspective"] as const).map((preset) => (
                    <Button
                      key={preset}
                      variant={sceneConfig.cameraPreset === preset ? "secondary" : "outline"}
                      size="sm"
                      className="capitalize border-border"
                      onClick={() => updateSceneConfig({ cameraPreset: preset })}
                    >
                      <Camera className="mr-2 h-3 w-3" />
                      {preset}
                    </Button>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Rendering
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-sm">Shadows</FieldLabel>
                    <Switch
                      checked={sceneConfig.shadowsEnabled}
                      onCheckedChange={(checked) => updateSceneConfig({ shadowsEnabled: checked })}
                    />
                  </div>
                </div>
              </FieldGroup>

              <Button variant="outline" size="sm" className="w-full border-border">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Scene
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
