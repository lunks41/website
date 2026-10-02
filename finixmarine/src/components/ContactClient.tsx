"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { EnquiryForm } from "@/components/EnquiryForm";
import { company } from "@/data/company";

type Company = typeof company;

export function ContactClient({ company: c }: { company: Company }) {
  return (
    <MotionSection>
      <div className="fx-contact">
        <FadeItem>
          <div className="fx-contact-info">
            <h3>Company</h3>
            <p>{c.name}</p>
            <p lang="ar">{c.nameAr}</p>
            <h3>Address</h3>
            <p>{c.address}</p>
            <h3>Tax registration</h3>
            <p>TRN {c.trn}</p>
            <h3>Telephone</h3>
            <p>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
            </p>
            <p>Fax {c.fax}</p>
            <h3>Email</h3>
            <p>
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </p>
            <h3>WhatsApp</h3>
            <p>
              <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </p>
            <h3>Hours</h3>
            <p>{c.hours}</p>
          </div>
        </FadeItem>
        <FadeItem>
          <div className="fx-contact-panel">
            <h2>Need a Fujairah service request?</h2>
            <p>
              Tell us vessel name, ETA, and the services required. We will confirm the next
              operational step.
            </p>
            <EnquiryForm />
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
