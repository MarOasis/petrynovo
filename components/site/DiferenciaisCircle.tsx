"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useInView } from "@/components/site/useInView";

type Item = { title: string; desc: string };

const items: Item[] = [
    { title: "Pronta entrega de itens-chave", desc: "Perfis e acessórios com giro alto sempre priorizados no estoque." },
    { title: "Agilidade no orçamento", desc: "Resposta rápida com itens, medidas e alternativas equivalentes." },
    { title: "Separação organizada", desc: "Conferência, identificação e cuidado para evitar erro na obra." },
    { title: "Suporte para escolha da linha", desc: "Ajuda na compatibilidade de linha, vedação, roldanas e acabamento." },
    { title: "Reposição e recorrência", desc: "Você não fica na mão quando o cliente pede “mais 2 barras”." },
    { title: "Atendimento direto (WhatsApp)", desc: "Sem burocracia: do pedido à entrega, tudo simples." },
];

function polarToPercent(cx: number, cy: number, r: number, angleDeg: number) {
    const a = (angleDeg - 90) * (Math.PI / 180);
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return { left: `${x}%`, top: `${y}%` } as const;
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function DiferenciaisCircle() {
    const wrap = useInView<HTMLElement>();

    const n = items.length;

    // item “ativo” (sempre válido 0..n-1)
    const [active, setActive] = useState<number>(1);

    // no mobile: qual card está aberto (pode ser null)
    const [mobileOpen, setMobileOpen] = useState<number | null>(1);

    // desktop: auto-rotate e pausa no hover
    const [paused, setPaused] = useState(false);

    // re-dispara animação do centro ao trocar active (via key)
    const [centerKey, setCenterKey] = useState(0);

    // “anti-chato”: quando o usuário clica, pausa por alguns segundos
    const pauseUntilRef = useRef<number>(0);

    const points = useMemo(() => {
        const radius = 40; // um pouco menor pra evitar encostar nas bordas
        const center = { cx: 50, cy: 50 };
        return items.map((_, idx) => {
            const angle = (360 / n) * idx;
            return polarToPercent(center.cx, center.cy, radius, angle);
        });
    }, [n]);

    const select = useCallback((idx: number) => {
        setActive(idx);
        setMobileOpen(idx);
        pauseUntilRef.current = Date.now() + 12000; // pausa 12s após interação
    }, []);

    // animação do centro
    useEffect(() => {
        setCenterKey((k) => k + 1);
    }, [active]);

    // auto-rotate (somente lg+ e sem reduced motion)
    useEffect(() => {
        const mmLg = window.matchMedia("(min-width: 1024px)");
        const mmReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

        const canRun = () => mmLg.matches && !mmReduce.matches;

        if (!canRun()) return;

        const id = window.setInterval(() => {
            if (!canRun()) return;
            if (paused) return;
            if (Date.now() < pauseUntilRef.current) return;

            setActive((prev) => (prev + 1) % n);
        }, 4200);

        return () => window.clearInterval(id);
    }, [paused, n]);

    const activeItem = items[active];

    return (
        <section ref={wrap.ref} className="mt-12">
            <style>{`
        @keyframes clFadeUp {
          from { opacity: 0; transform: translateY(10px) scale(.985); filter: blur(1px); }
          to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .cl-fade-up { animation: clFadeUp .28s ease-out both; }
      `}</style>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 sm:p-8 md:rounded-none md:border-none md:bg-none">
                {/* título */}
                <div
                    className={cn(
                        "transition-all duration-700 ease-out will-change-transform",
                        wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    )}
                >
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                        O diferencial que o seu dia a dia precisa
                    </h2>
                    <p className="mt-2 max-w-2xl text-neutral-300">
                        Distribuição não é só preço, é prazo, padrão, suporte e consistência. Aqui você compra com segurança e recebe
                        exatamente o que precisa.
                    </p>
                </div>

                {/* DESKTOP: círculo */}
                <div className="mt-10 hidden lg:block">
                    <div
                        className="relative mx-auto aspect-square w-full max-w-[820px]"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* “órbita” */}
                        <div className="absolute inset-0 grid place-items-center">
                            <div className="relative h-[60%] w-[60%] rounded-full motion-reduce:animate-none animate-[spin_28s_linear_infinite]">
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,.18),transparent_60%)]" />
                                <div className="absolute inset-0 rounded-full border border-white/15 shadow-[0_0_0_10px_rgba(16,185,129,.06),0_0_80px_rgba(16,185,129,.12)]" />
                            </div>
                        </div>

                        {/* conteúdo do centro */}
                        <div className="absolute inset-0 grid place-items-center">
                            <div key={centerKey} className="w-[58%] text-center cl-fade-up">
                                <p className="text-xs font-extrabold tracking-[0.2em] text-emerald-200/80">
                                    DIFERENCIAL ATIVO
                                </p>

                                <p className="mt-3 text-2xl font-black tracking-tight text-white">
                                    {activeItem.title}
                                </p>

                                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                                    {activeItem.desc}
                                </p>

                                {/* dots + setas */}
                                <div
                                    className="mt-6 flex justify-center gap-2"
                                    role="tablist"
                                    aria-label="Selecionar diferencial"
                                    onKeyDown={(e) => {
                                        if (e.key === "ArrowRight") select((active + 1) % n);
                                        if (e.key === "ArrowLeft") select((active - 1 + n) % n);
                                    }}
                                >
                                    {items.map((it, idx) => {
                                        const isActive = idx === active;
                                        return (
                                            <button
                                                key={it.title}
                                                type="button"
                                                onClick={() => select(idx)}
                                                aria-label={`Selecionar: ${it.title}`}
                                                aria-pressed={isActive}
                                                className={cn(
                                                    "h-2.5 w-2.5 rounded-full transition",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70",
                                                    isActive ? "bg-emerald-400" : "bg-white/20 hover:bg-white/35"
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* itens ao redor */}
                        {items.map((it, idx) => {
                            const pos = points[idx];
                            const isActive = idx === active;

                            return (
                                <button
                                    key={it.title}
                                    type="button"
                                    onClick={() => select(idx)}
                                    style={pos}
                                    aria-label={it.title}
                                    aria-pressed={isActive}
                                    className={cn(
                                        "absolute -translate-x-1/2 -translate-y-1/2 group text-left",
                                        // clamp reduz a chance de “vazar” em telas lg menores
                                        "w-[clamp(180px,18vw,220px)]"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "flex items-center gap-3 rounded-2xl px-4 py-3",
                                            "ring-1 backdrop-blur transition",
                                            isActive
                                                ? "bg-emerald-500/15 ring-emerald-500/30 shadow-[0_0_0_6px_rgba(16,185,129,.08)]"
                                                : "bg-white/5 ring-white/10 hover:bg-white/10 hover:ring-white/20"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "h-2.5 w-2.5 rounded-full transition",
                                                isActive ? "bg-emerald-400" : "bg-white/35 group-hover:bg-white/60"
                                            )}
                                        />
                                        <div className="min-w-0">
                                            <p className="text-[12px] font-extrabold uppercase tracking-wide text-white">
                                                {it.title}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400 line-clamp-1">
                                                Clique para ver detalhes
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* MOBILE: lista clicável */}
                <div className="mt-8 lg:hidden space-y-3">
                    {items.map((it, idx) => {
                        const isOpen = mobileOpen === idx;
                        const isActive = active === idx;

                        return (
                            <button
                                key={it.title}
                                type="button"
                                onClick={() => {
                                    setMobileOpen(isOpen ? null : idx);
                                    if (!isOpen) setActive(idx);
                                }}
                                aria-expanded={isOpen}
                                className={cn(
                                    "w-full text-left rounded-3xl p-5 ring-1 backdrop-blur transition",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70",
                                    isOpen || isActive
                                        ? "bg-emerald-500/15 ring-emerald-500/30"
                                        : "bg-white/5 ring-white/10 hover:bg-white/10 hover:ring-white/20"
                                )}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="font-extrabold">{it.title}</p>
                                    <span
                                        className={cn(
                                            "h-2.5 w-2.5 rounded-full transition",
                                            isOpen ? "bg-emerald-400" : "bg-white/35"
                                        )}
                                    />
                                </div>

                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none",
                                        isOpen ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                                    )}
                                >
                                    <p className="text-sm text-neutral-300 leading-relaxed">{it.desc}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}