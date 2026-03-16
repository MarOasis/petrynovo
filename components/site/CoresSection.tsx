"use client";

import { useState } from "react";
import { useInView } from "@/components/site/useInView";

type Cor = {
    name: string;
    hex: string;
    note: string;
};

const CORES: Cor[] = [
    { name: "Preto", hex: "#0A0A0A", note: "Moderno • muito pedido" },
    { name: "Fosco", hex: "#DADADA", note: "Elegante • visual clean" },
    { name: "Branco", hex: "#FFFFFF", note: "Versátil • alta saída" },
    { name: "Bronze", hex: "#5C4A2F", note: "Premium • fachada" },
    { name: "Cerejeira", hex: "#7A431B", note: "Amadeirado • impacto" },
    { name: "Fiamatto", hex: "#F2B43A", note: "Destaque • ripado/lambris" },
];

export default function CoresSection() {
    const wrap = useInView<HTMLElement>();
    const [active, setActive] = useState(0);

    const sel = CORES[active] ?? CORES[0];

    return (
        <section ref={wrap.ref} className="mt-14">
            <div
                className={[
                    "rounded-3xl bg-emerald-950/20 ring-1 ring-white/10 p-7 sm:p-10",
                    "transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                {/* título */}
                <div className="text-center">
                    <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                        Cores & acabamentos
                    </p>
                    <h3 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                        Cores disponíveis para pronta entrega
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto">
                        Para acabamentos personalizados e combinações específicas, consulte a disponibilidade no orçamento.
                    </p>
                </div>

                {/* grid + painel */}
                <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_.9fr]">
                    {/* grid cores */}
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
                                                        ? "0 0 0 10px rgba(16,185,129,.14), 0 20px 50px rgba(0,0,0,.35)"
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

                    {/* painel do selecionado */}
                    <aside className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-7">
                        <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                            Selecionado
                        </p>

                        <div className="mt-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-2xl font-black">{sel.name}</p>
                                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{sel.note}</p>
                                <p className="mt-3 text-xs text-neutral-400">
                                    Pode variar conforme linha/lote. Confirme na hora do orçamento.
                                </p>
                            </div>

                            <div
                                className="h-14 w-14 rounded-2xl ring-1 ring-white/10"
                                style={{ background: sel.hex }}
                                aria-hidden="true"
                            />
                        </div>

                        <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-400/25 via-white/10 to-transparent" />

                        <div className="mt-5 grid gap-3 text-sm text-neutral-300">
                            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                                <p className="font-extrabold text-white/90">Aplicações comuns</p>
                                <p className="mt-1">Esquadrias • Fachada • Ripado/Lambris • Detalhes</p>
                            </div>
                            <a
                                href="/contato"
                                className="inline-flex justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
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
