import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { getBiography } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { type Locale } from "@/i18n";
import Timeline from "@/components/about/Timeline";

export const metadata: Metadata = { title: "About His Grace" };

export default async function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const [t, bio] = await Promise.all([
    getTranslations("about"),
    getBiography(locale).catch(() => null),
  ]);

  const portraitUrl = bio?.portraitImage
    ? urlFor(bio.portraitImage).width(800).height(960).format("webp").url()
    : null;

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <SectionReveal stagger={false}>
            <p className="kicker mb-3">{t("title")}</p>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-navy">
              Most Rev. Valerian<br />
              <span className="text-gold-gradient italic">Maduka Okeke</span>
            </h1>
            <GoldDivider className="max-w-[80px] mt-6" />
          </SectionReveal>
        </div>
      </div>

      {/* Portrait + Bio */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Portrait */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-gold/30 shadow-gold">
                  {portraitUrl ? (
                    <Image src={portraitUrl} alt="Archbishop Valerian M. Okeke" fill className="object-cover object-top" />
                  ) : (
                    <div className="absolute inset-0 bg-[#f5f0e8] flex items-center justify-center">
                      <span className="font-heading text-8xl text-gold/10">V</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 p-4 border border-gold/30 rounded-sm bg-[#f5f0e8]">
                  <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Episcopal Motto</p>
                  <p className="font-heading text-xl italic text-navy">Ut vitam Habeant</p>
                  <p className="text-xs text-navy/50 mt-1">&ldquo;That they may have life&rdquo; — John 10:10</p>
                </div>
              </div>
            </div>

            {/* Bio sections */}
            <div className="lg:col-span-3 space-y-14">
              {bio?.sections?.map((section: { heading: string; body: object[]; image?: object }, i: number) => (
                <SectionReveal key={i} stagger={false}>
                  <h2 className="font-heading text-2xl md:text-3xl text-navy mb-4">{section.heading}</h2>
                  <GoldDivider className="max-w-[60px] mb-6" />
                  <div className="prose prose-sm prose-p:text-navy/60 prose-p:leading-relaxed prose-headings:font-heading prose-headings:text-navy">
                    <PortableText value={section.body as Parameters<typeof PortableText>[0]["value"]} />
                  </div>
                  {section.image && (
                    <div className="mt-6 relative aspect-video overflow-hidden rounded-sm border border-gold/30">
                      <Image
                        src={urlFor(section.image).width(800).format("webp").url()}
                        alt={section.heading}
                        fill className="object-cover"
                      />
                    </div>
                  )}
                </SectionReveal>
              ))}

              {/* Fallback content if no CMS data */}
              {!bio?.sections?.length && (
                <div className="space-y-8 text-navy/60 text-sm leading-relaxed">
                  <p>Most Reverend Valerian Maduka Okeke was born on Tuesday, 20 October 1953. He completed his primary education at St. Anthony&apos;s Catholic School, Umudioka, and St. Gabriel&apos;s Catholic School, Ifitedunu (1959–1966).</p>
                  <p>He was ordained to the priesthood on Saturday, 11 July 1981 by Cardinal Francis Arinze, and holds a Doctorate in Moral Theology from the Alfonsiana in Rome (1986–1991).</p>
                  <p>He was appointed Co-adjutor Archbishop of Onitsha on 9 November 2001, episcopally consecrated on 9 February 2002, and assumed the Metropolitan See of Onitsha on 1 September 2003.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      {bio?.timeline?.length > 0 && (
        <Timeline events={bio.timeline} />
      )}
    </>
  );
}
