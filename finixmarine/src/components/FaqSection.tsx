"use client";

import { useState } from "react";
import { FadeItem, MotionSection } from "@/components/motion";
import { faqs } from "@/data/site";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionSection className="fx-faq">
      <div className="wrap fx-faq-layout">
        <FadeItem>
          <p className="fx-eyebrow">FAQ</p>
          <h2>Straight answers for masters and agents</h2>
          <p className="fx-faq-lead">
            Built for the questions vessel operators ask before a Fujairah call — clear, practical,
            and searchable.
          </p>
        </FadeItem>
        <div className="fx-faq-list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeItem key={item.q}>
                <div className={`fx-faq-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="fx-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span aria-hidden>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="fx-faq-a">{item.a}</p>}
                </div>
              </FadeItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
