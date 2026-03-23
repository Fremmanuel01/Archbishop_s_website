import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { getGalleryItems } from "@/lib/sanity/queries";
import GoldDivider from "@/components/ui/GoldDivider";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { type Locale } from "@/i18n";

export const metadata: Metadata = { title: "Photo Gallery" };

export default async function GalleryPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const [t, items] = await Promise.all([
    getTranslations("gallery"),
    getGalleryItems(locale).catch(() => []),
  ]);

  return (
    <>
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <p className="kicker mb-3">{t("title")}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-cream">
            Pastoral <span className="text-gold-gradient italic">Gallery</span>
          </h1>
          <GoldDivider className="max-w-[80px] mt-6" />
        </div>
      </div>
      <GalleryGrid items={items ?? []} locale={locale} />
    </>
  );
}
