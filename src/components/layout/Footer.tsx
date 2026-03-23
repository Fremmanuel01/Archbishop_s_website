import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import GoldDivider from "@/components/ui/GoldDivider";

const SOCIAL_ICONS: Record<string, string> = {
  facebook:  "f",
  twitter:   "𝕏",
  youtube:   "▶",
  instagram: "◉",
};

interface FooterProps {
  socialLinks?: { platform: string; url: string; handle?: string }[];
}

export default function Footer({ socialLinks }: FooterProps) {
  const t      = useTranslations("footer");
  const tn     = useTranslations("nav");
  const locale = useLocale();

  const year = new Date().getFullYear();

  const links = [
    { key: "about",           href: "/about" },
    { key: "pastoralDiary",   href: "/pastoral-diary" },
    { key: "pastoralLetters", href: "/pastoral-letters" },
    { key: "teachings",       href: "/teachings" },
    { key: "gallery",         href: "/gallery" },
    { key: "contact",         href: "/contact" },
  ];

  return (
    <footer className="bg-navy-dark border-t border-gold/10 pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-heading text-2xl text-cream mb-3">
              Archbishop<br />
              <span className="text-gold-gradient">Valerian Okeke</span>
            </div>
            <p className="text-xs text-cream/40 leading-relaxed italic">
              &ldquo;Ut vitam Habeant&rdquo;<br />
              <span className="not-italic">{t("archdiocese")}</span>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="kicker mb-5">Navigation</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {links.map((l) => (
                <li key={l.key}>
                  <Link href={`/${locale}${l.href}`}
                    className="text-xs text-cream/50 hover:text-gold transition-colors uppercase tracking-wider">
                    {tn(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="kicker mb-5">Contact</h4>
            <p className="text-xs text-cream/50 leading-relaxed mb-4">{t("address")}</p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((s) => (
                  <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 border border-gold/20 rounded-sm flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all text-xs">
                    {SOCIAL_ICONS[s.platform] || s.platform[0].toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <GoldDivider />

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-cream/30 uppercase tracking-widest">
          <span>© {year} {t("archdiocese")}. {t("rights")}</span>
          <span>Archdiocese of Onitsha · Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
