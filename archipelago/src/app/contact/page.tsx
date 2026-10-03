import { PageHero } from "@/components/PageHero";
import { ContactClient } from "@/components/ContactClient";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${company.name} — WhatsApp, ${company.email}, Fujairah and Dubai desks.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" title="Reach the operations desk">
        <p>
          {company.email} · Fujairah {company.phone} · Dubai {company.phoneDubai}
        </p>
      </PageHero>
      <ContactClient />
    </>
  );
}
