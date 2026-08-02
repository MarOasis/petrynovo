"use client";

import { useInView } from "@/components/site/useInView";
import { getStatusLojaAgora, type StatusLoja } from "@/lib/horarios";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "5547992866123";

function IconWhatsApp({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M19.11 17.44c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.4-1.68-1.56-1.96-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36s1.01 2.74 1.15 2.93c.14.19 2 3.05 4.84 4.27.68.29 1.21.46 1.62.59.68.22 1.31.19 1.8.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16 3C8.83 3 3 8.83 3 16c0 2.28.61 4.51 1.77 6.48L3 29l6.7-1.74A12.94 12.94 0 0016 29c7.17 0 13-5.83 13-13S23.17 3 16 3zm0 23.5c-2.02 0-3.99-.54-5.7-1.57l-.41-.24-3.98 1.04 1.06-3.88-.27-.4A10.43 10.43 0 015.5 16C5.5 10.21 10.21 5.5 16 5.5S26.5 10.21 26.5 16 21.79 26.5 16 26.5z" />
        </svg>
    );
}

export default function InfoCards() {
    const [status, setStatus] = useState<StatusLoja | null>(null);

    useEffect(() => {
        const update = () => setStatus(getStatusLojaAgora());
        update();

        const id = window.setInterval(update, 30000);
        return () => window.clearInterval(id);
    }, []);

    const c1 = useInView<HTMLDivElement>();
    const c2 = useInView<HTMLDivElement>();

    const aberto = status?.aberto ?? false;

    return (
        <section className="mt-8">
            <div className="grid items-stretch gap-5 lg:grid-cols-5">
                {/* Painel: status ao vivo + horários */}
                <div
                    ref={c1.ref}
                    className={[
                        "cl-metal lg:col-span-2 rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-6",
                        "transition-all duration-700 ease-out will-change-transform",
                        c1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                        "motion-reduce:transition-none motion-reduce:transform-none",
                    ].join(" ")}
                >
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                            Atendimento
                        </p>

                        <span
                            className={[
                                "inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] ring-1",
                                aberto
                                    ? "bg-emerald-400/15 text-emerald-200 ring-emerald-400/25"
                                    : "bg-white/10 text-white/60 ring-white/15",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "h-2 w-2 rounded-full",
                                    aberto ? "bg-emerald-400 cl-glow-pulse" : "bg-white/40",
                                ].join(" ")}
                            />
                            {status ? status.label : "Consultando…"}
                        </span>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                        <div className="grid grid-cols-1 gap-1 border-b border-white/10 px-4 py-3 sm:grid-cols-[92px_1fr] sm:items-center sm:gap-3">
                            <span className="text-sm font-semibold text-neutral-100">Seg–Qui</span>
                            <span className="text-sm text-neutral-300 sm:text-right">
                                07:00–12:00 <span className="text-white/30">•</span> 13:00–17:45
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-1 border-b border-white/10 px-4 py-3 sm:grid-cols-[92px_1fr] sm:items-center sm:gap-3">
                            <span className="text-sm font-semibold text-neutral-100">Sex</span>
                            <span className="text-sm text-neutral-300 sm:text-right">07:00–12:00</span>
                        </div>

                        <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[92px_1fr] sm:items-center sm:gap-3">
                            <span className="text-sm font-semibold text-neutral-100">Sáb/Dom</span>
                            <span className="text-sm text-neutral-300 sm:text-right">Fechado</span>
                        </div>
                    </div>

                    {status && <p className="mt-3 text-xs text-white/50">{status.hint}</p>}
                </div>

                {/* Painel: CTA WhatsApp */}
                <div
                    ref={c2.ref}
                    className={[
                        "relative overflow-hidden lg:col-span-3 rounded-3xl",
                        "border border-white/10 bg-white/[0.06] backdrop-blur-xl p-6 md:p-8",
                        "shadow-[0_0_0_1px_rgba(255,255,255,.04),0_20px_70px_rgba(0,0,0,.45)]",
                        "transition-all duration-700 ease-out will-change-transform delay-100",
                        c2.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                        "motion-reduce:transition-none motion-reduce:transform-none",
                    ].join(" ")}
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,.10),transparent_28%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    <div className="relative z-10 flex h-full flex-col justify-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-300/20">
                                <IconWhatsApp className="h-6 w-6" />
                            </span>

                            <div>
                                <p className="text-2xl font-black tracking-tight text-white">
                                    Fale agora no WhatsApp
                                </p>
                                <p className="mt-2 max-w-md text-sm text-neutral-300">
                                    Envie sua lista de produtos e quantidades a gente responde o mais breve possível, sem burocracia.
                                </p>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-center font-extrabold text-neutral-950 transition hover:bg-emerald-400"
                        >
                            Chamar no WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
