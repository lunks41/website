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
      className={`px-top${solid ? " is-solid" : ""}`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: notionEase }}
    >
      <div className="px-top-inner">
        <Link href="/" className="px-brand" aria-label={company.name}>
          <Image src="/logo.png" alt="" width={40} height={40} priority />
          <b>Phoenix</b>
        </Link>
        <nav className={`px-links${open ? " is-open" : ""}`} aria-label="Primary">
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
        <button type="button" className="px-menu" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </motion.header>
  );
}
