"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "@/components/site/useInView";

const WHATSAPP = "5547992866123";

type Item = {
    id: string;
    title: string;
    subtitle?: string;
    category: "Perfis" | "Acessórios" | "Novidades";
    badge: "DESTAQUE" | "NOVO" | "CHEGOU";
    img: string; // ex: "/destaques/roldana.webp"
    tags: string[];
    href?: string; // opcional (ex: "/produtos#roldanas")
};

const itens: Item[] = [
    {
        id: "linha-suprema",
        title: "Linha Suprema",
        subtitle: "Perfis premium",
        category: "Perfis",
        badge: "DESTAQUE",
        img: "/banners/destaques/suprema.webp",
        tags: ["Preto", "Branco", "Amadeirado"],
    },
    {
        id: "linha-gold",
        title: "Linha Gold",
        subtitle: "Robusta e moderna",
        category: "Perfis",
        badge: "CHEGOU",
        img: "/banners/destaques/gold.webp",
        tags: ["Obra", "Esquadrias", "Durável"],
    },
    {
        id: "roldana-premium",
        title: "Roldana Premium",
        subtitle: "Deslizamento suave",
        category: "Acessórios",
        badge: "DESTAQUE",
        img: "/banners/destaques/roldana.webp",
        tags: ["Porta de correr", "Silencioso", "Durável"],
    },
    {
        id: "fechadura",
        title: "Fechaduras & Travas",
        subtitle: "Segurança e acabamento",
        category: "Acessórios",
        badge: "CHEGOU",
        img: "/banners/destaques/fechadura.webp",
        tags: ["Segurança", "Portas", "Compatível"],
    },
    {
        id: "amadeirado-novo",
        title: "Amadeirado Novo",
        subtitle: "Tonalidade exclusiva",
        category: "Novidades",
        badge: "NOVO",
        img: "/banners/destaques/amadeirado.webp",
        tags: ["Ripado", "Lambris", "Fachada"],
    },
];

function Pill({
    active,
    label,
    onClick,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "rounded-full px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] uppercase ring-1 transition",
                active
                    ? "bg-amber-400 text-neutral-950 ring-amber-200/40"
                    : "bg-white/5 text-white/75 ring-white/10 hover:bg-white/10 hover:ring-white/20",
            ].join(" ")}
        >
            {label}
        </button>
    );
}

function Badge({ text }: { text: Item["badge"] }) {
    const style =
        text === "NOVO"
            ? "bg-emerald-400 text-emerald-950"
            : text === "CHEGOU"
                ? "bg-amber-400 text-neutral-950"
                : "bg-white/15 text-white";

    return (
        <span
            className={[
                "rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] uppercase ring-1 ring-white/15",
                style,
            ].join(" ")}
        >
            {text}
        </span>
    );
}

