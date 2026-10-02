import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { AboutClient } from "@/components/AboutClient";
import { WhyUs } from "@/components/WhyUs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: `About ${company.name} — Ras Al Khaimah marine services for fresh water, crew, customs, logistics, and full husbandry support.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero label="About" title={company.name}>
        <p lang="ar" style={{ color: "var(--brand-hot)", marginBottom: "0.75rem" }}>
          {company.nameAr}
        </p>
        <p>
          A Ras Al Khaimah marine services company focused on safety, clear coordination, and
          practical support for every port and anchorage call.
        </p>
      </PageHero>
      <AboutClient />
      <WhyUs />
      <ProcessSteps />
      <CtaBand />
    </>
  );
}
