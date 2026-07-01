"use client";

/**
 * NovaOS - Home (long-form cinematic).
 * Dark-primary, locked. Motion useScroll/useTransform + CSS sticky for
 * scroll storytelling (no GSAP). Dials: VARIANCE 7 / MOTION 7 / DENSITY 3.
 *
 * IMAGES: picsum.photos placeholders with a dark cinematic treatment. Swap the
 * TODO-marked sources for real product renders + brand imagery:
 *   - hero OS visual (1600x1000)
 *   - unified-workspace visual (1600x900)
 *   - AI feature visual (1000x1000)
 *   - 3 pillar visuals (900x1100)
 */

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkle,
  PenNib,
  FlowArrow,
  SquaresFour,
  ChatCircle,
  Lightning,
} from "@phosphor-icons/react";
import { Reveal, EASE } from "./components/motion";

/* --------------------------------- hero ---------------------------------- */

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fadeText = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, ease: EASE, delay },
        };

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12%] h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-70 blur-[150px]"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 68%)" }}
      />

      <motion.div
        style={reduce ? undefined : { opacity: fadeText }}
        className="relative z-10 mx-auto flex max-w-[1240px] flex-col items-center px-6 pt-[88px] text-center"
      >
        <motion.h1
          {...fade(0)}
          className="max-w-[20ch] text-balance text-[44px] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
        >
          One workspace. Everything in flow.
        </motion.h1>
        <motion.p
          {...fade(0.12)}
          className="mt-7 max-w-[48ch] text-lg leading-relaxed text-muted sm:text-xl"
        >
          NovaOS brings your work, your team, and your tools together in one
          calm, intelligent space.
        </motion.p>
        <motion.div
          {...fade(0.24)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-bg transition-opacity hover:opacity-90 active:translate-y-px"
          >
            Request access
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/product"
            className="inline-flex items-center rounded-full border border-line-strong px-6 py-3.5 text-[15px] text-ink transition-colors hover:bg-white/5"
          >
            Take the tour
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: yImg, scale: scaleImg }}
        className="relative z-0 mx-auto mt-20 w-[92%] max-w-[1120px]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-line">
          {/* TODO: real NovaOS interface render (1600x1000) */}
          <Image
            src="https://picsum.photos/seed/novaos-hero-os/1600/1000"
            alt="NovaOS workspace"
            fill
            priority
            sizes="(max-width: 1120px) 92vw, 1120px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(8,8,10,0.30), rgba(8,8,10,0.10) 40%, rgba(8,8,10,0.55))" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------- manifesto -------------------------------- */

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-40 lg:py-56">
      <Reveal amount={0.4} className="max-w-[20ch] sm:max-w-[24ch] lg:pl-[8vw]">
        <p className="text-balance text-3xl font-medium leading-[1.16] tracking-[-0.02em] sm:text-4xl lg:text-[2.9rem]">
          Great software disappears. What remains is the work, and the calm to
          do it well.
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------- unified workspace (pin) ------------------------ */

function Workspace() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden px-6">
        <motion.div
          style={reduce ? undefined : { scale }}
          className="relative aspect-[16/9] w-full max-w-[1200px] overflow-hidden rounded-[24px] border border-line"
        >
          {/* TODO: real unified-workspace render (1600x900) */}
          <Image
            src="https://picsum.photos/seed/novaos-workspace/1600/900"
            alt="Your work, in a single view"
            fill
            sizes="(max-width: 1200px) 92vw, 1200px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(8,8,10,0.15), rgba(8,8,10,0.85))" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
            <h2 className="max-w-[18ch] text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">
              Your entire day, in a single view.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-zinc-300 sm:text-lg">
              Notes, messages, tasks, and automations, side by side. No tab
              chaos. Nothing lost between the cracks.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- AI teaser -------------------------------- */

