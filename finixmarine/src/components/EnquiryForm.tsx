"use client";

import { FormEvent, useState } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [sentHint, setSentHint] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const vessel = String(data.get("vessel") || "");
    const eta = String(data.get("eta") || "");
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Service request — ${vessel || "Fujairah call"} — Finix Marine`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Vessel: ${vessel}`,
        `ETA Fujairah: ${eta}`,
        `Service: ${service}`,
        "",
        message,
      ].join("\n")
    );

    setSentHint(true);
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className={`fx-form${compact ? " fx-form--compact" : ""}`} onSubmit={onSubmit}>
      <div className="fx-form-grid">
        <label>
          Full name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="you@company.com" />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" placeholder="+971 ..." />
        </label>
        <label>
          Vessel name
          <input name="vessel" required placeholder="M/V example" />
        </label>
        <label>
          ETA Fujairah
          <input name="eta" placeholder="Date / time" />
        </label>
        <label>
          Service needed
          <select name="service" defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Multiple / other">Multiple / other</option>
          </select>
        </label>
      </div>
      <label className="fx-form-full">
        Message
        <textarea name="message" rows={4} placeholder="Volumes, pax count, stores list, special notes…" />
      </label>
      <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
        <button type="submit" className="btn btn-flame">
          Send by email
        </button>
        <a
          className="btn btn-ink"
          href={`https://wa.me/${company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
      {sentHint && (
        <p className="fx-form-hint">
          Your email app should open with the request ready for {company.email}. If it does not, email
          us directly.
        </p>
      )}
    </form>
  );
}
