"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";
import { FadeItem, MagneticButton, MotionSection, springSnappy } from "@/components/motion";
import type { Vessel } from "@/data/fleet";

type Service = {
  slug: string;
  title: string;
  short: string;
};

export function HomeClient({
  services,
  vessels,
}: {
  services: Service[];
  vessels: Vessel[];
}) {
  return (
    <>
      <MotionSection className="section">
        <div className="container">
          <FadeItem>
            <span className="section-label">What we do</span>
            <h2 className="section-title">Boat services built for Fujairah waters</h2>
            <p className="section-lead">
              From Port of Fujairah and the anchorage, we move water, stores, and people between bay
              and vessel with a focused local fleet.
            </p>
          </FadeItem>
          <div className="services-grid">
            {services.map((service, i) => (
              <FadeItem key={service.slug}>
                <motion.article
                  className="service-item service-item--motion"
                  whileHover={{ x: 6, borderTopColor: "rgba(45, 178, 79, 0.85)" }}
                  transition={springSnappy}
                >
                  <div className="service-index">0{i + 1}</div>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                </motion.article>
              </FadeItem>
            ))}
          </div>
          <FadeItem>
            <div style={{ marginTop: "2.5rem" }}>
              <MagneticButton href="/services" className="btn btn-ghost">
                Explore services
              </MagneticButton>
            </div>
          </FadeItem>
        </div>
      </MotionSection>

      <MotionSection className="section section--fleet-video">
        <div className="section-video-wrap" aria-hidden>
          <VideoBackground overlay="section" kenBurns={false} />
        </div>
        <div className="container section-video-content">
          <FadeItem>
            <span className="section-label">Fleet</span>
            <h2 className="section-title">Barges & craft ready for the call</h2>
            <p className="section-lead">
              Five vessels covering crew transfer, fresh water, and deck cargo — specs drawn from
              current Q88 particulars.
            </p>
          </FadeItem>
          <div className="fleet-list">
            {vessels.map((v) => (
              <FadeItem key={v.slug}>
                <motion.div whileHover={{ x: 8 }} transition={springSnappy}>
                  <Link href={`/fleet/${v.slug}`} className="fleet-row fleet-row--glass">
                    <div>
                      <h3>{v.name}</h3>
                      <p className="meta">
                        Built {v.yearOfBuild} · {v.hull} · {v.flag}
                      </p>
                    </div>
                    <div className="fleet-stats">
                      <div>
                        <strong>{v.loa}</strong>
                        LOA
                      </div>
                      <div>
                        <strong>{v.serviceSpeed}</strong>
                        Speed
                      </div>
                      <div>
                        <strong>{v.passengerCapacity}</strong>
                        Pax
                      </div>
                    </div>
                    <span className="btn btn-ghost" style={{ pointerEvents: "none" }}>
                      Specs
                    </span>
                  </Link>
                </motion.div>
              </FadeItem>
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}
