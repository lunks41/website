"use client";

import { FormEvent, useState } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function EnquiryForm() {
  const [hint, setHint] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Service request — ${String(data.get("vessel") || "RAK call")} — Phoenix Marine`
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `Vessel: ${data.get("vessel")}`,
        `ETA: ${data.get("eta")}`,
        `Service: ${data.get("service")}`,
        "",
        String(data.get("message") || ""),
      ].join("\n")
    );
    setHint(true);
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="px-form" onSubmit={onSubmit}>
      <div className="px-form-grid">
        <label>
          Full name
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Phone
          <input name="phone" />
        </label>
        <label>
          Vessel
          <input name="vessel" required />
        </label>
        <label>
          ETA
          <input name="eta" />
        </label>
        <label>
          Service
          <select name="service" defaultValue="">
            <option value="" disabled>
              Select
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
      <label>
        Message
        <textarea name="message" rows={4} />
      </label>
      <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
        <button type="submit" className="btn btn-brand">
          Send by email
        </button>
        <a
          className="btn btn-wa"
          href={`https://wa.me/${company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open WhatsApp
        </a>
      </div>
      {hint && (
        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
          Email app should open with your request.
        </p>
      )}
    </form>
  );
}
