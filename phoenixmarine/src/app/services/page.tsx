import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ServicesClient } from "@/components/ServicesClient";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Phoenix Marine Services LLC — fresh water, crew change, customs, logistics, port agency, ship chandling, bunkers, medical assistance, and more in Ras Al Khaimah.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero label="Services" title="Marine services for every RAK call">
        <p>
          Husbandry, agency, logistics, and technical support — coordinated from one Phoenix desk in
          Ras Al Khaimah.
        </p>
      </PageHero>
      <ServicesClient services={services} />
      <CtaBand />
    </>
  );
}
