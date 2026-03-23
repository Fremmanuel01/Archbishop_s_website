"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import GoldDivider from "@/components/ui/GoldDivider";

interface TimelineEvent {
  year: number;
  label: string;
  description?: string;
  highlight?: boolean;
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<Element>(".timeline-item");
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Animate the vertical line growing down
      const line = el.querySelector<Element>(".timeline-line");
      if (line) {
        gsap.fromTo(line,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1, duration: 2, ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-navy-dark overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="kicker mb-3">Life & Ministry</p>
          <GoldDivider className="max-w-[60px] mx-auto" />
        </div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="timeline-line absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

          <div className="space-y-12">
            {events.map((ev, i) => (
              <div key={i}
                className={`timeline-item flex items-start gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className={`inline-block card-surface p-5 ${ev.highlight ? "border-gold/40 shadow-gold" : ""}`}>
                    <p className={`text-[10px] uppercase tracking-widest mb-1 ${ev.highlight ? "text-gold" : "text-cream/40"}`}>
                      {ev.year}
                    </p>
                    <h3 className={`font-heading text-lg leading-snug ${ev.highlight ? "text-gold" : "text-cream/90"}`}>
                      {ev.label}
                    </h3>
                    {ev.description && (
                      <p className="text-xs text-cream/50 mt-2 leading-relaxed">{ev.description}</p>
                    )}
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full border-2 transition-all ${ev.highlight ? "bg-gold border-gold shadow-gold" : "bg-navy border-gold/40"}`} />
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
