"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "@/components/site/useInView";
import { heroDisplay, heroMono } from "@/lib/fonts";

type Cat = {
    name: string;
    cover: string;
};

export default function CatalogosCinematic() {
    const wrap = useInView<HTMLElement>();

    // ✅ Para adicionar mais no futuro: só empilhe objetos aqui
    const cats = useMemo<Cat[]>(
        () => [
            { name: "Catálogo de Perfis — 2026", cover: "/banners/catalogos/capa1.jpg" },
            { name: "Catálogo Perfetta — 2026", cover: "/banners/catalogos/capa3.jpg" },
            { name: "Catálogo de Acessórios — 2026", cover: "/banners/catalogos/capa2.jpg" },
            { name: "Catálogo Técnico — 2026", cover: "/banners/catalogos/capa4.jpg" },
        ],
        []
    );

    const [i, setI] = useState(0);
    const [prevI, setPrevI] = useState<number | null>(null);
    const [hoverPause, setHoverPause] = useState(false);
    const [animKey, setAnimKey] = useState(0);

    const total = cats.length;
    const cur = cats[i] ?? cats[0];
    const prev = prevI != null ? cats[prevI] : null;

    const effectivePaused = hoverPause || !wrap.inView;

    const go = (next: number) => {
        if (total <= 1) return;
        const nextIndex = (next + total) % total;

        setPrevI(i);
        setI(nextIndex);
        setAnimKey((k) => k + 1);

        window.setTimeout(() => setPrevI(null), 820);
    };

    // ✅ Autoplay só quando visível (wrap.inView)
    useEffect(() => {
        if (effectivePaused) return;
        if (total <= 1) return;

        const t = window.setInterval(() => go(i + 1), 5200);
        return () => window.clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectivePaused, i, total]);

    return (
        <section
            ref={wrap.ref}
            className={[
                heroDisplay.variable,
                heroMono.variable,
                "mt-14",
                "transition-all duration-700 ease-out",
                wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
        >
            <div
                className="relative overflow-hidden ring-1 ring-hero-aluminum/15 bg-hero-graphite"
                onMouseEnter={() => setHoverPause(true)}
                onMouseLeave={() => setHoverPause(false)}
            >
                {/* Fundo cinematic (blur da capa atual) */}
                <div className="absolute inset-0">
                    <Image
                        src={cur.cover}
                        alt=""
                        fill
                        className="object-cover blur-2xl scale-110 opacity-35"
                        sizes="100vw"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hero-graphite/85 via-hero-graphite/35 to-hero-graphite/70" />
                    <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_20%,rgba(201,169,97,.14),transparent_60%)]" />
                    {/* Film grain */}
                    <div className="absolute inset-0 cl-grain pointer-events-none" />
                </div>

                {/* Conteúdo */}
                <div className="relative p-6 sm:p-10">
                    {/* topo minimal */}
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="font-mono-hero text-xs font-medium tracking-[0.22em] uppercase text-hero-brass">
                                Catálogos
                            </p>
                            <h3 className="font-display mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-hero-ivory">
                                Explore nossos catálogos
                            </h3>
                        </div>

                        {/* dots (mantém clean) */}
                        <div className="hidden sm:flex items-center gap-2">
                            {cats.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => go(idx)}
                                    aria-label={`Ir para catálogo ${idx + 1}`}
                                    className={[
                                        "h-2.5 w-2.5 transition",
                                        idx === i ? "bg-hero-brass" : "bg-hero-aluminum/35 hover:bg-hero-aluminum/50",
                                    ].join(" ")}
                                />
                            ))}
                        </div>
                    </div>

                    {/* palco: capa retrato + coluna de navegação */}
                    <div className="mt-6 grid gap-8 lg:grid-cols-[0.55fr_1fr] items-start">
                        {/* capa grande (retrato — proporção real do catálogo) */}
                        <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
                            <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                                {/* anterior */}
                                {prev ? (
                                    <div className="absolute inset-0">
                                        <Image
                                            src={prev.cover}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 60vw, 30vw"
                                        />
                                    </div>
                                ) : null}

                                {/* atual */}
                                <div key={animKey} className="absolute inset-0 cl-cine-in cl-kenburns">
                                    <Image
                                        src={cur.cover}
                                        alt={cur.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 60vw, 30vw"
                                        priority={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-hero-graphite/50 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* coluna direita: nome atual + thumbs + controles + CTA */}
                        <div className="min-w-0 flex flex-col gap-6">
                            <p className="font-display text-xl sm:text-2xl font-bold text-hero-ivory">
                                {cur.name}
                            </p>

                            {/* thumbs — 4 itens, sem scroll */}
                            <div className="grid grid-cols-4 gap-3">
                                {cats.map((c, idx) => {
                                    const active = idx === i;
                                    return (
                                        <button
                                            type="button"
                                            key={c.cover}
                                            onClick={() => go(idx)}
                                            className={[
                                                "relative aspect-[3/4] overflow-hidden ring-1 bg-white/5 transition",
                                                active ? "ring-hero-brass/50" : "ring-white/10 hover:ring-white/20",
                                            ].join(" ")}
                                            aria-label={`Selecionar ${c.name}`}
                                        >
                                            <Image
                                                src={c.cover}
                                                alt={c.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 20vw, 12vw"
                                            />
                                            {active ? (
                                                <div className="absolute inset-0 ring-2 ring-hero-brass/40" />
                                            ) : null}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-xs text-hero-ivory/50">
                                {effectivePaused ? "Pausado" : "Auto-play"}
                                {" • "}
                                Passe o mouse para pausar
                            </p>

                            {/* controles + CTA */}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => go(i - 1)}
                                        className="bg-white/10 ring-1 ring-white/15 px-4 py-2.5 text-sm font-extrabold text-hero-ivory hover:bg-white/15 transition"
                                        aria-label="Anterior"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={() => go(i + 1)}
                                        className="bg-white/10 ring-1 ring-white/15 px-4 py-2.5 text-sm font-extrabold text-hero-ivory hover:bg-white/15 transition"
                                        aria-label="Próximo"
                                    >
                                        →
                                    </button>
                                </div>

                                <Link
                                    href="/catalogos"
                                    className="bg-transparent ring-1 ring-hero-brass/70 px-6 py-3 text-sm font-extrabold text-hero-brass hover:bg-hero-brass/10 transition"
                                >
                                    Ver todos os catálogos →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* animações locais */}
                <style jsx>{`
          .cl-cine-in {
            animation: clCineIn 0.8s cubic-bezier(0.2, 0.85, 0.2, 1) both;
            will-change: opacity, filter, transform;
          }
          @keyframes clCineIn {
            from {
              opacity: 0;
              filter: blur(10px);
              transform: scale(1.02);
            }
            to {
              opacity: 1;
              filter: blur(0);
              transform: scale(1);
            }
          }

          /* Ken Burns sutil */
          .cl-kenburns {
            animation: clKen 5.2s ease-out both;
            transform-origin: center;
          }
          @keyframes clKen {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(1.035);
            }
          }

          /* Film grain (SVG noise embutido) */
          .cl-grain {
            opacity: 0.08;
            mix-blend-mode: overlay;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
            animation: clGr 2.4s steps(2) infinite;
          }
          @keyframes clGr {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-12px, 10px, 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .cl-cine-in,
            .cl-kenburns,
            .cl-grain {
              animation: none !important;
            }
          }
        `}</style>
            </div>
        </section>
    );
}
