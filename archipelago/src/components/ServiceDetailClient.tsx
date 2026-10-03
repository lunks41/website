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
  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello Archipelago, I need: ${service.title}`)}`;
  const mail = `mailto:${company.email}?subject=${encodeURIComponent(`${service.title} enquiry`)}`;

  return (
    <>
      <section className="arc-page">
        <div className="wrap">
          <p className="label">
            <Link href="/services">Services</Link> / {service.title}
          </p>
          <h1>{service.title}</h1>
          <p>{service.short}</p>
        </div>
      </section>

      <MotionSection className="arc-section">
        <div className="wrap arc-detail">
          <FadeItem>
            <div className="arc-detail-media">
              <Image src={service.image} alt="" width={120} height={120} />
            </div>
            <h2>What we deliver</h2>
            <p className="arc-muted">{service.body}</p>
            <div className="arc-inline-actions">
              <MagneticButton href={wa} className="btn btn-wa">
                WhatsApp this service
              </MagneticButton>
              <MagneticButton href={mail} className="btn btn-brand">
                Email enquiry
              </MagneticButton>
            </div>
          </FadeItem>
          <FadeItem>
            <ul className="arc-points">
              {service.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </FadeItem>
        </div>
      </MotionSection>

      {related.length > 0 && (
        <MotionSection className="arc-section arc-section--tint">
          <div className="wrap">
            <FadeItem>
              <h2>Related services</h2>
            </FadeItem>
            <div className="arc-service-grid">
              {related.map((item) => (
                <FadeItem key={item.slug}>
                  <Link href={`/services/${item.slug}`} className="arc-service-card">
                    <div className="media">
                      <Image src={item.image} alt="" width={72} height={72} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.short}</p>
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
