"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import type { Service } from "@/data/services";

export function ServiceDetailClient({
  service,
  related,
}: {
  service: Service;
  related: Service[];
}) {
  return (
    <>
      <section className="fx-detail-hero">
        <div className="fx-detail-hero__media">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="fx-detail-hero__img"
          />
          <div className="fx-detail-hero__veil" />
        </div>
        <div className="wrap fx-detail-hero__copy">
          <p className="fx-eyebrow" style={{ color: "var(--fx-flame)" }}>
            <Link href="/services" style={{ color: "inherit" }}>
              Services
            </Link>{" "}
            / {service.category}
          </p>
          <h1>{service.title}</h1>
          <p>{service.short}</p>
        </div>
      </section>

      <MotionSection className="fx-detail-body">
        <div className="wrap fx-detail-grid">
          <FadeItem>
            <div>
              <h2>What we deliver</h2>
              <p className="fx-detail-lead">{service.body}</p>
              <MagneticButton href="/contact" className="btn btn-flame">
                Request this service
              </MagneticButton>
            </div>
          </FadeItem>
          <FadeItem>
            <ul className="fx-detail-points">
              {service.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FadeItem>
        </div>
      </MotionSection>

      {related.length > 0 && (
        <MotionSection className="fx-related">
          <div className="wrap">
            <FadeItem>
              <p className="fx-eyebrow">Related</p>
              <h2 className="fx-related-title">Other ways we support the call</h2>
            </FadeItem>
            <div className="fx-related-grid">
              {related.map((item) => (
                <FadeItem key={item.slug}>
                  <Link href={`/services/${item.slug}`} className="fx-related-card">
                    <div className="fx-related-card__media">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                      />
                    </div>
                    <h3>{item.title}</h3>
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
