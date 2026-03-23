import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { getPastoralLetters } from "@/lib/sanity/queries";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { type Locale } from "@/i18n";

export const metadata: Metadata = { title: "Pastoral Letters" };

export default async function PastoralLettersPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const [t, letters] = await Promise.all([
    getTranslations("letters"),
    getPastoralLetters(locale).catch(() => []),
  ]);

  // Group by decade for visual separation
  const grouped = (letters ?? []).reduce((acc: Record<string, typeof letters>, letter: typeof letters[0]) => {
    const decade = `${Math.floor(letter.year / 10) * 10}s`;
    if (!acc[decade]) acc[decade] = [];
    acc[decade].push(letter);
    return acc;
  }, {});

  return (
    <>
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <SectionReveal stagger={false}>
            <p className="kicker mb-3">{t("title")}</p>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-navy">
              Pastoral <span className="text-gold-gradient italic">Letters</span>
            </h1>
            <GoldDivider className="max-w-[80px] mt-6" />
          </SectionReveal>
        </div>
      </div>

      <section className="py-20 bg-[#f5f0e8]">
        <div className="section-container max-w-4xl">
          {letters?.length === 0 && (
            <p className="text-center text-navy/60 py-20">No letters added yet. Add them in the CMS.</p>
          )}
          {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([decade, items]) => (
            <SectionReveal key={decade} className="mb-16">
              <h2 data-reveal className="font-heading text-xl text-gold/80 mb-6 uppercase tracking-widest">{decade}</h2>
              <div className="space-y-4">
                {(items as Array<{ _id: string; year: number; title: string; description?: string; pdf?: string }>).map((letter) => (
                  <div key={letter._id} data-reveal
                    className="card-surface group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold mr-3">{letter.year}</span>
                      <h3 className="font-heading text-lg text-navy group-hover:text-gold transition-colors inline">
                        {letter.title}
                      </h3>
                      {letter.description && (
                        <p className="text-xs text-navy/60 mt-1 leading-relaxed line-clamp-2">{letter.description}</p>
                      )}
                    </div>
                    {letter.pdf && (
                      <a href={letter.pdf} target="_blank" rel="noopener noreferrer"
                        className="flex-shrink-0 border border-gold/30 text-gold text-[10px] uppercase tracking-widest px-5 py-2 hover:bg-gold hover:text-navy transition-all duration-300 whitespace-nowrap">
                        ↓ {t("download")}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
