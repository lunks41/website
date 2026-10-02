import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ServicesClient } from "@/components/ServicesClient";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Finix Marine Services LLC — fresh water, crew change, customs, logistics, port agency, ship chandling, bunkers, medical assistance, and more in Fujairah.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero label="Services" title="Marine services for every Fujairah call">
        <p>
          Husbandry, agency, logistics, and technical support — the full East Coast service set,
          coordinated from one Finix desk.
        </p>
      </PageHero>
      <ServicesClient services={services} />
      <CtaBand />
    </>
  );
}
