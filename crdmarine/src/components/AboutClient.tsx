"use client";

import { FadeItem, MotionSection } from "@/components/motion";

export function AboutClient({ hours, vesselCount }: { hours: string; vesselCount: number }) {
  return (
    <MotionSection className="section">
      <div className="container" style={{ display: "grid", gap: "2rem", maxWidth: "720px" }}>
        <FadeItem>
          <h2 className="section-title" style={{ maxWidth: "none" }}>
            Built around Port of Fujairah
          </h2>
          <p className="section-lead" style={{ maxWidth: "none" }}>
            Operating from Plot 10 A, Port of Fujairah, we support vessels throughout Fujairah waters
            with a fleet sized for supply runs, passenger transfer, and deck cargo. Our operations desk
            runs {hours.toLowerCase()}, coordinating with agents and masters for tight anchorage
            windows.
          </p>
        </FadeItem>
        <FadeItem>
          <h3 style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>Why operators call us</h3>
          <ul style={{ color: "var(--crd-mist)", display: "grid", gap: "0.65rem" }}>
            <li>— Local Fujairah footprint with direct port access</li>
            <li>— Fresh water, stores, and crew change in one coordinated call</li>
            <li>— Documented vessel particulars (Q88) for {vesselCount} craft</li>
            <li>— Clear contact lines for day and night mobilisation</li>
          </ul>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
