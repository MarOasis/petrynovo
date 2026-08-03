"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useInView } from "@/components/site/useInView";
import { heroDisplay, heroMono } from "@/lib/fonts";
import {
    BARRA_METROS,
    TUBOS_QUADRADOS,
    TUBOS_REDONDOS,
    TUBOS_RETANGULARES,
} from "@/lib/tubos";
import TuboDiagramSVG from "@/components/site/linhas/TuboDiagramSVG";

const WHATSAPP = "5547992866123";

const SKYLINE_FLOOR_PX = 22;
const SKYLINE_MAX_PX = 100;

type Familia = "retangulares" | "quadrados" | "redondos";

type NormalizedTubo = {
    codigo: string;
    shape: "retangular" | "quadrado" | "redondo";
    a: number;
    b?: number;
    e: number;
    aPol?: string;
    bPol?: string;
    ePol?: string;
    kgPorMetro: number;
    kgPorBarra: number;
};

const FAMILIAS: { id: Familia; label: string; descricao: string }[] = [
    { id: "retangulares", label: "Retangulares", descricao: "retangular" },
    { id: "quadrados", label: "Quadrados", descricao: "quadrado" },
    { id: "redondos", label: "Redondos", descricao: "redondo" },
];

function normalize(familia: Familia): NormalizedTubo[] {
    if (familia === "retangulares") {
        return TUBOS_RETANGULARES.map((t) => ({
            codigo: t.codigo,
            shape: "retangular" as const,
            a: t.a_mm,
            b: t.b_mm,
            e: t.e_mm,
            aPol: t.a_pol,
            bPol: t.b_pol,
            ePol: t.e_pol,
            kgPorMetro: t.kgPorMetro,
            kgPorBarra: t.kgPorBarra,
        }));
    }
    if (familia === "quadrados") {
        return TUBOS_QUADRADOS.map((t) => ({
            codigo: t.codigo,
            shape: "quadrado" as const,
            a: t.lado_mm,
            b: t.lado_mm,
            e: t.e_mm,
            aPol: t.lado_pol,
            ePol: t.e_pol,
            kgPorMetro: t.kgPorMetro,
            kgPorBarra: t.kgPorBarra,
        }));
    }
    return TUBOS_REDONDOS.map((t) => ({
        codigo: t.codigo,
        shape: "redondo" as const,
        a: t.diametro_mm,
        e: t.e_mm,
        aPol: t.diametro_pol,
        ePol: t.e_pol,
        kgPorMetro: t.kgPorMetro,
        kgPorBarra: t.kgPorBarra,
    }));
}

function fmt(n: number) {
    return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0$/, "").replace(/\.$/, "");
}

// maior dimensão linear real (mm) — referência de escala do skyline
function maiorDimensao(t: NormalizedTubo) {
    return t.shape === "redondo" ? t.a : Math.max(t.a, t.b ?? t.a);
}

// raiz quadrada comprime a razão de tamanho entre a menor e a maior bitola,
// senão a menor vira um traço quase invisível ao lado da maior
function skylineSize(t: NormalizedTubo, maiorDaFamilia: number) {
    const dim = maiorDimensao(t);
    const norm = maiorDaFamilia > 0 ? Math.sqrt(dim / maiorDaFamilia) : 1;
    const maiorPx = SKYLINE_FLOOR_PX + norm * (SKYLINE_MAX_PX - SKYLINE_FLOOR_PX);
    const linScale = maiorPx / dim;
    const wallPx = Math.min(Math.max(t.e * linScale, 1.5), 6);

    if (t.shape === "redondo") {
        return { width: dim * linScale, height: dim * linScale, wallPx };
    }
    return { width: t.a * linScale, height: (t.b ?? t.a) * linScale, wallPx };
}

