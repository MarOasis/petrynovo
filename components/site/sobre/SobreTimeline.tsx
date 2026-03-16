"use client";

import Image from "next/image";
import { useInView } from "@/components/site/useInView";

type Item = {
    year: string;
    title: string;
    text: string;
    img: string;
};

const items: Item[] = [
    { year: "1975", title: "Início do legado", text: "Fundação da serraria da família Petry, base do padrão e do detalhe.", img: "/banners/sobre/pp.webp" },
    { year: "1982", title: "Especialização", text: "Primeiras esquadrias em madeira: técnica, medida e acabamento.", img: "/banners/sobre/pp2.webp" },
    { year: "2004", title: "Transição para alumínio", text: "Evolução para atender escala e compatibilidade com consistência.", img: "/banners/sobre/pp3.webp" },
    { year: "2013", title: "Processos e repetição", text: "Organização, separação e reposição: distribuição que mantém a obra no ritmo.", img: "/banners/sobre/pp4.webp" },
    { year: "2015", title: "Mais estrutura", text: "Crescimento com controle e melhoria de atendimento e logística.", img: "/banners/sobre/pp5.webp" },
    { year: "HOJE", title: "Petry Distribuidora", text: "Linhas, perfis e acessórios — variedade real e padrão de mercado.", img: "/banners/sobre/pp6.jpeg" },
];

function TimelineCard({ it, flip }: { it: Item; flip?: boolean }) {
    const v = useInView<HTMLDivElement>();

    return (
        <div
            ref={v.ref}
            className={[
                "relative grid gap-6 lg:gap-10",
                "lg:grid-cols-2 lg:items-center",
                flip ? "lg:[&>div:first-child]:order-2" : "",
                v.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                "transition-all duration-700 ease-out",
            ].join(" ")}
        >
            {/* imagem */}
            <div className="relative">
                <div className="relative h-[240px] sm:h-[320px] overflow-hidden rounded-3xl ring-1 ring-black/10 bg-black/5">
                    <Image
                        src={it.img}
                        alt={`${it.year} - ${it.title}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 520px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
            </div>

            {/* texto */}
            <div className="relative">
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-400">
                    {it.year}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{it.title}</h3>
                <p className="mt-3 text-neutral-300 leading-relaxed max-w-xl">{it.text}</p>

                <div className="mt-5 h-px w-24 bg-gradient-to-r from-emerald-400/70 to-transparent" />
            </div>
        </div>
    );
}

export default function SobreTimeline() {
    return (
        <section className="mt-14">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <div className="px-6 sm:px-10 pt-10">
                    <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                        Nossa história
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                        Evolução com padrão do início até a distribuidora.
                    </h2>
                    <p className="mt-3 max-w-3xl text-neutral-300">
                        Uma trajetória construída em processo, compatibilidade e consistência — para você comprar com segurança.
                    </p>
                </div>

                {/* linha e “bolinha” simples */}
                <div className="relative px-6 sm:px-10 pb-10 pt-10">
                    <div className="pointer-events-none absolute left-7 sm:left-12 top-10 bottom-10 w-px bg-gradient-to-b from-emerald-400/60 via-white/10 to-transparent" />
                    <div className="pointer-events-none absolute left-[22px] sm:left-[44px] top-10 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_8px_rgba(16,185,129,.10)]" />

                    <div className="space-y-14 sm:space-y-20">
                        {items.map((it, idx) => (
                            <div key={it.year + idx} className="relative pl-6 sm:pl-10">
                                {/* dot do item */}
                                <div className="absolute left-[22px] sm:left-[44px] top-2 h-2.5 w-2.5 rounded-full bg-emerald-300/90 ring-1 ring-white/30" />
                                <TimelineCard it={it} flip={idx % 2 === 1} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
