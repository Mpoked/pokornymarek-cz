"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export default function PaperBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <MeshGradient
        className="w-full h-full"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={1.0}
      />
    </div>
  )
}
