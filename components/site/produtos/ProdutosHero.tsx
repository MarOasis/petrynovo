"use client";

export default function ProdutosHero() {
    return (
        <section className="mt-10">
            <div className="relative overflow-hidden rounded-3xl bg-neutral-950 ring-1 ring-white/10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(16,185,129,.18),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                    <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                        Produtos
                    </p>

                    <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
                        Perfis e acessórios com padrão de mercado e acabamento premium.
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm sm:text-base text-neutral-300">
                        Aqui você compra com segurança: compatibilidade de linha, separação conferida e suporte pra escolher
                        o item certo. Menos erro na obra, mais previsibilidade no resultado.
                    </p>


                    <div className="mt-7 flex flex-wrap gap-3">
                        <a  target="blank"
                            href="/catalogos"
                            className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
                        >
                            Ver catálogos →
                        </a>

                        <a  target="_blank"
                            rel="noopener"
                            href="https://drive.google.com/file/d/1VHMdBkY3-d8myNzvCE0ykGvEMPxUp5yF/view?usp=sharing"
                            className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                        >
                            Catálogo Perfis
                        </a>

                        <a  target="_blank"
                            rel="noopener"
                            href="https://drive.google.com/file/d/1CXW1tgNbYVI7Iw38BmSR5EaKdY3sslnp/view?usp=sharing"
                            className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                        >
                            Catálogo PERFETTA
                        </a>

                        <a  target="_blank"
                            rel="noopener"
                            href="https://drive.google.com/file/d/12hNlgacqjpPmQRWMvI_w4-YA9vRk-CHG/view?usp=sharing"
                            className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                        >
                            Catálogo Acessórios
                        </a>
                         <a  target="_blank"
                            rel="noopener"
                            href="https://drive.google.com/file/d/15fcDI2UYwRf5xfRR_V5KMIr9mzMxQIRb/view?usp=sharing"
                            className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/15 transition"
                        >
                            Catálogo Técnico
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}