import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Archbishop Valerian M. Okeke", template: "%s | Archbishop Valerian Okeke" },
  description: "Official website of Most Rev. Valerian Maduka Okeke, Archbishop of Onitsha and Metropolitan of Onitsha Ecclesiastical Province.",
  keywords: ["Archbishop Valerian Okeke", "Onitsha", "Catholic", "Archdiocese"],
  openGraph: {
    siteName: "Archbishop Valerian M. Okeke",
    type: "website",
    locale: "en_NG",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  unstable_setRequestLocale(locale);

  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings().catch(() => null),
  ]);

  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(80).height(80).format("webp").url()
    : undefined;

  return (
    <html lang={locale} className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div id="page-transition" aria-hidden="true" />
          <Navbar logoUrl={logoUrl} />
          <main>{children}</main>
          <Footer socialLinks={settings?.socialLinks} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
