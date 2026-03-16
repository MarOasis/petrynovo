export default function SobreDestaques() {
    const cards = [
        {
            k: "PADRÃO DE MERCADO",
            t: "Compatibilidade real",
            d: "Linhas e acessórios escolhidos para encaixe, vedação e repetição de resultado — sem improviso na obra.",
        },
        {
            k: "GIRO & REPOSIÇÃO",
            t: "Estoque pensado no dia a dia",
            d: "Itens de alto giro priorizados para você não travar produção quando o cliente pede “mais 2 barras”.",
        },
        {
            k: "SUPORTE",
            t: "Atendimento que resolve",
            d: "Ajuda rápida na escolha da linha, equivalências e complementos — do orçamento à entrega.",
        },
    ];

    return (
        <section className="mt-10">
            <div className="grid gap-4 lg:grid-cols-3">
                {cards.map((c) => (
                    <div
                        key={c.t}
                        className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-7
                       shadow-[0_18px_60px_rgba(0,0,0,.35)]
                       transition hover:-translate-y-[2px] hover:bg-white/[0.07]"
                    >
                        <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                            {c.k}
                        </p>
                        <h3 className="mt-3 text-xl font-black tracking-tight">{c.t}</h3>
                        <p className="mt-2 text-neutral-300 leading-relaxed">{c.d}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
