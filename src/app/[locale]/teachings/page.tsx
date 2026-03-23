import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { getTeachings } from "@/lib/sanity/queries";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { type Locale } from "@/i18n";
import { formatDate, categoryLabel } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = { title: "Archbishop's Teachings" };

const CATEGORIES = [
  { key: "all",       label: { en: "All", ig: "Niile",       it: "Tutti" } },
  { key: "homily",    label: { en: "Homilies", ig: "Ihe Nchegbu", it: "Omelie" } },
  { key: "address",   label: { en: "Addresses", ig: "Ọkwa Okwu", it: "Discorsi" } },
  { key: "message",   label: { en: "Messages", ig: "Ozi",       it: "Messaggi" } },
  { key: "interview", label: { en: "Interviews", ig: "Mkparịta", it: "Interviste" } },
];

export default async function TeachingsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { cat?: string };
}) {
  unstable_setRequestLocale(locale);
  const [t, teachings] = await Promise.all([
    getTranslations("teachings"),
    getTeachings(locale, searchParams.cat !== "all" ? searchParams.cat : undefined).catch(() => []),
  ]);

  const activeCat = searchParams.cat || "all";

  return (
    <>
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <p className="kicker mb-3">{t("title")}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-navy">
            Archbishop&apos;s <span className="text-gold-gradient italic">Teachings</span>
          </h1>
          <GoldDivider className="max-w-[80px] mt-6" />
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="section-container">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <Link key={cat.key}
                href={`/${locale}/teachings${cat.key !== "all" ? `?cat=${cat.key}` : ""}`}
                className={`text-[10px] uppercase tracking-widest px-5 py-2 border transition-all duration-200 ${
                  activeCat === cat.key
                    ? "bg-gold text-navy border-gold"
                    : "border-gold/40 text-navy/50 hover:border-gold/60 hover:text-gold"
                }`}>
                {cat.label[locale] || cat.label.en}
              </Link>
            ))}
          </div>

          <SectionReveal>
            {teachings?.length === 0 && (
              <p className="text-center text-navy/40 py-20">No teachings added yet. Add them in the CMS Studio.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachings?.map((item: {
                _id: string; title: string; category: string; publishedAt: string;
                slug: { current: string }; coverImage?: object; excerpt?: string; pdf?: string;
              }) => {
                const imgUrl = item.coverImage
                  ? urlFor(item.coverImage).width(600).height(360).format("webp").url()
                  : null;
                return (
                  <div key={item._id} data-reveal className="card-surface group overflow-hidden">
                    <Link href={`/${locale}/teachings/${item.slug?.current}`}>
                      <div className="aspect-video overflow-hidden bg-[#f5f0e8] relative">
                        {imgUrl ? (
                          <Image src={imgUrl} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-heading text-4xl text-gold/10">&Omega;</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                        <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-gold bg-white/80 px-2 py-1">
                          {categoryLabel(item.category, locale)}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] text-navy/40 mb-2">{formatDate(item.publishedAt, locale)}</p>
                        <h3 className="font-heading text-lg text-navy group-hover:text-gold transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        {item.excerpt && <p className="text-xs text-navy/50 mt-2 line-clamp-2">{item.excerpt}</p>}
                      </div>
                    </Link>
                    {item.pdf && (
                      <div className="px-5 pb-5">
                        <a href={item.pdf} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] uppercase tracking-widest text-gold/70 hover:text-gold transition-colors">
                          ↓ {t("download")}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
