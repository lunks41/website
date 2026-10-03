"use client";

import { FormEvent, useState } from "react";
import { FadeItem, MotionSection } from "@/components/motion";
import { company, offices } from "@/data/company";
import { services } from "@/data/services";

const CONTACT_EMAIL = "operations@archipelago.ae";

export function ContactClient() {
  const [hint, setHint] = useState(false);
  const wa = `https://wa.me/${company.whatsapp}`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Website enquiry — ${String(data.get("companyName") || data.get("name") || "Archipelago")}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Company: ${data.get("companyName")}`,
        `Contact No: ${data.get("contactNo")}`,
        `Mail ID: ${data.get("mailId")}`,
        `Service: ${data.get("service")}`,
        "",
        "Message:",
        String(data.get("message") || ""),
      ].join("\n")
    );
    setHint(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <MotionSection>
      <div className="arc-contact">
        <FadeItem>
          <div className="arc-contact-side">
            <h3>Operations</h3>
            <p>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <h3>WhatsApp</h3>
            <p>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                +971 50 433 3783
              </a>
            </p>
            <h3>Phones</h3>
            <p>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
              <br />
              <a href={`tel:${company.phoneDubai.replace(/\s/g, "")}`}>{company.phoneDubai}</a>
            </p>
            <h3>Desks</h3>
            {offices.map((o) => (
              <p key={o.title}>
                <strong>{o.title}</strong> — {o.phone}
              </p>
            ))}
          </div>
        </FadeItem>
        <FadeItem>
          <div className="arc-contact-main">
            <h2>Send a message</h2>
            <p className="arc-muted">Goes to {CONTACT_EMAIL} via your email app.</p>
            <form className="arc-form" onSubmit={onSubmit}>
              <div className="arc-form-grid">
                <label>
                  Name
                  <input name="name" required />
                </label>
                <label>
                  Company name
                  <input name="companyName" required />
                </label>
                <label>
                  Contact no
                  <input name="contactNo" type="tel" required />
                </label>
                <label>
                  Mail ID
                  <input name="mailId" type="email" required />
                </label>
                <label className="span-2">
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
                <textarea name="message" rows={4} required />
              </label>
              <div className="arc-inline-actions">
                <button type="submit" className="btn btn-brand">
                  Send message
                </button>
                <a className="btn btn-wa" href={wa} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
              {hint && <p className="arc-muted">Email app should open with your request.</p>}
            </form>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
