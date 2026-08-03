"use client";

import { useState } from "react";
import { useInView } from "@/components/site/useInView";
import { heroDisplay, heroMono } from "@/lib/fonts";

type Cor = {
    name: string;
    hex: string;
    note: string;
    aplicacoes: string[];
};

const CORES: Cor[] = [
    { name: "Preto", hex: "#0A0A0A", note: "Moderno • muito procurado", aplicacoes: ["Esquadrias", "Portões", "Perfis estruturais"] },
    { name: "Fosco", hex: "#DADADA", note: "Elegante • visual clean", aplicacoes: ["Esquadrias", "Interiores", "Guarda-corpos"] },
    { name: "Branco", hex: "#FFFFFF", note: "Versátil • alta saída", aplicacoes: ["Esquadrias", "Fachada residencial", "Reformas"] },
    { name: "Bronze", hex: "#5C4A2F", note: "Premium • fachada", aplicacoes: ["Fachada comercial", "Pele de vidro", "Brises"] },
    { name: "Cerejeira", hex: "#7A431B", note: "Amadeirado • impacto", aplicacoes: ["Fachada", "Portas de giro", "Detalhes decorativos"] },
    { name: "Fiamatto", hex: "#F2B43A", note: "Destaque • ripado/lambris", aplicacoes: ["Ripado", "Lambris", "Elementos de destaque"] },
];

type IconName =
    | "janela"
    | "portao"
    | "viga"
    | "predio"
    | "corrimao"
    | "casa"
    | "martelo"
    | "vidro"
    | "persiana"
    | "porta"
    | "estrela"
    | "ripado"
    | "lambris";

const ICON_POR_APLICACAO: Record<string, IconName> = {
    Esquadrias: "janela",
    Portões: "portao",
    "Perfis estruturais": "viga",
    Interiores: "predio",
    "Guarda-corpos": "corrimao",
    "Fachada residencial": "casa",
    Reformas: "martelo",
    "Fachada comercial": "predio",
    "Pele de vidro": "vidro",
    Brises: "persiana",
    Fachada: "predio",
    "Portas de giro": "porta",
    "Detalhes decorativos": "estrela",
    Ripado: "ripado",
    Lambris: "lambris",
    "Elementos de destaque": "estrela",
};

function AplicacaoIcon({ name }: { name: IconName }) {
    const common = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.6,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    switch (name) {
        case "janela":
            return (
                <svg {...common}>
                    <rect x="4" y="4" width="16" height="16" rx="1" />
                    <path d="M12 4v16M4 12h16" />
                </svg>
            );
        case "portao":
            return (
                <svg {...common}>
                    <path d="M4 20V6l8-2 8 2v14M4 20h16M8 8v12M12 7v13M16 8v12" />
                </svg>
            );
        case "viga":
            return (
                <svg {...common}>
                    <path d="M5 5h14M5 19h14M12 5v14" />
                </svg>
            );
        case "predio":
            return (
                <svg {...common}>
                    <rect x="5" y="3" width="14" height="18" rx="1" />
                    <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
                </svg>
            );
        case "corrimao":
            return (
                <svg {...common}>
                    <path d="M3 8h18M6 8v10M12 8v10M18 8v10" />
                </svg>
            );
        case "casa":
            return (
                <svg {...common}>
                    <path d="M4 11 12 4l8 7" />
                    <path d="M6 10v10h12V10" />
                </svg>
            );
        case "martelo":
            return (
                <svg {...common}>
                    <path d="M14.5 6.5 18 3l3 3-3.5 3.5" />
                    <path d="M13 8l-9 9 3 3 9-9" />
                    <path d="M11 10l3 3" />
                </svg>
            );
        case "vidro":
            return (
                <svg {...common}>
                    <rect x="4" y="4" width="16" height="16" rx="1" />
                    <path d="M4 16 16 4" />
                </svg>
            );
        case "persiana":
            return (
                <svg {...common}>
                    <path d="M4 5h16M4 9.5h16M4 14h16M4 18.5h16" />
                </svg>
            );
        case "porta":
            return (
                <svg {...common}>
                    <rect x="6" y="3" width="12" height="18" rx="1" />
                    <circle cx="14.5" cy="12" r="0.8" fill="currentColor" stroke="none" />
                </svg>
            );
        case "ripado":
            return (
                <svg {...common}>
                    <path d="M6 3v18M11 3v18M16 3v18" />
                </svg>
            );
        case "lambris":
            return (
                <svg {...common}>
                    <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
            );
        case "estrela":
        default:
            return (
                <svg {...common}>
                    <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3Z" />
                </svg>
            );
    }
}

