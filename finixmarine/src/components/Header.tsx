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

  const left = navLinks.slice(0, 2);
  const right = navLinks.slice(2);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className={`fx-header${solid ? " is-solid" : ""}`}
      initial={reduce ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: notionEase }}
    >
      <div className="fx-header-inner">
        <nav className={`fx-nav fx-nav--left${open ? " is-open" : ""}`} aria-label="Primary left">
          {left.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          {open &&
            right.map((link) => (
              <Link
                key={`m-${link.href}`}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <Link href="/" className="fx-emblem" aria-label={company.name}>
          <Image src="/logo.png" alt="" width={56} height={56} priority />
          <strong>Finix</strong>
        </Link>

        <div style={{ display: "contents" }}>
          <nav className="fx-nav fx-nav--right" aria-label="Primary right">
            {right.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="fx-menu-btn"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
