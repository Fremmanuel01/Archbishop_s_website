"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface Section {
  order?: number;
  focusX?: number;
  focusY?: number;
  heading?: string;
  body?: object[];
}

interface Props {
  imageUrl: string;
  alt: string;
  sections: Section[];
}

export default function CoatExplorer({ imageUrl, alt, sections }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sections.length]);

  const current = sections[active];
  const focusX = current?.focusX ?? 0.5;
  const focusY = current?.focusY ?? 0.5;
  const zoom = current ? 1.6 : 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="lg:sticky lg:top-32">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-gold/30 shadow-gold bg-[#f5f0e8]">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
            }}
          >
            <Image
              src={imageUrl}
              alt={alt}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {current && (
            <div
              className="absolute w-16 h-16 border-2 border-gold rounded-full pointer-events-none transition-all duration-700 ease-out"
              style={{
                left: `calc(${focusX * 100}% - 32px)`,
                top: `calc(${focusY * 100}% - 32px)`,
                opacity: 0.6,
              }}
            />
          )}
        </div>
      </div>

      <div className="space-y-32 pb-32">
        {sections.map((section, i) => (
          <div
            key={i}
            data-idx={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`transition-opacity duration-500 ${
              active === i ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="kicker mb-3">
              {String(i + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-navy mb-6">
              {section.heading}
            </h2>
            <div className="prose prose-sm prose-p:text-navy/80 prose-p:leading-relaxed prose-headings:font-heading prose-headings:text-navy">
              {section.body && (
                <PortableText
                  value={section.body as Parameters<typeof PortableText>[0]["value"]}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
