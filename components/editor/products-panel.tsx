"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Search,
  Plus,
  Package,
  Layers,
  GripVertical
} from "lucide-react"
import { useEditorStore, Product } from "@/lib/editor-store"

const productTemplates = [
  { name: "Cola Can", type: "can" as const, color: "#e74c3c", dimensions: { w: 6.6, h: 12.2, d: 6.6 } },
  { name: "Lemon Soda", type: "bottle" as const, color: "#27ae60", dimensions: { w: 6.5, h: 22, d: 6.5 } },
  { name: "Juice Box", type: "box" as const, color: "#f39c12", dimensions: { w: 9.5, h: 24, d: 6 } },
  { name: "Energy Drink", type: "can" as const, color: "#3498db", dimensions: { w: 5.3, h: 13.5, d: 5.3 } },
  { name: "Chip Bag", type: "bag" as const, color: "#f1c40f", dimensions: { w: 20, h: 30, d: 8 } },
  { name: "Candy Box", type: "box" as const, color: "#9b59b6", dimensions: { w: 10, h: 15, d: 4 } },
  { name: "Water Bottle", type: "bottle" as const, color: "#1abc9c", dimensions: { w: 7, h: 25, d: 7 } },
  { name: "Sauce Can", type: "can" as const, color: "#c0392b", dimensions: { w: 7.5, h: 11, d: 7.5 } },
]

const shelfTemplates = [
  { name: "Standard Gondola 4-Shelf", shelves: 4, width: 120, height: 180, depth: 40 },
  { name: "Standard Gondola 6-Shelf", shelves: 6, width: 120, height: 200, depth: 40 },
  { name: "End Cap Display", shelves: 3, width: 90, height: 150, depth: 45 },
  { name: "Cooler/Fridge 3-Shelf", shelves: 3, width: 80, height: 180, depth: 60 },
  { name: "Counter Top Display", shelves: 2, width: 60, height: 40, depth: 30 },
]

export function ProductsPanel() {
  const { products, addProduct, selectProduct, selectedProductId, updateShelfConfig } = useEditorStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("products")

  const filteredTemplates = productTemplates.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = (template: typeof productTemplates[0]) => {
    const newProduct: Omit<Product, "id"> = {
      name: template.name,
      type: template.type,
      color: template.color,
      position: [0, 0.5, 0.1],
      rotation: [0, 0, 0],
      scale: 1,
      shelfIndex: 1,
      quantity: 1,
      dimensions: template.dimensions
    }
    addProduct(newProduct)
  }

  const handleApplyTemplate = (template: typeof shelfTemplates[0]) => {
    updateShelfConfig({
      numberOfShelves: template.shelves,
      width: template.width,
      height: template.height,
      depth: template.depth
    })
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid grid-cols-2 bg-muted">
          <TabsTrigger value="products" className="gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="shelves" className="gap-2">
            <Layers className="h-4 w-4" />
            Shelves
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="flex-1 flex flex-col mt-0 p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 bg-input border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="flex-1">
            {/* Project Products */}
            {products.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  In Project ({products.length})
                </h4>
                <div className="space-y-1">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => selectProduct(product.id)}
                      className={`w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors ${
                        selectedProductId === product.id
                          ? "bg-primary/20 border border-primary/50"
                          : "hover:bg-muted border border-transparent"
                      }`}
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <div
                        className="h-8 w-8 rounded flex items-center justify-center shrink-0"
                        style={{ backgroundColor: product.color }}
                      >
                        <Package className="h-4 w-4 text-white/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          x{product.quantity} on Shelf {product.shelfIndex}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Library */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Add from Library
              </h4>
              <div className="space-y-1">
                {filteredTemplates.map((template, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted group"
                  >
                    <div
                      className="h-8 w-8 rounded flex items-center justify-center shrink-0"
                      style={{ backgroundColor: template.color }}
                    >
                      <Package className="h-4 w-4 text-white/80" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {template.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {template.dimensions.w} x {template.dimensions.h} x {template.dimensions.d} cm
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleAddProduct(template)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="shelves" className="flex-1 flex flex-col mt-0 p-4">
          <ScrollArea className="flex-1">
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              Shelf Templates
            </h4>
            <div className="space-y-2">
              {shelfTemplates.map((template, i) => (
                <button
                  key={i}
                  onClick={() => handleApplyTemplate(template)}
                  className="w-full p-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <Layers className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {template.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {template.width} x {template.height} x {template.depth} cm
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
