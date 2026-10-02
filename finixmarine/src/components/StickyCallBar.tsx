"use client";

import { company } from "@/data/company";

export function StickyCallBar() {
  const wa = `https://wa.me/${company.whatsapp}`;
  const mail = `mailto:${company.email}`;

  return (
    <div className="fx-sticky-call">
      <a className="fx-sticky-call__wa" href={wa} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className="fx-sticky-call__btn" href={mail}>
        Email
      </a>
    </div>
  );
}
