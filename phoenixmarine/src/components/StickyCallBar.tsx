"use client";

import { company } from "@/data/company";

export function StickyCallBar() {
  return (
    <div className="px-sticky">
      <a className="wa" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className="mail" href={`mailto:${company.email}`}>
        Email
      </a>
    </div>
  );
}
