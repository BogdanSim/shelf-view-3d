"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { useRef, Suspense } from "react"
import * as THREE from "three"
import { CanModel, BottleModel, BoxModel, BagModel } from "@/components/product-models-3d"

// ─── Landing-page shelf (static wood unit) ────────────────────────────────────

function Shelf() {
  const color = "#7a5c1e"
  const w = 2.4, h = 3.6, d = 0.8, t = 0.04
  const n = 4

  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[-w / 2, h / 2, 0]}>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />
      </mesh>
      <mesh position={[w / 2, h / 2, 0]}>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />
      </mesh>
      <mesh position={[0, h / 2, -d / 2 + 0.02]}>
        <boxGeometry args={[w, h, t]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />
      </mesh>
      {Array.from({ length: n }).map((_, i) => (
        <mesh key={i} position={[0, (i + 0.5) * (h / n), 0]}>
          <boxGeometry args={[w - t * 2, t, d]} />
          <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />
        </mesh>
      ))}
    </group>
  )
}

// ─── A single product slot with Float animation ───────────────────────────────

type ProductType = "can" | "bottle" | "box" | "bag"

function Product({
  position,
  color,
  type = "can",
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  type?: ProductType
  scale?: number
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.18}>
      <group position={position} scale={scale * 2}>
        {type === "can"    && <CanModel    color={color} />}
        {type === "bottle" && <BottleModel color={color} />}
        {type === "box"    && <BoxModel    color={color} />}
        {type === "bag"    && <BagModel    color={color} />}
      </group>
    </Float>
  )
}

// ─── Animated shelf group ────────────────────────────────────────────────────

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.14
    }
  })

  return (
    <group ref={groupRef}>
      <Shelf />

      {/* shelf 2 — y ≈ 1.3 */}
      <Product position={[-0.8, 1.3, 0.1]} color="#e74c3c" type="can" />
      <Product position={[-0.5, 1.3, 0.1]} color="#e74c3c" type="can" />
      <Product position={[-0.1, 1.3, 0.1]} color="#3498db" type="can" />
      <Product position={[ 0.3, 1.3, 0.1]} color="#3498db" type="can" />
      <Product position={[ 0.6, 1.3, 0.1]} color="#f39c12" type="box" />
      <Product position={[ 0.9, 1.3, 0.1]} color="#f39c12" type="box" />

      {/* shelf 3 — y ≈ 2.2 */}
      <Product position={[-0.8, 2.2, 0.1]} color="#27ae60" type="bottle" />
      <Product position={[-0.5, 2.2, 0.1]} color="#27ae60" type="bottle" />
      <Product position={[-0.1, 2.2, 0.1]} color="#9b59b6" type="can" />
      <Product position={[ 0.2, 2.2, 0.1]} color="#9b59b6" type="can" />
      <Product position={[ 0.5, 2.2, 0.1]} color="#9b59b6" type="can" />
      <Product position={[ 0.8, 2.2, 0.1]} color="#1abc9c" type="box" />

      {/* shelf 4 — y ≈ 3.1 */}
      <Product position={[-0.7, 3.1, 0.1]} color="#e67e22" type="bag" />
      <Product position={[-0.3, 3.1, 0.1]} color="#e67e22" type="bag" />
      <Product position={[ 0.1, 3.1, 0.1]} color="#1abc9c" type="bottle" />
      <Product position={[ 0.4, 3.1, 0.1]} color="#1abc9c" type="bottle" />
      <Product position={[ 0.7, 3.1, 0.1]} color="#e74c3c" type="can" />
    </group>
  )
}

// ─── Loading fallback ─────────────────────────────────────────────────────────

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4361ee" wireframe />
    </mesh>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function Shelf3DScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[5, 8, 5]} intensity={0.9} castShadow />
          <directionalLight position={[-4, 4, -2]} intensity={0.3} />
          <hemisphereLight args={["#ffffff", "#333333", 0.2]} />
          <Environment preset="studio" />
          <Scene />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
