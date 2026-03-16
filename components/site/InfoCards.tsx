"use client";

import { useInView } from "@/components/site/useInView";
import { useEffect, useMemo, useState } from "react";

type Quote = {
  bid: number;
  source?: string;
  lastUpdatedAt?: string | null;
  pctChange?: number | null;
  varBid?: number | null;
  high?: number | null;
  low?: number | null;
  timestamp?: number | null;
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
    
    const safePctChange = typeof quote?.pctChange === "number" ? quote.pctChange : null;
    const safeVarBid = typeof quote?.varBid === "number" ? quote.varBid : null;
    const safeHigh = typeof quote?.high === "number" ? quote.high : null;
    const safeLow = typeof quote?.low === "number" ? quote.low : null;

const statusText = error
  ? error
  : quote
    ? safePctChange !== null && safeVarBid !== null
      ? `${safePctChange.toFixed(2)}% (${safeVarBid.toFixed(4)})`
      : quote.lastUpdatedAt
        ? `Atualizado em ${new Date(quote.lastUpdatedAt).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}`
        : "Cotação carregada"
    : "Carregando cotação...";

const statusColor = error
  ? "text-red-300"
  : safePctChange !== null
    ? safePctChange >= 0
      ? "text-emerald-300"
      : "text-red-300"
    : "text-cyan-300";

const badgeText = error ? "indisponível" : quote ? "online" : "carregando";
const badgeClass = error
  ? "bg-red-500/10 text-red-300 ring-red-400/20"
  : quote
    ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20"
    : "bg-white/10 text-neutral-200 ring-white/15";

const sourceLabel =
  quote?.source === "currencyapi"
    ? "API"
    : quote?.source
      ? quote.source
      : "Mercado";

const updatedHour = quote?.lastUpdatedAt
  ? new Date(quote.lastUpdatedAt).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "—";

const trendLabel =
  safePctChange !== null
    ? safePctChange >= 0
      ? "Alta do dia"
      : "Queda do dia"
    : "Última leitura";

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
    "relative overflow-hidden rounded-[28px] lg:col-span-4 lg:-translate-y-3",
    "border border-white/10 bg-white/[0.06] backdrop-blur-xl p-5 md:p-6",
    "shadow-[0_0_0_1px_rgba(255,255,255,.04),0_20px_70px_rgba(0,0,0,.45)]",
    "transition-all duration-700 ease-out will-change-transform delay-100",
    c2.inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-7 scale-[0.98]",
    "hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/15",
    "motion-reduce:transition-none motion-reduce:transform-none",
  ].join(" ")}
>
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_24%)]" />
  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

  <div className="relative z-10 flex items-start justify-between gap-4">
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
        Cotação do dólar
      </p>
      <h3 className="mt-1 text-sm font-medium text-neutral-200">
        USD / BRL
      </h3>
    </div>

    <span
      className={[
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ring-1",
        badgeClass,
      ].join(" ")}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-90" />
      {badgeText}
    </span>
  </div>

  <div className="relative z-10 mt-6 flex items-end justify-between gap-4">
    <div className="min-w-0">
      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
        Valor atual
      </p>

      <p className="mt-2 text-4xl md:text-5xl font-black tracking-tight text-white">
        {quote ? formatBRL(quote.bid) : "—"}
      </p>

      <p className={["mt-3 text-sm font-semibold", statusColor].join(" ")}>
        {statusText}
      </p>
    </div>

    <div className="w-28 md:w-36 shrink-0 rounded-2xl border border-white/10 bg-black/20 p-2">
      <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-2">
        Tendência
      </div>
      <div className="text-emerald-300/90">
        <Sparkline values={hist} />
      </div>
    </div>
  </div>

  <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
    <div className="rounded-2xl border border-white/8 bg-black/20 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
        Fonte
      </p>
      <p className="mt-1 font-semibold text-neutral-200">
        {sourceLabel}
      </p>
    </div>

    <div className="rounded-2xl border border-white/8 bg-black/20 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
        Horário
      </p>
      <p className="mt-1 font-semibold text-neutral-200">
        {updatedHour}
      </p>
    </div>

    <div className="rounded-2xl border border-white/8 bg-black/20 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
        Máxima
      </p>
      <p className="mt-1 font-semibold text-neutral-200">
        {safeHigh !== null ? formatBRL(safeHigh) : "—"}
      </p>
    </div>

    <div className="rounded-2xl border border-white/8 bg-black/20 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
        Mínima
      </p>
      <p className="mt-1 font-semibold text-neutral-200">
        {safeLow !== null ? formatBRL(safeLow) : "—"}
      </p>
    </div>
  </div>

  <div className="relative z-10 mt-4 flex items-center justify-between text-[11px] text-neutral-500">
    <span>{trendLabel}</span>
    <span className="truncate">
      {quote?.lastUpdatedAt
        ? `Leitura registrada em ${new Date(quote.lastUpdatedAt).toLocaleDateString("pt-BR")}`
        : "Sem registro de atualização"}
    </span>
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
