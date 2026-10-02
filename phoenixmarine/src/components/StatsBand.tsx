"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { stats } from "@/data/site";

export function StatsBand() {
  return (
    <MotionSection className="ph-section ph-section--ink" style={{ paddingBlock: "0" }}>
      <div className="wrap" style={{ paddingBlock: "0" }}>
        <div className="ph-stats">
          {stats.map((item) => (
            <FadeItem key={item.label}>
              <div className="ph-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </FadeItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
