"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { heroDisplay, heroMono } from "@/lib/fonts";

const WHATSAPP_NUMBER = "5547992866123";
const LAMINA_COUNT = 7;

// TEMP placeholder: reuses the existing "Muxarabi" catalog render (the only asset in
// the repo that is literally aluminum louvers), cropped/darkened to hide its baked-in
// marketing copy. Swap for the real brise/veneziana photo per docs/PETRY_HERO_REDESIGN.md
// section 5 as soon as it's available — no other code needs to change.
const HERO_IMAGE = "/banners/desktop/Banner2.png";

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

    return (
        <section
            className={[
                heroDisplay.variable,
                heroMono.variable,
                "relative h-[420px] sm:h-[520px] lg:h-[680px] 2xl:h-[760px] overflow-hidden bg-hero-graphite",
            ].join(" ")}
        >
            <Image
                src={HERO_IMAGE}
                alt="Perfis de alumínio Petry — linha de brise/ripado em quatro acabamentos"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[92%_center]"
            />

            {/* scrim: escurece pra dar contraste cinematográfico e esconder o texto de marketing já embutido na imagem */}
            <div className="absolute inset-0 bg-gradient-to-r from-hero-graphite from-0% via-hero-graphite via-50% to-hero-graphite/15 to-100%" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            {/* elemento de assinatura: lâminas que abrem no load, tipo veneziana/brise real */}
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
            <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl">
                    <p className="font-mono-hero text-xs font-medium uppercase tracking-[0.32em] text-hero-brass">
                        Alumínio · Precisão · SC
                    </p>

                    <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-hero-ivory sm:text-5xl lg:text-6xl">
                        Luz, precisão
                        <br />e alumínio.
                    </h1>

                    <p className="mt-5 max-w-md text-sm text-hero-ivory/70 sm:text-base">
                        Perfis, brises e acessórios com padrão técnico e acabamento consistente — do projeto à obra.
                    </p>

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
        </section>
    );
}
