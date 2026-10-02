"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { coverage } from "@/data/site";

export function Coverage() {
  return (
    <MotionSection className="fx-coverage">
      <div className="wrap">
        <div className="fx-timeline-head">
          <FadeItem>
            <p className="fx-eyebrow">Where we operate</p>
            <h2>Local support where volume matters</h2>
          </FadeItem>
          <FadeItem>
            <p>
              Focused on Fujairah — Port and offshore anchorage — with East Coast liaison when your
              call connects beyond a single berth.
            </p>
          </FadeItem>
        </div>
        <div className="fx-coverage-grid">
          {coverage.map((item) => (
            <FadeItem key={item.title}>
              <article className="fx-coverage-card">
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
