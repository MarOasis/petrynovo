export default function SobreVideo() {
    return (
        <section className="mt-14 mb-14">
            <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                <div className="pointer-events-none absolute inset-0 cl-glow-neutral opacity-60" />
                <div className="px-6 sm:px-10 py-10">
                    <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-emerald-200/70">
                        Apresentação
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                        Veja a Petry por dentro
                    </h2>
                    <p className="mt-3 max-w-3xl text-neutral-300">
                        Um vídeo curto mostrando estrutura, separação e padrão de entrega.
                    </p>

                    <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/30">
                        <div className="aspect-video">
                            {/* Troque a URL pelo seu vídeo */}
                            <iframe
                                className="h-full w-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Vídeo Petry"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href="/contato"
                            className="rounded-2xl bg-emerald-400 px-5 py-3 font-extrabold text-black hover:brightness-110 transition"
                        >
                            Orçar no WhatsApp →
                        </a>
                        <a
                            href="/catalogos"
                            className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-3 font-extrabold text-white/85 hover:bg-white/10 transition"
                        >
                            Ver catálogos →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
