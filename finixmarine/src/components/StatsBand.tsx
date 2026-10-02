"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { stats } from "@/data/site";

export function StatsBand() {
  return (
    <MotionSection className="fx-stats">
      <div className="wrap fx-stats-grid">
        {stats.map((item) => (
          <FadeItem key={item.label}>
            <div className="fx-stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          </FadeItem>
        ))}
      </div>
    </MotionSection>
  );
}
