import { siteUrl } from "@/utils/structured-data";

export default function sitemap() {
  const lastModified = new Date();
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/launch`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/links`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
