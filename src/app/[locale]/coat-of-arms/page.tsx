import type { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { getCoatOfArms } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { type Locale } from "@/i18n";
import GoldDivider from "@/components/ui/GoldDivider";
import CoatExplorer from "@/components/coat-of-arms/CoatExplorer";

export const metadata: Metadata = { title: "Coat of Arms" };

export default async function CoatOfArmsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const [t, coat] = await Promise.all([
    getTranslations("coatOfArms"),
    getCoatOfArms(locale).catch(() => null),
  ]);

  const imageUrl = coat?.image
    ? urlFor(coat.image).width(1200).height(1200).format("webp").url()
    : null;

  return (
    <>
      <div className="page-hero pt-32 pb-12">
        <div className="section-container">
          <p className="kicker mb-3">{t("title")}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-navy">
            Coat of <span className="text-gold-gradient italic">Arms</span>
          </h1>
          <GoldDivider className="max-w-[80px] mt-6" />
          <div className="mt-8 max-w-xl">
            <p className="font-heading text-2xl italic text-navy">
              {coat?.motto?.latin ?? t("motto")}
            </p>
            <p className="text-sm text-navy/70 mt-1">
              &ldquo;{coat?.motto?.translation ?? t("mottoTranslation")}&rdquo;
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-[#faf8f5]">
        <div className="section-container">
          {imageUrl && coat?.sections?.length ? (
            <CoatExplorer
              imageUrl={imageUrl}
              alt="Archbishop's Coat of Arms"
              sections={coat.sections}
            />
          ) : imageUrl ? (
            <div className="max-w-xl mx-auto">
              <div className="relative aspect-square overflow-hidden rounded-sm border border-gold/30 shadow-gold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Coat of Arms" className="w-full h-full object-contain" />
              </div>
            </div>
          ) : (
            <p className="text-center text-navy/60 py-20">
              The Coat of Arms is not yet available. Add it in the CMS Studio.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
