"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";
import { FadeItem, MagneticButton, MotionSection, springSnappy } from "@/components/motion";
import { StatsBand } from "@/components/StatsBand";
import { WhyUs } from "@/components/WhyUs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Coverage } from "@/components/Coverage";
import { FaqSection } from "@/components/FaqSection";
import type { Service } from "@/data/services";

const pillars = [
  { t: "Husbandry", d: "Water, crew, provisions, medical" },
  { t: "Agency", d: "Port formalities & bunkers" },
  { t: "Logistics", d: "Customs & goods movement" },
  { t: "Technical", d: "Spares & waste disposal" },
];

export function HomeClient({ services }: { services: Service[] }) {
  const marquee = [...services, ...services].map((s) => s.title);
  const featured = services.slice(0, 6);

  return (
    <>
      <div className="fx-marquee" aria-hidden>
        <div className="fx-marquee-track">
          {marquee.map((label, i) => (
            <span key={`${label}-${i}`}>
              {label} <span className="dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      <StatsBand />

      <MotionSection className="fx-services-showcase">
        <div className="wrap">
          <div className="fx-timeline-head">
            <FadeItem>
              <p className="fx-eyebrow">What we do</p>
              <h2>Shipping professionals for Fujairah calls</h2>
            </FadeItem>
            <FadeItem>
              <p>
                Comprehensive husbandry, agency, and logistics support — the service breadth vessel
                operators expect from East Coast marine partners, delivered by Finix Marine.
              </p>
            </FadeItem>
          </div>

          <div className="fx-service-mosaic">
            {featured.map((service, i) => (
              <FadeItem key={service.slug}>
                <motion.div whileHover={{ y: -6 }} transition={springSnappy}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`fx-service-tile${i === 0 ? " fx-service-tile--wide" : ""}`}
                  >
                    <div className="fx-service-tile__media">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className="fx-service-tile__img"
                      />
                    </div>
                    <div className="fx-service-tile__body">
                      <span className="fx-service-tile__cat">{service.category}</span>
                      <h3>{service.title}</h3>
                      <p>{service.short}</p>
                    </div>
                  </Link>
                </motion.div>
              </FadeItem>
            ))}
          </div>

          <FadeItem>
            <div style={{ marginTop: "2.25rem" }}>
              <MagneticButton href="/services" className="btn btn-flame">
                All {services.length} services
              </MagneticButton>
            </div>
          </FadeItem>
        </div>
      </MotionSection>

      <WhyUs />
      <ProcessSteps />

      <MotionSection className="fx-statement">
        <div className="fx-statement-video" aria-hidden>
          <VideoBackground overlay="section" kenBurns={false} />
        </div>
        <div className="fx-statement-inner">
          <FadeItem>
            <h2>Your needs, our focus.</h2>
            <p>
              From fresh water and crew changes to customs, bunkers, and waste disposal — Finix
              Marine keeps Fujairah operations moving when the window is tight.
            </p>
            <MagneticButton href="/contact" className="btn btn-flame">
              Request support
            </MagneticButton>
          </FadeItem>
          <div className="fx-pillars">
            {pillars.map((p) => (
              <FadeItem key={p.t}>
                <div className="fx-pillar">
                  <strong>{p.t}</strong>
                  <span>{p.d}</span>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </MotionSection>

      <Coverage />
      <FaqSection />
    </>
  );
}
