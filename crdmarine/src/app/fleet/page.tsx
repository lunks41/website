import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { FleetClient } from "@/components/FleetClient";
import { vessels } from "@/data/fleet";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fleet",
  description:
    "CRD Marine fleet particulars: CRD ALPHA, CRD DELTA, CRD ECO, ANASTASIYA, and ANASTASIYA II — dimensions, capacity, and Q88 PDFs.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <PageHero label="Fleet" title="Barges & support vessels">
        <p>
          Particulars below are taken from vessel Q88 sheets. Download PDFs for full registry,
          machinery, and safety equipment details.
        </p>
      </PageHero>
      <FleetClient vessels={vessels} />
      <CtaBand />
    </>
  );
}
