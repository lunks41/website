import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getVessel, vessels } from "@/data/fleet";
import { buildMetadata } from "@/lib/seo";
import { VesselClient } from "@/components/VesselClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vessels.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const vessel = getVessel(slug);
  if (!vessel) return {};
  return buildMetadata({
    title: vessel.name,
    description: `${vessel.name} vessel particulars — ${vessel.loa} LOA, ${vessel.serviceSpeed}, ${vessel.deckCargo}. ${vessel.summary}`,
    path: `/fleet/${vessel.slug}`,
  });
}

export default async function VesselPage({ params }: Props) {
  const { slug } = await params;
  const vessel = getVessel(slug);
  if (!vessel) notFound();

  return (
    <>
      <PageHero
        label={
          <>
            <Link href="/fleet" style={{ color: "inherit" }}>
              Fleet
            </Link>{" "}
            / {vessel.name}
          </>
        }
        title={vessel.name}
      >
        <p>{vessel.summary}</p>
        <div className="hero-actions" style={{ marginTop: "1.5rem" }}>
          <a href={vessel.pdf} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Download Q88 PDF
          </a>
          <Link href="/contact" className="btn btn-ghost">
            Request this vessel
          </Link>
        </div>
      </PageHero>
      <VesselClient vessel={vessel} />
      <CtaBand />
    </>
  );
}
