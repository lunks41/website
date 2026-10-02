"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { EnquiryForm } from "@/components/EnquiryForm";
import { company } from "@/data/company";

type Company = typeof company;

export function ContactClient({ company: c }: { company: Company }) {
  const wa = `https://wa.me/${c.whatsapp}`;

  return (
    <MotionSection>
      <div className="px-contact">
        <FadeItem>
          <div className="px-contact-side">
            <h3>Company</h3>
            <p>{c.name}</p>
            <p lang="ar">{c.nameAr}</p>
            <h3>Address</h3>
            <p>{c.address}</p>
            <h3>TRN</h3>
            <p>{c.trn}</p>
            <h3>Phone</h3>
            <p>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
            </p>
            <h3>Email</h3>
            <p>
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </p>
            <h3>WhatsApp</h3>
            <p>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </p>
          </div>
        </FadeItem>
        <FadeItem>
          <div className="px-contact-main">
            <h2 style={{ marginBottom: "0.6rem", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
              Service request
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>
              Send vessel details by email form or jump straight to WhatsApp.
            </p>
            <EnquiryForm />
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
