export default function ContatoHero() {
    return (
        <section className="mt-8">
            <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                <div className="pointer-events-none absolute inset-0 cl-glow-emerald opacity-70" />
                <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.15]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/75 via-black/10 to-black/35" />

                <div className="relative p-6 sm:p-10">
                    <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                        Contato
                    </p>

                    <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                        Fale com a Petry, orçamento rápido, orientação certa e entrega no ritmo.
                    </h1>

                    <p className="mt-4 max-w-3xl text-neutral-300 leading-relaxed">
                        Quer cotar perfis, acessórios ou tirar dúvida de compatibilidade? Chama no WhatsApp e a gente te orienta com
                        a linha certa e os complementos para fechar a obra com padrão.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href="https://wa.me/5547992866123"
                            target="_blank"
                            rel="noopener"
                            className="rounded-2xl bg-emerald-400 px-5 py-3 font-extrabold text-black hover:brightness-110 transition"
                        >
                            Orçar no WhatsApp →
                        </a>

                        <a
                            href="tel:+554738421734"
                            className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-3 font-extrabold text-white/85 hover:bg-white/10 transition"
                        >
                            Ligar agora →
                        </a>

                        <a
                            href="mailto:Petry@petrydistribuidora.com.br"
                            className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-3 font-extrabold text-white/85 hover:bg-white/10 transition"
                        >
                            Enviar e-mail →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
