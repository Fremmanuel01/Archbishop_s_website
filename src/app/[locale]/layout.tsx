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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://archbishopvalokeke.org";

const SITE_NAME = "Archbishop Valerian M. Okeke";
const SITE_DESCRIPTION =
  "Official website of Most Rev. Valerian Maduka Okeke, Archbishop of Onitsha and Metropolitan of Onitsha Ecclesiastical Province.";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_NG",
  ig: "ig_NG",
  it: "it_IT",
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (locales.includes(params.locale as Locale)
    ? params.locale
    : "en") as Locale;

  const languageAlternates = Object.fromEntries(
    locales.map((l) => [l === "en" ? "en-NG" : l, `${SITE_URL}/${l}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "Archbishop Valerian Okeke",
      "Onitsha",
      "Catholic",
      "Archdiocese of Onitsha",
      "Most Rev. Valerian Maduka Okeke",
      "Metropolitan See of Onitsha",
    ],
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/${locale}`,
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: ["/og-default.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

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
