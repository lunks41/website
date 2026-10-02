import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { vessels } from "@/data/fleet";
import { buildMetadata } from "@/lib/seo";
import { AboutClient } from "@/components/AboutClient";

export const metadata = buildMetadata({
  title: "About",
  description: `About ${company.name} — marine boat and barge operator based at Port of Fujairah, UAE.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero label="About" title={company.name}>
        <p>
          A Fujairah-based marine company focused on practical boat services: supplying fresh water
          and goods, and moving crew safely from bay to vessel.
        </p>
      </PageHero>
      <AboutClient hours={company.hours} vesselCount={vessels.length} />
      <CtaBand />
    </>
  );
}
