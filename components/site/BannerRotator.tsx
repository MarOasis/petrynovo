"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";

type Slide = {
  desktop: string;
  mobile?: string;
  alt?: string;
};

const DEFAULT_SLIDES: Slide[] = [
  { desktop: "/banners/desktop/Banner15.png", mobile: "/banners/mobile/mb6.png", alt: "Banner 1" },
  { desktop: "/banners/desktop/Banner12.png", mobile: "/banners/mobile/mb7.png", alt: "Banner 2" },
  { desktop: "/banners/desktop/Banner13.png", mobile: "/banners/mobile/mb10.png", alt: "Banner 3" },
];

type Props = {
  slides?: Slide[];
  heightClass?: string;
  showOverlay?: boolean;

  // ✅ controles separados
  showArrows?: boolean;
  showDots?: boolean;

  intervalMs?: number;
  transitionMs?: number;
};

function PictureFill({ s }: { s: Slide }) {
  return (
    <picture>
      {s.mobile ? <source media="(max-width: 520px)" srcSet={s.mobile} /> : null}
      <img
        src={s.desktop}
        alt={s.alt ?? "Banner"}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    </picture>
  );
}

export default function BannerRotator({
  slides,
  heightClass = "h-[380px] sm:h-[520px] lg:h-[680px] 2xl:h-[760px]",
  showOverlay = true,
  showArrows = true,
  showDots = true,
  intervalMs = 4500,
  transitionMs = 780, // crossfade premium
}: Props) {
  const data = useMemo(() => (slides?.length ? slides : DEFAULT_SLIDES), [slides]);
  const total = data.length;

  const [i, setI] = useState(0);
  const [prevI, setPrevI] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const clearPrevTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clearPrevTimer.current) window.clearTimeout(clearPrevTimer.current);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    if (total <= 1) return;
    const t = window.setInterval(() => go(i + 1), intervalMs);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, total, intervalMs, i]);

  const go = (next: number) => {
    if (total <= 0) return;

    const nextIndex = (next + total) % total;

    // define slide anterior pra ficar por baixo (crossfade real)
    setPrevI(i);
    setI(nextIndex);
    setAnimKey((k) => k + 1);

    // limpa anterior após a transição
    if (clearPrevTimer.current) window.clearTimeout(clearPrevTimer.current);
    clearPrevTimer.current = window.setTimeout(() => setPrevI(null), transitionMs + 40);
  };

  const prev = () => go(i - 1);
  const next = () => go(i + 1);

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX ?? null;
    touchStartX.current = null;
    if (start == null || end == null) return;
    const dx = end - start;
    if (Math.abs(dx) < 40) return;
    dx > 0 ? prev() : next();
  };

  const cur = data[i] ?? data[0];
  const prevSlide = prevI != null ? data[prevI] : null;

  return (
    <section
      className="group relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Banners rotativos"
    >
      <div className={`relative ${heightClass}`}>
        {/* camada anterior (fica por baixo por ~transitionMs) */}
        {prevSlide ? (
          <div className="absolute inset-0">
            <PictureFill s={prevSlide} />
          </div>
        ) : null}

        {/* camada atual com animação premium */}
        <div key={animKey} className="absolute inset-0 cl-xfade-in">
          <PictureFill s={cur} />
        </div>

        {showOverlay ? (
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/35 via-transparent to-transparent" />
        ) : null}
      </div>

      {/* setas */}
      {showArrows && total > 1 ? (
        <>
          <button
            onClick={prev}
            aria-label="Banner anterior"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur hover:bg-white/15 transition opacity-0 group-hover:opacity-100"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Próximo banner"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur hover:bg-white/15 transition opacity-0 group-hover:opacity-100"
          >
            ›
          </button>
        </>
      ) : null}

      {/* dots ✅ */}
      {showDots && total > 1 ? (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Ir para banner ${idx + 1}`}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                idx === i ? "bg-emerald-400" : "bg-white/50 hover:bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
