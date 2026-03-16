"use client";

import Image from "next/image";
import { useInView } from "@/components/site/useInView";

const WHATSAPP = "5547992866123";

export default function VisaoGeralSection() {
    const wrap = useInView<HTMLElement>();

    return (
        <section ref={wrap.ref} className="mt-14">
            {/* header central */}
            <div
                className={[
                    "text-center transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                    Visão geral
                </p>
                <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
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
                        "relative overflow-hidden  ring-1 ring-white/10 bg-white/5",
                        "transition-all duration-700 ease-out",
                        wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                    ].join(" ")}
                    style={{ transitionDelay: "120ms" }}
                >
                    <div className="relative h-[260px] sm:h-[320px] lg:h-full min-h-[360px]">
                        <Image
                            src="/banners/empresa/petr.jpeg"
                            alt="Nossa estrutura"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />

                        {/* overlays sofisticados */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />
                        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(800px_circle_at_30%_20%,rgba(16,185,129,.20),transparent_40%)]" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                            <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-emerald-200/80">
                                Estrutura & Estoque
                            </p>
                            <p className="mt-2 text-2xl font-black text-white/95">
                                Giro alto + separação organizada
                            </p>
                            <p className="mt-2 text-sm text-neutral-200/85 max-w-xl">
                                Itens-chave priorizados no estoque, conferência e identificação para reduzir erro
                                e acelerar o recebimento.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <a
                                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                                        "Quero orçamento. Minha aplicação é: ____ | Linha/Item: ____ | Medidas: ____ | Quantidade: ____"
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                                >
                                    Orçar no WhatsApp →
                                </a>
                                <a
                                    href="/catalogos"
                                    className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                                >
                                    Ver catálogo →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* cards 3 (modelo do print, mais premium) */}
                <div className="grid gap-5">
                    {[
                        {
                            title: "NOSSA VISÃO",
                            text:
                                "Ser a referência em distribuição de alumínio e acessórios: com padrão, previsibilidade e suporte técnico para o cliente comprar certo.",
                        },
                        {
                            title: "COMPROMISSO COM O PADRÃO",
                            text:
                                "Selecionamos linhas e itens pelo que funciona na prática: compatibilidade, vedação, resistência e repetição de resultado na obra.",
                        },
                        {
                            title: "QUEM ATENDEMOS",
                            text:
                                "Serralheiros, vidraceiros, esquadrias, construtoras e indústria — com soluções completas para estruturas, fachadas e projetos sob medida.",
                        },
                    ].map((c, idx) => (
                        <article

                            key={c.title}
                            className={[
                                " bg-emerald-950/35 ring-1 ring-emerald-400/10 p-7 sm:p-8",
                                "transition-all duration-700 ease-out",
                                wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                            ].join(" ")}
                            style={{ transitionDelay: `${180 + idx * 90}ms` }}
                        >
                            <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-emerald-200/80">
                                {c.title}
                            </p>
                            <p className="mt-3 text-base sm:text-lg text-neutral-100/90 leading-relaxed">
                                {c.text}
                            </p>

                            <div className="mt-5 h-px w-full bg-gradient-to-r from-emerald-400/30 via-white/10 to-transparent" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
