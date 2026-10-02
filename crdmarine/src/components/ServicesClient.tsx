"use client";

import { motion } from "framer-motion";
import { FadeItem, MagneticButton, MotionSection, springSnappy } from "@/components/motion";

type Service = {
  slug: string;
  title: string;
  body: string;
};

export function ServicesClient({ services }: { services: Service[] }) {
  return (
    <MotionSection className="section">
      <div className="container">
        <div className="services-grid">
          {services.map((service, i) => (
            <FadeItem key={service.slug}>
              <motion.article
                className="service-item service-item--motion"
                whileHover={{ x: 6 }}
                transition={springSnappy}
              >
                <div className="service-index">0{i + 1}</div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </motion.article>
            </FadeItem>
          ))}
        </div>
        <FadeItem>
          <div style={{ marginTop: "3rem" }}>
            <MagneticButton href="/fleet" className="btn btn-primary">
              See vessels that deliver
            </MagneticButton>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
