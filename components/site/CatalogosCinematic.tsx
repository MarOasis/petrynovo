"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/components/site/useInView";

type Cat = {
    name: string;
    cover: string;
    hrf: string;
};

export default function CatalogosCinematic() {
    const wrap = useInView<HTMLElement>();

    // ✅ Para adicionar mais no futuro: só empilhe objetos aqui
    const cats = useMemo<Cat[]>(
        () => [
            {
                name: "Catálogo de Perfis — 2026",
                cover: "/banners/catalogos/ctg-perfil.png",
                hrf: "https://drive.google.com/file/d/1Oq3tlzbxbyEZj_ioNU2bNKY8NAQN0i_D/view?usp=sharing",
            },
            {
                name: "Catálogo Perfetta — 2026",
                cover: "/banners/catalogos/ctg-perfetta.png",
                hrf: "https://drive.google.com/file/d/1vYUZJicuP3yJUL4xJYrge8cmH6WrO0nl/view?usp=drive_link",
            },
            {
                name: "Catálogo de Acessórios — 2026",
                cover: "/banners/catalogos/ctg-ace1.png",
                hrf: "https://drive.google.com/file/d/1TYWHCDBgWYcIK3kovEfGMLaGwZzxcrnq/view?usp=drive_link",
            },
            {
                name: "Catálogo  Técnico — 2026",
                cover: "/banners/catalogos/ctg-tecnico.png",
                hrf: "https://drive.google.com/file/d/15fcDI2UYwRf5xfRR_V5KMIr9mzMxQIRb/view?usp=sharing",
            },
            
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
                "mt-14",
                "transition-all duration-700 ease-out",
                wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
        >
            <div
                className="relative overflow-hidden  ring-1 ring-white/10 bg-neutral-950"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/35 to-neutral-950/70"  />
                    <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_20%,rgba(16,185,129,.18),transparent_60%)]" />
                    {/* Film grain */}
                    <div className="absolute inset-0 cl-grain pointer-events-none" />
                </div>

                {/* Conteúdo */}
                <div className="relative p-6 sm:p-10">
                    {/* topo minimal */}
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                                Catálogos
                            </p>
                            <h3 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
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
                                        "h-2.5 w-2.5  transition",
                                        idx === i ? "bg-emerald-400" : "bg-white/35 hover:bg-white/45",
                                    ].join(" ")}
                                />
                            ))}
                        </div>
                    </div>

                    {/* palco */}
                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.46fr] items-center">
                        {/* capa grande */}
                        <div className="relative">
                            <div className="relative mx-auto w-full max-w-[920px]">
                                <div className="relative aspect-[16/8.6] overflow-hidden bg-white/5">
                                    {/* anterior */}
                                    {prev ? (
                                        <div className="absolute inset-0">
                                            <Image
                                                src={prev.cover}
                                                alt=""
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 100vw, 70vw"
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
                                            sizes="(max-width: 1024px) 100vw, 70vw"
                                            priority={false}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/35 via-transparent to-neutral-950/15" />
                                    </div>

                                    {/* título discreto */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                                        <p className="text-white/90 text-sm sm:text-base font-extrabold tracking-wide">
                                            {cur.name}
                                        </p>
                                    </div>
                                </div>

                                {/* controles + botão único baixar */}
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => go(i - 1)}
                                            className=" bg-white/10 ring-1 ring-white/15 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-white/15 transition"
                                            aria-label="Anterior"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={() => go(i + 1)}
                                            className=" bg-white/10 ring-1 ring-white/15 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-white/15 transition"
                                            aria-label="Próximo"
                                        >
                                            →
                                        </button>
                                    </div>

                                    <a
                                        href={cur.hrf}
                                        target="_blank"
                                        rel="noreferrer"
                                        className=" bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                                    >
                                        Explorar catálogo →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* thumbs escaláveis */}
                        <div className="min-w-0">
                            <div
                                className={[
                                    "flex gap-3",
                                    "overflow-x-auto lg:overflow-y-auto",
                                    "lg:flex-col",
                                    "lg:max-h-[420px] lg:pr-1",
                                    "snap-x lg:snap-none",
                                ].join(" ")}
                            >
                                {cats.map((c, idx) => {
                                    const active = idx === i;
                                    return (
                                        <button
                                            type="button"
                                            key={c.hrf}
                                            onClick={() => go(idx)}
                                            className={[
                                                "relative overflow-hidden  ring-1 bg-white/5 transition",
                                                active ? "ring-emerald-400/45" : "ring-white/10 hover:ring-white/20",
                                                "shrink-0",
                                                "w-[150px] sm:w-[180px] lg:w-full",
                                                "h-[86px] sm:h-[96px] lg:h-[130px]",
                                                "snap-start",
                                            ].join(" ")}
                                            aria-label={`Selecionar ${c.name}`}
                                        >
                                            <Image
                                                src={c.cover}
                                                alt={c.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 40vw, 22vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/35 via-transparent to-neutral-950/15" />
                                            {active ? (
                                                <div className="absolute inset-0 ring-2 ring-emerald-400/35 " />
                                            ) : null}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="mt-3 text-xs text-neutral-400">
                                {effectivePaused ? "Pausado" : "Auto-play"}
                                {" • "}
                                Passe o mouse para pausar • No mobile, arraste as miniaturas
                            </p>
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
