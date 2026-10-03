"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import type { Service } from "@/data/services";
import { company, values, processSteps, faqs, stats, groupCompanies } from "@/data/company";

export function HomeClient({ services }: { services: Service[] }) {
  const featured = services.slice(0, 6);
  const wa = `https://wa.me/${company.whatsapp}`;

  return (
    <>
      <section className="arc-stats">
        <div className="wrap arc-stats-inner">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <MotionSection className="arc-section">
        <div className="wrap">
          <FadeItem>
            <div className="arc-intro">
              <h2>Who we are</h2>
              <p>
                Completely independent and one of the UAE’s most reputed ship agencies — pure agency
                service for owners, charterers, and managers, with offices close to commercial ports
                and terminals.
              </p>
            </div>
          </FadeItem>
        </div>
      </MotionSection>

      <MotionSection className="arc-section arc-section--tint">
        <div className="wrap">
          <FadeItem>
            <div className="arc-intro">
              <h2>Services</h2>
              <p>Agency through medical — one network across East Coast, Dubai, and Oman.</p>
            </div>
          </FadeItem>
          <div className="arc-service-grid">
            {featured.map((service) => (
              <FadeItem key={service.slug}>
                <Link href={`/services/${service.slug}`} className="arc-service-card">
                  <div className="media">
                    <Image src={service.image} alt="" width={72} height={72} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <span>Details →</span>
                </Link>
              </FadeItem>
            ))}
          </div>
          <FadeItem>
            <div className="arc-inline-actions">
              <MagneticButton href="/services" className="btn btn-brand">
                All services
              </MagneticButton>
              <MagneticButton href={wa} className="btn btn-wa">
                WhatsApp
              </MagneticButton>
            </div>
          </FadeItem>
        </div>
      </MotionSection>

      <MotionSection className="arc-section">
        <div className="wrap">
          <FadeItem>
            <h2>Why operators call Archipelago</h2>
          </FadeItem>
          <div className="arc-matrix">
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

      <MotionSection className="arc-section arc-section--tint">
        <div className="wrap">
          <FadeItem>
            <h2>How a call runs</h2>
          </FadeItem>
          <div className="arc-steps">
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

      <MotionSection className="arc-section">
        <div className="wrap">
          <FadeItem>
            <div className="arc-intro">
              <h2>Group companies</h2>
              <p>Specialist marine desks under the Archipelago network.</p>
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

      <MotionSection className="arc-section arc-section--tint arc-faq">
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
