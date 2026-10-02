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
  const pageTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} — Fresh Water, Crew, Customs & Logistics · Fujairah`;
  const desc = description ?? company.description;
  const url = `${company.siteUrl}${path}`;

  return {
    title: pageTitle,
    description: desc,
    metadataBase: new URL(company.siteUrl),
    alternates: { canonical: path || "/" },
    keywords: [
      "Finix Marine",
      "Finix Marine Services LLC",
      "Fujairah marine services",
      "fresh water supply Fujairah",
      "crew change UAE",
      "customs clearance Fujairah",
      "ship logistics Fujairah",
      "port agency Fujairah",
      "ship chandling",
      "bunker coordination Fujairah",
      "فنكس للخدمات البحرية",
    ],
    openGraph: {
      title: pageTitle,
      description: desc,
      url,
      siteName,
      locale: "en_AE",
      type: "website",
      images: [{ url: "/logo.png", width: 800, height: 800, alt: siteName }],
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
