"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import type { Service } from "@/data/services";
import { company } from "@/data/company";

export function ServicesClient({ services }: { services: Service[] }) {
  return (
    <MotionSection className="arc-section">
      <div className="wrap">
        <div className="arc-service-grid">
          {services.map((service) => (
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
            <MagneticButton href={`https://wa.me/${company.whatsapp}`} className="btn btn-wa">
              WhatsApp
            </MagneticButton>
            <MagneticButton href="/contact" className="btn btn-brand">
              Contact form
            </MagneticButton>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
