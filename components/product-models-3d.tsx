"use client"

import { RoundedBox } from "@react-three/drei"

// ─── Can (soda / beer) ───────────────────────────────────────────────────────
export function CanModel({ color }: { color: string }) {
  return (
    <group>
      {/* bottom dome */}
      <mesh position={[0, -0.068, 0]}>
        <cylinderGeometry args={[0.053, 0.06, 0.012, 32]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.7} />
      </mesh>
      {/* body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.124, 32]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.6} />
      </mesh>
      {/* neck taper */}
      <mesh position={[0, 0.072, 0]}>
        <cylinderGeometry args={[0.047, 0.06, 0.02, 32]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.6} />
      </mesh>
      {/* top ring — silver */}
      <mesh position={[0, 0.085, 0]}>
        <cylinderGeometry args={[0.047, 0.047, 0.008, 32]} />
        <meshStandardMaterial color="#c8c8c8" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}

// ─── Bottle (plastic / glass) ────────────────────────────────────────────────
export function BottleModel({ color }: { color: string }) {
  const mat = { roughness: 0.05, metalness: 0.0, transparent: true, opacity: 0.82 } as const
  return (
    <group>
      {/* base disk */}
      <mesh position={[0, -0.095, 0]}>
        <cylinderGeometry args={[0.048, 0.048, 0.01, 32]} />
        <meshStandardMaterial color={color} {...mat} />
      </mesh>
      {/* lower body */}
      <mesh position={[0, -0.025, 0]}>
        <cylinderGeometry args={[0.048, 0.048, 0.12, 32]} />
        <meshStandardMaterial color={color} {...mat} />
      </mesh>
      {/* shoulder taper */}
      <mesh position={[0, 0.058, 0]}>
        <cylinderGeometry args={[0.024, 0.048, 0.04, 32]} />
        <meshStandardMaterial color={color} {...mat} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 0.094, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.04, 32]} />
        <meshStandardMaterial color={color} {...mat} />
      </mesh>
      {/* cap */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.027, 0.027, 0.016, 16]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.5} metalness={0} />
      </mesh>
    </group>
  )
}

// ─── Box (cereal / product box) ──────────────────────────────────────────────
export function BoxModel({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[0.1, 0.18, 0.08]} radius={0.006} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.5} metalness={0} />
      </RoundedBox>
      {/* subtle top-flap crease */}
      <mesh position={[0, 0.088, 0.0405]}>
        <boxGeometry args={[0.096, 0.002, 0.001]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// ─── Bag (chips / snacks) ────────────────────────────────────────────────────
export function BagModel({ color }: { color: string }) {
  return (
    <group>
      {/* puffed body */}
      <RoundedBox args={[0.13, 0.17, 0.046]} radius={0.013} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.15} />
      </RoundedBox>
      {/* heat-seal at top */}
      <mesh position={[0, 0.095, 0]}>
        <boxGeometry args={[0.13, 0.018, 0.048]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.25} />
      </mesh>
    </group>
  )
}
