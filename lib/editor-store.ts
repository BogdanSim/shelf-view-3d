import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  type: "can" | "box" | "bottle" | "bag"
  color: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  shelfIndex: number
  quantity: number
  dimensions: { w: number; h: number; d: number }
}

export interface ShelfConfig {
  type: "gondola" | "endcap" | "wallunit" | "cooler" | "custom"
  width: number
  height: number
  depth: number
  numberOfShelves: number
  shelfSpacing: number
  shelfThickness: number
  material: "wood" | "metal" | "glass" | "white"
  color: string
  showPriceTags: boolean
  showShelfLabels: boolean
}

export interface SceneConfig {
  ambientIntensity: number
  directionalIntensity: number
  backgroundColor: string
  shadowsEnabled: boolean
  cameraPreset: "front" | "left" | "right" | "top" | "perspective"
}

interface EditorState {
  // Project
  projectName: string
  setProjectName: (name: string) => void
  
  // Products
  products: Product[]
  selectedProductId: string | null
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  removeProduct: (id: string) => void
  selectProduct: (id: string | null) => void
  
  // Shelf
  shelfConfig: ShelfConfig
  updateShelfConfig: (updates: Partial<ShelfConfig>) => void
  
  // Scene
  sceneConfig: SceneConfig
  updateSceneConfig: (updates: Partial<SceneConfig>) => void
  
  // History
  history: { products: Product[]; shelfConfig: ShelfConfig }[]
  historyIndex: number
  undo: () => void
  redo: () => void
  saveToHistory: () => void
  
  // View
  viewMode: "3d" | "front" | "top" | "side"
  setViewMode: (mode: "3d" | "front" | "top" | "side") => void
  gridSnap: boolean
  setGridSnap: (enabled: boolean) => void
  measureMode: boolean
  setMeasureMode: (enabled: boolean) => void
}

const defaultShelfConfig: ShelfConfig = {
  type: "gondola",
  width: 120,
  height: 180,
  depth: 40,
  numberOfShelves: 4,
  shelfSpacing: 40,
  shelfThickness: 2,
  material: "wood",
  color: "#8B6914",
  showPriceTags: false,
  showShelfLabels: false
}

const defaultSceneConfig: SceneConfig = {
  ambientIntensity: 0.4,
  directionalIntensity: 0.8,
  backgroundColor: "#111827",
  shadowsEnabled: true,
  cameraPreset: "perspective"
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Cola Classic",
    type: "can",
    color: "#e74c3c",
    position: [-0.4, 0.92, 0.1],
    rotation: [0, 0, 0],
    scale: 1,
    shelfIndex: 1,
    quantity: 4,
    dimensions: { w: 6.6, h: 12.2, d: 6.6 }
  },
  {
    id: "2",
    name: "Lemon Soda",
    type: "bottle",
    color: "#27ae60",
    position: [0.3, 0.92, 0.1],
    rotation: [0, 0, 0],
    scale: 1,
    shelfIndex: 1,
    quantity: 3,
    dimensions: { w: 6.5, h: 22, d: 6.5 }
  },
  {
    id: "3",
    name: "Snack Box",
    type: "box",
    color: "#f39c12",
    position: [-0.3, 1.37, 0.1],
    rotation: [0, 0, 0],
    scale: 1,
    shelfIndex: 2,
    quantity: 2,
    dimensions: { w: 15, h: 20, d: 5 }
  },
  {
    id: "4",
    name: "Energy Drink",
    type: "can",
    color: "#3498db",
    position: [0.4, 1.37, 0.1],
    rotation: [0, 0, 0],
    scale: 1,
    shelfIndex: 2,
    quantity: 5,
    dimensions: { w: 5.3, h: 13.5, d: 5.3 }
  }
]

export const useEditorStore = create<EditorState>((set, get) => ({
  // Project
  projectName: "Untitled Project",
  setProjectName: (name) => set({ projectName: name }),
  
  // Products
  products: sampleProducts,
  selectedProductId: null,
  
  addProduct: (product) => {
    const id = Math.random().toString(36).substr(2, 9)
    set((state) => ({
      products: [...state.products, { ...product, id }]
    }))
    get().saveToHistory()
  },
  
  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) => 
        p.id === id ? { ...p, ...updates } : p
      )
    }))
  },
  
  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      selectedProductId: state.selectedProductId === id ? null : state.selectedProductId
    }))
    get().saveToHistory()
  },
  
  selectProduct: (id) => set({ selectedProductId: id }),
  
  // Shelf
  shelfConfig: defaultShelfConfig,
  updateShelfConfig: (updates) => {
    set((state) => ({
      shelfConfig: { ...state.shelfConfig, ...updates }
    }))
    get().saveToHistory()
  },
  
  // Scene
  sceneConfig: defaultSceneConfig,
  updateSceneConfig: (updates) => {
    set((state) => ({
      sceneConfig: { ...state.sceneConfig, ...updates }
    }))
  },
  
  // History
  history: [{ products: sampleProducts, shelfConfig: defaultShelfConfig }],
  historyIndex: 0,
  
  saveToHistory: () => {
    const { products, shelfConfig, history, historyIndex } = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push({ products: [...products], shelfConfig: { ...shelfConfig } })
    set({ history: newHistory, historyIndex: newHistory.length - 1 })
  },
  
  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const { products, shelfConfig } = history[newIndex]
      set({ 
        products: [...products], 
        shelfConfig: { ...shelfConfig }, 
        historyIndex: newIndex 
      })
    }
  },
  
  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      const { products, shelfConfig } = history[newIndex]
      set({ 
        products: [...products], 
        shelfConfig: { ...shelfConfig }, 
        historyIndex: newIndex 
      })
    }
  },
  
  // View
  viewMode: "3d",
  setViewMode: (mode) => set({ viewMode: mode }),
  gridSnap: true,
  setGridSnap: (enabled) => set({ gridSnap: enabled }),
  measureMode: false,
  setMeasureMode: (enabled) => set({ measureMode: enabled })
}))
