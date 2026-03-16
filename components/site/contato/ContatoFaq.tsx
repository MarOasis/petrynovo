const faqs = [
    {
        q: "Como agilizar o orçamento?",
        a: "Envie: linha (ex: Suprema/Gold), medida/quantidade e se precisa acessórios (roldanas, vedações, fechaduras).",
    },
    {
        q: "Vocês ajudam a escolher a linha?",
        a: "Sim. Indicamos a linha ideal conforme tipo de projeto (porta, janela, fachada, box, etc.).",
    },
    {
        q: "Tem retirada rápida?",
        a: "Sim. Separação organizada e itens de alto giro. Para garantir, confirme antes no WhatsApp.",
    },
];

export default function ContatoFaq() {
    return (
        <section className="mb-14">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 sm:p-10">
                <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                    Dúvidas rápidas
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                    Tudo para você falar com a gente do jeito mais rápido
                </h2>

                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                    {faqs.map((f) => (
                        <div
                            key={f.q}
                            className="rounded-3xl bg-black/25 ring-1 ring-white/10 p-6 hover:bg-black/30 transition"
                        >
                            <p className="font-black">{f.q}</p>
                            <p className="mt-2 text-neutral-300 leading-relaxed">{f.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
