"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "@/components/site/useInView";
import { heroDisplay, heroMono } from "@/lib/fonts";
import { CATEGORIAS, LINHAS, type Categoria } from "@/lib/linhas";

const MOSAICO = [
    "/banners/produtos/cantoneiras.png",
    "/banners/produtos/roldanas.png",
    "/banners/produtos/conexoes.png",
    "/banners/produtos/Temperados.png",
    "/banners/produtos/TR.png",
    "/banners/produtos/vedacoes.png",
];

const isHighlight = (nome: string) =>
    nome.includes("Gold") ||
    nome.includes("Suprema") ||
    nome.includes("Perfetta 45") ||
    nome.includes("Pele de Vidro");

export default function LinhasSection() {
    const wrap = useInView<HTMLElement>();
    const [categoria, setCategoria] = useState<Categoria | "Todas">("Todas");
    const [query, setQuery] = useState("");

    const linhasFiltradas = useMemo(() => {
        const q = query.trim().toLowerCase();
        return LINHAS.filter((l) => {
            const matchCategoria = categoria === "Todas" || l.categoria === categoria;
            const matchQuery = q === "" || l.nome.toLowerCase().includes(q);
            return matchCategoria && matchQuery;
        });
    }, [categoria, query]);

    return (
        <section
            ref={wrap.ref}
            className={[heroDisplay.variable, heroMono.variable, "mt-12"].join(" ")}
        >
            <div
                className={[
                    "relative overflow-hidden bg-hero-graphite ring-1 ring-hero-aluminum/15",
                    "transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                {/* cabeçalho com mosaico de fotos reais atrás */}
                <div className="relative overflow-hidden p-8 sm:p-10">
                    <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-6 opacity-20">
                        {MOSAICO.map((src) => (
                            <div key={src} className="relative aspect-square">
                                <Image
                                    src={src}
                                    alt=""
                                    fill
                                    className="object-cover grayscale"
                                    sizes="16vw"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-hero-graphite/85" />

                    <div className="relative">
                        <p className="font-mono-hero text-xs font-medium tracking-[0.22em] uppercase text-hero-brass">
                            Catálogo de linhas
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-hero-ivory">
                            {LINHAS.length} linhas. Uma distribuidora só.
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-hero-ivory/70 max-w-2xl">
                            Da esquadria ao acabamento, sem trocar de fornecedor.
                        </p>
                    </div>
                </div>

                {/* filtros: categorias + busca */}
                <div className="relative flex flex-col gap-4 border-t border-hero-aluminum/15 p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setCategoria("Todas")}
                            aria-pressed={categoria === "Todas"}
                            className={[
                                "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition",
                                categoria === "Todas"
                                    ? "bg-hero-brass text-hero-graphite"
                                    : "bg-white/5 text-hero-ivory/70 ring-1 ring-white/10 hover:bg-white/10",
                            ].join(" ")}
                        >
                            Todas
                        </button>
                        {CATEGORIAS.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => setCategoria(c.id)}
                                aria-pressed={categoria === c.id}
                                className={[
                                    "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition",
                                    categoria === c.id
                                        ? "bg-hero-brass text-hero-graphite"
                                        : "bg-white/5 text-hero-ivory/70 ring-1 ring-white/10 hover:bg-white/10",
                                ].join(" ")}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    <label className="relative w-full sm:w-64">
                        <span className="sr-only">Buscar linha</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar linha..."
                            className="w-full rounded-full bg-white/5 px-4 py-2 text-sm text-hero-ivory placeholder:text-hero-ivory/40 ring-1 ring-white/10 outline-none focus:ring-hero-brass/60 transition"
                        />
                    </label>
                </div>

                {/* grid de pills filtrável */}
                <div className="relative border-t border-hero-aluminum/15 p-6 sm:p-8">
                    {linhasFiltradas.length === 0 ? (
                        <p className="text-sm text-hero-ivory/60">
                            Nenhuma linha encontrada para essa busca.
                        </p>
                    ) : (
                        <motion.div layout className="flex flex-wrap gap-3">
                            <AnimatePresence initial={false}>
                                {linhasFiltradas.map((l) => (
                                    <motion.span
                                        key={l.nome}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.18 }}
                                        className={["cl-pill", isHighlight(l.nome) ? "cl-pill--hi" : ""].join(" ")}
                                    >
                                        {l.nome}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
