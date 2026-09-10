import type { MetadataRoute } from "next";
import { absUrl, SITE_URL } from "@/lib/seo";
import { getAllPackages } from "@/lib/tours";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absUrl("/tours"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absUrl("/travel-info"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const packages = await getAllPackages();
    const tourRoutes = packages.map((pkg) => ({
      url: absUrl(`/tours/${pkg.slug}`),
      lastModified: pkg.updatedAt ?? now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    return [...staticRoutes, ...tourRoutes];
  } catch {
    return staticRoutes;
  }
}
