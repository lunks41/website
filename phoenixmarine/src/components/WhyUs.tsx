"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { values } from "@/data/site";

export function WhyUs() {
  return (
    <MotionSection className="px-section" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <FadeItem>
          <div className="px-intro">
            <h2>Why operators call Phoenix</h2>
            <p>Built for a responsive Ras Al Khaimah desk — not a generic brochure site.</p>
          </div>
        </FadeItem>
        <div className="px-matrix">
          {values.map((item, i) => (
            <FadeItem key={item.title}>
              <article>
                <div className="n">0{i + 1}</div>
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
