"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Search, 
  Upload,
  Plus,
  Package,
  Eye,
  X
} from "lucide-react"
import { ProductUploadDialog } from "@/components/product-upload-dialog"
import { Product3DPreview } from "@/components/product-3d-preview"

const categories = [
  "All",
  "Beverages",
  "Snacks",
  "Dairy",
  "Household",
  "Personal Care",
  "Frozen",
  "Canned Goods"
]

const productTypes = ["All", "Can", "Bottle", "Box", "Bag", "Jar", "Tube"]

const products = [
  {
    id: 1,
    name: "Cola Classic 330ml",
    brand: "Coca-Cola",
    category: "Beverages",
    type: "Can",
    dimensions: { w: 6.6, h: 12.2, d: 6.6 },
    thumbnail: "/placeholder.svg",
    color: "#e74c3c"
  },
  {
    id: 2,
    name: "Lemon Soda 500ml",
    brand: "Sprite",
    category: "Beverages",
    type: "Bottle",
    dimensions: { w: 6.5, h: 22, d: 6.5 },
    thumbnail: "/placeholder.svg",
    color: "#27ae60"
  },
  {
    id: 3,
    name: "Orange Juice 1L",
    brand: "Tropicana",
    category: "Beverages",
    type: "Box",
    dimensions: { w: 9.5, h: 24, d: 6 },
    thumbnail: "/placeholder.svg",
    color: "#f39c12"
  },
  {
    id: 4,
    name: "Energy Drink 250ml",
    brand: "Red Bull",
    category: "Beverages",
    type: "Can",
    dimensions: { w: 5.3, h: 13.5, d: 5.3 },
    thumbnail: "/placeholder.svg",
    color: "#3498db"
  },
  {
    id: 5,
    name: "Potato Chips Original",
    brand: "Lay's",
    category: "Snacks",
    type: "Bag",
    dimensions: { w: 20, h: 30, d: 8 },
    thumbnail: "/placeholder.svg",
    color: "#f1c40f"
  },
  {
    id: 6,
    name: "Chocolate Bar",
    brand: "Snickers",
    category: "Snacks",
    type: "Box",
    dimensions: { w: 11.5, h: 3, d: 3 },
    thumbnail: "/placeholder.svg",
    color: "#8b4513"
  },
  {
    id: 7,
    name: "Greek Yogurt 500g",
    brand: "Chobani",
    category: "Dairy",
    type: "Jar",
    dimensions: { w: 10, h: 12, d: 10 },
    thumbnail: "/placeholder.svg",
    color: "#ecf0f1"
  },
  {
    id: 8,
    name: "Milk 1L",
    brand: "Organic Valley",
    category: "Dairy",
    type: "Box",
    dimensions: { w: 9.5, h: 24, d: 6 },
    thumbnail: "/placeholder.svg",
    color: "#3498db"
  },
  {
    id: 9,
    name: "Tomato Sauce 400g",
    brand: "Heinz",
    category: "Canned Goods",
    type: "Can",
    dimensions: { w: 7.5, h: 11, d: 7.5 },
    thumbnail: "/placeholder.svg",
    color: "#c0392b"
  },
  {
    id: 10,
    name: "Hand Soap 250ml",
    brand: "Dove",
    category: "Personal Care",
    type: "Bottle",
    dimensions: { w: 6, h: 15, d: 4 },
    thumbnail: "/placeholder.svg",
    color: "#1abc9c"
  },
  {
    id: 11,
    name: "Toothpaste 100ml",
    brand: "Colgate",
    category: "Personal Care",
    type: "Tube",
    dimensions: { w: 4, h: 18, d: 3 },
    thumbnail: "/placeholder.svg",
    color: "#e74c3c"
  },
  {
    id: 12,
    name: "Dish Soap 750ml",
    brand: "Dawn",
    category: "Household",
    type: "Bottle",
    dimensions: { w: 7, h: 24, d: 5 },
    thumbnail: "/placeholder.svg",
    color: "#3498db"
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [productType, setProductType] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "All" || product.category === category
    const matchesType = productType === "All" || product.type === productType
    return matchesSearch && matchesCategory && matchesType
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "brand") return a.brand.localeCompare(b.brand)
    return 0
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Library</h1>
          <p className="text-muted-foreground">{products.length.toLocaleString()} products available</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowUploadDialog(true)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Custom Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 bg-input border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40 bg-input border-border">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={productType} onValueChange={setProductType}>
          <SelectTrigger className="w-32 bg-input border-border">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {productTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-36 bg-input border-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="brand">Brand A-Z</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat)}
            className={category === cat 
              ? "bg-primary text-primary-foreground" 
              : "border-border/50 text-muted-foreground hover:text-foreground"
            }
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Upload Custom Product Card */}
        <Card 
          className="border-dashed border-2 border-border/50 bg-transparent hover:border-primary/50 hover:bg-card/50 transition-all cursor-pointer group"
          onClick={() => setShowUploadDialog(true)}
        >
          <CardContent className="flex flex-col items-center justify-center h-full min-h-64 p-6">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Plus className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Upload Custom Product</h3>
            <p className="text-sm text-muted-foreground text-center">
              Add your own 3D models to the library
            </p>
          </CardContent>
        </Card>

        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="border-border/50 bg-card overflow-hidden group"
          >
            <div 
              className="aspect-square bg-muted/30 relative flex items-center justify-center cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div 
                className="h-20 w-16 rounded"
                style={{ backgroundColor: product.color }}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button size="sm" variant="secondary" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground truncate mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
                <Badge variant="outline" className="text-xs border-border/50">
                  {product.type}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {product.dimensions.w} x {product.dimensions.h} x {product.dimensions.d} cm
              </p>
              <Button 
                size="sm" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground text-center">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedProduct?.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedProduct?.brand}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
                <Product3DPreview color={selectedProduct.color} type={selectedProduct.type} />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Category</h4>
                  <p className="text-foreground">{selectedProduct.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Type</h4>
                  <p className="text-foreground">{selectedProduct.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Dimensions</h4>
                  <p className="text-foreground">
                    {selectedProduct.dimensions.w} x {selectedProduct.dimensions.h} x {selectedProduct.dimensions.d} cm
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedProduct.brand}</Badge>
                  <Badge variant="secondary">{selectedProduct.category}</Badge>
                  <Badge variant="secondary">{selectedProduct.type}</Badge>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Current Project
                  </Button>
                  <Button variant="outline" className="border-border">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview in 3D
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <ProductUploadDialog 
        open={showUploadDialog} 
        onOpenChange={setShowUploadDialog} 
      />
    </div>
  )
}
