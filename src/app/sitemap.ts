import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    "/about",
    "/galaxy/projects",
    "/galaxy/arcade",
    "/galaxy/arcade/slots",
    "/galaxy/arcade/snake",
    "/galaxy/arcade/memory",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
