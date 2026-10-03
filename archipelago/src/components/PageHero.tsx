"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

export function PageHero({
  label,
  title,
  children,
}: {
  label: ReactNode;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="arc-page">
      <motion.div className="wrap" initial="hidden" animate="show" variants={stagger}>
        <motion.p className="label" variants={fadeUp}>
          {label}
        </motion.p>
        <motion.h1 variants={fadeUp}>{title}</motion.h1>
        {children ? <motion.div variants={fadeUp}>{children}</motion.div> : null}
      </motion.div>
    </section>
  );
}
