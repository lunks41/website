import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { ContactClient } from "@/components/ContactClient";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${company.name} operations in Fujairah — ${company.phone}, ${company.email}. 24-hour marine boat services.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" title="Operations desk — Fujairah">
        <p>
          Reach CRD Marine for fresh water, goods supply, crew transportation, and barge
          mobilisation. We respond around the clock.
        </p>
      </PageHero>
      <ContactClient company={company} />
    </>
  );
}
