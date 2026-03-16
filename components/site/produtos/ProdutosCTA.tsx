"use client";

const WHATSAPP = "5547992866123"; // troque aqui

export default function ProdutosCTA() {
    const msg = encodeURIComponent(
        "Quero orçamento. Produto/Linha: ____ | Medidas: ____ | Quantidade: ____ | Cidade: ____"
    );

    return (
        <section className="mt-14">
            <div className="relative overflow-hidden rounded-3xl bg-neutral-950 ring-1 ring-white/10 p-7 sm:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(16,185,129,.20),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                            Orçamento rápido
                        </p>
                        <h3 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">
                            Me envie linha + medidas + quantidade.
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
                            Respondemos com alternativa equivalente se algo estiver em falta sem travar sua entrega.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href="/contato"
                            className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                        >
                            Ir para contato →
                        </a>
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=${msg}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                        >
                            Orçar no WhatsApp →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
