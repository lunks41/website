"use client";

import Image from "next/image";
import { FadeItem, MotionSection } from "@/components/motion";
import { company } from "@/data/company";

export function AboutClient() {
  return (
    <MotionSection>
      <div className="wrap fx-about-grid">
        <FadeItem>
          <div className="fx-about-mark">
            <Image src="/logo.png" alt={company.name} width={280} height={280} />
          </div>
        </FadeItem>
        <FadeItem>
          <div className="fx-about-copy">
            <h2>Marine services with a mark of renewal</h2>
            <p>
              {company.name} ({company.nameAr}) operates from Fujairah to support vessels with the
              essentials of a port call — water, people, paperwork, and goods movement.
            </p>
            <p>
              Our phoenix identity stands for reliability that renews under pressure: when schedules
              tighten, Finix stays clear, coordinated, and reachable.
            </p>
            <ul className="fx-about-list">
              <li>Husbandry: fresh water, crew change, provisions, medical support</li>
              <li>Agency: port formalities and bunker coordination</li>
              <li>Logistics: customs clearance and shore-to-vessel goods</li>
              <li>Technical: spares delivery and waste / slop disposal coordination</li>
            </ul>
          </div>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
