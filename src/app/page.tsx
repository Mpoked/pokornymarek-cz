import PaperBackground from "@/components/ui/paper-background"
import Navbar from "@/components/ui/navbar"
import ScrollSections from "@/components/ui/scroll-sections"
import { Footer } from "@/components/ui/footer"

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
      <section className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-24 text-center">
        <div>
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">
            studio ze Slovácko
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight md:text-8xl lg:text-9xl">
            Marek Pokorný
          </h1>
          <p className="mt-6 text-white/50 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Osobně, bez prostředníků.
          </p>
        </div>
      </section>

      {/* Scroll-triggered card sections */}
      <ScrollSections />

      {/* Footer */}
      <div className="relative z-10 px-6 pb-8 pt-10 md:pt-0">
        <Footer />
      </div>
    </main>
  )
}
