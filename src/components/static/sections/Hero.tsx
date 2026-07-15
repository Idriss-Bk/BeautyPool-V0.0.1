"use client";

/**
 * Hero.tsx — "Fiora" beauty & wellness booking hero
 * -------------------------------------------------
 * Stack: React + TypeScript + Tailwind CSS + GSAP
 *
 * SETUP NOTES (do these once in your project):
 *
 * 1. Install deps:
 *      npm install gsap lucide-react
 *
 * 2. Fonts — add to your root HTML head (index.html) or via next/font:
 *      <link rel="preconnect" href="https://fonts.googleapis.com">
 *      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
 *
 * 3. Tailwind config — extend your theme so the font-serif / font-sans utilities
 *    used below point at the right stacks (optional — arbitrary hex colors used
 *    throughout already work with zero config):
 *
 *      // tailwind.config.js
 *      theme: {
 *        extend: {
 *          fontFamily: {
 *            serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
 *            sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
 *          },
 *        },
 *      },
 *
 * This component is fully self-contained and static (no backend calls yet) —
 * every value (services, ratings, availability) is placeholder content ready
 * to be swapped for real data later.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  CalendarCheck,
  Clock,
  ChevronDown,
} from "lucide-react";

type Swatch = {
  color: string;
  label: string;
  sub: string;
  rating: string;
  position: string; // tailwind positioning classes
  rotate: string; // tailwind rotate class (rest state)
};

const SWATCHES: Swatch[] = [
  {
    color: "#5B2340",
    label: "Balayage",
    sub: "Hair colour",
    rating: "4.9",
    position: "top-[2%] left-[-6%] sm:left-[-10%]",
    rotate: "-rotate-6",
  },
  {
    color: "#B8935A",
    label: "Gel manicure",
    sub: "Nails",
    rating: "5.0",
    position: "bottom-[14%] left-[-2%] sm:left-[-8%]",
    rotate: "rotate-3",
  },
  {
    color: "#6E7F5C",
    label: "Deep tissue",
    sub: "Massage",
    rating: "4.8",
    position: "top-[-2%] right-[-2%] sm:right-[-10%]",
    rotate: "rotate-6",
  },
  {
    color: "#8A3B4F",
    label: "Signature facial",
    sub: "Skincare",
    rating: "4.9",
    position: "bottom-[-4%] right-[4%] sm:right-[-6%]",
    rotate: "-rotate-3",
  },
];

const AVATAR_STACK = [
  { initials: "AM", bg: "#5B2340" },
  { initials: "JT", bg: "#B8935A" },
  { initials: "RK", bg: "#6E7F5C" },
  { initials: "SP", bg: "#8A3B4F" },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const swatchRefs = useRef<Array<HTMLDivElement | null>>([]);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // ---- Entrance timeline -------------------------------------------------
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".fi-nav", { y: -24, opacity: 0, duration: 0.6 })
        .from(".fi-eyebrow", { y: 16, opacity: 0, duration: 0.5 }, "-=0.25")
        .from(
          ".fi-headline-line",
          { y: 44, opacity: 0, duration: 0.75, stagger: 0.09 },
          "-=0.2"
        )
        .from(".fi-subcopy", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
        .from(
          ".fi-searchbar",
          { y: 20, opacity: 0, scale: 0.97, duration: 0.6 },
          "-=0.25"
        )
        .from(".fi-trust", { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          cardRef.current,
          { y: 34, opacity: 0, rotate: -6, scale: 0.92, duration: 0.85 },
          "-=0.5"
        )
        .from(
          ".fi-swatch",
          {
            y: 26,
            opacity: 0,
            scale: 0.82,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.55"
        );

      if (!reduceMotion) {
        // ---- Ambient idle float on swatch cards ------------------------------
        swatchRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            y: i % 2 === 0 ? -12 : 10,
            rotation: i % 2 === 0 ? "+=3" : "-=3",
            duration: 2.8 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.15 * i,
          });
        });

        // ---- Ambient idle float on the central card --------------------------
        gsap.to(cardRef.current, {
          y: -10,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // ---- Slow ambient drift on background blobs --------------------------
        gsap.to(blobARef.current, {
          x: 30,
          y: -20,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(blobBRef.current, {
          x: -24,
          y: 18,
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // ---- Mouse parallax on the visual cluster ----------------------------
        const visual = visualRef.current;
        if (visual) {
          const cardTo = {
            x: gsap.quickTo(cardRef.current, "x", {
              duration: 0.7,
              ease: "power3.out",
            }),
            y: gsap.quickTo(cardRef.current, "y", {
              duration: 0.7,
              ease: "power3.out",
            }),
          };

          const swatchTo = swatchRefs.current.map((el) =>
            el
              ? {
                  x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
                  y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
                }
              : null
          );

          const handleMove = (e: MouseEvent) => {
            const rect = visual.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            cardTo.x(relX * 18);
            cardTo.y(relY * 14);

            swatchTo.forEach((fns, i) => {
              if (!fns) return;
              const depth = i % 2 === 0 ? 30 : 22;
              fns.x(relX * -depth);
              fns.y(relY * -depth);
            });
          };

          const handleLeave = () => {
            cardTo.x(0);
            cardTo.y(0);
            swatchTo.forEach((fns) => {
              if (!fns) return;
              fns.x(0);
              fns.y(0);
            });
          };

          visual.addEventListener("mousemove", handleMove);
          visual.addEventListener("mouseleave", handleLeave);

          return () => {
            visual.removeEventListener("mousemove", handleMove);
            visual.removeEventListener("mouseleave", handleLeave);
          };
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-[#FBF7F2] font-sans text-[#221B18]"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Ambient background blobs                                         */}
      {/* ---------------------------------------------------------------- */}
      <div
        ref={blobARef}
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#F3DCD1] opacity-70 blur-3xl"
        aria-hidden="true"
      />
      <div
        ref={blobBRef}
        className="pointer-events-none absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full bg-[#6E7F5C]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* ---------------------------------------------------------------- */}
      {/* Nav                                                               */}
      {/* ---------------------------------------------------------------- */}
      <header className="fi-nav relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B2340] font-serif text-[17px] italic text-[#F3DCD1]">
            F
          </div>
          <span className="font-serif text-xl tracking-tight text-[#221B18]">
            Fiora
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-[15px] text-[#221B18]/70 md:flex">
          <a href="#" className="transition hover:text-[#221B18]">
            Explore
          </a>
          <a href="#" className="transition hover:text-[#221B18]">
            For business
          </a>
          <a href="#" className="transition hover:text-[#221B18]">
            Help
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-[15px] font-medium text-[#221B18]/80 transition hover:text-[#221B18] sm:block"
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-full bg-[#221B18] px-5 py-2.5 text-[15px] font-medium text-[#FBF7F2] transition hover:bg-[#5B2340]"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero content                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-10 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:pb-32 lg:pt-16">
        {/* ---------------- Left column: copy + search ---------------- */}
        <div className="max-w-xl">
          <div className="fi-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-[#221B18]/10 bg-white/60 px-4 py-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5B2340]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Beauty &amp; wellness, on your time
          </div>

          <h1 className="font-serif text-[44px] leading-[1.08] tracking-tight text-[#221B18] sm:text-[56px] lg:text-[60px]">
            <span className="fi-headline-line block">Look your best,</span>
            <span className="fi-headline-line block">
              book in{" "}
              <em className="italic text-[#5B2340]">seconds.</em>
            </span>
          </h1>

          <p className="fi-subcopy mt-6 text-[17px] leading-relaxed text-[#221B18]/65">
            Find top-rated hair, nail, spa and wellness studios near you.
            See real-time availability and book instantly — no calls,
            no waiting.
          </p>

          {/* Search bar */}
          <div className="fi-searchbar mt-8 flex flex-col gap-2 rounded-2xl border border-[#221B18]/8 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(34,27,24,0.25)] sm:flex-row sm:items-center sm:rounded-full">
            <label className="flex flex-1 items-center gap-3 rounded-full px-4 py-3">
              <Search className="h-4.5 w-4.5 shrink-0 text-[#221B18]/40" />
              <input
                type="text"
                placeholder="Hair, nails, spa, massage..."
                className="w-full bg-transparent text-[15px] text-[#221B18] placeholder:text-[#221B18]/40 focus:outline-none"
              />
            </label>

            <div className="hidden h-8 w-px bg-[#221B18]/10 sm:block" />

            <label className="flex flex-1 items-center gap-3 rounded-full px-4 py-3">
              <MapPin className="h-4.5 w-4.5 shrink-0 text-[#221B18]/40" />
              <input
                type="text"
                placeholder="Current location"
                className="w-full bg-transparent text-[15px] text-[#221B18] placeholder:text-[#221B18]/40 focus:outline-none"
              />
            </label>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full bg-[#5B2340] px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-[#45192F] active:scale-[0.98] sm:shrink-0"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Trust row */}
          <div className="fi-trust mt-7 flex items-center gap-4">
            <div className="flex -space-x-3">
              {AVATAR_STACK.map((a, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: a.bg }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FBF7F2] text-[11px] font-semibold text-white"
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <p className="text-[14px] text-[#221B18]/60">
              <span className="inline-flex items-center gap-1 font-semibold text-[#221B18]">
                <Star className="h-3.5 w-3.5 fill-[#B8935A] text-[#B8935A]" />
                4.9
              </span>{" "}
              rating from 50,000+ clients across the UAE
            </p>
          </div>
        </div>

        {/* ---------------- Right column: visual cluster ---------------- */}
        <div
          ref={visualRef}
          className="relative hidden h-[480px] items-center justify-center lg:flex"
        >
          {/* Central appointment card */}
          <div
            ref={cardRef}
            className="relative z-20 w-[300px] rounded-3xl border border-[#221B18]/8 bg-white p-6 shadow-[0_30px_70px_-25px_rgba(34,27,24,0.35)]"
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#E7F0E3] px-3 py-1 text-[12px] font-medium text-[#3F5C34]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3F5C34]" />
              Confirmed
            </div>

            <h3 className="font-serif text-[22px] leading-tight text-[#221B18]">
              Balayage &amp; Gloss
            </h3>
            <p className="mt-1 text-[14px] text-[#221B18]/55">
              with Amara — Studio Noir
            </p>

            <div className="my-5 h-px w-full bg-[#221B18]/8" />

            <div className="space-y-2.5 text-[14px] text-[#221B18]/75">
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="h-4 w-4 text-[#5B2340]" />
                Today
                <span className="text-[#221B18]/35">·</span>
                <Clock className="h-4 w-4 text-[#5B2340]" />
                3:30 PM
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#5B2340]" />
                Downtown, Dubai
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#221B18]/40">
                  Total
                </p>
                <p className="text-[18px] font-semibold text-[#221B18]">
                  AED 420
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B2340] text-[12px] font-semibold text-white">
                AM
              </div>
            </div>
          </div>

          {/* Floating swatch cards */}
          {SWATCHES.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => {
                swatchRefs.current[i] = el;
              }}
              className={`fi-swatch absolute z-10 w-[168px] rounded-2xl border border-[#221B18]/8 bg-white p-3.5 shadow-[0_18px_40px_-18px_rgba(34,27,24,0.3)] ${s.position} ${s.rotate}`}
            >
              <div
                style={{ backgroundColor: s.color }}
                className="h-12 w-full rounded-xl"
              />
              <p className="mt-2.5 text-[13.5px] font-medium text-[#221B18]">
                {s.label}
              </p>
              <div className="mt-0.5 flex items-center justify-between">
                <span className="text-[12px] text-[#221B18]/50">{s.sub}</span>
                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#221B18]/70">
                  <Star className="h-3 w-3 fill-[#B8935A] text-[#B8935A]" />
                  {s.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Scroll cue                                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative z-10 hidden justify-center pb-10 sm:flex">
        <div className="flex flex-col items-center gap-1 text-[#221B18]/35">
          <span className="text-[12px] uppercase tracking-[0.14em]">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
}