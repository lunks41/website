import { company } from "@/data/company";
import { vessels } from "@/data/fleet";

export default function sitemap() {
  const base = company.siteUrl;
  const staticRoutes = ["", "/services", "/fleet", "/about", "/contact"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const fleetRoutes = vessels.map((v) => ({
    url: `${base}/fleet/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...fleetRoutes];
}
