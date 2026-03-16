export default function LinhasPage() {
    // ===== LINHAS / SISTEMAS =====
    const linhas = [
        "Linha Portas 25/32/42",
        "Linha Suprema",
        "Linha Suprema / Maxim-ar",
        "Linha Gold",
        "Linha Gold / Maxim-ar",
        "Trilho Modular / Gold",
        "Trilhos Únicos",
        "Box Temperado",
        "Temperados 8mm",
        "Temperados 10mm",
        "Pele de Vidro",
        "Pele de Vidro PVII",
        "Brises",
        "Cercas e Portões",
        "Lambris",
        "Ripados",
        "Venezianas",
        "Policarbonato",
        "Gradil",
        "Fachada Cortina",
        "Diversos",
        "Perfetta 35",
        "Perfetta 40 - Porta Camarão",
        "Perfetta 45",
        "Perfetta 45 - Bicolor",
        "Perfetta 45 - Oscilo Batente",
        "Perfetta 45 - Maxin-ar e Fixo",
        "Perfetta 45 - Porta de Giro",
        "Perfetta 45 - Pivotante",
        "Perfetta 55",
        "Perfetta 75",
        "Perfetta - Integrada",
        "Perfetta - Complementos",
        "Perfetta Minimalista",
        "Vidro | Baguete | Gaxeta",
        "Conexões",
    ];

    // ===== PERFIS =====
    const perfis = [
        "Perfis ‘U’",
        "Cantoneiras",
        "Barras Chatas",
        "Tubos Redondos",
        "Tubos Quadrados",
        "Tubos Retangulares",
        "Contramarcos e Conexões",
        "Arremates",
    ];

    // ===== ACESSÓRIOS =====
    const acessorios = [
        "Ferragens para Temperado",
        "Chumbadores",
        "Conexão Allen / Pressão / Plástico / Esquadro",
        "Conexão 'L' / 'U'",
        "Pele de Vidro (componentes)",
        "Borrachas",
        "Fita Vedação / Adesiva",
        "Fita Espuma Adesiva (EVA / PVC)",
        "Puxadores",
        "Kit Cremona (Suprema / Gold / INT / EXT / Embutir)",
        "Dobradiças (Sobrepor / Encaixe / Borboleta / Pivô)",
        "Portão / Batente / Ancoragem / Alavanca",
        "Fecho (Concha / Unha / Caracol)",
        "Fechaduras",
        "Integrada (acessórios e complementos)",
        "Tampas / Tapa Furo / Presilha / Arremate",
        "Parafusos / Rebites / Buchas / Arruelas",
        "Sapata / Terminal / Suporte / Espera",
        "Roldana com Cavalete",
        "Silicone / Adesivos / Aplicações / Fitas / Estopas",
        "Ferrolhos / Tranquetas / Fecho Avião",
        "Veda Porta / Tela Mosquiteira / Tarugo / Stretch",
    ];

    // marquee cinematic (duplica pra loop)
    const marquee = [...linhas.slice(0, 18), ...linhas.slice(0, 18)];

    return (
        <main className="pb-16 overflow-x-hidden">
            <div className="">
                {/* HERO */}
                <section className="mt-10">
                    <div className="relative overflow-hidden rounded-3xl bg-neutral-950 ring-1 ring-white/10">
                        <div className="pointer-events-none absolute inset-0 cl-hero-glow" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay cl-grain" />

                        <div className="relative px-6 py-10 sm:px-10 sm:py-12">
                            <p className="text-xs font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                                Alumínios e Acessórios
                            </p>    

                            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
                                Qualidade e variedade real.
                            </h1>

                            <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-300">
                                A qualidade está no conjunto: compatibilidade, acabamento e reposição. Aqui você encontra
                                linhas reconhecidas, perfis estruturais e uma variedade forte de acessórios para fechar a obra
                                com padrão sem improviso.
                            </p>

                            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                <MiniStat title="Padrão de mercado" text="Acabamento consistente e compatibilidade entre peças." />
                                <MiniStat title="Variedade completa" text="Do estrutural ao premium: linhas, sistemas e acabamentos." />
                                <MiniStat title="Acessórios de alto giro" text="Vedação, ferragens, fixação e consumíveis para montar certo." />
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href="/contato"
                                    className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                                >
                                    Falar com a Petry →
                                </a>
                                <a
                                    href="/catalogos"
                                    className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                                >
                                    Ver catálogos →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MARQUEE */}
                <section className="mt-6">
                    <div className="relative overflow-hidden rounded-3xl bg-black/5 ring-1 ring-black/10">
                        <div className="pointer-events-none absolute inset-0 cl-glow-emerald" />
                        <div className="relative py-3 cl-marquee">
                            <div className="cl-marquee-track flex gap-3 whitespace-nowrap px-4">
                                {marquee.map((t, i) => (
                                    <span
                                        key={`${t}-${i}`}
                                        className="inline-flex items-center rounded-full bg-black/40 ring-1 ring-white/10 px-4 py-2 text-[11px] font-extrabold tracking-[0.26em] uppercase text-white/80"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PERFIS */}
                <Block
                    kicker="Perfis"
                    title="Estrutural e base do projeto"
                    desc="Perfis com aplicação direta no dia a dia: corte limpo, montagem previsível e padrão na entrega."
                    items={perfis}
                    tone="emerald"
                />

                {/* LINHAS */}
                <Block
                    kicker="Linhas"
                    title="Sistemas e soluções completas"
                    desc="Linhas reconhecidas (do tradicional ao premium) para portas, janelas, fachadas e acabamentos."
                    items={linhas}
                    tone="neutral"
                />

                {/* ACESSÓRIOS */}
                <Block
                    kicker="Acessórios"
                    title="O detalhe que fecha o conjunto"
                    desc="Vedação, ferragens, fixação e consumíveis, o suficiente para montar com padrão e repor com rapidez."
                    items={acessorios}
                    tone="emerald"
                />

                {/* FINAL */}
                <section className="mt-10">
                    <div className="rounded-3xl bg-neutral-950 ring-1 ring-white/10 p-7 sm:p-10">
                        <p className="text-xs font-extrabold tracking-[0.26em] uppercase text-white/55">
                            Compromisso Petry
                        </p>
                        <h2 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">
                            Mais do que vender alumínio: entregar segurança na compra.
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-300">
                            Se bater dúvida entre linhas, medidas, vedação ou compatibilidade, a gente orienta e indica o conjunto correto
                            com alternativas equivalentes quando fizer sentido.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="/contato"
                                className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                            >
                                WhatsApp e orçamento →
                            </a>
                            <a
                                href="/catalogos"
                                className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                            >
                                Baixar catálogos →
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function Block({
    kicker,
    title,
    desc,
    items,
    tone,
}: {
    kicker: string;
    title: string;
    desc: string;
    items: string[];
    tone: "emerald" | "neutral";
}) {
    const ring = tone === "emerald" ? "ring-emerald-300/20" : "ring-white/10";
    const glow = tone === "emerald" ? "cl-glow-emerald" : "cl-glow-neutral";

    return (
        <section className="mt-10">
            <p className="text-xs font-extrabold tracking-[0.26em] uppercase text-white/55">
                {kicker}
            </p>
            <h2 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">
                {title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-neutral-300">
                {desc}
            </p>

            <div className={`mt-6 relative overflow-hidden rounded-3xl bg-emerald-950 ring-1 ${ring}`}>
                <div className={`pointer-events-none absolute inset-0 ${glow}`} />
                <div className="p-6 sm:p-8">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((name) => (
                            <div
                                key={name}
                                className="cl-metal rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-4 hover:bg-[#000]  transition"
                            >
                                <p className="relative text-sm sm:text-[15px] font-black tracking-tight text-white">
                                    {name}
                                </p>
                                <p className="relative mt-1 text-[11px] font-extrabold tracking-[0.26em] uppercase text-white/45">
                                    padrão • estoque • compatível
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function MiniStat({ title, text }: { title: string; text: string }) {
    return (
        <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
            <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                {title}
            </p>
            <p className="mt-2 text-sm text-neutral-300">{text}</p>
        </div>
    );
}
