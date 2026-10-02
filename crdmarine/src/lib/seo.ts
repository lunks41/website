import type { Metadata } from "next";
import { company } from "@/data/company";

const siteName = company.name;

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} — Marine Boat & Barge Services, Fujairah`;
  const desc = description ?? company.description;
  const url = `${company.siteUrl}${path}`;

  return {
    title: pageTitle,
    description: desc,
    metadataBase: new URL(company.siteUrl),
    alternates: { canonical: path || "/" },
    keywords: [
      "CRD Marine",
      "Fujairah barge",
      "fresh water supply vessel",
      "crew transportation Fujairah",
      "ship supply Port of Fujairah",
      "bay to vessel",
      "marine boat services UAE",
    ],
    openGraph: {
      title: pageTitle,
      description: desc,
      url,
      siteName,
      locale: "en_AE",
      type: "website",
      images: [{ url: "/logo.png", width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
      images: ["/logo.png"],
    },
    robots: { index: true, follow: true },
  };
}
