"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { coverage } from "@/data/site";

export function Coverage() {
  return (
    <MotionSection className="ph-section">
      <div className="wrap">
        <div className="ph-head">
          <FadeItem>
            <p className="ph-kicker" style={{ color: "var(--ph-crimson)" }}>
              Coverage
            </p>
            <h2>Where Phoenix operates</h2>
          </FadeItem>
          <FadeItem>
            <p>Ras Al Khaimah based — ready for port and anchorage coordination.</p>
          </FadeItem>
        </div>
        <div className="ph-grid-3">
          {coverage.map((item) => (
            <FadeItem key={item.title}>
              <article className="ph-coverage-card">
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
