"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { useReducedMotion } from "motion/react"

/**
 * Animované pozadí přes celou obrazovku. Je to WebGL (three.js), takže
 * není zadarmo — na slabším mobilu je to znát. Prodáváme rychlé weby,
 * tak ať se to nebije: kdo má v systému zapnuté omezení animací, dostane
 * statickou verzi (speed 0) místo běžícího shaderu.
 *
 * TODO: změřit LCP/INP na mobilu (PageSpeed Insights) a podle výsledku
 * rozhodnout, jestli shader nechat běžet i tam, nebo ho pod md nahradit
 * statickým CSS gradientem.
 */
export default function PaperBackground() {
  const omezitPohyb = useReducedMotion()

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <MeshGradient
        className="w-full h-full"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={omezitPohyb ? 0 : 1.0}
      />
    </div>
  )
}
