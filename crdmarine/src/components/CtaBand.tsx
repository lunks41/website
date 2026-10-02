"use client";

import { motion } from "framer-motion";
import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import { company } from "@/data/company";

export function CtaBand() {
  const wa = `https://wa.me/${company.whatsapp}`;
  const mail = `mailto:${company.email}?subject=${encodeURIComponent("Service request — CRD Marine")}`;

  return (
    <MotionSection className="cta-band">
      <div className="container inner">
        <FadeItem>
          <h2>Need bay-to-vessel support in Fujairah?</h2>
        </FadeItem>
        <FadeItem>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <MagneticButton href={wa} className="btn btn-primary">
              WhatsApp
            </MagneticButton>
            <MagneticButton href={mail} className="btn btn-ghost">
              Email operations
            </MagneticButton>
          </div>
        </FadeItem>
      </div>
      <motion.div
        className="cta-shine"
        aria-hidden
        animate={{ x: ["-30%", "130%"] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", repeatDelay: 2 }}
      />
    </MotionSection>
  );
}
