import type { MetadataRoute } from "next";
import { getProductsForSitemap } from "@/lib/shopify";

const BASE = "https://noaatelier.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: BASE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/collections/all`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const products = await getProductsForSitemap();
    productUrls = products.map(({ handle, updatedAt }) => ({
      url: `${BASE}/products/${handle}`,
      lastModified: new Date(updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // Shopify unavailable at build time — products omitted, static URLs still generated
  }

  return [...staticUrls, ...productUrls];
}
