"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import type { Service } from "@/data/services";
import { company } from "@/data/company";

export function ServiceDetailClient({
  service,
  related,
}: {
  service: Service;
  related: Service[];
}) {
  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello Phoenix Marine, I need: ${service.title}`)}`;
  const mail = `mailto:${company.email}?subject=${encodeURIComponent(`${service.title} enquiry`)}`;

  return (
    <>
      <section className="px-detail-hero">
        <div className="media">
          <Image src={service.image} alt={service.title} fill priority sizes="100vw" />
          <div className="veil" />
        </div>
        <div className="wrap copy">
          <p className="px-eyebrow">
            <Link href="/services" style={{ color: "inherit" }}>
              Services
            </Link>{" "}
            / {service.category}
          </p>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", marginBottom: "0.75rem" }}>
            {service.title}
          </h1>
          <p style={{ maxWidth: "48ch", color: "var(--muted)" }}>{service.short}</p>
        </div>
      </section>

      <MotionSection>
        <div className="wrap px-detail-grid">
          <FadeItem>
            <h2 style={{ marginBottom: "1rem", fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
              What we deliver
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem", maxWidth: "54ch" }}>
              {service.body}
            </p>
            <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
              <MagneticButton href={wa} className="btn btn-wa">
                WhatsApp this service
              </MagneticButton>
              <MagneticButton href={mail} className="btn btn-mail">
                Email enquiry
              </MagneticButton>
            </div>
          </FadeItem>
          <FadeItem>
            <ul className="px-points">
              {service.highlights.map((h) => (
                <li key={h}>◆ {h}</li>
              ))}
            </ul>
          </FadeItem>
        </div>
      </MotionSection>

      {related.length > 0 && (
        <MotionSection className="px-section" style={{ background: "var(--bg-2)" }}>
          <div className="wrap">
            <FadeItem>
              <h2 style={{ marginBottom: "1.25rem" }}>Related services</h2>
            </FadeItem>
            <div className="px-catalog">
              {related.map((item) => (
                <FadeItem key={item.slug}>
                  <Link href={`/services/${item.slug}`} className="px-cat-card">
                    <div className="media">
                      <Image src={item.image} alt={item.title} fill sizes="140px" />
                    </div>
                    <div className="body">
                      <h3>{item.title}</h3>
                      <p>{item.short}</p>
                    </div>
                  </Link>
                </FadeItem>
              ))}
            </div>
          </div>
        </MotionSection>
      )}
    </>
  );
}
