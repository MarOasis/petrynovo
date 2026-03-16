import Image from "next/image";

export default function SobreHero() {
    return (
        <section className="mt-10">
            <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                {/* glows + grain */}
                <div className="pointer-events-none absolute inset-0 cl-glow-emerald opacity-70" />
                <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.18]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-black/40" />

                <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
                    {/* texto */}
                    <div>
                        <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                            Sobre a PETRY
                        </p>

                        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                            Padrão, reposição e suporte para você comprar certo e entregar acabamento superior.
                        </h1>

                        <p className="mt-4 max-w-xl text-neutral-300 leading-relaxed">
                            Distribuição não é só preço: é compatibilidade entre peças, separação organizada e consistência no resultado.
                            A Petry trabalha com linhas reconhecidas e acessórios de alto giro para manter sua obra no ritmo.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="/contato"
                                className="rounded-2xl bg-emerald-400 px-5 py-3 font-extrabold text-black hover:brightness-110 transition"
                            >
                                Falar com a Petry →
                            </a>

                            <a
                                href="/produtos"
                                className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-3 font-extrabold text-white/85 hover:bg-white/10 transition"
                            >
                                Ver produtos →
                            </a>
                        </div>
                    </div>

                    {/* imagem */}
                    <div className="relative">
                        <div className="relative h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/30">
                            <Image
                                src="/banners/sobre/petr.jpeg"
                                alt="Petry Distribuidora"
                                fill
                                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                                sizes="(max-width: 1024px) 100vw, 520px"
                                priority
                            />
                            {/* overlay suave */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                            {/* etiqueta */}
                            <div className="absolute left-4 top-4 rounded-full bg-black/55 ring-1 ring-white/15 px-4 py-2 backdrop-blur">
                                <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-white/85">
                                    Alto giro • pronta entrega
                                </span>
                            </div>
                        </div>

                        {/* “metal shine” sutil */}
                        <div className="pointer-events-none absolute -inset-8 opacity-35 blur-2xl">
                            <div className="h-full w-full rounded-[48px] bg-gradient-to-tr from-emerald-400/20 via-white/10 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
