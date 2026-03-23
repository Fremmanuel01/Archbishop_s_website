import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getBiography } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { type Locale } from "@/i18n";

export default async function AboutSnippet({ locale }: { locale: Locale }) {
  const [t, bio] = await Promise.all([
    getTranslations("about"),
    getBiography(locale).catch(() => null),
  ]);

  const portraitUrl = bio?.portraitImage
    ? urlFor(bio.portraitImage).width(600).height(720).format("webp").url()
    : null;

  return (
    <section className="py-24 bg-navy overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <SectionReveal stagger={false} className="relative">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-sm">
              {portraitUrl ? (
                <Image src={portraitUrl} alt="Archbishop Valerian M. Okeke" fill className="object-cover object-top" />
              ) : (
                <div className="absolute inset-0 bg-navy-light flex items-center justify-center border border-gold/10">
                  <span className="font-heading text-8xl text-gold/10">V</span>
                </div>
              )}
              {/* Gold frame accent */}
              <div className="absolute inset-0 border border-gold/10 rounded-sm" />
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/15 rounded-sm -z-10" />
            </div>
          </SectionReveal>

          {/* Text */}
          <SectionReveal>
            <p data-reveal className="kicker mb-4">{t("title")}</p>
            <h2 data-reveal className="font-heading text-4xl md:text-5xl font-light text-cream leading-tight mb-6">
              Most Rev. Valerian<br />
              <span className="text-gold-gradient italic">Maduka Okeke</span>
            </h2>
            <GoldDivider className="max-w-[80px] mb-6" />
            <p data-reveal className="text-cream/60 text-sm leading-relaxed mb-4">
              Archbishop of Onitsha and Metropolitan of Onitsha Ecclesiastical Province since 2003.
              Ordained to the priesthood on 11 July 1981, he holds a Doctorate in Moral Theology from the Alfonsiana in Rome.
            </p>
            <p data-reveal className="text-cream/60 text-sm leading-relaxed mb-8">
              His episcopal motto, <em className="text-gold/80">Ut vitam Habeant</em> — &ldquo;That they may have life&rdquo; —
              drawn from John 10:10, is the animating spirit of his entire pastoral ministry.
            </p>
            <div data-reveal>
              <Link href={`/${locale}/about`}
                className="inline-flex items-center gap-2 border border-gold/30 text-gold text-[11px] uppercase tracking-widest px-7 py-3 hover:bg-gold hover:text-navy transition-all duration-300">
                {t("profile")} →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
