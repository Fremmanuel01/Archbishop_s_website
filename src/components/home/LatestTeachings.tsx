import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { urlFor } from "@/lib/sanity/image";
import { formatDate, categoryLabel } from "@/lib/utils";

interface Teaching {
  _id: string;
  title: string;
  category: string;
  publishedAt: string;
  slug: { current: string };
  coverImage?: object;
  excerpt?: string;
}

export default function LatestTeachings({ teachings }: { teachings: Teaching[] }) {
  const t      = useTranslations("home");
  const tc     = useTranslations("teachings");
  const locale = useLocale();

  if (!teachings?.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <SectionReveal>
          <div className="text-center mb-14">
            <p data-reveal className="kicker mb-3">{t("latestTeachings")}</p>
            <GoldDivider className="max-w-[80px] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teachings.map((item) => {
              const imgUrl = item.coverImage
                ? urlFor(item.coverImage).width(600).height(380).format("webp").url()
                : null;
              return (
                <Link key={item._id} href={`/${locale}/teachings/${item.slug?.current}`}
                  data-reveal
                  className="card-surface group overflow-hidden block"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#f5f0e8] relative">
                    {imgUrl ? (
                      <Image src={imgUrl} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-heading text-5xl text-gold/10">&Omega;</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-gold bg-white/80 px-2 py-1 rounded-sm">
                      {categoryLabel(item.category, locale)}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] text-navy/60 mb-2 uppercase tracking-wider">{formatDate(item.publishedAt, locale)}</p>
                    <h3 className="font-heading text-lg text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-xs text-navy/50 mt-2 leading-relaxed line-clamp-2">{item.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-1.5 mt-4 text-[10px] uppercase tracking-widest text-gold group-hover:gap-3 transition-all">
                      {tc("readMore")} <span>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div data-reveal className="text-center mt-10">
            <Link href={`/${locale}/teachings`}
              className="inline-block border border-gold/30 text-gold text-[11px] uppercase tracking-widest px-8 py-3 hover:bg-gold hover:text-navy transition-all duration-300">
              {t("viewAll")}
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