export default function DestaquesSection() {
    const wrap = useInView<HTMLElement>();

    const [filter, setFilter] = useState<"Todos" | Item["category"]>("Todos");
    const [activeId, setActiveId] = useState(itens[0]?.id ?? "");

    const filtered = useMemo(() => {
        if (filter === "Todos") return itens;
        return itens.filter((i) => i.category === filter);
    }, [filter]);

    // destaque “dinâmico” simples (realça um card automaticamente)
    useEffect(() => {
        if (!filtered.length) return;
        let idx = Math.max(0, filtered.findIndex((x) => x.id === activeId));
        const t = setInterval(() => {
            idx = (idx + 1) % filtered.length;
            setActiveId(filtered[idx].id);
        }, 4500);
        return () => clearInterval(t);
    }, [filtered, activeId]);

    return (
        <section ref={wrap.ref} className="mt-12">
            <div
                className={[
                    "relative overflow-hidden rounded-[2rem] ring-1 ring-white/10 bg-white/5",
                    "transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                {/* fundo leve */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_12%_15%,rgba(16,185,129,.14),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_90%_10%,rgba(245,158,11,.10),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-transparent to-neutral-950/40" />

                <div className="relative p-6 sm:p-8">
                    {/* header */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-amber-600/80">
                                Destaques
                            </p>
                            <h3 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">
                                Perfis, acessórios e novidades
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm sm:text-base text-neutral-200/80">
                                Aqui você encontra perfis e acessórios que chegaram, linhas novas e acessórios mais pedidos.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Pill active={filter === "Todos"} label="Todos" onClick={() => setFilter("Todos")} />
                            <Pill active={filter === "Perfis"} label="Perfis" onClick={() => setFilter("Perfis")} />
                            <Pill active={filter === "Acessórios"} label="Acessórios" onClick={() => setFilter("Acessórios")} />
                            <Pill active={filter === "Novidades"} label="Novidades" onClick={() => setFilter("Novidades")} />
                        </div>
                    </div>

                    {/* cards */}
                    <div className="mt-6">
                        {/* mobile: carrossel simples */}
                        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:hidden">
                            {filtered.map((it) => (
                                <DestaqueCard
                                    key={it.id}
                                    it={it}
                                    active={it.id === activeId}
                                    onHover={() => setActiveId(it.id)}
                                />
                            ))}
                        </div>

                        {/* desktop: grid */}
                        <div className="hidden lg:grid gap-4 lg:grid-cols-3">
                            {filtered.map((it) => (
                                <DestaqueCard
                                    key={it.id}
                                    it={it}
                                    active={it.id === activeId}
                                    onHover={() => setActiveId(it.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* footer CTA */}
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl ring-1 ring-white/10 bg-neutral-950/25 p-5">
                        <p className="text-sm text-neutral-200/80">
                            Quer colocar um item aqui? É só trocar o array <b className="text-white/90">itens[]</b> e subir a imagem.
                        </p>

                        <a
                            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                                "Olá! Quero orçamento.\n• Item: ____\n• Linha/Modelo: ____\n• Cor: ____\n• Quantidade/Medidas: ____\n• Cidade: ____"
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-emerald-950 hover:bg-neutral-200 transition"
                        >
                            Pedir orçamento →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DestaqueCard({
    it,
    active,
    onHover,
}: {
    it: Item;
    active: boolean;
    onHover: () => void;
}) {
    const msg = encodeURIComponent(
        `Quero orçamento:\n• Item: ${it.title}${it.subtitle ? " - " + it.subtitle : ""}\n• Categoria: ${it.category
        }\n• Cor: ____\n• Quantidade/Medidas: ____\n• Cidade: ____`
    );

    const card = (
        <article
            onMouseEnter={onHover}
            className={[
                "snap-start min-w-[82%] sm:min-w-[60%] lg:min-w-0",
                "group relative overflow-hidden rounded-3xl ring-1 bg-white/5 transition",
                active
                    ? "ring-amber-300/40 bg-white/10"
                    : "ring-white/10 hover:ring-white/20 hover:bg-white/10",
            ].join(" ")}
        >
            {/* imagem pequena (card) */}
            <div className="relative h-[170px]">
                <Image
                    src={it.img}
                    alt={it.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 33vw"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/15 to-transparent" />
            </div>

            {/* conteúdo */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-white/60">
                            {it.category}
                        </p>
                        <h4 className="mt-1 text-xl font-black tracking-tight text-white/95">
                            {it.title}
                        </h4>
                        {it.subtitle ? (
                            <p className="mt-1 text-sm text-neutral-200/80">{it.subtitle}</p>
                        ) : null}
                    </div>
                    <Badge text={it.badge} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-full px-3 py-1 text-[12px] font-bold text-white/75 ring-1 ring-white/10 bg-white/5"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                    {it.href ? (
                        <a
                            href={it.href}
                            className="text-sm font-extrabold text-emerald-300 hover:text-emerald-200 transition"
                        >
                            Ver detalhes →
                        </a>
                    ) : (
                        <a
                            href="/produtos"
                            className="text-sm font-extrabold text-emerald-300 hover:text-emerald-200 transition"
                        >
                            Ver catálogo →
                        </a>
                    )}

                    <a
                        href={`https://wa.me/${WHATSAPP}?text=${msg}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-amber-400 px-4 py-2 text-xs font-extrabold text-emerald-950 hover:bg-neutral-200 transition"
                    >
                        Orçar →
                    </a>
                </div>
            </div>
        </article>
    );

    // se quiser o card clicável inteiro, você pode embrulhar com <a> (opcional)
    return card;
}