import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { getTeachingSlugs } from "@/lib/sanity/queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://archbishopvalokeke.org";

const STATIC_PATHS = [
  "",
  "/about",
  "/coat-of-arms",
  "/teachings",
  "/pastoral-letters",
  "/pastoral-diary",
  "/gallery",
  "/videos",
  "/appointments",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getTeachingSlugs().catch(() => []);
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l === "en" ? "en-NG" : l,
            `${SITE_URL}/${l}${path}`,
          ])
        ),
      },
    }))
  );

  const teachingEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    slugs.map((s) => ({
      url: `${SITE_URL}/${locale}/teachings/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...teachingEntries];
}
