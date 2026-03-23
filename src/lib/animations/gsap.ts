"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// ── Reusable animation presets ───────────────────────────────────────────────

export function fadeUp(targets: gsap.TweenTarget, vars?: gsap.TweenVars) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", ...vars }
  );
}

export function fadeIn(targets: gsap.TweenTarget, vars?: gsap.TweenVars) {
  return gsap.fromTo(
    targets,
    { opacity: 0 },
    { opacity: 1, duration: 0.7, ease: "power2.out", ...vars }
  );
}

export function staggerIn(targets: gsap.TweenTarget, vars?: gsap.TweenVars) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, ...vars }
  );
}

export function createScrollReveal(
  trigger: Element,
  targets: gsap.TweenTarget,
  vars?: gsap.TweenVars
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger,
        start: "top 85%",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
      },
      ...vars,
    }
  );
}
