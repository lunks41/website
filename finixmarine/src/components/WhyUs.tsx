"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { values } from "@/data/site";

export function WhyUs() {
  return (
    <MotionSection className="fx-why">
      <div className="wrap">
        <div className="fx-timeline-head">
          <FadeItem>
            <p className="fx-eyebrow">Why Finix</p>
            <h2>Partners in safety and clear execution</h2>
          </FadeItem>
          <FadeItem>
            <p>
              Patterns shared by leading ship agencies — safety, transparency, and one accountable
              counterpart — applied to Finix Marine’s Fujairah desk.
            </p>
          </FadeItem>
        </div>
        <div className="fx-why-grid">
          {values.map((item, i) => (
            <FadeItem key={item.title}>
              <article className="fx-why-card">
                <span className="fx-why-num">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </FadeItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
