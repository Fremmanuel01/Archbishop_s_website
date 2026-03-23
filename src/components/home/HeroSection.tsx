"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/animations/gsap";
import GoldDivider from "@/components/ui/GoldDivider";
import { urlFor } from "@/lib/sanity/image";

interface Props {
  heading?:     string;
  subheading?:  string;
  heroImage?:   object;
  heroVideoUrl?: string;
}

export default function HeroSection({ heading, subheading, heroImage, heroVideoUrl }: Props) {
  const t       = useTranslations("home");
  const heroRef = useRef<HTMLDivElement>(null);
  const tlRef   = useRef<gsap.core.Timeline | null>(null);

  const displayHeading    = heading    ?? t("heroHeading");
  const displaySubheading = subheading ?? t("heroSub");

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ delay: 0.4 })
        .fromTo(".hero-kicker",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .fromTo(".hero-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1,   ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-divider", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, ease: "power3.out", transformOrigin: "center" }, "-=0.4")
        .fromTo(".hero-sub",     { opacity: 0 },          { opacity: 1, duration: 0.7 }, "-=0.2")
        .fromTo(".hero-scroll",  { opacity: 0, y: -10 },  { opacity: 1, y: 0, duration: 0.5 }, "-=0.1");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const bgUrl = heroImage
    ? urlFor(heroImage).width(1600).height(900).format("webp").url()
    : null;

  const hasVideo = !!heroVideoUrl;

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e]">

      {/* ── Video background ── */}
      {hasVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideoUrl}
        />
      )}

      {/* ── Fallback: static image ── */}
      {!hasVideo && bgUrl && (
        <div className="absolute inset-0">
          <Image
            src={bgUrl}
            alt="Archbishop Valerian Okeke"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
        </div>
      )}

      {/* ── Overlay — always present, stronger on video ── */}
      <div
        className="absolute inset-0"
        style={{
          background: hasVideo
            ? "linear-gradient(to bottom, rgba(10,15,30,0.65) 0%, rgba(10,15,30,0.45) 50%, rgba(10,15,30,0.75) 100%)"
            : "linear-gradient(to bottom, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.60) 50%, rgba(10,15,30,0.90) 100%)",
        }}
      />

      {/* ── Decorative glows ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="hero-kicker kicker mb-8" style={{ color: "#c9a84c" }}>{t("heroTagline")}</p>

        <h1 className="hero-heading font-heading font-light text-4xl md:text-6xl lg:text-7xl text-cream leading-tight tracking-wide mb-8 text-balance">
          <em className="not-italic text-gold-gradient">&ldquo;{displayHeading}&rdquo;</em>
        </h1>

        <div className="hero-divider">
          <GoldDivider className="max-w-xs mx-auto" />
        </div>

        <p className="hero-sub text-cream/70 text-sm tracking-[0.25em] uppercase mt-6 font-body">
          {displaySubheading}
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gold/80">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
