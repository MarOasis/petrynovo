export default function ContatoMapa() {
    return (
        <section className="mt-10 mb-10">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <div className="px-6 sm:px-10 pt-10">
                    <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                        Localização
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Venha buscar ou retirar com agilidade</h2>
                    <p className="mt-3 max-w-3xl text-neutral-300">
                        Estrutura organizada e retirada rápida. Se preferir, confirme disponibilidade pelo WhatsApp antes.
                    </p>
                </div>

                <div className="mt-6 px-6 sm:px-10 pb-10">
                    <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/30">
                        <div className="aspect-[16/9]">
                            {/* Troque o src pelo embed do seu Google Maps */}
                            <iframe
                                title="mapa"
                                className="h-full w-full"
                                src="https://www.google.com/maps?q=Rua%20Ronco%20D%C3%A1gua%202201%20Itinga%20Joinville%20SC%2089235-390&output=embed"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href="https://maps.app.goo.gl/HUjGoTfk2rDRdgSF8"
                            target="_blank"
                            rel="noopener"
                            className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-3 font-extrabold text-white/85 hover:bg-white/10 transition"
                        >
                            Rotas no Google Maps →
                        </a>
                        <a
                            href="https://wa.me/5547992866123"
                            target="_blank"
                            rel="noopener"
                            className="rounded-2xl bg-emerald-400 px-5 py-3 font-extrabold text-black hover:brightness-110 transition"
                        >
                            Confirmar no WhatsApp →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
