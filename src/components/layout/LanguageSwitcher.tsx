"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const locale  = useLocale() as Locale;
  const router  = useRouter();
  const pathname = usePathname();

  const handleChange = (next: Locale) => {
    // Replace current locale prefix with the new one
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1 border border-gold/20 rounded-sm p-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={cn(
            "px-2.5 py-1 text-[10px] uppercase tracking-widest font-body transition-all duration-200 rounded-[2px]",
            locale === l
              ? "bg-gold text-navy font-medium"
              : "text-cream/50 hover:text-gold"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
