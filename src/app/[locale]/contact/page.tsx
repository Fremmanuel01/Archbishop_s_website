import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "@/lib/sanity/queries";
import GoldDivider from "@/components/ui/GoldDivider";
import SectionReveal from "@/components/ui/SectionReveal";
import ContactForm from "@/components/contact/ContactForm";
import { type Locale } from "@/i18n";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const [t, settings] = await Promise.all([
    getTranslations("contact"),
    getSiteSettings().catch(() => null),
  ]);

  const contact = settings?.contactInfo;
  const staff   = settings?.staffContacts ?? [];
  const mapUrl  = contact?.mapEmbedUrl;

  return (
    <>
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <p className="kicker mb-3">{t("title")}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-navy">
            Contact <span className="text-gold-gradient italic">Us</span>
          </h1>
          <GoldDivider className="max-w-[80px] mt-6" />
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Info column */}
            <SectionReveal className="lg:col-span-2 space-y-10">
              <div data-reveal>
                <h3 className="kicker mb-4">{t("address")}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  {contact?.address || "Onitsha Catholic Secretariat, Basilica of the Most Holy Trinity, P.O. Box 411, Onitsha, Anambra State, Nigeria"}
                </p>
              </div>
              <div data-reveal>
                <h3 className="kicker mb-4">{t("hours")}</h3>
                <p className="text-sm text-navy/60">{t("weekdays")}</p>
                <p className="text-sm text-navy/60">{t("weekend")}</p>
              </div>
              <div data-reveal>
                <h3 className="kicker mb-4">{t("phone")}</h3>
                {(contact?.phone1 || "+234 9070497007").split(",").map((p: string) => (
                  <a key={p} href={`tel:${p.trim().replace(/\s/g, "")}`}
                    className="block text-sm text-gold/80 hover:text-gold transition-colors mb-1">{p.trim()}</a>
                ))}
                {contact?.phone2 && (
                  <a href={`tel:${contact.phone2.replace(/\s/g, "")}`}
                    className="block text-sm text-gold/80 hover:text-gold transition-colors">{contact.phone2}</a>
                )}
              </div>
              <div data-reveal>
                <h3 className="kicker mb-4">{t("email")}</h3>
                <a href={`mailto:${contact?.email1 || "info@archbishopvalokeke.org"}`}
                  className="block text-sm text-gold/80 hover:text-gold transition-colors">
                  {contact?.email1 || "info@archbishopvalokeke.org"}
                </a>
              </div>

              {/* Staff */}
              {staff.length > 0 && (
                <div data-reveal>
                  <h3 className="kicker mb-4">Secretariat</h3>
                  <div className="space-y-4">
                    {staff.map((s: { name: string; role: string; phone?: string; email?: string }, i: number) => (
                      <div key={i} className="card-surface p-4">
                        <p className="text-sm text-navy font-medium">{s.name}</p>
                        <p className="text-[10px] text-gold/60 uppercase tracking-wider mt-0.5">{s.role}</p>
                        {s.phone && <p className="text-xs text-navy/50 mt-1">{s.phone}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionReveal>

            {/* Form column */}
            <SectionReveal stagger={false} className="lg:col-span-3">
              <h2 className="font-heading text-2xl text-navy mb-6">{t("form")}</h2>
              <ContactForm locale={locale} />
            </SectionReveal>
          </div>

          {/* Map */}
          {mapUrl && (
            <div className="mt-16 relative aspect-video rounded-sm overflow-hidden border border-gold/30">
              <iframe src={mapUrl} title="Location Map" className="w-full h-full border-0" loading="lazy" allowFullScreen />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