export default function TubosShowcase() {
    const wrap = useInView<HTMLElement>();
    const [familia, setFamilia] = useState<Familia>("retangulares");
    const [selectedIdx, setSelectedIdx] = useState(0);

    const familiaInfo = FAMILIAS.find((f) => f.id === familia)!;
    // ordenado por tamanho crescente — é o que cria o efeito skyline da esquerda pra direita
    const tubos = useMemo(
        () => normalize(familia).sort((a, b) => a.a - b.a),
        [familia]
    );
    const maiorDaFamilia = useMemo(
        () => (tubos.length ? Math.max(...tubos.map(maiorDimensao)) : 1),
        [tubos]
    );
    const selecionado = tubos[selectedIdx] ?? tubos[0];

    const selectFamilia = (f: Familia) => {
        setFamilia(f);
        setSelectedIdx(0);
    };

    const dimensaoTexto = !selecionado
        ? ""
        : selecionado.shape === "redondo"
            ? `Ø ${fmt(selecionado.a)} mm${selecionado.aPol ? ` (${selecionado.aPol}")` : ""} · parede ${fmt(selecionado.e)} mm`
            : `${fmt(selecionado.a)} × ${fmt(selecionado.b ?? selecionado.a)} mm${
                  selecionado.aPol ? ` (${selecionado.aPol}"${selecionado.bPol ? ` × ${selecionado.bPol}"` : ""})` : ""
              } · parede ${fmt(selecionado.e)} mm`;

    const waHref = selecionado
        ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
              `Quero saber mais sobre o tubo ${selecionado.codigo}`
          )}`
        : "";

    return (
        <section
            ref={wrap.ref}
            className={[
                heroDisplay.variable,
                heroMono.variable,
                "mt-14",
                "transition-all duration-700 ease-out",
                wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
        >
            <div className="relative overflow-hidden bg-hero-graphite ring-1 ring-hero-aluminum/15 p-6 sm:p-10">
                {/* cabeçalho */}
                <p className="font-mono-hero text-xs font-medium tracking-[0.22em] uppercase text-hero-brass">
                    Tubos · Tabela técnica
                </p>
                <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-hero-ivory">
                    Da bitola ao peso, sem sair do site
                </h2>
                <p className="mt-3 text-sm sm:text-base text-hero-ivory/70 max-w-2xl">
                    {tubos.length} medidas de tubo {familiaInfo.descricao}, com peso por metro pronto pra orçamento.
                </p>

                {/* abas de família */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {FAMILIAS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => selectFamilia(f.id)}
                            aria-pressed={familia === f.id}
                            className={[
                                "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition",
                                familia === f.id
                                    ? "bg-hero-brass text-hero-graphite"
                                    : "bg-white/5 text-hero-ivory/70 ring-1 ring-white/10 hover:bg-white/10",
                            ].join(" ")}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {selecionado ? (
                    <>
                        {/* skyline — todas as bitolas, escala real, alinhadas na base */}
                        <div className="tubos-skyline mt-8 flex flex-wrap items-end gap-4 pb-4">
                            {tubos.map((t, idx) => {
                                const active = idx === selectedIdx;
                                const { width, height, wallPx } = skylineSize(t, maiorDaFamilia);
                                return (
                                    <button
                                        key={t.codigo}
                                        type="button"
                                        onClick={() => setSelectedIdx(idx)}
                                        aria-pressed={active}
                                        aria-label={`Selecionar ${t.codigo}`}
                                        className={[
                                            "tubos-skyline-item flex flex-col items-center gap-2 bg-transparent border-0 cursor-pointer",
                                            active ? "is-active" : "",
                                        ].join(" ")}
                                    >
                                        <span
                                            className="tubos-skyline-shape block"
                                            style={{
                                                width: `${width}px`,
                                                height: `${height}px`,
                                                borderWidth: `${wallPx}px`,
                                                borderRadius: t.shape === "redondo" ? "50%" : "2px",
                                            }}
                                        />
                                        <span className="font-mono-hero text-[10.5px] tracking-wide text-hero-ivory/60 tubos-skyline-code">
                                            {t.codigo}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* painel de detalhe */}
                        <div className="mt-6 grid gap-6 sm:grid-cols-[220px_1fr] items-center rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-8">
                            <div className="mx-auto h-[200px] w-[200px]">
                                <TuboDiagramSVG
                                    shape={selecionado.shape}
                                    a={selecionado.a}
                                    b={selecionado.b}
                                    e={selecionado.e}
                                    maxA={selecionado.a}
                                    size={200}
                                    detailed
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="font-mono-hero text-lg font-medium text-hero-brass">{selecionado.codigo}</p>
                                <p className="mt-1 text-hero-ivory/85">{dimensaoTexto}</p>
                                <p className="font-mono-hero mt-3 text-sm text-hero-ivory/70">
                                    {selecionado.kgPorMetro} kg/m · {selecionado.kgPorBarra} kg/barra (barra de {BARRA_METROS}m)
                                </p>

                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-5 inline-flex items-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                                >
                                    Chamar no WhatsApp com essa medida →
                                </a>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-8 text-center">
                        <p className="text-hero-ivory/70">Em breve — medidas desta família em atualização.</p>
                    </div>
                )}

                {/* rodapé: catálogo completo */}
                <div className="mt-6 flex justify-end">
                    <Link
                        href="/produtos"
                        className="bg-transparent ring-1 ring-hero-brass/70 px-6 py-3 text-sm font-extrabold text-hero-brass hover:bg-hero-brass/10 transition"
                    >
                        Ver catálogo completo →
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .tubos-skyline {
                    border-bottom: 1px solid rgba(174, 180, 178, 0.15);
                }
                .tubos-skyline-shape {
                    background: linear-gradient(160deg, rgba(174, 180, 178, 0.4), rgba(174, 180, 178, 0.14));
                    border-style: solid;
                    border-color: #aeb4b2;
                    transition: border-color 0.18s ease, background 0.18s ease;
                }
                .tubos-skyline-item.is-active .tubos-skyline-shape {
                    border-color: #c9a961;
                    background: linear-gradient(160deg, rgba(201, 169, 97, 0.55), rgba(201, 169, 97, 0.2));
                }
                .tubos-skyline-code {
                    transition: color 0.18s ease;
                }
                .tubos-skyline-item.is-active .tubos-skyline-code {
                    color: #c9a961;
                }
            `}</style>
        </section>
    );
}
