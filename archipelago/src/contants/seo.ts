export const SITE_URL = "https://archipelago.ae";
export const SITE_NAME = "Archipelago Middle East Shipping LLC";
export const DEFAULT_TITLE = "Archipelago.ae | Ship Agency & Maritime Services UAE";
export const DEFAULT_DESCRIPTION =
  "Archipelago Middle East Shipping LLC — a leading independent ship agency in the UAE offering ship agency, marine services, ship supply, crew changes, logistics, and port support.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/home/ship.jpg`;
export const TWITTER_HANDLE = "@archipelagoae";
export const SITE_LOGO = `${SITE_URL}/images/icons/header_icons/logo.svg`;

/** Verified public profiles for Organization sameAs */
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/archipelago-middle-east-shipping-llc",
  "https://www.facebook.com/operations.archipelago",
  "https://wa.me/97150433783",
] as const;

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogType?: "website" | "article";
};

/** Public marketing & content pages */
export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  "/about": {
    title: "About Us | Archipelago Middle East Shipping",
    description:
      "Learn about Archipelago Middle East Shipping LLC — one of the UAE’s most reputed independent ship agencies, serving shipowners, charterers, and managers across commercial ports.",
    path: "/about",
  },
  "/our-services": {
    title: "Our Services | Archipelago Shipping UAE",
    description:
      "Explore Archipelago’s maritime services: ship agency, marine services, ship supply, crew changes, logistics & clearance, inspection, and medical assistance.",
    path: "/our-services",
  },
  "/ship-agency": {
    title: "Ship Agency Services | Archipelago UAE",
    description:
      "Professional ship agency services linking ship operators and port authorities — pilotage, tug assistance, customs, crew welfare, and port logistics across the UAE.",
    path: "/ship-agency",
  },
  "/ship-supply": {
    title: "Ship Supply | Provisions & Stores | Archipelago",
    description:
      "Reliable ship supply and provisioning services for vessels calling at UAE ports. Quality stores, provisions, and marine supplies delivered on time.",
    path: "/ship-supply",
  },
  "/marine-services": {
    title: "Marine Services | Archipelago UAE",
    description:
      "Comprehensive marine services supporting vessel operations in UAE ports — safety, efficiency, and expert maritime coordination.",
    path: "/marine-services",
  },
  "/crew-changes": {
    title: "Crew Changes | Archipelago Shipping",
    description:
      "Efficient crew change services in the UAE including immigration, transport, hotel arrangements, and full crew welfare support.",
    path: "/crew-changes",
  },
  "/logistics": {
    title: "Logistics & Clearance | Archipelago UAE",
    description:
      "Maritime logistics and customs clearance services for cargo and vessel operations across UAE ports.",
    path: "/logistics",
  },
  "/medical-assistance": {
    title: "Medical Assistance for Crew | Archipelago",
    description:
      "Medical assistance and healthcare coordination for seafarers and crew members at UAE ports.",
    path: "/medical-assistance",
  },
  "/inspection": {
    title: "Inspection Services | Archipelago UAE",
    description:
      "Vessel and cargo inspection support services ensuring compliance and operational readiness at UAE ports.",
    path: "/inspection",
  },
  "/contact-us": {
    title: "Contact Us | Archipelago Middle East Shipping",
    description:
      "Contact Archipelago Middle East Shipping LLC — Dubai head office and branches across the UAE and Oman. Email operations@archipelago.ae.",
    path: "/contact-us",
  },
  "/career": {
    title: "Careers | Join Archipelago Shipping",
    description:
      "Join Archipelago Middle East Shipping LLC. Explore career opportunities in ship agency and maritime services across the UAE.",
    path: "/career",
  },
  "/faq": {
    title: "FAQ | Archipelago Shipping",
    description:
      "Frequently asked questions about Archipelago Middle East Shipping LLC services, operations, and support.",
    path: "/faq",
  },
  "/brands": {
    title: "Brands | Archipelago",
    description:
      "Discover brands and partners associated with Archipelago Middle East Shipping LLC.",
    path: "/brands",
  },
  "/products": {
    title: "Products | Archipelago",
    description:
      "Browse products available through Archipelago Middle East Shipping LLC.",
    path: "/products",
  },
  "/media": {
    title: "Media | Archipelago Shipping",
    description:
      "News, media coverage, and updates from Archipelago Middle East Shipping LLC.",
    path: "/media",
  },
  "/media-awards": {
    title: "Awards | Archipelago Shipping",
    description:
      "Awards and recognition earned by Archipelago Middle East Shipping LLC.",
    path: "/media-awards",
  },
  "/new-events": {
    title: "News & Events | Archipelago Shipping",
    description:
      "Latest news and events from Archipelago Middle East Shipping LLC.",
    path: "/new-events",
  },
  "/sub-news": {
    title: "News Article | Archipelago Shipping",
    description:
      "Read the latest news from Archipelago Middle East Shipping LLC.",
    path: "/sub-news",
    ogType: "article",
  },
  "/vission-mission": {
    title: "Vision & Mission | Archipelago Shipping",
    description:
      "Our vision and mission at Archipelago Middle East Shipping LLC — excellence, reliability, and partnership in maritime services.",
    path: "/vission-mission",
  },
  "/safety-protocols": {
    title: "Safety Protocols | Archipelago Shipping",
    description:
      "Safety protocols and standards followed by Archipelago Middle East Shipping LLC across all maritime operations.",
    path: "/safety-protocols",
  },
  "/team-photos": {
    title: "Our Team | Archipelago Shipping",
    description:
      "Meet the professional team behind Archipelago Middle East Shipping LLC.",
    path: "/team-photos",
  },
  "/launch-services": {
    title: "Launch Services | Archipelago UAE",
    description:
      "Boat launch and related maritime support services from Archipelago Middle East Shipping LLC.",
    path: "/launch-services",
  },
  "/terms": {
    title: "Terms & Conditions | Archipelago",
    description:
      "Terms and conditions for using Archipelago Middle East Shipping LLC websites and services.",
    path: "/terms",
  },
  "/privacy": {
    title: "Privacy Policy | Archipelago",
    description:
      "How Archipelago Middle East Shipping LLC collects, uses, and protects your personal information.",
    path: "/privacy",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Archipelago",
    description:
      "Information about cookies used on the Archipelago Middle East Shipping LLC website.",
    path: "/cookie-policy",
  },
  "/return-policy": {
    title: "Return Policy | Archipelago",
    description:
      "Return policy for products and services offered by Archipelago Middle East Shipping LLC.",
    path: "/return-policy",
  },
  "/promotionsSubcriptionLetter": {
    title: "Promotions Subscription | Archipelago",
    description:
      "Promotions and subscription letter information from Archipelago Middle East Shipping LLC.",
    path: "/promotionsSubcriptionLetter",
  },
};

/** Private / transactional routes — exclude from search indexes */
export const NOINDEX_PATH_PREFIXES = [
  "/account",
  "/address",
  "/add-address",
  "/edit-address",
  "/payment",
  "/paynow",
  "/pending_order",
  "/favorites",
  "/enter-details",
  "/trackorder",
  "/add-review",
  "/search",
  "/menu",
];

/** Paths included in sitemap.xml (public, indexable) */
export const SITEMAP_PATHS = Object.values(PAGE_SEO)
  .filter((p) => !p.noindex)
  .map((p) => p.path);

export function resolvePageSeo(pathname: string): PageSeo {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname || "/";

  const exact = PAGE_SEO[normalized];
  if (exact) return exact;

  const shouldNoindex = NOINDEX_PATH_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
  );

  if (shouldNoindex) {
    return {
      title: `${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      path: normalized,
      noindex: true,
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: normalized,
  };
}

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateMeta(value: string, max = 160): string {
  const text = stripHtml(value || "");
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export type DynamicSeoProps = Partial<PageSeo> & {
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};
