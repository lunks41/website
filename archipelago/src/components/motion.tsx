"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Notion-like soft ease */
export const notionEase = [0.25, 0.1, 0.25, 1] as const;

export const springSoft = { type: "spring" as const, stiffness: 90, damping: 20, mass: 0.8 };
export const springSnappy = { type: "spring" as const, stiffness: 260, damping: 24 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: notionEase },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

export function MotionSection({
  children,
  className = "",
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}

export function FadeItem({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof motion;
}) {
  const Comp = motion[Tag as "div"] as typeof motion.div;
  return (
    <Comp className={className} variants={fadeUp}>
      {children}
    </Comp>
  );
}

export function MagneticButton({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={springSnappy}
    >
      {children}
    </motion.a>
  );
}
