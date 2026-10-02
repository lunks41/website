"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { company } from "@/data/company";

function WhatsAppGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M16.01 3C9.39 3 4 8.39 4 15.02c0 2.12.56 4.18 1.62 6L4 29l8.17-1.57a12 12 0 0 0 5.84 1.5h.01C22.63 28.93 28 23.54 28 16.91 28 10.28 22.63 3 16.01 3Zm6.93 17.05c-.29.82-1.7 1.5-2.38 1.6-.61.08-1.38.12-2.23-.14-.51-.16-1.17-.38-2.02-.74-3.55-1.54-5.86-5.12-6.04-5.36-.17-.23-1.43-1.9-1.43-3.63s.9-2.58 1.22-2.93c.32-.35.7-.44.93-.44h.67c.22 0 .51-.08.8.61.29.7 1 2.44 1.09 2.62.09.17.14.38.03.61-.12.23-.17.38-.35.58-.17.2-.37.45-.53.6-.17.17-.35.35-.15.68.2.32.88 1.45 1.89 2.35 1.3 1.15 2.4 1.51 2.73 1.68.35.17.54.14.74-.09.2-.23.85-.99 1.08-1.33.23-.35.46-.29.77-.17.32.11 2.02.95 2.37 1.13.35.17.58.26.67.41.08.14.08.84-.21 1.66Z"
      />
    </svg>
  );
}

function timeLabel() {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function WhatsAppWidget({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [clock, setClock] = useState("--:--");
  const reduce = useReducedMotion();
  const panelId = useId();
  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    `Hello ${company.shortName}, I need support with a vessel call.`
  )}`;

  useEffect(() => {
    setClock(timeLabel());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <div className="wa-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className="wa-widget__panel"
            role="dialog"
            aria-label={`${company.shortName} WhatsApp support`}
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wa-widget__glow" aria-hidden />
            <header className="wa-widget__head">
              <div className="wa-widget__brand">
                <span className="wa-widget__avatar">
                  <Image src="/logo.png" alt="" width={44} height={44} />
                </span>
                <div>
                  <strong>{company.shortName}</strong>
                  <em>
                    <i /> Online · replies fast
                  </em>
                </div>
              </div>
              <button
                type="button"
                className="wa-widget__close"
                aria-label="Close chat"
                onClick={() => onOpenChange(false)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </header>
            <div className="wa-widget__body">
              <p className="wa-widget__hint">Start a WhatsApp chat with the operations desk</p>
              <div className="wa-widget__bubble">
                <p>Hi there — how can we help with your next call?</p>
                <time dateTime={clock}>{clock}</time>
              </div>
            </div>
            <footer className="wa-widget__foot">
              <a className="wa-widget__cta" href={wa} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph size={18} />
                Continue on WhatsApp
              </a>
              <span className="wa-widget__meta">{company.phone}</span>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`wa-widget__fab${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        onClick={() => onOpenChange(!open)}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <WhatsAppGlyph size={26} />
            <span className="wa-widget__badge" aria-hidden />
          </>
        )}
      </motion.button>
    </div>
  );
}
