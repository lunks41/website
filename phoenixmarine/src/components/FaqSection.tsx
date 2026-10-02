"use client";

import { useState } from "react";
import { FadeItem, MotionSection } from "@/components/motion";
import { faqs } from "@/data/site";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionSection className="ph-section ph-section--fog">
      <div className="wrap">
        <FadeItem>
          <p className="ph-kicker" style={{ color: "var(--ph-crimson)" }}>
            FAQ
          </p>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "clamp(2rem,4vw,3rem)" }}>
            Quick answers
          </h2>
        </FadeItem>
        <div>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeItem key={item.q}>
                <div className="ph-faq-item">
                  <button
                    type="button"
                    className="ph-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="ph-faq-a">{item.a}</p>}
                </div>
              </FadeItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