export default function CoresSection() {
    const wrap = useInView<HTMLElement>();
    const [active, setActive] = useState(0);

    const sel = CORES[active] ?? CORES[0];

    return (
        <section
            ref={wrap.ref}
            className={[heroDisplay.variable, heroMono.variable, "mt-14"].join(" ")}
        >
            <div
                className={[
                    "rounded-3xl bg-hero-graphite/40 ring-1 ring-white/10 p-7 sm:p-10",
                    "transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                {/* título */}
                <div className="text-center">
                    <p className="font-mono-hero text-xs font-medium tracking-[0.22em] uppercase text-hero-brass">
                        Cores & acabamentos
                    </p>
                    <h3 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-hero-ivory">
                        Cores disponíveis para pronta entrega
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto">
                        Para acabamentos personalizados e combinações específicas, consulte a disponibilidade com a equipe.
                    </p>
                </div>

                {/* grid + painel */}
                <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_.9fr]">
                    {/* grid cores */}
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {CORES.map((c, idx) => {
                                const isActive = idx === active;

                                return (
                                    <button
                                        key={c.name}
                                        type="button"
                                        onClick={() => setActive(idx)}
                                        className={[
                                            "group rounded-3xl p-4 ring-1 transition",
                                            isActive
                                                ? "bg-white/5 ring-white/20"
                                                : "bg-white/[0.03] ring-white/10 hover:ring-white/20 hover:bg-white/5",
                                        ].join(" ")}
                                        aria-label={`Selecionar ${c.name}`}
                                    >
                                        <div className="flex flex-col items-center text-center gap-3">
                                            {/* círculo */}
                                            <div className="relative">
                                                <span
                                                    className="block h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-full"
                                                    style={{
                                                        background: c.hex,
                                                        boxShadow: isActive
                                                            ? "0 0 0 10px rgba(201,169,97,.16), 0 20px 50px rgba(0,0,0,.35)"
                                                            : "0 0 0 10px rgba(255,255,255,.06), 0 18px 40px rgba(0,0,0,.30)",
                                                    }}
                                                />
                                                {/* brilho premium */}
                                                <span className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,.18),transparent_55%)] opacity-60" />
                                            </div>

                                            {/* texto */}
                                            <div>
                                                <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-white/90">
                                                    {c.name}
                                                </p>
                                                <p className="mt-1 text-[12px] text-neutral-400 group-hover:text-neutral-300 transition">
                                                    {c.note}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* reforço visual: onde a cor selecionada costuma aparecer */}
                        <div className="mt-6 rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-5 sm:p-6">
                            <p className="font-mono-hero text-xs font-medium tracking-[0.18em] uppercase text-hero-brass">
                                Onde {sel.name.toLowerCase()} costuma aparecer
                            </p>
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {sel.aplicacoes.map((label) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="h-[18px] w-[18px] text-hero-brass shrink-0">
                                            <AplicacaoIcon name={ICON_POR_APLICACAO[label] ?? "estrela"} />
                                        </span>
                                        <span className="text-sm text-neutral-300">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* painel do selecionado */}
                    <aside className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-7">
                        <p className="font-mono-hero text-xs font-medium tracking-[0.22em] uppercase text-hero-brass">
                            Selecionado
                        </p>

                        <div className="mt-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="font-display text-2xl font-bold text-hero-ivory">{sel.name}</p>
                                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{sel.note}</p>
                                <p className="mt-3 text-xs text-neutral-400">
                                    Pode variar conforme linha/lote. Confirme com a equipe.
                                </p>
                            </div>

                            <div
                                className="h-14 w-14 rounded-2xl ring-1 ring-white/10"
                                style={{ background: sel.hex }}
                                aria-hidden="true"
                            />
                        </div>

                        <div className="mt-6 h-px w-full bg-gradient-to-r from-hero-brass/30 via-white/10 to-transparent" />

                        <div className="mt-5 grid gap-3 text-sm text-neutral-300">
                            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                                <p className="font-extrabold text-white/90">Aplicações comuns</p>
                                <p className="mt-1">{sel.aplicacoes.join(" • ")}</p>
                            </div>
                            <a
                                href="/contato"
                                className="inline-flex justify-center rounded-2xl bg-transparent ring-1 ring-hero-brass/70 px-5 py-3 text-sm font-extrabold text-hero-brass hover:bg-hero-brass/10 transition"
                            >
                                Consultar acabamentos →
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
