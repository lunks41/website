"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { company } from "@/data/company";

const CONTACT_EMAIL = "operations@archipelago.ae";

export function ContactFormWidget({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) setHint(false);
  }, [open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const companyName = String(data.get("companyName") || "");
    const contactNo = String(data.get("contactNo") || "");
    const mailId = String(data.get("mailId") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(
      `Website enquiry — ${companyName || name || company.shortName}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Company: ${companyName}`,
        `Contact No: ${contactNo}`,
        `Mail ID: ${mailId}`,
        `Source site: ${company.name}`,
        "",
        "Message:",
        message,
      ].join("\n")
    );

    setHint(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-widget">
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="contact-widget__backdrop"
              aria-label="Close contact form"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange(false)}
            />
            <motion.div
              id={panelId}
              className="contact-widget__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Contact form"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="contact-widget__head">
                <div>
                  <strong>Contact us</strong>
                  <span>Send a message to the operations desk</span>
                </div>
                <button
                  type="button"
                  className="contact-widget__close"
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M2 2l10 10M12 2 2 12"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </header>

              <form className="contact-widget__form" onSubmit={onSubmit}>
                <label>
                  Name
                  <input name="name" autoComplete="name" required />
                </label>
                <label>
                  Company name
                  <input name="companyName" autoComplete="organization" required />
                </label>
                <div className="contact-widget__row">
                  <label>
                    Contact no
                    <input name="contactNo" type="tel" autoComplete="tel" required />
                  </label>
                  <label>
                    Mail ID
                    <input name="mailId" type="email" autoComplete="email" required />
                  </label>
                </div>
                <label>
                  Message
                  <textarea name="message" rows={4} required />
                </label>
                <button type="submit" className="contact-widget__submit">
                  Send message
                </button>
                {hint && (
                  <p className="contact-widget__hint">
                    Your email app will open addressed to {CONTACT_EMAIL}.
                  </p>
                )}
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`contact-widget__fab${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close contact form" : "Open contact form"}
        onClick={() => onOpenChange(!open)}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="m5.5 7.5 6.2 4.2c.2.14.4.14.6 0l6.2-4.2"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
