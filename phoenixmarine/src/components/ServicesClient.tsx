"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeItem, MagneticButton, MotionSection, springSnappy } from "@/components/motion";
import type { Service } from "@/data/services";
import { serviceCategories } from "@/data/services";
import { company } from "@/data/company";

export function ServicesClient({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState<(typeof serviceCategories)[number] | "All">("All");
  const filtered = useMemo(
    () => (filter === "All" ? services : services.filter((s) => s.category === filter)),
    [filter, services]
  );

  return (
    <MotionSection className="px-section">
      <div className="wrap">
        <FadeItem>
          <div className="px-filters">
            <button type="button" className={filter === "All" ? "is-on" : ""} onClick={() => setFilter("All")}>
              All
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={filter === cat ? "is-on" : ""}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeItem>
        <div className="px-catalog">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.div key={service.slug} layout transition={springSnappy}>
                <Link href={`/services/${service.slug}`} className="px-cat-card">
                  <div className="media">
                    <Image src={service.image} alt={service.title} fill sizes="140px" />
                  </div>
                  <div className="body">
                    <h3>{service.title}</h3>
                    <p>{service.short}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <FadeItem>
          <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
            <MagneticButton href={`https://wa.me/${company.whatsapp}`} className="btn btn-wa">
              WhatsApp
            </MagneticButton>
            <MagneticButton href="/contact" className="btn btn-brand">
              Enquiry form
            </MagneticButton>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
