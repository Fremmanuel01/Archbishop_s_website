import type { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { getVideos } from "@/lib/sanity/queries";
import { type Locale } from "@/i18n";
import GoldDivider from "@/components/ui/GoldDivider";
import VideoGrid from "@/components/videos/VideoGrid";

export const metadata: Metadata = { title: "Videos" };

export default async function VideosPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const [t, videos] = await Promise.all([
    getTranslations("nav"),
    getVideos(locale).catch(() => []),
  ]);

  return (
    <>
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <p className="kicker mb-3">{t("gallery")}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-navy">
            Pastoral <span className="text-gold-gradient italic">Videos</span>
          </h1>
          <GoldDivider className="max-w-[80px] mt-6" />
        </div>
      </div>

      <section className="py-16 bg-[#faf8f5]">
        <div className="section-container">
          <VideoGrid items={videos ?? []} locale={locale} />
        </div>
      </section>
    </>
  );
}
