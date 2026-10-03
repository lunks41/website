"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { company, navLinks } from "@/data/company";
import { notionEase } from "@/components/motion";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      className={`arc-top${solid ? " is-solid" : ""}`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: notionEase }}
    >
      <div className="arc-top-inner">
        <Link href="/" className="arc-brand" aria-label={company.name}>
          <Image src="/images/icons/header_icons/logo.svg" alt="" width={148} height={40} priority />
        </Link>
        <nav className={`arc-links${open ? " is-open" : ""}`} aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="arc-top-actions">
          <a className="btn btn-wa" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <button type="button" className="arc-menu" onClick={() => setOpen((v) => !v)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
