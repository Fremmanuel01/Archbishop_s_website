import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { getTeaching, getTeachingSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { type Locale, locales } from "@/i18n";
import { formatDate, categoryLabel } from "@/lib/utils";
import GoldDivider from "@/components/ui/GoldDivider";
import SectionReveal from "@/components/ui/SectionReveal";

type Props = { params: { locale: Locale; slug: string } };

export async function generateStaticParams() {
  const slugs = await getTeachingSlugs().catch(() => []);
  return locales.flatMap((locale) =>
    slugs.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teaching = await getTeaching(params.slug, params.locale).catch(() => null);
  if (!teaching) return { title: "Teaching not found" };
  const ogImage = teaching.coverImage
    ? urlFor(teaching.coverImage).width(1200).height(630).format("webp").url()
    : undefined;
  return {
    title: teaching.title,
    description: teaching.excerpt ?? undefined,
    openGraph: {
      title: teaching.title,
      description: teaching.excerpt ?? undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      type: "article",
      publishedTime: teaching.publishedAt,
    },
  };
}

export default async function TeachingDetailPage({ params: { locale, slug } }: Props) {
  unstable_setRequestLocale(locale);
  const [t, teaching] = await Promise.all([
    getTranslations("teachings"),
    getTeaching(slug, locale).catch(() => null),
  ]);

  if (!teaching) notFound();

  const coverUrl = teaching.coverImage
    ? urlFor(teaching.coverImage).width(1600).height(900).format("webp").url()
    : null;

  return (
    <article>
      <div className="page-hero pt-32 pb-12">
        <div className="section-container max-w-4xl">
          <Link
            href={`/${locale}/teachings`}
            className="text-[10px] uppercase tracking-widest text-gold/80 hover:text-gold transition-colors"
          >
            ← {t("title")}
          </Link>
          <p className="kicker mt-6 mb-3">{categoryLabel(teaching.category, locale)}</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-navy leading-tight">
            {teaching.title}
          </h1>
          <p className="text-xs text-navy/60 mt-4">
            {formatDate(teaching.publishedAt, locale)}
          </p>
          <GoldDivider className="max-w-[80px] mt-6" />
        </div>
      </div>

      {coverUrl && (
        <div className="section-container max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-gold/30 shadow-gold">
            <Image
              src={coverUrl}
              alt={teaching.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      )}

      <section className="py-16 bg-[#faf8f5]">
        <div className="section-container max-w-3xl">
          <SectionReveal stagger={false}>
            {teaching.body ? (
              <div className="prose prose-sm md:prose-base prose-p:text-navy/85 prose-p:leading-relaxed prose-headings:font-heading prose-headings:text-navy prose-a:text-gold hover:prose-a:text-gold/80 prose-strong:text-navy">
                <PortableText
                  value={teaching.body as Parameters<typeof PortableText>[0]["value"]}
                />
              </div>
            ) : (
              <p className="text-navy/60 text-sm">
                {teaching.excerpt ?? "Full text is not yet available in this language."}
              </p>
            )}

            {teaching.pdf && (
              <div className="mt-12 pt-8 border-t border-gold/20">
                <a
                  href={teaching.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-gold text-gold text-[11px] uppercase tracking-widest px-8 py-4 hover:bg-gold hover:text-navy transition-all duration-300"
                >
                  ↓ {t("download")}
                </a>
              </div>
            )}
          </SectionReveal>
        </div>
      </section>
    </article>
  );
}
