"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { processSteps } from "@/data/site";

export function ProcessSteps() {
  return (
    <MotionSection className="fx-process">
      <div className="wrap">
        <FadeItem>
          <p className="fx-eyebrow">How we work</p>
          <h2 className="fx-process-title">From first message to closed call</h2>
        </FadeItem>
        <div className="fx-process-grid">
          {processSteps.map((step) => (
            <FadeItem key={step.step}>
              <article className="fx-process-card">
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            </FadeItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
