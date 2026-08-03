"use client";

import Image from "next/image";
import { useInView } from "@/components/site/useInView";
import { heroDisplay, heroMono } from "@/lib/fonts";

const WHATSAPP = "5547992866123";

const SEGMENT_ICONS: Record<string, JSX.Element> = {
    Serralheiros: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3Z" />
        </svg>
    ),
    Vidraceiros: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10Z" />
        </svg>
    ),
    Construtoras: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21V9l6-4 6 4v12M4 21h16M9 21v-5h4v5M9 12h.01M13 12h.01M9 8h.01M13 8h.01" />
        </svg>
    ),
    Indústria: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2.6" />
            <path d="M12 4.5v1.6M12 17.9v1.6M19.5 12h-1.6M6.1 12H4.5M17.2 6.8l-1.13 1.13M7.93 16.07 6.8 17.2M17.2 17.2l-1.13-1.13M7.93 7.93 6.8 6.8" />
        </svg>
    ),
};

const CARDS = [
    {
        eyebrow: "DESDE 1975",
        title: "Nossa visão",
        text:
            "Ser a referência em distribuição de alumínio e acessórios: com padrão, previsibilidade e suporte técnico para o cliente comprar certo.",
    },
    {
        eyebrow: "CONTROLE DE QUALIDADE",
        title: "Compromisso com o padrão",
        text:
            "Selecionamos linhas e itens pelo que funciona na prática: compatibilidade, vedação, resistência e repetição de resultado na obra.",
    },
    {
        eyebrow: "SEGMENTOS ATENDIDOS",
        title: "Quem atendemos",
        text:
            "Serralheiros, vidraceiros, esquadrias, construtoras e indústria, com soluções completas para estruturas, fachadas e projetos personalizados.",
        segments: ["Serralheiros", "Vidraceiros", "Construtoras", "Indústria"],
    },
];

export default function VisaoGeralSection() {
    const wrap = useInView<HTMLElement>();

    return (
        <section
            ref={wrap.ref}
            className={[heroDisplay.variable, heroMono.variable, "mt-14"].join(" ")}
        >
            {/* header central */}
            <div
                className={[
                    "text-center transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                <p className="font-mono-hero text-xs font-medium tracking-[0.22em] uppercase text-hero-brass">
                    Visão geral
                </p>
                <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    Excelência em <br className="hidden sm:block" />
                    Alumínio e Acessórios
                </h2>
                <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto">
                    Distribuição com padrão, reposição e suporte técnico para quem precisa comprar certo,
                    evitar retrabalho e manter a obra andando no ritmo.
                </p>
            </div>

            {/* layout: imagem + cards */}
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_1.7fr] items-stretch">
                {/* imagem / bloco premium */}
                <div
                    className={[
                        "relative overflow-hidden ring-1 ring-white/10 bg-white/5",
                        "transition-all duration-700 ease-out",
                        wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                    ].join(" ")}
                    style={{ transitionDelay: "120ms" }}
                >
                    <div className="relative h-[260px] sm:h-[320px] lg:h-full min-h-[360px]">
                        <Image
                            src="/banners/servicos/separacao-org.jpeg"
                            alt="Estoque organizado"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />

                        {/* overlays sofisticados */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />
                        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(800px_circle_at_30%_20%,rgba(201,169,97,.14),transparent_40%)]" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                            <p className="font-mono-hero text-xs font-medium tracking-[0.2em] uppercase text-hero-brass">
                                Estrutura & Estoque
                            </p>
                            <p className="font-display mt-2 text-2xl font-bold text-white/95">
                                Giro alto + separação organizada
                            </p>
                            <p className="mt-2 text-sm text-neutral-200/85 max-w-xl">
                                Itens-chave priorizados no estoque, conferência e identificação para reduzir erro
                                e acelerar o recebimento.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <a
                                    href={`https://wa.me/${WHATSAPP}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                                >
                                    Chamar no WhatsApp →
                                </a>
                                <a
                                    href="/catalogos"
                                    className="rounded-2xl bg-transparent ring-1 ring-hero-brass/70 px-5 py-3 text-sm font-extrabold text-hero-brass hover:bg-hero-brass/10 transition"
                                >
                                    Ver catálogo →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* cards 3 — fichas técnicas empilhadas */}
                <div className="grid gap-5">
                    {CARDS.map((c, idx) => (
                        <article
                            key={c.title}
                            className={[
                                "relative bg-hero-graphite ring-1 ring-hero-aluminum/15 p-7 sm:p-8",
                                "transition-all duration-700 ease-out",
                                wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                            ].join(" ")}
                            style={{ transitionDelay: `${180 + idx * 90}ms` }}
                        >
                            {/* marca de canto — carimbo de ficha técnica */}
                            <span
                                aria-hidden
                                className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-hero-brass"
                            />

                            <p className="font-mono-hero text-[11px] font-medium tracking-[0.2em] uppercase text-hero-brass">
                                {c.eyebrow}
                            </p>
                            <h3 className="font-display mt-2 text-lg sm:text-xl font-bold text-hero-ivory">
                                {c.title}
                            </h3>
                            <p className="mt-3 text-base sm:text-lg text-hero-ivory/80 leading-relaxed">
                                {c.text}
                            </p>

                            {c.segments && (
                                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                                    {c.segments.map((seg) => (
                                        <li
                                            key={seg}
                                            className="flex items-center gap-2 text-sm text-hero-ivory/80"
                                        >
                                            <span className="h-[18px] w-[18px] text-hero-aluminum shrink-0">
                                                {SEGMENT_ICONS[seg]}
                                            </span>
                                            {seg}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
