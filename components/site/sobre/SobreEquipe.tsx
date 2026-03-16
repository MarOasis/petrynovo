import Image from "next/image";

const team = [
    { name: "Sr Lucas", role: "Diretor Técnico", text: "É no detalhe que a excelência se mostra.", img: "/sobre/equipe/1.jpg" },
    { name: "Roger", role: "Comercial / Relacionamento", text: "Orientar e propor soluções com total segurança.", img: "/sobre/equipe/2.jpg" },
    { name: "Emidio", role: "Controle de Qualidade", text: "Padrão e conferência para evitar retrabalho.", img: "/sobre/equipe/3.jpg" },
    { name: "Mario", role: "Responsável técnico", text: "Compatibilidade e montagem correta em cada etapa.", img: "/sobre/equipe/4.jpg" },
    { name: "Renata", role: "Sucesso do Cliente", text: "Do orçamento à entrega — tudo simples e claro.", img: "/sobre/equipe/5.jpg" },
    { name: "Renan", role: "Produção", text: "Processo e organização para manter o giro alto.", img: "/sobre/equipe/6.jpg" },
];

export default function SobreEquipe() {
    return (
        <section className="mt-14">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <div className="px-6 sm:px-10 pt-10">
                    <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                        Pessoas & padrão
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                        Um time que cuida do detalhe para você comprar certo.
                    </h2>
                    <p className="mt-3 max-w-3xl text-neutral-300">
                        Atendimento direto, conferência e suporte — o que faz a distribuição ser segura.
                    </p>
                </div>

                <div className="px-6 sm:px-10 pb-10 pt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((p) => (
                        <div
                            key={p.name}
                            className="rounded-3xl bg-black/25 ring-1 ring-white/10 overflow-hidden
                         shadow-[0_18px_70px_rgba(0,0,0,.40)]
                         transition hover:-translate-y-[2px] hover:bg-black/30"
                        >
                            <div className="relative h-[230px] overflow-hidden">
                                <Image
                                    src={p.img}
                                    alt={p.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                                    sizes="(max-width: 1024px) 100vw, 360px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>

                            <div className="p-6">
                                <p className="font-black">{p.name}</p>
                                <p className="text-emerald-200/70 font-extrabold text-sm">{p.role}</p>
                                <p className="mt-3 text-neutral-300 leading-relaxed">{p.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
