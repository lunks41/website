"use client";

import { company } from "@/data/company";

export function StickyCallBar() {
  const wa = `https://wa.me/${company.whatsapp}`;
  const mail = `mailto:${company.email}`;

  return (
    <div className="crd-sticky">
      <a className="crd-sticky__wa" href={wa} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className="crd-sticky__mail" href={mail}>
        Email
      </a>
    </div>
  );
}
