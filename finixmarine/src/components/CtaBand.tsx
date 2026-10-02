"use client";

import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import { company } from "@/data/company";

export function CtaBand() {
  const wa = `https://wa.me/${company.whatsapp}`;
  const mail = `mailto:${company.email}?subject=${encodeURIComponent("Service request — Finix Marine")}`;

  return (
    <MotionSection className="fx-cta">
      <FadeItem>
        <div className="fx-cta-seal">
          <h2>Need support on the next Fujairah call?</h2>
          <p>WhatsApp or email the Finix desk</p>
          <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", justifyContent: "center" }}>
            <MagneticButton href={wa} className="btn btn-flame">
              WhatsApp
            </MagneticButton>
            <MagneticButton href={mail} className="btn btn-ink">
              Email
            </MagneticButton>
          </div>
        </div>
      </FadeItem>
    </MotionSection>
  );
}
