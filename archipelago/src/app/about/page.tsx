import { PageHero } from "@/components/PageHero";
import { AboutClient } from "@/components/AboutClient";
import { CtaBand } from "@/components/CtaBand";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: `About ${company.name} — independent ship agency across UAE and Oman ports.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero label="About" title={company.name}>
        <p>{company.tagline}</p>
      </PageHero>
      <AboutClient />
      <CtaBand />
    </>
  );
}
