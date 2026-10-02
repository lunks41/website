"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { company, navLinks } from "@/data/company";
import { springSnappy, notionEase } from "@/components/motion";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: notionEase }}
    >
      <div className="header-inner">
        <Link href="/" className="brand" aria-label={company.name}>
          <Image src="/logo.png" alt={company.name} width={180} height={48} priority />
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="primary-nav" className={`nav${open ? " is-open" : ""}`} aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="nav-link"
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="nav-underline"
                    transition={springSnappy}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
