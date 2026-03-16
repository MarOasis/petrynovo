"use client";

import { useInView } from "@/components/site/useInView";
import { useEffect, useMemo, useState } from "react";

type Quote = {
    bid: number;
    pctChange: number;
    varBid: number;
    high?: number;
    low?: number;
    timestamp?: number;
};

type Status = { aberto: boolean; label: string; hint: string };

function getStatusAgora(): Status {
    const now = new Date();
    const sp = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

    const day = sp.getDay(); // 0 dom .. 6 sáb
    const minutes = sp.getHours() * 60 + sp.getMinutes();

    // AJUSTE AQUI conforme seu horário real:
    // Seg–Qui: 07:00–17:45 | Sex: 07:00–12:00 | Sáb/Dom: fechado
    const segQui = minutes >= 7 * 60 && minutes <= (17 * 60 + 45);
    const sex = minutes >= 7 * 60 && minutes <= 12 * 60;

    const aberto =
        (day >= 1 && day <= 4 && segQui) ||
        (day === 5 && sex);

    return {
        aberto,
        label: aberto ? "Aberto agora" : "Fechado agora",
        hint: aberto ? "Atendimento em andamento" : "Fora do horário",
    };
}
function formatBRL(v: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

function Sparkline({ values }: { values: number[] }) {
    const points = useMemo(() => {
        if (values.length < 2) return "";
        const min = Math.min(...values);
        const max = Math.max(...values);
        const h = 40;
        const w = 100;
        const denom = max - min || 1;

        return values
            .map((v, idx) => {
                const x = (idx / (values.length - 1)) * w;
                const y = h - ((v - min) / denom) * h;
                return `${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(" ");
    }, [values]);

    return (
        <svg viewBox="0 0 100 40" className="h-10 w-full">
            <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={points}
                className="text-emerald-300/90"
            />
        </svg>
    );
}

function getOpenNow() {
    const now = new Date();
    const day = now.getDay(); // 0 dom, 6 sáb
    const minutes = now.getHours() * 60 + now.getMinutes();

    // Seg–Sex 08:00–18:00 | Sáb 08:00–12:00 | Dom fechado
    if (day >= 1 && day <= 5) return minutes >= 8 * 60 && minutes < 18 * 60;
    if (day === 6) return minutes >= 8 * 60 && minutes < 12 * 60;
    return false;
}

export default function InfoCards() {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [hist, setHist] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;

        async function load() {
            try {
                setError(null);
                const r = await fetch("/api/quotes/usdbrl");
                const j = await r.json();
                if (!r.ok) throw new Error(j?.error || "Falha ao buscar cotação");

                if (!alive) return;
                setQuote(j);

                setHist((prev) => {
                    const next = [...prev, Number(j.bid)].filter((x) => Number.isFinite(x));
                    return next.slice(-24); // guarda as últimas 24 leituras
                });
            } catch (e: any) {
                if (!alive) return;
                setError(e?.message || "Erro");
            }
        }

        load();
        const t = setInterval(load, 30_000); // “tempo real” (30s)
        return () => {
            alive = false;
            clearInterval(t);
        };
    }, []);

    const openNow = useMemo(() => getOpenNow(), []);
    const c1 = useInView<HTMLDivElement>();
    const c2 = useInView<HTMLDivElement>();
    const c3 = useInView<HTMLDivElement>();

    const isUp = (quote?.pctChange ?? 0) >= 0;

    return (
        <section className="mt-8">
            <div className="grid gap-4 lg:grid-cols-12">
                {/* Card 1 (lado esquerdo) */}
                <div
                    ref={c1.ref}
                    className={[
                        "lg:col-span-4 bg-white/5 ring-1 ring-white/10 backdrop-blur p-5",
                        "transition-all duration-700 ease-out will-change-transform",
                        c1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                        "hover:-translate-y-1 hover:bg-white/10 hover:ring-white/20",
                        "motion-reduce:transition-none motion-reduce:transform-none",
                    ].join(" ")}
                >
                    {/** status aberto/fechado */}
                    {(() => {
                        const [status, setStatus] = useState<Status | null>(null);

                        useEffect(() => {
                            const update = () => setStatus(getStatusAgora());
                            update();
                            const id = window.setInterval(update, 30_000);
                            return () => window.clearInterval(id);
                        }, []);

                        return (
                            <>
                                <div className="flex items-start justify-between gap-3">
                                    <p className="mt-3 text-2xl font-black tracking-tight">Atendimento</p>

                                    {status && (
                                        <span
                                            className={[
                                                "mt-3 shrink-0 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] uppercase",
                                                status.aberto
                                                    ? "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/25"
                                                    : "bg-white/10 text-white/70 ring-1 ring-white/15",
                                            ].join(" ")}
                                        >
                                            {status.label}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-3 space-y-2 text-sm text-neutral-300">
                                    <p className="leading-relaxed">
                                        <span className="inline-block whitespace-nowrap">
                                            <span className="text-neutral-100 font-semibold">Seg–Qui:</span> 07:00–17:45
                                        </span>
                                        <span className="mx-2 text-white/35">•</span>
                                        <span className="inline-block whitespace-nowrap">
                                            <span className="text-neutral-100 font-semibold">Sex:</span> 07:00–12:00
                                        </span>
                                        <span className="mx-2 text-white/35">•</span>
                                        <span className="inline-block whitespace-nowrap">
                                            <span className="text-neutral-100 font-semibold">Sáb/Dom:</span> Fechado
                                        </span>
                                    </p>

                                    {status && <p className="text-xs text-white/50">{status.hint}</p>}
                                </div>
                            </>
                        );
                    })()}
                </div>

                {/* Card 2 (centro, “mais destacado”) */}
                <div
                    ref={c2.ref}
                    className={[
                        "lg:col-span-4 lg:-translate-y-3 bg-white/5 ring-1 ring-white/10 backdrop-blur p-5",
                        "shadow-[0_0_0_1px_rgba(255,255,255,.06),0_20px_60px_rgba(0,0,0,.45)]",
                        "transition-all duration-700 ease-out will-change-transform delay-100",
                        c2.inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-7 scale-[0.98]",
                        "hover:-translate-y-1 hover:bg-white/10 hover:ring-white/20",
                        "motion-reduce:transition-none motion-reduce:transform-none",
                    ].join(" ")}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-300">Cotação do dólar (USD/BRL)</span>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/10 ring-1 ring-white/15">
                            ao vivo
                        </span>
                    </div>

                    <div className="mt-3 flex items-end justify-between gap-3">
                        <div>
                            <p className="text-4xl font-black tracking-tight">
                                {quote ? formatBRL(quote.bid) : "—"}
                            </p>
                            <p className={["mt-1 text-sm font-bold", isUp ? "text-emerald-300" : "text-red-300"].join(" ")}>
                                {error ? error : quote ? `${quote.pctChange.toFixed(2)}% (${quote.varBid.toFixed(4)})` : "Carregando..."}
                            </p>
                        </div>

                        <div className="w-32 text-emerald-300/90">
                            <Sparkline values={hist} />
                        </div>
                    </div>

                    <div className="mt-3 text-xs text-neutral-400 flex justify-between">
                        <span>Máx: {quote?.high ? formatBRL(quote.high) : "—"}</span>
                        <span>Mín: {quote?.low ? formatBRL(quote.low) : "—"}</span>
                    </div>
                </div>

                {/* Card 3 (lado direito) */}
                <div
                    ref={c3.ref}
                    className={[
                        "lg:col-span-4 bg-white/5 ring-1 ring-white/10 backdrop-blur p-5",
                        "transition-all duration-700 ease-out will-change-transform delay-200",
                        c3.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                        "hover:-translate-y-1 hover:bg-white/10 hover:ring-white/20",
                        "motion-reduce:transition-none motion-reduce:transform-none",
                    ].join(" ")}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-300">Atendimento rápido</span>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/25">
                            WhatsApp
                        </span>
                    </div>

                    <p className="mt-3 text-2xl font-black tracking-tight">Orçamento sem enrolação</p>
                    <p className="mt-2 text-sm text-neutral-300">
                        Envie sua lista (linha, medidas e quantidades) e a gente responde o mais rápido possível.
                    </p>

                    <a
                        href="https://wa.me/5547992866123"
                        target="_blank"
                        rel="noopener"
                        className="mt-4 inline-flex w-full justify-center rounded-2xl bg-emerald-500 px-5 py-3 font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                    >
                        Chamar no WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
