const PHONE_DISPLAY = "47 3842-1734";
const PHONE_TEL = "tel:+554738421734";

function IconTruck({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16V7a1 1 0 011-1h9a1 1 0 011 1v9M3 16h11M3 16v1a1 1 0 001 1h1M14 10h4.6a1 1 0 01.86.49l2.03 3.43a1 1 0 01.14.51V16a1 1 0 01-1 1h-1.24M14 16v1M6 17a2 2 0 104 0 2 2 0 00-4 0zm11 0a2 2 0 104 0 2 2 0 00-4 0z" />
        </svg>
    );
}

export default function CoberturaLogisticaSection() {
    return (
        <section className="mt-8">
            <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                <div className="pointer-events-none absolute inset-0 cl-glow-emerald opacity-60" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="flex items-start gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-300/20">
                            <IconTruck className="h-6 w-6" />
                        </span>

                        <div>
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-emerald-200/70">
                                Cobertura logística em SC
                            </p>
                            <p className="mt-2 max-w-lg text-lg font-bold tracking-tight text-white sm:text-xl">
                                Atendemos demandas pequenas ou grandes volumes, com logística preparada.
                            </p>
                        </div>
                    </div>

                    <a
                        href={PHONE_TEL}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white/5 px-6 py-3.5 font-extrabold text-white/85 ring-1 ring-white/10 transition hover:bg-white/10"
                    >
                        Fale conosco → {PHONE_DISPLAY}
                    </a>
                </div>
            </div>
        </section>
    );
}
