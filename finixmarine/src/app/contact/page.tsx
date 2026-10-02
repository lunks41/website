import { PageHero } from "@/components/PageHero";
import { ContactClient } from "@/components/ContactClient";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${company.name} in Fujairah — ${company.phone}, ${company.email}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" title="Talk to Finix Marine">
        <p>
          Reach us for fresh water, crew change, customs, logistics, bunkers, and full Fujairah
          marine support — or send a service request below.
        </p>
      </PageHero>
      <ContactClient company={company} />
    </>
  );
}
