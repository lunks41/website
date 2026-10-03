import type { Metadata } from "next";
import { company } from "@/data/company";

export function buildMetadata({
  title,
  description = company.description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${company.shortName}` : `${company.shortName} | Ship Agency & Maritime Services UAE`;
  const url = `${company.siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(company.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.name,
      type: "website",
      images: [{ url: "/images/home/ship.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
