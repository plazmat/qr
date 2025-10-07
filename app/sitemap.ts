import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "")
  const urls: MetadataRoute.Sitemap = [
    {
      url: site ? `${site}/` : "/",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: site ? `${site}/polityka-prywatnosci` : "/polityka-prywatnosci",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
  return urls
}


