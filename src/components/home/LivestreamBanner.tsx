import { useTranslations } from "next-intl";
import { getYouTubeId } from "@/lib/utils";

export default function LivestreamBanner({ streamUrl }: { streamUrl: string }) {
  const t   = useTranslations("home");
  const ytId = getYouTubeId(streamUrl);
  const embedUrl = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=0&rel=0&modestbranding=1`
    : streamUrl;

  return (
    <section className="py-20 bg-navy-dark">
      <div className="section-container">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 kicker mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {t("livestream")}
          </span>
        </div>
        <div className="relative aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden border border-gold/10 shadow-gold">
          <iframe
            src={embedUrl}
            title={t("watchLive")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
