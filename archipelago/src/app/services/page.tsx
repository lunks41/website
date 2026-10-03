import { PageHero } from "@/components/PageHero";
import { ServicesClient } from "@/components/ServicesClient";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Archipelago ship agency, marine services, ship supply, crew changes, logistics, inspection, medical assistance, and launch support across UAE and Oman.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero label="Services" title="Maritime services for every call">
        <p>
          Fast, reliable coordination for ships and cargo — agency through medical, from one
          accountable desk.
        </p>
      </PageHero>
      <ServicesClient services={services} />
      <CtaBand />
    </>
  );
}
