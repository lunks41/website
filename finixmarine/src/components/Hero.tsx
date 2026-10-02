"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";
import { fadeUp, MagneticButton, stagger } from "@/components/motion";
import { company } from "@/data/company";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="fx-hero">
      <div className="fx-hero-copy">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p className="fx-eyebrow" variants={fadeUp}>
            Fujairah · United Arab Emirates
          </motion.p>
          <motion.p className="fx-ar" variants={fadeUp} lang="ar">
            {company.nameAr}
          </motion.p>
          <motion.h1 className="fx-hero-title" variants={fadeUp}>
            Finix <em>Marine</em>
          </motion.h1>
          <motion.p className="fx-hero-lead" variants={fadeUp}>
            Fresh water, crew changes, customs, logistics, port agency, chandling, bunkers, and more —
            marine services shaped for every Fujairah call.
          </motion.p>
          <motion.div className="fx-hero-actions" variants={fadeUp}>
            <MagneticButton href="/services" className="btn btn-ink">
              View services
            </MagneticButton>
            <MagneticButton href="/contact" className="btn btn-line">
              Speak with us
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="fx-hero-stage">
        <VideoBackground overlay="hero" kenBurns={!reduce} />
        <div className="fx-hero-stage-veil" aria-hidden />
        <div className="fx-hero-phoenix">
          <Image
            src="/logo.png"
            alt={company.name}
            width={420}
            height={420}
            priority
          />
        </div>
      </div>
    </section>
  );
}
