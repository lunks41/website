import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const staticRoutes = ["", "/services", "/about", "/group", "/contact"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
  }));
  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...serviceRoutes];
}
