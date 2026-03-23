import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { getAppointmentSettings } from "@/lib/sanity/queries";
import GoldDivider from "@/components/ui/GoldDivider";
import SectionReveal from "@/components/ui/SectionReveal";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import { type Locale } from "@/i18n";

export const metadata: Metadata = { title: "Book an Appointment" };

export default async function AppointmentsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { type?: string };
}) {
  unstable_setRequestLocale(locale);
  const [t, apptSettings] = await Promise.all([
    getTranslations("appointments"),
    getAppointmentSettings(locale).catch(() => []),
  ]);

  const laity  = (apptSettings ?? []).find((a: { type: string }) => a.type === "laity");
  const clergy = (apptSettings ?? []).find((a: { type: string }) => a.type === "clergy");
  const activeType = searchParams.type || "laity";

  return (
    <>
      <div className="page-hero pt-32 pb-20">
        <div className="section-container">
          <p className="kicker mb-3">{t("title")}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-navy">
            Book an <span className="text-gold-gradient italic">Appointment</span>
          </h1>
          <GoldDivider className="max-w-[80px] mt-6" />
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Laity */}
            <SectionReveal stagger={false}>
              <div className={`card-surface p-8 h-full ${activeType === "laity" ? "border-gold/30 shadow-gold" : ""}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-sm">L</span>
                  </div>
                  <div>
                    <h2 className="font-heading text-xl text-navy">{t("laityTitle")}</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gold/70 mt-0.5">{t("laityDay")}</p>
                  </div>
                </div>
                <p className="text-xs text-navy/50 mb-8 leading-relaxed">{t("firstCome")}</p>
                <AppointmentForm
                  type="laity"
                  locale={locale}
                  availableSlots={laity?.availableSlots ?? []}
                />
              </div>
            </SectionReveal>

            {/* Clergy */}
            <SectionReveal stagger={false}>
              <div className={`card-surface p-8 h-full ${activeType === "clergy" ? "border-gold/30 shadow-gold" : ""}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-sm">C</span>
                  </div>
                  <div>
                    <h2 className="font-heading text-xl text-navy">{t("clergyTitle")}</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gold/70 mt-0.5">{t("clergyDay")}</p>
                  </div>
                </div>
                <p className="text-xs text-navy/50 mb-8 leading-relaxed">{t("firstCome")}</p>
                <AppointmentForm
                  type="clergy"
                  locale={locale}
                  availableSlots={clergy?.availableSlots ?? []}
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