function AITeaser() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-32 lg:py-44">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-4 text-[13px] uppercase tracking-[0.2em] text-accent">Intelligence</p>
        <h2 className="text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">
          An assistant that understands your work.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        <Reveal className="md:col-span-2 md:row-span-2">
          <article className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-[24px] border border-line p-8">
            {/* TODO: real AI feature visual (1000x1000) */}
            <Image
              src="https://picsum.photos/seed/novaos-ai/1000/1000"
              alt="Ask across everything you know"
              fill
              sizes="(max-width: 768px) 92vw, 760px"
              className="object-cover opacity-45 transition-opacity duration-700 group-hover:opacity-55"
            />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,10,0.25), rgba(8,8,10,0.85))" }} />
            <div className="relative">
              <Sparkle size={30} weight="light" className="text-accent" />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">Answers from everything you know</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-zinc-300">
                Ask in plain language. NovaOS draws from your notes, files, and
                conversations to answer with context.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="flex h-full min-h-[180px] flex-col justify-between rounded-[24px] border border-line bg-gradient-to-br from-bg-2 to-accent-soft p-7">
            <PenNib size={26} weight="light" className="text-accent" />
            <div>
              <h3 className="text-lg font-semibold">Drafts in your voice</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                Replies, summaries, and documents that already sound like you.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.16}>
          <article className="flex h-full min-h-[180px] flex-col justify-between rounded-[24px] border border-line bg-bg-2 p-7">
            <FlowArrow size={26} weight="light" className="text-accent" />
            <div>
              <h3 className="text-lg font-semibold">Plans that run themselves</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                Describe the outcome. NovaOS builds and runs the workflow.
              </p>
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <Link href="/ai-features" className="inline-flex items-center gap-2 text-[15px] text-ink transition-colors hover:text-accent">
          Explore AI Features
          <ArrowUpRight size={16} weight="bold" />
        </Link>
      </Reveal>
    </section>
  );
}

/* -------------------------------- pillars --------------------------------- */

function Pillars() {
  const items = [
    {
      icon: SquaresFour,
      label: "Productivity",
      body: "Notes, docs, and tasks that stay in sync, so nothing slips.",
      seed: "novaos-productivity",
    },
    {
      icon: ChatCircle,
      label: "Communication",
      body: "Threads, calls, and shared rooms, without the noise.",
      seed: "novaos-communication",
    },
    {
      icon: Lightning,
      label: "Automation",
      body: "Quiet workflows that handle the repeat work for you.",
      seed: "novaos-automation",
    },
  ];

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-32 lg:py-44">
      <Reveal className="mb-16 max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">
          Three disciplines. One quiet system.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.1}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-bg-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* TODO: real pillar visuals (900x680) */}
                <Image
                  src={`https://picsum.photos/seed/${it.seed}/900/680`}
                  alt={it.label}
                  fill
                  sizes="(max-width: 768px) 92vw, 380px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <it.icon size={24} weight="light" className="text-accent" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{it.label}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{it.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- enterprise ------------------------------- */

const LOGOS: { name: string; mark: React.ReactNode }[] = [
  { name: "Lumen", mark: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="2.5" fill="currentColor" /></svg>) },
  { name: "Vantage", mark: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M4 18 12 5l8 13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>) },
  { name: "Meridian", mark: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /></svg>) },
  { name: "Kestrel", mark: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M12 3 20 8v8l-8 5-8-5V8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>) },
  { name: "Atelier Nord", mark: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><rect x="12" y="3" width="12.7" height="12.7" transform="rotate(45 12 3)" stroke="currentColor" strokeWidth="1.6" /></svg>) },
  { name: "Forma", mark: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M6 19V5h8M6 12h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>) },
];

function Enterprise() {
  return (
    <section className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-[1240px] px-6 py-32 lg:py-44">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">
            Built for the most ambitious teams.
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            Enterprise-grade security, single sign-on, and the controls your IT
            team will trust. Scale to thousands without losing the calm.
          </p>
          <Link href="/enterprise" className="mt-8 inline-flex items-center gap-2 text-[15px] text-ink transition-colors hover:text-accent">
            Explore Enterprise
            <ArrowUpRight size={16} weight="bold" />
          </Link>
        </Reveal>

        <Reveal className="mt-20">
          <p className="mb-9 text-[13px] text-muted">Trusted by teams at</p>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-7">
            {LOGOS.map((logo) => (
              <span key={logo.name} className="flex items-center gap-2.5 text-muted/70 transition-colors hover:text-ink">
                {logo.mark}
                <span className="text-[15px] font-medium tracking-tight">{logo.name}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ closing CTA ------------------------------- */

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[150px]"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1240px] px-6 py-40 text-center lg:py-56">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Step into a calmer way to work.
          </h2>
          <div className="mt-12 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[15px] font-medium text-bg transition-opacity hover:opacity-90 active:translate-y-px"
            >
              Request access
              <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Workspace />
      <AITeaser />
      <Pillars />
      <Enterprise />
      <ClosingCTA />
    </main>
  );
}
