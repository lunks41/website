import Head from "next/head";
import { useRouter } from "next/router";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  TWITTER_HANDLE,
  absoluteUrl,
  resolvePageSeo,
  type PageSeo,
} from "@/contants/seo";

type SEOProps = Partial<PageSeo> & {
  /** Override image for Open Graph / Twitter */
  image?: string;
  /** Extra JSON-LD objects to merge into the page */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** When true, skip auto-resolve from route (use only props) */
  manual?: boolean;
};

function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Archipelago.ae",
    url: SITE_URL,
    logo: SITE_LOGO,
    email: "operations@archipelago.ae",
    sameAs: [...SOCIAL_PROFILES],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "operations@archipelago.ae",
      areaServed: ["AE", "OM"],
      availableLanguage: ["English", "Arabic"],
    },
  };
}

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

const SEO = ({
  title,
  description,
  path,
  noindex,
  ogType,
  image,
  jsonLd,
  manual = false,
}: SEOProps) => {
  const router = useRouter();
  const resolved = manual
    ? null
    : resolvePageSeo(router.pathname || router.asPath?.split("?")[0] || "/");

  const pageTitle = title ?? resolved?.title ?? DEFAULT_TITLE;
  const pageDescription = description ?? resolved?.description ?? "";
  const pagePath = path ?? resolved?.path ?? "/";
  const pageNoindex = noindex ?? resolved?.noindex ?? false;
  const pageOgType = ogType ?? resolved?.ogType ?? "website";
  const canonical = absoluteUrl(pagePath);
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  const structured: Record<string, unknown>[] = [
    organizationJsonLd(),
    websiteJsonLd(),
  ];
  if (jsonLd) {
    structured.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="robots"
        content={
          pageNoindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={pageOgType} />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Branding */}
      <link rel="icon" href="/brand-icon.ico" />
      <meta name="theme-color" content="#0b1f33" />
      <meta name="author" content={SITE_NAME} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
      />
    </Head>
  );
};

export default SEO;
