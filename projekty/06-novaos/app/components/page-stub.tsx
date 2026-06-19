import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export function PageStub({
  eyebrow,
  title,
  intro,
  hideRequestAccess = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  hideRequestAccess?: boolean;
}) {
  return (
    <main className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-50 blur-[150px]"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 68%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-6 pt-[68px] text-center">
        <p className="mb-5 text-[13px] uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mx-auto max-w-[18ch] text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-7 max-w-[54ch] text-lg leading-relaxed text-muted">
          {intro}
        </p>
        <p className="mt-10 text-[14px] text-faint">This chapter of NovaOS is being crafted.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-[15px] text-ink transition-colors hover:bg-white/5"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to home
          </Link>
          {!hideRequestAccess && (
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-bg transition-opacity hover:opacity-90 active:translate-y-px"
            >
              Request access
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
