"use client";

import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import { company } from "@/data/company";

export function CtaBand() {
  const wa = `https://wa.me/${company.whatsapp}`;
  const mail = `mailto:${company.email}?subject=${encodeURIComponent("Service request — Archipelago")}`;

  return (
    <MotionSection className="arc-cta">
      <div className="wrap">
        <FadeItem>
          <h2>Ready for the next call?</h2>
          <p>WhatsApp or email operations — same desk across UAE and Oman.</p>
          <div className="arc-cta-actions">
            <MagneticButton href={wa} className="btn btn-wa">
              WhatsApp
            </MagneticButton>
            <MagneticButton href={mail} className="btn btn-line">
              {company.email}
            </MagneticButton>
            <MagneticButton href={company.brochure} className="btn btn-brand">
              Download brochure
            </MagneticButton>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
