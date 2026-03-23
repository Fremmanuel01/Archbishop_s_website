import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { getHomePage, getSiteSettings } from "@/lib/sanity/queries";
import { type Locale } from "@/i18n";
import HeroSection      from "@/components/home/HeroSection";
import QuoteCarousel    from "@/components/home/QuoteCarousel";
import LatestTeachings  from "@/components/home/LatestTeachings";
import GalleryStrip     from "@/components/home/GalleryStrip";
import AboutSnippet     from "@/components/home/AboutSnippet";
import LivestreamBanner from "@/components/home/LivestreamBanner";

export const metadata: Metadata = {
  title: "Archbishop Valerian M. Okeke — Archdiocese of Onitsha",
};

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const [page, settings] = await Promise.all([
    getHomePage(locale).catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <>
      <HeroSection
        heading={page?.heroHeading}
        subheading={page?.heroSubheading}
        heroImage={page?.heroImage}
        heroVideoUrl={page?.heroVideoUrl}
      />

      <AboutSnippet locale={locale} />

      {page?.featuredQuotes?.length > 0 && (
        <QuoteCarousel quotes={page.featuredQuotes} />
      )}

      {page?.featuredTeachings?.length > 0 && (
        <LatestTeachings teachings={page.featuredTeachings} />
      )}

      {settings?.livestreamUrl && (
        <LivestreamBanner streamUrl={settings.livestreamUrl} />
      )}

      {page?.featuredGallery?.length > 0 && (
        <GalleryStrip items={page.featuredGallery} />
      )}
    </>
  );
}
