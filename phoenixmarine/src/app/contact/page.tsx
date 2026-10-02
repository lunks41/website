import { PageHero } from "@/components/PageHero";
import { ContactClient } from "@/components/ContactClient";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${company.name} — WhatsApp ${company.phone}, email ${company.email}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" title="WhatsApp or email the desk">
        <p>
          {company.address}. Call {company.phone} or write to {company.email}.
        </p>
      </PageHero>
      <ContactClient company={company} />
    </>
  );
}
