"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { groupCompanies } from "@/data/company";

export function GroupClient() {
  return (
    <MotionSection className="arc-section">
      <div className="wrap">
        <FadeItem>
          <div className="arc-intro">
            <h2>Marine companies in the network</h2>
            <p>
              Specialist Fujairah and Ras Al Khaimah desks that complement Archipelago’s agency
              coverage.
            </p>
          </div>
        </FadeItem>
        <div className="arc-group">
          {groupCompanies.map((g) => (
            <FadeItem key={g.name}>
              <a className="arc-group-card" href={g.href} target="_blank" rel="noopener noreferrer">
                <em>{g.location}</em>
                <h3>{g.name}</h3>
                <p>{g.blurb}</p>
                <span>Visit site →</span>
              </a>
            </FadeItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
