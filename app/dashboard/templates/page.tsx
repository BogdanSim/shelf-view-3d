"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layers, Star, Plus, MessageSquare } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: 1,
    name: "Standard Gondola 4-Shelf",
    dimensions: "120 x 180 x 40 cm",
    shelves: 4,
    category: "gondola",
    featured: true,
    usedIn: 234
  },
  {
    id: 2,
    name: "Standard Gondola 6-Shelf",
    dimensions: "120 x 200 x 40 cm",
    shelves: 6,
    category: "gondola",
    featured: false,
    usedIn: 189
  },
  {
    id: 3,
    name: "End Cap Display",
    dimensions: "90 x 150 x 45 cm",
    shelves: 3,
    category: "endcap",
    featured: true,
    usedIn: 312
  },
  {
    id: 4,
    name: "Cooler/Fridge 3-Shelf",
    dimensions: "80 x 180 x 60 cm",
    shelves: 3,
    category: "cooler",
    featured: false,
    usedIn: 156
  },
  {
    id: 5,
    name: "Counter Top Display",
    dimensions: "60 x 40 x 30 cm",
    shelves: 2,
    category: "counter",
    featured: false,
    usedIn: 98
  },
  {
    id: 6,
    name: "Wall Unit 5-Shelf",
    dimensions: "240 x 200 x 35 cm",
    shelves: 5,
    category: "wallunit",
    featured: true,
    usedIn: 145
  },
  {
    id: 7,
    name: "Pallet Display",
    dimensions: "120 x 100 x 80 cm",
    shelves: 2,
    category: "custom",
    featured: false,
    usedIn: 67
  },
  {
    id: 8,
    name: "Checkout Lane Unit",
    dimensions: "50 x 120 x 30 cm",
    shelves: 4,
    category: "counter",
    featured: false,
    usedIn: 201
  },
]

const categories = [
  { value: "all", label: "All" },
  { value: "gondola", label: "Gondola" },
  { value: "endcap", label: "End Cap" },
  { value: "wallunit", label: "Wall Unit" },
  { value: "cooler", label: "Cooler/Fridge" },
  { value: "counter", label: "Counter Display" },
  { value: "custom", label: "Custom" },
]

export default function TemplatesPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shelf Templates</h1>
          <p className="text-muted-foreground">Choose from pre-built shelf configurations</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-muted flex-wrap h-auto gap-1 p-1">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="data-[state=active]:bg-background">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {templates
                .filter((t) => cat.value === "all" || t.category === cat.value)
                .map((template) => (
                  <Card key={template.id} className="border-border/50 bg-card overflow-hidden group">
                    <div className="aspect-[4/3] bg-muted/30 relative flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <Layers className="h-12 w-12 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">
                          {template.shelves} shelves
                        </span>
                      </div>
                      {template.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary/90 text-primary-foreground gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.dimensions}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Used in {template.usedIn} projects
                        </span>
                        <Link href={`/dashboard/editor?template=${template.id}`}>
                          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-1 h-4 w-4" />
                            Use
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {/* Request Custom Template Card */}
              <Card className="border-dashed border-2 border-border/50 bg-transparent hover:border-primary/50 hover:bg-card/50 transition-all">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-64 p-6">
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageSquare className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1 text-center">Request Custom Template</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Need a specific shelf configuration? Let us know!
                  </p>
                  <Button variant="outline" className="border-border">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
