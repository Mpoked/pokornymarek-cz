import PaperBackground from "@/components/ui/paper-background"
import Navbar from "@/components/ui/navbar"
import ScrollSections from "@/components/ui/scroll-sections"

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* Fixed fullscreen background */}
      <div className="fixed inset-0 z-0">
        <PaperBackground />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero — full viewport, just text over background */}
      <section className="relative z-10 flex h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-white/40">
            Webař ze Slovácka · Uherské Hradiště
          </p>
          <h1 className="text-6xl font-bold leading-tight tracking-tight md:text-8xl lg:text-9xl">
            Marek<br />Pokorný
          </h1>
          <p className="mt-6 text-white/50 text-lg max-w-md mx-auto leading-relaxed">
            Tvorba webových stránek na míru — sám, osobně, bez agentury.
          </p>
        </div>
      </section>

      {/* Scroll-triggered card sections */}
      <ScrollSections />
    </main>
  )
}
