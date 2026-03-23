"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { urlFor } from "@/lib/sanity/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

interface GalleryItem { _id: string; image: object; caption?: string; album?: string; }

const ALBUMS = ["All", "Ordinations", "Pastoral Visits", "Events", "Official", "Personal"];

export default function GalleryGrid({ items, locale: _locale }: { items: GalleryItem[]; locale: string }) {
  const t = useTranslations("gallery");
  const [open, setOpen]     = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? items : items.filter((i) => i.album === filter);

  const slides = filtered.map((item) => ({
    src: urlFor(item.image).width(1600).format("webp").url(),
    alt: item.caption || "",
    description: item.caption,
  }));

  return (
    <section className="py-16 bg-navy">
      <div className="section-container">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ALBUMS.map((album) => (
            <button key={album}
              onClick={() => setFilter(album)}
              className={cn(
                "text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-200",
                filter === album
                  ? "bg-gold text-navy border-gold"
                  : "border-gold/20 text-cream/50 hover:border-gold/50 hover:text-gold"
              )}>
              {album === "All" ? t("all") : album}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <SectionReveal>
          {filtered.length === 0 && (
            <p className="text-center text-cream/40 py-20">No gallery items yet. Add them in the CMS Studio.</p>
          )}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {filtered.map((item, i) => {
              const imgUrl = urlFor(item.image).width(500).format("webp").url();
              return (
                <div key={item._id} data-reveal
                  className="break-inside-avoid mb-4 card-surface overflow-hidden group cursor-pointer"
                  onClick={() => { setPhotoIdx(i); setOpen(true); }}
                >
                  <div className="relative overflow-hidden">
                    <Image src={imgUrl} alt={item.caption || ""} width={500} height={400}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover" />
                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-gold text-2xl">⊕</span>
                    </div>
                  </div>
                  {item.caption && (
                    <p className="p-3 text-[10px] text-cream/50 leading-relaxed">{item.caption}</p>
                  )}
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </div>

      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={photoIdx} />
    </section>
  );
}
