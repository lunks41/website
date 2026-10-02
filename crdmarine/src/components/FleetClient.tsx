"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeItem, MotionSection, springSnappy } from "@/components/motion";
import type { Vessel } from "@/data/fleet";

export function FleetClient({ vessels }: { vessels: Vessel[] }) {
  return (
    <MotionSection className="section">
      <div className="container fleet-list">
        {vessels.map((v) => (
          <FadeItem key={v.slug}>
            <motion.article
              className="fleet-row fleet-row--glass"
              style={{ alignItems: "start", display: "grid" }}
              whileHover={{ y: -4, borderColor: "rgba(45, 178, 79, 0.45)" }}
              transition={springSnappy}
            >
              <div>
                <h3>
                  <Link href={`/fleet/${v.slug}`}>{v.name}</Link>
                </h3>
                <p className="meta" style={{ marginBottom: "0.75rem" }}>
                  {v.summary}
                </p>
                <p className="meta">
                  Owner: {v.owner} · Operator: {v.operator}
                </p>
              </div>
              <div className="fleet-stats">
                <div>
                  <strong>
                    {v.loa} / {v.breadth}
                  </strong>
                  LOA / Beam
                </div>
                <div>
                  <strong>{v.deckCargo}</strong>
                  Deck cargo
                </div>
                <div>
                  <strong>{v.grt}</strong>
                  GRT
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <Link href={`/fleet/${v.slug}`} className="btn btn-ghost">
                  Full specs
                </Link>
                <a href={v.pdf} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Q88 PDF
                </a>
              </div>
            </motion.article>
          </FadeItem>
        ))}
      </div>
    </MotionSection>
  );
}
