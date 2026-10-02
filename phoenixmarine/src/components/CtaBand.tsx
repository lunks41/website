"use client";

import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import { company } from "@/data/company";

export function CtaBand() {
  const wa = `https://wa.me/${company.whatsapp}`;
  const mail = `mailto:${company.email}?subject=${encodeURIComponent("Service request — Phoenix Marine")}`;

  return (
    <MotionSection className="px-cta">
      <div className="wrap">
        <FadeItem>
          <h2>Ready for the next call?</h2>
          <p>WhatsApp or email — same desk, same numbers.</p>
          <div className="px-cta-actions">
            <MagneticButton href={wa} className="btn btn-wa">
              WhatsApp {company.phone}
            </MagneticButton>
            <MagneticButton href={mail} className="btn btn-mail">
              Email {company.email}
            </MagneticButton>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
