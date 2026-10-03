import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ServiceDetailClient } from "@/components/ServiceDetailClient";
import { getService, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.body,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <ServiceDetailClient service={service} related={related} />
      <CtaBand />
    </>
  );
}
