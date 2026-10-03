"use client";

import { FadeItem, MotionSection } from "@/components/motion";
import { company, values, offices } from "@/data/company";

export function AboutClient() {
  return (
    <>
      <MotionSection className="arc-section">
        <div className="wrap arc-about">
          <FadeItem>
            <p className="eyebrow">About</p>
            <h2>{company.name}</h2>
            <p>
              The company is completely independent and one of the most reputed, leading, and
              reliable shipping agencies in the United Arab Emirates. It is primarily aimed to
              provide pure and complete ship agency services to shipowners, charterers, and managers
              with high quality of service and expertise attuned to the reality in which we live and
              work.
            </p>
            <p>
              With strategic office locations close to commercial ports and terminals throughout the
              UAE, we respond quickly to issues involving your crew and cargo. Our offices are
              minutes from port main gates and close to Port Authority offices.
            </p>
          </FadeItem>
        </div>
      </MotionSection>

      <MotionSection className="arc-section arc-section--tint">
        <div className="wrap">
          <FadeItem>
            <h2>What guides the desk</h2>
          </FadeItem>
          <div className="arc-matrix">
            {values.map((item, i) => (
              <FadeItem key={item.title}>
                <article>
                  <div className="n">0{i + 1}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </FadeItem>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="arc-section">
        <div className="wrap">
          <FadeItem>
            <h2>Offices</h2>
          </FadeItem>
          <div className="arc-offices">
            {offices.map((o) => (
              <FadeItem key={o.title}>
                <article className="arc-office">
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`}>{o.phone}</a>
                  <a href={`mailto:${o.email}`}>{o.email}</a>
                </article>
              </FadeItem>
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}
