"use client";

/**
 * LaunchForge - developer-tool marketing landing page.
 * Single-file page. Static shell + isolated Motion islands, all client here
 * so the whole thing lives in one route file (per brief).
 *
 * Design read: devtool landing for technical builders, premium/technical/fast,
 * Linear / Vercel / Raycast family. Dark-primary, dual-mode tokens.
 * Dials: VARIANCE 6 / MOTION 5 / DENSITY 4. One ember accent, locked.
 *
 * IMAGES: picsum.photos placeholders with a dark + ember treatment so random
 * photos stay cohesive. Swap the TODO-marked sources for real assets:
 *   - hero asset (1200x1000, abstract forge / molten-metal mood)
 *   - capability feature image (900x900)
 *   - 3 testimonial portraits (96x96)
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Sparkle,
  Code,
  CloudArrowUp,
  ShieldCheck,
  GitBranch,
  PencilSimple,
  Hammer,
  RocketLaunch,
  Check,
  ArrowRight,
  Sun,
  Moon,
} from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ----------------------------- motion helpers ---------------------------- */

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* --------------------------------- icons --------------------------------- */
const ICON = { size: 26, weight: "duotone" as const };

/* ---------------------------- invented logos ------------------------------ */
// Simple geometric monogram marks (sanctioned for made-up brands).
const LOGOS: { name: string; mark: React.ReactNode }[] = [
  {
    name: "Northbeam",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
        <path d="M4 18 12 5l8 13" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Saltmine",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
        <rect x="12" y="2.5" width="13" height="13" transform="rotate(45 12 2.5)" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Halcyon",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Quartzline",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
        <path d="M12 3 20 8v8l-8 5-8-5V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Pendant",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
        <path d="M4 6h16L12 20z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Vela",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
        <path d="M7 20 11 4M14 20 18 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* -------------------------------- buttons --------------------------------- */

function PrimaryCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href="#start"
      className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-all duration-200 hover:bg-accent-strong active:translate-y-px ${className}`}
    >
      Start building
      <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

function GhostCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors duration-200 hover:bg-surface-2 active:translate-y-px"
    >
      {children}
    </a>
  );
}

/* ------------------------------ section parts ----------------------------- */

function Nav() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("lf-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-fg">
            <Hammer size={16} weight="fill" />
          </span>
          LaunchForge
        </a>

        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#capabilities" className="transition-colors hover:text-fg">Capabilities</a>
          <a href="#how" className="transition-colors hover:text-fg">How it works</a>
          <a href="#engineers" className="transition-colors hover:text-fg">For engineers</a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-fg"
          >
            {dark ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
          </button>
          <PrimaryCTA className="hidden px-4 py-2 sm:inline-flex" />
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
      {/* single restrained ember glow, brand-tied, not an AI-purple mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }}
      />
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          variants={reduce ? undefined : heroContainer}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "show"}
        >
          <motion.p
            variants={heroItem}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <Sparkle size={13} weight="fill" className="text-accent" />
            AI-native build platform
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            From idea to{" "}
            <span className="text-accent">launch-ready</span> product.
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-[34ch] text-lg leading-relaxed text-muted"
          >
            LaunchForge turns a product idea into a working, launch-ready build.
            Plan, generate, and ship in one fast loop.
          </motion.p>
          <motion.div variants={heroItem} className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryCTA />
            <GhostCTA href="#how">See how it works</GhostCTA>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={reduce ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-line"
        >
          {/* TODO: replace with a real abstract forge / molten-metal asset (1200x1000) */}
          <Image
            src="https://picsum.photos/seed/launchforge-forge-2/1200/1000"
            alt="Abstract molten metal texture representing the forge"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,9,11,0.10), rgba(9,9,11,0.55)), radial-gradient(circle at 70% 30%, var(--accent-soft), transparent 55%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function LogoWall() {
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <p className="mb-8 text-center text-sm text-muted">Trusted by teams shipping at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {LOGOS.map((logo) => (
            <span
              key={logo.name}
              className="flex items-center gap-2 text-muted/70 transition-colors duration-200 hover:text-fg"
            >
              {logo.mark}
              <span className="text-[15px] font-medium tracking-tight">{logo.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifest() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 lg:py-36">
      <Reveal className="max-w-4xl">
        <h2 className="text-pretty text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
          Most ideas stall in the gap between a prototype and a product people
          can actually use. <span className="text-accent">LaunchForge closes that gap.</span>
        </h2>
        <p className="mt-7 max-w-[60ch] text-lg leading-relaxed text-muted">
          It handles the unglamorous work between the demo and the launch, from
          the data model to the deploy, so your time goes to the parts only you
          can do.
        </p>
      </Reveal>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:py-16">
      <Reveal className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Capabilities</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything between idea and launch.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* A: large, image-backed */}
        <Reveal className="md:col-span-4">
          <article className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl border border-line p-7">
            {/* TODO: replace with a real product/abstract asset (900x900) */}
            <Image
              src="https://picsum.photos/seed/launchforge-spec/900/900"
              alt="Texture representing a generated product spec"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              className="object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-50"
            />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(9,9,11,0.30), rgba(9,9,11,0.82))" }} />
            <div className="relative">
              <Sparkle {...ICON} className="text-accent" />
              <h3 className="mt-4 text-xl font-semibold text-white">Spec from a sentence</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-300">
                Describe the product in plain language. LaunchForge drafts the
                spec, data model, and API surface, ready for you to edit.
              </p>
            </div>
          </article>
        </Reveal>

        {/* B: gradient-tinted */}
        <Reveal delay={0.05} className="md:col-span-2">
          <article className="flex h-full flex-col rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-2 p-7">
            <Code {...ICON} className="text-accent" />
            <h3 className="mt-4 text-lg font-semibold">Code you can merge</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Typed, tested, idiomatic code in the stack you already use.
            </p>
          </article>
        </Reveal>

        {/* C */}
        <Reveal className="md:col-span-2">
          <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
            <CloudArrowUp {...ICON} className="text-accent" />
            <h3 className="mt-4 text-lg font-semibold">Deploy anywhere</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Vercel, Fly, or your own infrastructure. No lock-in.
            </p>
          </article>
        </Reveal>

        {/* D: accent-soft tinted */}
        <Reveal delay={0.05} className="md:col-span-2">
          <article className="flex h-full flex-col rounded-2xl border border-line bg-accent-soft p-7">
            <ShieldCheck {...ICON} className="text-accent" />
            <h3 className="mt-4 text-lg font-semibold">Checks on every build</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Type checks, tests, and a security pass run before you see the diff.
            </p>
          </article>
        </Reveal>

        {/* E */}
        <Reveal delay={0.1} className="md:col-span-2">
          <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
            <GitBranch {...ICON} className="text-accent" />
            <h3 className="mt-4 text-lg font-semibold">You own the repo</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Review diffs, steer the build, regenerate. The code is yours.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const reduce = useReducedMotion();
  const steps = [
    {
      icon: PencilSimple,
      title: "Draft",
      body: "Describe the product in plain language. LaunchForge drafts the spec, data model, and the API surface, ready for you to edit.",
    },
    {
      icon: Hammer,
      title: "Forge",
      body: "Generate a typed, tested codebase in your stack. Every build runs type checks, tests, and a security pass before you see it.",
    },
    {
      icon: RocketLaunch,
      title: "Ship",
      body: "Deploy to Vercel, Fly, or your own infrastructure. Keep the repo, keep your conventions, keep full control.",
    },
  ];

  return (
    <section id="how" className="bg-surface/40 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps from idea to launch.
          </h2>
        </Reveal>

        <div className="relative pl-12 sm:pl-16">
          {/* animated spine: communicates the linear idea-to-launch flow */}
          <div aria-hidden className="absolute left-[18px] top-2 bottom-2 w-px bg-line sm:left-[26px]">
            <motion.div
              className="h-full w-full origin-top bg-accent"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </div>

          <div className="space-y-14">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="relative">
                <span className="absolute -left-12 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg text-accent sm:-left-16 sm:h-[52px] sm:w-[52px]">
                  <step.icon size={22} weight="duotone" />
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForEngineers() {
  const points = [
    "Typed end to end, with tests that run on every build.",
    "Follows your conventions, not a one-size template.",
    "Readable diffs you can review and edit, never a black box.",
    "Export the repo and keep building without LaunchForge.",
  ];

  return (
    <section id="engineers" className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 lg:py-36">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Generated code you would actually merge.
          </h2>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[16px] leading-relaxed text-muted">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Check size={13} weight="bold" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <Code size={15} weight="bold" className="text-accent" />
              <span className="font-mono text-xs text-muted">launchforge.config.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-muted">import</span> {"{ defineProject }"}{" "}
                <span className="text-muted">from</span>{" "}
                <span className="text-accent">&quot;launchforge&quot;</span>;
                {"\n\n"}
                <span className="text-muted">export default</span> defineProject({"{"}
                {"\n"}  idea: <span className="text-accent">&quot;Invoicing tool for freelancers&quot;</span>,
                {"\n"}  stack: {"{ web: "}<span className="text-accent">&quot;next&quot;</span>, db:{" "}
                <span className="text-accent">&quot;postgres&quot;</span> {"}"},
                {"\n"}  deploy: <span className="text-accent">&quot;vercel&quot;</span>,
                {"\n"}  checks: [<span className="text-accent">&quot;types&quot;</span>,{" "}
                <span className="text-accent">&quot;tests&quot;</span>,{" "}
                <span className="text-accent">&quot;security&quot;</span>],
                {"\n"}
                {"}"});
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Proof() {
  const quotes = [
    {
      body: "From a Figma file to a deployed product in a weekend, with code clean enough to build on.",
      name: "Mara Quintero",
      role: "Founder at Northbeam",
      seed: "mara-q",
      featured: true,
    },
    {
      body: "It does the boring 80 percent so I can focus on the part that actually matters.",
      name: "Devin Asante",
      role: "Staff Engineer at Saltmine",
      seed: "devin-a",
    },
    {
      body: "The test and security passes caught things I would have shipped. That alone earned my trust.",
      name: "Yuki Tanaka",
      role: "Product Lead at Halcyon",
      seed: "yuki-t",
    },
  ];

  function Attribution({ seed, name, role }: { seed: string; name: string; role: string }) {
    return (
      <div className="mt-6 flex items-center gap-3">
        {/* TODO: replace with real portraits (96x96) */}
        <Image
          src={`https://picsum.photos/seed/${seed}/96/96`}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="text-sm">
          <p className="font-medium text-fg">{name}</p>
          <p className="text-muted">{role}</p>
        </div>
      </div>
    );
  }

  const featured = quotes[0];
  const rest = quotes.slice(1);

  return (
    <section className="bg-surface/40 py-28 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Builders are shipping with it.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-bg p-8">
              <blockquote className="text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                {featured.body}
              </blockquote>
              <figcaption className="mt-auto">
                <Attribution seed={featured.seed} name={featured.name} role={featured.role} />
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid grid-cols-1 gap-5">
            {rest.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-bg p-8">
                  <blockquote className="text-[17px] leading-relaxed text-fg">{q.body}</blockquote>
                  <figcaption className="mt-auto">
                    <Attribution seed={q.seed} name={q.name} role={q.role} />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="start" className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 lg:py-36">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-line px-8 py-20 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 120%, var(--accent-soft), transparent 60%)" }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Stop prototyping. Start shipping.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-muted">
              Turn your next idea into a launch-ready product.
            </p>
            <div className="mt-9 flex justify-center">
              <PrimaryCTA className="px-7" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Product", links: ["Capabilities", "How it works", "For engineers"] },
    { title: "Company", links: ["About", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms"] },
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-fg">
              <Hammer size={16} weight="fill" />
            </span>
            LaunchForge
          </div>
          <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-muted">
            From idea to launch-ready product.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-fg">{col.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-fg">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 py-6 text-sm text-muted sm:px-8">
          © 2026 LaunchForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Page() {
  return (
    <main className="bg-bg text-fg">
      <Nav />
      <Hero />
      <LogoWall />
      <Manifest />
      <Capabilities />
      <HowItWorks />
      <ForEngineers />
      <Proof />
      <FinalCTA />
      <Footer />
    </main>
  );
}
