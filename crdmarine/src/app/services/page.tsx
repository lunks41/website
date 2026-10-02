import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicesClient } from "@/components/ServicesClient";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "CRD Marine boat services in Fujairah: fresh water supply, goods and deck cargo, crew transportation, and barge support from bay to vessel.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero label="Services" title="Marine support from bay to vessel">
        <p>
          Practical boat and barge services for ships at Port of Fujairah and the offshore
          anchorage — timed, documented, and available around the clock.
        </p>
      </PageHero>
      <ServicesClient services={[...services]} />
      <CtaBand />
    </>
  );
}
