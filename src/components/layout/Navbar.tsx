"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/animations/gsap";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home",           href: "/" },
  { key: "about",          href: "/about" },
  {
    key: "teachings",
    href: "/teachings",
    sub: [
      { key: "reflections", href: "/teachings?cat=homily" },
      { key: "addresses",   href: "/teachings?cat=address" },
      { key: "messages",    href: "/teachings?cat=message" },
      { key: "interviews",  href: "/teachings?cat=interview" },
    ],
  },
  { key: "pastoralDiary",    href: "/pastoral-diary" },
  { key: "pastoralLetters",  href: "/pastoral-letters" },
  { key: "gallery",          href: "/gallery" },
  {
    key: "appointments",
    href: "/appointments",
    sub: [
      { key: "appointmentsLaity",  href: "/appointments?type=laity" },
      { key: "appointmentsClergy", href: "/appointments?type=clergy" },
    ],
  },
  { key: "contact", href: "/contact" },
];

export default function Navbar({ logoUrl }: { logoUrl?: string }) {
  const t        = useTranslations("nav");
  const locale   = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [openDrop, setOpenDrop]     = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate nav in on mount
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const localizedHref = (href: string) => `/${locale}${href}`;
  const isActive = (href: string) => pathname.includes(`/${locale}${href}`) && href !== "/";

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "nav-glass py-3" : "bg-transparent py-5"
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link href={localizedHref("/")} className="flex items-center gap-3 group">
            {logoUrl ? (
              <Image src={logoUrl} alt="Archbishop Valerian Okeke" width={40} height={40} className="rounded-full" />
            ) : (
              <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center">
                <span className="text-gold font-heading text-sm">V</span>
              </div>
            )}
            <div className="hidden md:block">
              <div className="font-heading text-sm text-cream/90 leading-tight group-hover:text-gold transition-colors">
                Archbishop Valerian Okeke
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-gold/60">Archdiocese of Onitsha</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.key} className="relative group"
                onMouseEnter={() => item.sub && setOpenDrop(item.key)}
                onMouseLeave={() => setOpenDrop(null)}
              >
                <Link
                  href={localizedHref(item.href)}
                  className={cn(
                    "px-3 py-2 text-[11px] uppercase tracking-widest transition-colors duration-200 font-body block",
                    isActive(item.href) ? "text-gold" : "text-cream/60 hover:text-gold"
                  )}
                >
                  {t(item.key)}
                  {item.sub && <span className="ml-1 opacity-50">▾</span>}
                </Link>
                {/* Dropdown */}
                {item.sub && openDrop === item.key && (
                  <div className="absolute top-full left-0 min-w-[200px] nav-glass rounded-sm border border-gold/10 py-2 shadow-gold">
                    {item.sub.map((s) => (
                      <Link key={s.key} href={localizedHref(s.href)}
                        className="block px-4 py-2 text-[10px] uppercase tracking-widest text-cream/60 hover:text-gold hover:bg-gold/5 transition-colors"
                      >
                        {t(s.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={cn("w-5 h-px bg-cream transition-all duration-300", menuOpen && "rotate-45 translate-y-[7px]")} />
              <span className={cn("w-5 h-px bg-cream transition-all duration-300", menuOpen && "opacity-0")} />
              <span className={cn("w-5 h-px bg-cream transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[7px]")} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-40 nav-glass flex flex-col pt-24 px-6 pb-10 gap-1 lg:hidden transition-all duration-400",
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {NAV_ITEMS.map((item) => (
          <div key={item.key}>
            <Link
              href={localizedHref(item.href)}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block py-3 text-sm uppercase tracking-widest border-b border-gold/10 transition-colors",
                isActive(item.href) ? "text-gold" : "text-cream/70 hover:text-gold"
              )}
            >
              {t(item.key)}
            </Link>
            {item.sub && (
              <div className="pl-4">
                {item.sub.map((s) => (
                  <Link key={s.key} href={localizedHref(s.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-[11px] uppercase tracking-widest text-cream/50 hover:text-gold transition-colors"
                  >
                    {t(s.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
