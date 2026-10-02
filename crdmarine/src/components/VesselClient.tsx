"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import type { Vessel } from "@/data/fleet";

export function VesselClient({ vessel }: { vessel: Vessel }) {
  const specs: [string, string][] = [
    ["Year built", vessel.yearOfBuild],
    ["Flag / registry", `${vessel.flag} / ${vessel.registry}`],
    ["Shipyard", vessel.shipyard],
    ["Hull", vessel.hull],
    ["LOA", vessel.loa],
    ["Breadth", vessel.breadth],
    ["Depth", vessel.depth],
    ["Operation draft", vessel.operationDraft],
    ["Minimum draft", vessel.minimumDraft],
    ["GRT", vessel.grt],
    ["Light ship", vessel.lightShip],
    ["Deck cargo", vessel.deckCargo],
    ["Bunker capacity", vessel.bunkerCapacity ?? "—"],
    ["Fresh water", vessel.freshWaterCapacity ?? "—"],
    ["Free deck area", vessel.freeDeckArea ?? "—"],
    ["Main engines", vessel.mainEngines],
    ["Generators", vessel.generators],
    ["Service speed", vessel.serviceSpeed],
    ["Passengers", vessel.passengerCapacity],
    ["Crew", vessel.crew],
    ["Call sign", vessel.callSign ?? "—"],
    ["MMSI", vessel.mmsi ?? "—"],
    ["Class", vessel.classNotation ?? "—"],
    ["Former name", vessel.formerName ?? "—"],
  ];

  return (
    <MotionSection className="section">
      <div className="container">
        <FadeItem>
          <p className="section-lead" style={{ marginBottom: "0.5rem" }}>
            Owner: <strong style={{ color: "var(--crd-foam)" }}>{vessel.owner}</strong>
            {" · "}
            Operator: <strong style={{ color: "var(--crd-foam)" }}>{vessel.operator}</strong>
          </p>
        </FadeItem>
        <dl className="spec-grid">
          {specs.map(([label, value]) => (
            <FadeItem key={label}>
              <div className="spec-cell">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            </FadeItem>
          ))}
        </dl>
      </div>
    </MotionSection>
  );
}
