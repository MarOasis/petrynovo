"use client";

import Image from "next/image";

type Item = {
    name: string;
    tag: string;
    img: string; // /public...
    badge?: string; // ex: "ALTO GIRO", "LINHA PREMIUM"
};

export default function ProdutosVitrine({
    id,
    eyebrow,
    title,
    desc,
    items,
}: {
    id: string;
    eyebrow: string;
    title: string;
    desc: string;
    items: Item[];
}) {
    return (
        <section id={id} className="mt-14">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                        {eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-300">
                        {desc}
                    </p>
                </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it, idx) => {
                    const badge =
                        it.badge ??
                        (idx < 2 ? "" : idx < 4 ? "" : "");

                    return (
                        <article
                            key={it.name}
                            className={[
                                "group relative overflow-hidden rounded-3xl",
                                "bg-white/5 ring-1 ring-white/10 hover:ring-white/20",
                                "transition",
                            ].join(" ")}
                        >
                            {/* imagem */}
                            <div className="relative aspect-[16/10]">
                                <Image
                                    src={it.img}
                                    alt={it.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    className={[
                                        "object-cover",
                                        "opacity-90 group-hover:opacity-100 transition",
                                        "duration-700 ease-out",
                                        // ✅ zoom suave
                                        "scale-[1.01] group-hover:scale-[1.06]",
                                    ].join(" ")}
                                    priority={false}
                                />

                                {/* ✅ etiqueta / selo BAGDE QUANDO ATIVAR*/}
                                {/* <div className="absolute left-4 top-4">
                                    <span
                                        className={[
                                            "badgeShine relative overflow-hidden",
                                            "inline-flex items-center gap-2 rounded-full px-3 py-1",
                                            "bg-black/55 ring-1 ring-white/12 backdrop-blur",
                                            "text-[11px] font-extrabold tracking-[0.22em] uppercase text-white/90",
                                        ].join(" ")}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,.6)]" />
                                        {badge}
                                    </span>

                                </div> */}

                                {/* ✅ cinematic overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/15 to-neutral-950/5" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(700px_circle_at_30%_15%,rgba(16,185,129,.16),transparent_55%)]" />

                                {/* ✅ film grain (leve) */}
                                <div className="grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />
                            </div>

                            {/* conteúdo */}
                            <div className="relative p-5">
                                <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                                    {it.tag}
                                </p>
                                <h3 className="mt-2 text-lg font-black tracking-tight">
                                    {it.name}
                                </h3>

                                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-300">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                                    Separação conferida
                                    <span className="mx-2 h-1 w-1 rounded-full bg-white/25" />
                                    Padrão de linha
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <a
                    href="/contato"
                    className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                >
                    Pedir orçamento →
                </a>
                <a
                    href="/catalogos"
                    className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                >
                    Baixar catálogo →
                </a>
            </div>

            {/* ✅ CSS local: grain animado e leve */}
            <style jsx>{`
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          animation: grainMove 7s steps(10) infinite;
        }
        @keyframes grainMove {
          0% {
            transform: translate3d(0, 0, 0);
          }
          20% {
            transform: translate3d(-2%, 1%, 0);
          }
          40% {
            transform: translate3d(1%, -2%, 0);
          }
          60% {
            transform: translate3d(-1%, -1%, 0);
          }
          80% {
            transform: translate3d(2%, 1%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .badgeShine::after {
            content: "";
            position: absolute;
            inset: -40% -60%;
            background: linear-gradient(
                115deg,
                transparent 42%,
                rgba(255, 255, 255, 0.22) 50%,
                transparent 58%
            );
            transform: translateX(-35%);
            animation: badgeShine 2.8s ease-in-out infinite;
            }

            @keyframes badgeShine {
            0% { transform: translateX(-45%); opacity: 0; }
            25% { opacity: 1; }
            55% { transform: translateX(45%); opacity: 1; }
            100% { transform: translateX(45%); opacity: 0; }
            }

            @media (prefers-reduced-motion: reduce) {
            .badgeShine::after {
                animation: none;
                opacity: 0;
            }
            }

      `}</style>
        </section>
    );
}
