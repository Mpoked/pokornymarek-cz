"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise on scroll into view. Honors reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  amount = 0.3,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container for sequential reveals. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
