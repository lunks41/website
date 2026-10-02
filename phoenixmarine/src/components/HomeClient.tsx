"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import type { Service } from "@/data/services";
import { company } from "@/data/company";
import { values, processSteps, coverage, faqs, stats } from "@/data/site";

export function HomeClient({ services }: { services: Service[] }) {
  const featured = services.slice(0, 6);
  const wa = `https://wa.me/${company.whatsapp}`;

  return (
    <>
      <section className="px-command">
        <div className="px-command-inner">
          {stats.map((s) => (
            <div key={s.label} className="px-command-item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <MotionSection className="px-bands">
        <div className="wrap px-section" style={{ paddingBottom: "1.5rem" }}>
          <FadeItem>
            <div className="px-intro">
              <h2>Services on the deck</h2>
              <p>
                Full-bleed operational bands for the RAK desk. Tap any row for detail, or jump to
                WhatsApp.
              </p>
            </div>
          </FadeItem>
        </div>
        {featured.map((service, i) => (
          <FadeItem key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className={`px-band${i % 2 === 1 ? " is-flip" : ""}`}
            >
              <div className="px-band-media">
                <Image src={service.image} alt={service.title} fill sizes="50vw" />
              </div>
              <div className="px-band-copy">
                <span className="cat">{service.category}</span>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <span className="more">Open details →</span>
              </div>
            </Link>
          </FadeItem>
        ))}
        <div className="wrap" style={{ padding: "2rem 0 3rem", display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
          <MagneticButton href="/services" className="btn btn-brand">
            All {services.length} services
          </MagneticButton>
          <MagneticButton href={wa} className="btn btn-wa">
            WhatsApp desk
          </MagneticButton>
        </div>
      </MotionSection>

      <MotionSection className="px-section">
        <div className="wrap">
          <FadeItem>
            <h2>Why operators call Phoenix</h2>
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

      <MotionSection className="px-section" style={{ background: "var(--bg-2)" }}>
        <div className="wrap">
          <FadeItem>
            <h2>How a call runs</h2>
          </FadeItem>
          <div className="px-steps">
            {processSteps.map((step) => (
              <FadeItem key={step.step}>
                <article>
                  <span>{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              </FadeItem>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="px-section">
        <div className="wrap">
          <FadeItem>
            <div className="px-intro">
              <h2>Coverage</h2>
              <p>Ras Al Khaimah base with port and anchorage coordination.</p>
            </div>
          </FadeItem>
          <div className="px-chips">
            {coverage.map((item) => (
              <FadeItem key={item.title}>
                <article className="px-chip">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </FadeItem>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="px-section px-faq" style={{ background: "var(--bg-2)" }}>
        <div className="wrap">
          <FadeItem>
            <h2>FAQ</h2>
          </FadeItem>
          {faqs.map((item) => (
            <FadeItem key={item.q}>
              <details>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            </FadeItem>
          ))}
        </div>
      </MotionSection>
    </>
  );
}
