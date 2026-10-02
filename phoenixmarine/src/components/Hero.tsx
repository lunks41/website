"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";
import { fadeUp, MagneticButton, stagger } from "@/components/motion";
import { company } from "@/data/company";

const wa = `https://wa.me/${company.whatsapp}`;
const mail = `mailto:${company.email}?subject=${encodeURIComponent("Service request — Phoenix Marine")}`;

export function Hero() {
  return (
    <section className="px-hero">
      <div className="px-hero-media" aria-hidden>
        <VideoBackground overlay="hero" kenBurns />
        <div className="px-hero-scrim" />
      </div>
      <div className="px-hero-grid">
        <motion.div className="px-hero-copy" initial="hidden" animate="show" variants={stagger}>
          <motion.p className="ar" variants={fadeUp} lang="ar">
            {company.nameAr}
          </motion.p>
          <motion.h1 variants={fadeUp}>
            Phoenix
            <br />
            <i>Marine</i>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            Ras Al Khaimah operations desk for fresh water, crew, customs, logistics, and husbandry —
            contact by WhatsApp or email in one tap.
          </motion.p>
          <motion.div className="px-hero-actions" variants={fadeUp}>
            <MagneticButton href="/services" className="btn btn-brand">
              Browse services
            </MagneticButton>
            <MagneticButton href={wa} className="btn btn-wa">
              WhatsApp
            </MagneticButton>
            <MagneticButton href={mail} className="btn btn-mail">
              Email
            </MagneticButton>
          </motion.div>
        </motion.div>
        <motion.div
          className="px-hero-logo"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image src="/logo.png" alt={company.name} width={280} height={280} priority />
        </motion.div>
      </div>
    </section>
  );
}
