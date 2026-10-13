import { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-10-13",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/produtos"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/sobre"),
      lastModified: "2026-10-13",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contato"),
      lastModified: "2026-10-13",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/cartao-de-visita"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/panfleto"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/banner"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/cracha"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/grafica-em-floripa"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/etiquetas-adesivas"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/pasta-com-bolso"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/blocos-receituario"),
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ]
}
