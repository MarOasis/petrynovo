"use client";

import Image from "next/image";

type Person = {
    name: string;
    role: string;
    text: string;
    photo: string;
};

const people: Person[] = [
    { name: "Sr Lucas", role: "Diretor Técnico", text: "É no detalhe que a excelência se mostra.", photo: "/time/lucas.jpg" },
    { name: "Roger", role: "Comercial / Relacionamento", text: "Orientar, propor soluções e garantir segurança na escolha.", photo: "/time/roger.jpg" },
    { name: "Emidio", role: "Controle de Qualidade", text: "Padrão e consistência — sempre.", photo: "/time/emidio.jpg" },
    { name: "Mario", role: "Responsável técnico", text: "Garantir que a obra esteja apta a receber e instalar com padrão.", photo: "/time/mario.jpg" },
    { name: "Renata", role: "Sucesso do Cliente", text: "Do fluxo financeiro ao agendamento da entrega.", photo: "/time/renata.jpg" },
    { name: "Renan", role: "Produção", text: "Processos e excelência em cada entrega.", photo: "/time/renan.jpg" },
];

export default function TimeSection() {
    return (
        <section className="mt-12">
            <div className="relative overflow-hidden rounded-3xl bg-emerald-950/15 ring-1 ring-white/10">
                <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.06]" />
                <div className="pointer-events-none absolute inset-0 cl-glow-emerald opacity-60" />

                <div className="relative p-6 sm:p-10">
                    <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                        Nosso time
                    </p>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">
                        Pessoas que garantem padrão no dia a dia
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-3xl">
                        Atendimento, conferência, separação e suporte técnico — para você comprar certo e entregar acabamento superior.
                    </p>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {people.map((p) => (
                            <article
                                key={p.name}
                                className="group overflow-hidden rounded-3xl bg-white/6 ring-1 ring-white/10 hover:bg-white/8 transition"
                            >
                                <div className="relative h-[220px] bg-black/30">
                                    <Image
                                        src={p.photo}
                                        alt={`${p.name} - ${p.role}`}
                                        fill
                                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                                        sizes="(max-width: 640px) 100vw, 420px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                                </div>

                                <div className="p-5">
                                    <h4 className="text-base font-black tracking-tight text-white">
                                        {p.name} <span className="text-white/50 font-extrabold">|</span>{" "}
                                        <span className="text-white/80 font-extrabold">{p.role}</span>
                                    </h4>
                                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                                        {p.text}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
