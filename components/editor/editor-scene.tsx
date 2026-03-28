"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Grid, TransformControls, Html } from "@react-three/drei"
import { Suspense, useEffect, useRef, type MutableRefObject } from "react"
import * as THREE from "three"
import { useEditorStore, Product as ProductType } from "@/lib/editor-store"
import { CanModel, BottleModel, BoxModel, BagModel } from "@/components/product-models-3d"

// ─── Shelf ────────────────────────────────────────────────────────────────────

function Shelf() {
  const { shelfConfig } = useEditorStore()
  const { width, height, depth, numberOfShelves, shelfThickness, color, material } = shelfConfig

  const w = width / 100
  const h = height / 100
  const d = depth / 100
  const t = shelfThickness / 100

  const matProps =
    material === "metal" ? { roughness: 0.25, metalness: 0.75 } :
    material === "glass" ? { roughness: 0.05, metalness: 0.0, transparent: true as const, opacity: 0.35 } :
    material === "white" ? { roughness: 0.85, metalness: 0.0 } :
                           { roughness: 0.65, metalness: 0.05 }

  const shelfColor = material === "white" ? "#f2f2f2" : color

  return (
    <group>
      {/* left panel */}
      <mesh position={[-w / 2, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={shelfColor} {...matProps} />
      </mesh>
      {/* right panel */}
      <mesh position={[w / 2, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={shelfColor} {...matProps} />
      </mesh>
      {/* back panel */}
      <mesh position={[0, h / 2, -d / 2 + 0.005]} castShadow receiveShadow>
        <boxGeometry args={[w, h, t]} />
        <meshStandardMaterial color={shelfColor} {...matProps} />
      </mesh>
      {/* shelf boards */}
      {Array.from({ length: numberOfShelves }).map((_, i) => (
        <mesh key={i} position={[0, (i + 0.5) * (h / numberOfShelves), 0]} receiveShadow castShadow>
          <boxGeometry args={[w - t * 2, t, d]} />
          <meshStandardMaterial color={shelfColor} {...matProps} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Product Mesh ─────────────────────────────────────────────────────────────

function ProductMesh({ product }: { product: ProductType }) {
  const { selectedProductId, selectProduct, updateProduct, saveToHistory } = useEditorStore()
  const isSelected = selectedProductId === product.id
  const groupRef = useRef<THREE.Group>(null) as MutableRefObject<THREE.Group>
  const isDragging = useRef(false)

  const spacing =
    product.type === "can"    ? 0.15 :
    product.type === "box"    ? 0.13 :
    product.type === "bottle" ? 0.14 : 0.17

  const selW = product.quantity * spacing + 0.06
  const selH = product.type === "bottle" ? 0.27 : product.type === "bag" ? 0.23 : 0.2

  // Imperatively sync position from store — skipped while dragging to
  // avoid fighting with TransformControls
  useEffect(() => {
    if (!isDragging.current && groupRef.current) {
      groupRef.current.position.set(
        product.position[0],
        product.position[1],
        product.position[2],
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.position[0], product.position[1], product.position[2]])

  return (
    <>
      {/* group has no `position` prop — controlled imperatively above */}
      <group ref={groupRef} scale={product.scale}>
        <group
          rotation={product.rotation}
          onClick={(e) => { e.stopPropagation(); selectProduct(product.id) }}
        >
          {Array.from({ length: product.quantity }).map((_, i) => {
            const xOffset = (i - (product.quantity - 1) / 2) * spacing
            return (
              <group key={i} position={[xOffset, 0, 0]}>
                {product.type === "can"    && <CanModel    color={product.color} />}
                {product.type === "bottle" && <BottleModel color={product.color} />}
                {product.type === "box"    && <BoxModel    color={product.color} />}
                {product.type === "bag"    && <BagModel    color={product.color} />}
              </group>
            )
          })}
        </group>

        {/* selection wireframe */}
        {isSelected && (
          <mesh>
            <boxGeometry args={[selW, selH, 0.12]} />
            <meshBasicMaterial color="#4361ee" wireframe transparent opacity={0.55} />
          </mesh>
        )}
      </group>

      {isSelected && (
        <TransformControls
          object={groupRef}
          mode="translate"
          translationSnap={null}
          onMouseDown={() => { isDragging.current = true }}
          onMouseUp={() => {
            isDragging.current = false
            if (groupRef.current) {
              const { x, y, z } = groupRef.current.position
              updateProduct(product.id, { position: [x, y, z] })
              saveToHistory()
            }
          }}
        />
      )}
    </>
  )
}

// ─── Dimension annotations (measure mode) ────────────────────────────────────

function DimensionAnnotations() {
  const { shelfConfig } = useEditorStore()
  const { width, height, depth, numberOfShelves } = shelfConfig
  const w = width / 100, h = height / 100, d = depth / 100

  const labelStyle: React.CSSProperties = {
    background: "rgba(0,0,0,0.72)",
    color: "#fff",
    fontSize: 11,
    padding: "2px 8px",
    borderRadius: 999,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    border: "1px solid rgba(255,255,255,0.15)",
  }

  const shelfSpacing = h / numberOfShelves

  return (
    <>
      {/* Width — bottom */}
      <Html position={[0, -0.08, 0]} center>
        <div style={labelStyle}>↔ {width} cm</div>
      </Html>
      {/* Height — left side */}
      <Html position={[-w / 2 - 0.12, h / 2, 0]} center>
        <div style={{ ...labelStyle, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          ↕ {height} cm
        </div>
      </Html>
      {/* Depth — right side */}
      <Html position={[w / 2 + 0.12, 0.12, 0]} center>
        <div style={labelStyle}>⬚ {depth} cm deep</div>
      </Html>
      {/* Shelf spacing */}
      {numberOfShelves > 1 && (
        <Html position={[w / 2 + 0.12, shelfSpacing, 0]} center>
          <div style={labelStyle}>↕ {Math.round(shelfSpacing * 100)} cm / shelf</div>
        </Html>
      )}
    </>
  )
}

// ─── Keyboard fine-control ────────────────────────────────────────────────────
// Arrow keys → X / Z   |   PageUp / PageDown → Y

function KeyboardControls() {
  useEffect(() => {
    const STEP = 0.01
    const handleKey = (e: KeyboardEvent) => {
      const { selectedProductId, products, updateProduct } = useEditorStore.getState()
      if (!selectedProductId) return
      const product = products.find((p) => p.id === selectedProductId)
      if (!product) return

      const [x, y, z] = product.position
      const map: Record<string, [number, number, number]> = {
        ArrowLeft:  [x - STEP, y, z],
        ArrowRight: [x + STEP, y, z],
        ArrowUp:    [x, y, z - STEP],
        ArrowDown:  [x, y, z + STEP],
        PageUp:     [x, y + STEP, z],
        PageDown:   [x, y - STEP, z],
      }

      if (e.key in map) {
        e.preventDefault()
        updateProduct(selectedProductId, { position: map[e.key] })
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return null
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene({ showGrid }: { showGrid: boolean }) {
  const { sceneConfig, selectProduct, products, measureMode } = useEditorStore()

  return (
    <>
      <ambientLight intensity={sceneConfig.ambientIntensity} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={sceneConfig.directionalIntensity}
        castShadow={sceneConfig.shadowsEnabled}
        shadow-mapSize={[2048, 2048] as [number, number]}
      />
      <hemisphereLight args={["#ffffff", "#222222", 0.15]} />
      <Environment preset="studio" />

      <group onClick={(e) => { if (e.object === e.eventObject) selectProduct(null) }}>
        <Shelf />
        {products.map((p) => (
          <ProductMesh key={p.id} product={p} />
        ))}
      </group>

      {showGrid && (
        <Grid
          infiniteGrid
          cellSize={0.1}
          cellThickness={0.5}
          cellColor="#333"
          sectionSize={1}
          sectionThickness={1}
          sectionColor="#555"
          fadeDistance={10}
        />
      )}

      {/* makeDefault lets TransformControls auto-disable orbit during drag */}
      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={1}
        maxDistance={10}
      />

      <KeyboardControls />
      {measureMode && <DimensionAnnotations />}
    </>
  )
}

// ─── Loading fallback ─────────────────────────────────────────────────────────

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#4361ee" wireframe />
    </mesh>
  )
}

// ─── Controls tips overlay (HTML, outside Canvas) ─────────────────────────────

function ControlsTips({ hasSelection }: { hasSelection: boolean }) {
  const tips = hasSelection
    ? [
        "Drag colored arrows to move",
        "← → adjust X  |  ↑ ↓ adjust Z",
        "PgUp / PgDn adjust height",
        "Click empty space to deselect",
      ]
    : [
        "Click a product to select",
        "Scroll to zoom",
        "Left-drag to orbit",
        "Right-drag to pan",
      ]

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 pointer-events-none px-4 max-w-xl">
      {tips.map((tip) => (
        <span
          key={tip}
          className="bg-black/60 text-white/75 text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10 whitespace-nowrap"
        >
          {tip}
        </span>
      ))}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface EditorSceneProps {
  showGrid?: boolean
}

export function EditorScene({ showGrid = true }: EditorSceneProps) {
  const { sceneConfig, selectedProductId } = useEditorStore()

  return (
    <div className="w-full h-full relative">
      <Canvas
        id="shelf-canvas"
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        shadows={sceneConfig.shadowsEnabled}
        style={{ background: sceneConfig.backgroundColor }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene showGrid={showGrid} />
        </Suspense>
      </Canvas>

      <ControlsTips hasSelection={!!selectedProductId} />
    </div>
  )
}
