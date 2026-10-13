import { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"
import sitemapDates from "@/lib/sitemap-dates.json"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: sitemapDates["/"].lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/produtos"),
      lastModified: sitemapDates["/produtos"].lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/sobre"),
      lastModified: sitemapDates["/sobre"].lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contato"),
      lastModified: sitemapDates["/contato"].lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/cartao-de-visita"),
      lastModified: sitemapDates["/cartao-de-visita"].lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/panfleto"),
      lastModified: sitemapDates["/panfleto"].lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/banner"),
      lastModified: sitemapDates["/banner"].lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/cracha"),
      lastModified: sitemapDates["/cracha"].lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/grafica-em-floripa"),
      lastModified: sitemapDates["/grafica-em-floripa"].lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/etiquetas-adesivas"),
      lastModified: sitemapDates["/etiquetas-adesivas"].lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/pasta-com-bolso"),
      lastModified: sitemapDates["/pasta-com-bolso"].lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/blocos-receituario"),
      lastModified: sitemapDates["/blocos-receituario"].lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ]
}
