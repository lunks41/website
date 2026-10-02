import type { Metadata } from "next";
import { company } from "@/data/company";

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${company.name}`
    : `${company.name} — Marine Services · Ras Al Khaimah`;
  const desc = description ?? company.description;

  return {
    title: pageTitle,
    description: desc,
    metadataBase: new URL(company.siteUrl),
    alternates: { canonical: path || "/" },
    keywords: [
      "Phoenix Marine",
      "Phoenix Marine Services LLC",
      "Ras Al Khaimah marine services",
      "fresh water supply RAK",
      "crew change UAE",
      "فينكس للخدمات البحرية",
    ],
    openGraph: {
      title: pageTitle,
      description: desc,
      url: `${company.siteUrl}${path}`,
      siteName: company.name,
      locale: "en_AE",
      type: "website",
      images: [{ url: "/logo.png", alt: company.name }],
    },
    robots: { index: true, follow: true },
  };
}
