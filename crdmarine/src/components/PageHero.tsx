"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";
import { fadeUp, stagger } from "@/components/motion";

export function PageHero({
  label,
  title,
  children,
  withVideo = true,
}: {
  label: ReactNode;
  title: string;
  children?: ReactNode;
  withVideo?: boolean;
}) {
  return (
    <section className={`page-hero${withVideo ? " page-hero--video" : ""}`}>
      {withVideo && (
        <div className="page-hero-video" aria-hidden>
          <VideoBackground overlay="section" kenBurns />
        </div>
      )}
      <motion.div
        className="container"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>
          {label}
        </motion.span>
        <motion.h1 variants={fadeUp}>{title}</motion.h1>
        {children ? <motion.div variants={fadeUp}>{children}</motion.div> : null}
      </motion.div>
    </section>
  );
}
