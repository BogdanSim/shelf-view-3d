"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef, Suspense } from "react"
import * as THREE from "three"

function ProductModel({ color, type }: { color: string; type: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {type === "Can" || type === "can" ? (
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
      ) : type === "Bottle" || type === "bottle" ? (
        <cylinderGeometry args={[0.35, 0.45, 1.8, 32]} />
      ) : type === "Box" || type === "box" ? (
        <boxGeometry args={[0.8, 1.4, 0.5]} />
      ) : type === "Bag" || type === "bag" ? (
        <boxGeometry args={[1, 1.5, 0.4]} />
      ) : type === "Jar" || type === "jar" ? (
        <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
      ) : type === "Tube" || type === "tube" ? (
        <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
      ) : (
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
      )}
      <meshStandardMaterial 
        color={color} 
        roughness={0.3} 
        metalness={0.1}
      />
    </mesh>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#4361ee" wireframe />
    </mesh>
  )
}

export function Product3DPreview({ 
  color = "#3498db", 
  type = "can" 
}: { 
  color?: string
  type?: string
}) {
  return (
    <div className="w-full h-full min-h-48">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Environment preset="studio" />
          <ProductModel color={color} type={type} />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
