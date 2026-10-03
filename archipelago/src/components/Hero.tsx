"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, MagneticButton, stagger } from "@/components/motion";
import { company } from "@/data/company";

const wa = `https://wa.me/${company.whatsapp}`;
const mail = `mailto:${company.email}?subject=${encodeURIComponent("Service request — Archipelago")}`;

export function Hero() {
  return (
    <section className="arc-hero">
      <div className="arc-hero-media" aria-hidden>
        <Image src="/images/home/ship.jpg" alt="" fill priority sizes="100vw" className="arc-hero-img" />
        <div className="arc-hero-scrim" />
      </div>
      <div className="wrap arc-hero-grid">
        <motion.div className="arc-hero-copy" initial="hidden" animate="show" variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>
            UAE · Oman · Independent agency
          </motion.p>
          <motion.h1 variants={fadeUp}>
            Archipelago
            <span>Middle East Shipping</span>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            Ship agency, supply, crew, logistics, and marine support — coordinated from desks that
            sit minutes from the port gate.
          </motion.p>
          <motion.div className="arc-hero-actions" variants={fadeUp}>
            <MagneticButton href="/services" className="btn btn-brand">
              View services
            </MagneticButton>
            <MagneticButton href={wa} className="btn btn-wa">
              WhatsApp desk
            </MagneticButton>
            <MagneticButton href={mail} className="btn btn-line">
              Email operations
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
