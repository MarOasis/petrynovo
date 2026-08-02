"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useState } from "react";
import { heroDisplay, heroMono } from "@/lib/fonts";

const WHATSAPP_NUMBER = "5547992866123";
const LAMINA_COUNT = 7;

type HeroSlide = {
    src: string;
    /** short label for the thumbnail's aria-label */
    label: string;
    /** full descriptive alt text for the main image */
    alt: string;
    objectPosition?: string;
};

// Real Petry photography (docs/PETRY_HERO_REDESIGN.md §5 resolved) — replaces the
// Banner2.png catalog-render placeholder from Fase 1. More entries can be added here
// any time; the thumbnail nav below only appears once there's more than one slide.
const SLIDES: HeroSlide[] = [
    {
        src: "/banners/hero-banner/petry_banner_01_2560x1440.jpg",
        label: "Corredor de estoque",
        alt: "Corredor do estoque Petry, perfis de alumínio empilhados até o teto",
        objectPosition: "center",
    },
    {
        src: "/banners/hero-banner/petry_banner_08_2560x1440.jpg",
        label: "Fachada",
        alt: "Fachada da distribuidora Petry ao entardecer",
        objectPosition: "center 30%",
    },
    {
        src: "/banners/hero-banner/petry_banner_03_2560x1440.jpg",
        label: "Detalhe dos perfis",
        alt: "Detalhe de perfis de alumínio empacotados no estoque Petry",
        objectPosition: "center",
    },
];

const containerVariants: Variants = {
    closed: {},
    open: {
        transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
};

const laminaVariants: Variants = {
    closed: { scaleY: 1, opacity: 1 },
    open: {
        scaleY: 0,
        opacity: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Hero() {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const total = SLIDES.length;
    const slide = SLIDES[index] ?? SLIDES[0];

    const go = (next: number) => setIndex((next + total) % total);

    return (
        <section
            className={[
                heroDisplay.variable,
                heroMono.variable,
                "relative h-[420px] sm:h-[520px] lg:h-[680px] 2xl:h-[760px] overflow-hidden bg-hero-graphite",
            ].join(" ")}
        >
            <AnimatePresence mode="sync">
                <motion.div
                    key={slide.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        style={{ objectPosition: slide.objectPosition ?? "center" }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* scrim: contraste pra legibilidade do texto à esquerda — mais leve que a Fase 1 porque as fotos reais já são escuras/sem texto embutido */}
            <div className="absolute inset-0 bg-gradient-to-r from-hero-graphite/90 from-0% via-hero-graphite/45 via-45% to-hero-graphite/10 to-100%" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

            {/* elemento de assinatura: lâminas que abrem no load, tipo veneziana/brise real (só no load, não a cada troca de slide) */}
            {!reduceMotion && (
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10"
                    variants={containerVariants}
                    initial="closed"
                    animate="open"
                >
                    {Array.from({ length: LAMINA_COUNT }).map((_, i) => (
                        <motion.div
                            key={i}
                            variants={laminaVariants}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: `${(i / LAMINA_COUNT) * 100}%`,
                                height: `${100 / LAMINA_COUNT}%`,
                                transformOrigin: i % 2 === 0 ? "top" : "bottom",
                            }}
                            className="bg-hero-aluminum"
                        />
                    ))}
                </motion.div>
            )}

            {/* conteúdo */}
            <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-8 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="font-mono-hero text-xs font-medium uppercase tracking-[0.32em] text-hero-brass">
                        Alumínio · Precisão · SC
                    </p>

                    <h1 className="font-display mt-5 text-5xl font-bold leading-[0.98] tracking-tighter text-hero-ivory sm:text-6xl lg:text-7xl">
                        Perfil certo.
                        <br />
                        <span className="text-hero-brass">Obra no prazo.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-base text-hero-ivory/70 sm:text-lg">
                        Alumínio, brises e acessórios com padrão técnico e acabamento que não falha. Do estoque à obra.
                    </p>

                    {/* indicador de posição — só aparece com mais de 1 slide */}
                    {total > 1 && (
                        <div className="mt-6 flex gap-1.5" role="tablist" aria-label="Posição do slide">
                            {SLIDES.map((s, i) => (
                                <span
                                    key={s.src}
                                    role="tab"
                                    aria-selected={i === index}
                                    className={[
                                        "h-[3px] w-8 rounded-full transition-colors",
                                        i === index ? "bg-hero-brass" : "bg-hero-ivory/20",
                                    ].join(" ")}
                                />
                            ))}
                        </div>
                    )}

                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener"
                        className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-extrabold text-neutral-950 transition hover:bg-emerald-400"
                    >
                        Falar no WhatsApp
                    </a>
                </div>
            </div>

            {/* navegação por miniaturas — só aparece com mais de 1 slide */}
            {total > 1 && (
                <div className="absolute bottom-6 right-4 z-20 flex items-center gap-3 sm:right-6 lg:right-8">
                    <button
                        onClick={() => go(index - 1)}
                        aria-label="Imagem anterior"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-hero-ivory ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15"
                    >
                        ‹
                    </button>

                    <div className="flex gap-2">
                        {SLIDES.map((s, i) => (
                            <button
                                key={s.src}
                                onClick={() => go(i)}
                                aria-label={`Ver: ${s.label}`}
                                aria-current={i === index}
                                className={[
                                    "relative h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-14 sm:w-14",
                                    i === index ? "ring-hero-brass" : "ring-white/20 opacity-70 hover:opacity-100",
                                ].join(" ")}
                            >
                                <Image
                                    src={s.src}
                                    alt=""
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                    style={{ objectPosition: s.objectPosition ?? "center" }}
                                />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => go(index + 1)}
                        aria-label="Próxima imagem"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-hero-ivory ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15"
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
}
