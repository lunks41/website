"use client";

import { FadeItem, MagneticButton, MotionSection } from "@/components/motion";
import { company } from "@/data/company";

type Company = typeof company;

export function ContactClient({ company }: { company: Company }) {
  return (
    <MotionSection className="section">
      <div className="container contact-layout">
        <FadeItem>
          <div className="contact-block">
            <h3>Office</h3>
            <p>{company.name}</p>
            <p>{company.address}</p>
          </div>
          <div className="contact-block">
            <h3>Phone & fax</h3>
            <p>
              Tel: <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
            </p>
            <p>Fax: {company.fax}</p>
            <p>
              Mobile (24h):{" "}
              <a href={`tel:${company.mobile.replace(/\s/g, "")}`}>{company.mobile}</a>
            </p>
            <p>
              Alt mobile:{" "}
              <a href={`tel:${company.mobileAlt.replace(/\s/g, "")}`}>{company.mobileAlt}</a>
            </p>
          </div>
          <div className="contact-block">
            <h3>Email</h3>
            <p>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <p>
              <a href={`mailto:${company.emailAlt}`}>{company.emailAlt}</a>
            </p>
          </div>
        </FadeItem>

        <FadeItem>
          <div className="contact-panel">
            <h2>Ready when the vessel is</h2>
            <p style={{ color: "var(--crd-mist)", marginBottom: "1.25rem" }}>
              Share vessel name, ETA Fujairah, service required (water / goods / crew), and tonnage or
              pax count — we will confirm craft and timing.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <MagneticButton
                href={`https://wa.me/${company.whatsapp}`}
                className="btn btn-primary"
              >
                WhatsApp
              </MagneticButton>
              <MagneticButton
                href={`mailto:${company.email}?subject=Service%20request%20-%20CRD%20Marine`}
                className="btn btn-ghost"
              >
                Email operations
              </MagneticButton>
            </div>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
