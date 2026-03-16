"use client";

const itens = [
    {
        t: "Compatibilidade",
        d: "Linha correta + acessórios compatíveis para encaixe, vedação e funcionamento previsíveis.",
    },
    {
        t: "Acabamento",
        d: "Resultado final mais limpo: menos adaptação, menos retrabalho, mais padrão na obra.",
    },
    {
        t: "Consistência",
        d: "Você consegue repetir o mesmo padrão em novos pedidos, reposições e ampliações.",
    },
];

export default function PadraoPremium() {
    return (
        <section className="mt-12">
            <div className="relative overflow-hidden rounded-3xl bg-neutral-950 ring-1 ring-white/10">
                {/* cinematic */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_15%,rgba(16,185,129,.18),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="relative px-6 py-10 sm:px-10 sm:py-12">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                                Padrão Premium Petry
                            </p>
                            <h3 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">
                                Comprar certo é o que dá “qualidade” no resultado final.
                            </h3>
                            <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-300">
                                Não é só material, é combinação. Perfil, roldana, vedação e fecho certos deixam a
                                esquadria leve, firme e com acabamento superior.
                            </p>
                        </div>

                        <div className="mt-4 lg:mt-0 flex gap-3">
                            <a
                                href="/catalogos"
                                className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                            >
                                Ver catálogos →
                            </a>
                            <a
                                href="/contato"
                                className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                            >
                                Pedir orçamento →
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {itens.map((x) => (
                            <div
                                key={x.t}
                                className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 sm:p-6"
                            >
                                <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                                    {x.t}
                                </p>
                                <p className="mt-2 text-lg font-black tracking-tight">{x.t}</p>
                                <p className="mt-2 text-sm text-neutral-300">{x.d}</p>

                                <div className="mt-5 h-px w-full bg-gradient-to-r from-emerald-400/25 via-white/10 to-transparent" />
                                <p className="mt-3 text-xs text-white/50">
                                    Petry • padrão que você repete
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
