import { company } from "@/data/company";
import { services } from "@/data/services";

export default function sitemap() {
  const base = company.siteUrl;
  const staticRoutes = ["", "/services", "/about", "/contact"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
