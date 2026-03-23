"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "@/lib/animations/gsap";
import { urlFor } from "@/lib/sanity/image";

interface GalleryItem { _id: string; image: object; caption?: string; }

export default function GalleryStrip({ items }: { items: GalleryItem[] }) {
  const t       = useTranslations("home");
  const locale  = useLocale();
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || !items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [items.length]);

  if (!items?.length) return null;

  return (
    <section className="py-20 bg-[#faf8f5] overflow-hidden">
      <div className="section-container mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="kicker mb-2">{t("fromTheGallery")}</p>
          </div>
          <Link href={`/${locale}/gallery`}
            className="text-[10px] uppercase tracking-widest text-gold/70 hover:text-gold transition-colors border-b border-gold/40 pb-1">
            {t("viewGallery")} →
          </Link>
        </div>
      </div>

      <div ref={stripRef} className="flex gap-4 overflow-x-auto px-6 md:px-10 lg:px-16 pb-4 scrollbar-thin scrollbar-thumb-gold/20">
        {items.map((item) => {
          const imgUrl = urlFor(item.image).width(400).height(300).format("webp").url();
          return (
            <Link key={item._id} href={`/${locale}/gallery`}
              className="flex-shrink-0 w-64 md:w-72 group overflow-hidden rounded-sm card-surface">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={imgUrl} alt={item.caption || "Gallery"} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.caption && (
                  <p className="absolute bottom-3 left-3 right-3 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
