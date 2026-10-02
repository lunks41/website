"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { processSteps } from "@/data/site";

export function ProcessSteps() {
  return (
    <MotionSection className="px-section">
      <div className="wrap">
        <FadeItem>
          <h2>How a call runs</h2>
        </FadeItem>
        <div className="px-steps">
          {processSteps.map((step) => (
            <FadeItem key={step.step}>
              <article>
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
