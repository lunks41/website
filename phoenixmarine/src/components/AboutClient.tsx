"use client";

import Image from "next/image";
import { FadeItem, MotionSection } from "@/components/motion";
import { company } from "@/data/company";

export function AboutClient() {
  return (
    <MotionSection className="px-section">
      <div className="wrap px-about">
        <FadeItem>
          <div className="px-about-logo">
            <Image src="/logo.png" alt={company.name} width={240} height={240} />
          </div>
        </FadeItem>
        <FadeItem>
          <p className="px-eyebrow">About</p>
          <h2>Phoenix Marine Services LLC</h2>
          <p className="ar" lang="ar">
            {company.nameAr}
          </p>
          <p>
            Operating from Al Nazish Business Center in Ras Al Khaimah, Phoenix Marine supports
            vessels with husbandry, logistics, and agency coordination — with WhatsApp and email
            always available for fast mobilisation.
          </p>
          <p className="trn">TRN {company.trn}</p>
        </FadeItem>
      </div>
    </MotionSection>
  );
}
