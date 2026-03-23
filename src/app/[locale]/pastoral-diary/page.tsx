import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "@/lib/sanity/queries";
import GoldDivider from "@/components/ui/GoldDivider";
import { type Locale } from "@/i18n";

export const metadata: Metadata = { title: "Pastoral Diary" };

export default async function PastoralDiaryPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const [t, settings] = await Promise.all([
    getTranslations("diary"),
    getSiteSettings().catch(() => null),
  ]);

  const diaryUrl = settings?.diaryWidgetUrl || "https://archbishopvalokeke.org/pastoral-diary/";

  return (
    <>
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <p className="kicker mb-3">{t("title")}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-cream">
            Pastoral <span className="text-gold-gradient italic">Diary</span>
          </h1>
          <GoldDivider className="max-w-[80px] mt-6" />
        </div>
      </div>

      <section className="bg-navy pb-24">
        <div className="section-container">
          <div className="relative rounded-sm overflow-hidden border border-gold/10 shadow-gold-lg bg-navy-light"
            style={{ minHeight: "800px" }}>
            <iframe
              src={diaryUrl}
              title="Pastoral Diary"
              className="w-full border-0"
              style={{ minHeight: "800px", display: "block" }}
              loading="lazy"
            />
          </div>
          <p className="text-center text-[10px] text-cream/30 mt-4 uppercase tracking-widest">
            Pastoral Programme · Archdiocese of Onitsha
          </p>
        </div>
      </section>
    </>
  );
}
