import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mynaranga.in";
  const routes = [
    "",
    "/about",
    "/panchayat",
    "/education",
    "/health",
    "/agriculture",
    "/services",
    "/places",
    "/schemes",
    "/news",
    "/people",
    "/contact",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
