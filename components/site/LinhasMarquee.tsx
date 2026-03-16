"use client";

const LINHAS_TICKER = [
    // lista 1 (print da esquerda)
    "Perfetta 35",
    "Perfetta 40 - Porta Camarão",
    "Perfetta 45",
    "Perfetta 45 - Bicolor",
    "Perfetta 45 - Oscilo Batente",
    "Perfetta 45 - Maxim-ar e Fixo",
    "Perfetta 45 - Porta de Giro",
    "Perfetta 45 - Pivotante",
    "Perfetta 55",
    "Perfetta 75",
    "Perfetta - Integrada",
    "Perfetta - Complementos",
    "Perfetta Minimalista",
    "Vidro | Baguete | Gaxeta",
    "Conexões",

    // lista 2 (print da direita)
    "Perfis ‘U’",
    "Cantoneiras",
    "Barras Chatas",
    "Tubos Redondos",
    "Tubos Quadrados",
    "Tubos Retangulares",
    "Contramarcos e Conexões",
    "Arremates",
    "Linha 25",
    "Linha Portas 25/32/42",
    "Linha Basculante PETRY 25",
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
];

export default function LinhasMarquee() {
    // duplicamos para o loop ficar perfeito
    const doubled = [...LINHAS_TICKER, ...LINHAS_TICKER];

    return (
        <section className="mt-8">
            {/* full width sem estourar */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                <div className="cl-marquee border-y border-white/10 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/90">
                    <div className="cl-marquee-track gap-4 px-4 sm:px-6 lg:px-8 py-5">
                        {doubled.map((name, idx) => {
                            const isHighlight =
                                name.includes("Gold") ||
                                name.includes("Suprema") ||
                                name.includes("Perfetta 45") ||
                                name.includes("Pele de Vidro");

                            return (
                                <span
                                    key={`${name}-${idx}`}
                                    className={[
                                        "cl-pill",
                                        isHighlight ? "cl-pill--hi" : "",
                                    ].join(" ")}
                                >
                                    {name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
