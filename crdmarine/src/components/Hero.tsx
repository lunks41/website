"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";
import { fadeUp, MagneticButton, notionEase, stagger } from "@/components/motion";
import { company } from "@/data/company";

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 140]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0.15]);
  const textY = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <section className="hero hero--video">
      <motion.div className="hero-video-layer" style={reduce ? undefined : { y }}>
        <VideoBackground overlay="hero" kenBurns />
      </motion.div>

      <motion.div className="container hero-inner" style={reduce ? undefined : { y: textY, opacity }}>
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p className="hero-kicker" variants={fadeUp}>
            Port of Fujairah · UAE
          </motion.p>
          <motion.h1 className="hero-brand" variants={fadeUp}>
            CR<span className="d">D</span> Marine
          </motion.h1>
          <motion.p className="hero-headline" variants={fadeUp}>
            {company.tagline}
          </motion.p>
          <motion.p className="hero-support" variants={fadeUp}>
            Fresh water, goods, and crew transportation — reliable boat and barge support for vessels
            calling Fujairah.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <MagneticButton href="/fleet" className="btn btn-primary">
              View fleet
            </MagneticButton>
            <MagneticButton href="/contact" className="btn btn-ghost">
              24h operations desk
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: notionEase }}
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className="hero-glow"
        animate={
          reduce
            ? undefined
            : { opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }
        }
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        style={{ transition: undefined }}
      />
    </section>
  );
}
