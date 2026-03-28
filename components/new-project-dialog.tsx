"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { 
  LayoutGrid, 
  Box, 
  Layers,
  ArrowRight
} from "lucide-react"

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const shelfTemplates = [
  {
    id: "grocery",
    name: "Grocery Shelf",
    description: "Standard supermarket gondola with 4 shelves",
    icon: LayoutGrid,
    shelves: 4,
    width: 4,
    depth: 0.5
  },
  {
    id: "endcap",
    name: "End Cap Display",
    description: "High-visibility end-of-aisle display",
    icon: Box,
    shelves: 3,
    width: 3,
    depth: 0.6
  },
  {
    id: "cooler",
    name: "Cooler Door",
    description: "Refrigerated display with glass doors",
    icon: Layers,
    shelves: 5,
    width: 2.5,
    depth: 0.4
  }
]

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "grocery"
  })

  const handleCreate = async () => {
    setIsCreating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsCreating(false)
    onOpenChange(false)
    // Navigate to editor with new project
    router.push(`/dashboard/editor?project=new&template=${formData.template}&name=${encodeURIComponent(formData.name)}`)
  }

  const selectedTemplate = shelfTemplates.find(t => t.id === formData.template)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Create New Project" : "Choose Shelf Template"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Give your project a name and description"
              : "Select a shelf configuration to start with"
            }
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Summer Campaign 2024"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe your project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <RadioGroup
              value={formData.template}
              onValueChange={(value) => setFormData({ ...formData, template: value })}
              className="grid gap-4"
            >
              {shelfTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <div key={template.id}>
                    <RadioGroupItem
                      value={template.id}
                      id={template.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={template.id}
                      className="flex items-center gap-4 rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {template.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.shelves} shelves | {template.width}m wide | {template.depth}m deep
                        </p>
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>

            {selectedTemplate && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="font-medium mb-2">Template Preview</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Shelves</p>
                    <p className="font-medium">{selectedTemplate.shelves}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Width</p>
                    <p className="font-medium">{selectedTemplate.width}m</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Depth</p>
                    <p className="font-medium">{selectedTemplate.depth}m</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button 
              onClick={() => setStep(2)}
              disabled={!formData.name.trim()}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
