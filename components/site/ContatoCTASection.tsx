"use client";

import { useInView } from "@/components/site/useInView";

const WHATSAPP = "5547992866123"; // troque aqui

export default function ContatoCTASection() {
    const wrap = useInView<HTMLElement>();

    return (
        <section ref={wrap.ref} className="mt-14">
            <div
                className={[
                    "relative overflow-hidden rounded-3xl ring-1 ring-white/10",
                    "bg-emerald-950/20 p-7 sm:p-10",
                    "transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                {/* glow cinematográfico */}
                <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(16,185,129,.22),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/35 via-transparent to-transparent" />

                <div className="relative grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-center">
                    <div>
                        <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                            Vamos fechar seu orçamento?
                        </p>
                        <h3 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                            Me diga a linha, medidas e quantidade.
                        </h3>
                        <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl">
                            Resposta rápida com alternativas equivalentes quando necessário pra você não perder
                            tempo e manter a obra andando.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="/contato"
                                className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                            >
                                Ir para Contato →
                            </a>

                            <a
                                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                                    "Quero orçamento. Linha/Item: ____ | Medidas: ____ | Quantidade: ____ | Cidade: ____"
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                            >
                                Chamar no WhatsApp →
                            </a>
                        </div>
                    </div>

                    {/* mini card com “passo a passo” */}
                    <div className="relative">
                        <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-7">
                            <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                                Para agilizar
                            </p>

                            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                                <li className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                    Linha / modelo (ex: Suprema, Gold, Perfiles U)
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                    Medidas e quantidade (barras, metros, peças)
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                    Cidade e prazo desejado
                                </li>
                            </ul>

                            <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-400/25 via-white/10 to-transparent" />

                            <p className="mt-4 text-xs text-neutral-400">
                                Atendimento direto, sem burocracia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
