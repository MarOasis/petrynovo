"use client";

const items = [
    {
        t: "Compatibilidade de linha",
        d: "Ajuda na escolha de perfil, roldana, vedação e acabamento, evitando peça errada e retrabalho.",
    },
    {
        t: "Padrão e consistência",
        d: "Produtos selecionados para manter padrão de montagem e resultado final previsível.",
    },
    {
        t: "Separação organizada",
        d: "Conferência e identificação para reduzir erro na obra e agilizar a instalação.",
    },
    {
        t: "Reposição e recorrência",
        d: "Você não fica na mão quando o cliente pede “só mais 2 barras” no meio do serviço.",
    },
];

export default function QualidadeBlocos() {
    return (
        <section className="mt-14">
            <div className="rounded-3xl bg-emerald-950/20 ring-1 ring-white/10 p-6 sm:p-10">
                <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                    Por que nosso produto “encaixa” na rotina
                </p>

                <h3 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">
                    Qualidade é comprar certo e instalar sem surpresa.
                </h3>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((x) => (
                        <div
                            key={x.t}
                            className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5"
                        >
                            <p className="text-sm font-black">{x.t}</p>
                            <p className="mt-2 text-sm text-neutral-300">{x.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
