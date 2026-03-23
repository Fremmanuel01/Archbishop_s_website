"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import GoldDivider from "@/components/ui/GoldDivider";

interface Quote { quote: string; source: string; }

export default function QuoteCarousel({ quotes }: { quotes: Quote[] }) {
  const [index, setIndex]   = useState(0);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  const goTo = (next: number) => {
    if (!quoteRef.current) return;
    gsap.to(quoteRef.current, {
      opacity: 0, y: -10, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(quoteRef.current!, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      },
    });
  };

  useEffect(() => {
    if (quotes.length <= 1) return;
    const id = setInterval(() => goTo((index + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, [index, quotes.length]);

  if (!quotes.length) return null;
  const current = quotes[index];

  return (
    <section className="bg-[#f5f0e8] py-20 overflow-hidden">
      <div className="section-container max-w-3xl text-center">
        <div className="kicker mb-8">Words of His Grace</div>

        <blockquote ref={quoteRef} className="font-heading text-2xl md:text-4xl font-light text-navy/90 leading-relaxed italic mb-6">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        <GoldDivider className="max-w-[120px] mx-auto my-5" />

        <cite className="text-[10px] uppercase tracking-[0.22em] text-gold/70 not-italic">
          — {current.source}
        </cite>

        {quotes.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-gold w-5" : "bg-gold/30"}`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
