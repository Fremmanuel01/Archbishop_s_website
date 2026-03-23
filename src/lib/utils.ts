import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string, locale: string = "en") {
  const localeMap: Record<string, string> = { en: "en-NG", ig: "ig", it: "it-IT" };
  return new Intl.DateTimeFormat(localeMap[locale] || "en-NG", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date(dateStr));
}

export function getLocaleField<T>(
  obj: Record<string, T> | undefined,
  locale: string,
  fallback = "en"
): T | undefined {
  return obj?.[locale] ?? obj?.[fallback];
}

export function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^&?/]+)/);
  return m ? m[1] : null;
}

export function categoryLabel(cat: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    homily:    { en: "Reflections & Homilies", ig: "Ihe Nchegbu & Okwu Chukwu", it: "Riflessioni & Omelie" },
    address:   { en: "Addresses",             ig: "Ọkwa Okwu",                 it: "Discorsi" },
    message:   { en: "Messages",              ig: "Ozi",                       it: "Messaggi" },
    interview: { en: "Interviews",            ig: "Mkparịta Ụka",              it: "Interviste" },
  };
  return labels[cat]?.[locale] ?? labels[cat]?.["en"] ?? cat;
}
