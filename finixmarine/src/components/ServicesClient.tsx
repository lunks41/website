"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeItem, MagneticButton, MotionSection, springSnappy } from "@/components/motion";
import type { Service } from "@/data/services";
import { serviceCategories } from "@/data/services";

export function ServicesClient({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState<(typeof serviceCategories)[number] | "All">("All");

  const filtered = useMemo(
    () => (filter === "All" ? services : services.filter((s) => s.category === filter)),
    [filter, services]
  );

  return (
    <MotionSection className="fx-services-page">
      <div className="wrap">
        <FadeItem>
          <div className="fx-filter-row">
            <button
              type="button"
              className={`fx-filter${filter === "All" ? " is-active" : ""}`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`fx-filter${filter === cat ? " is-active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeItem>

        <div className="fx-service-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.div
                key={service.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={springSnappy}
              >
                <Link href={`/services/${service.slug}`} className="fx-service-card">
                  <div className="fx-service-card__media">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="fx-service-card__img"
                    />
                    <span className="fx-service-card__cat">{service.category}</span>
                  </div>
                  <div className="fx-service-card__body">
                    <h2>{service.title}</h2>
                    <p>{service.short}</p>
                    <span className="fx-service-card__more">View details →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <FadeItem>
          <div style={{ marginTop: "2.75rem", textAlign: "center" }}>
            <MagneticButton href="/contact" className="btn btn-ink">
              Request a service
            </MagneticButton>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
