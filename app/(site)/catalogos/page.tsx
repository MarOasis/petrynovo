import CatalogosGrid from "@/components/site/catalogos/CatalogosGrid";

export const metadata = {
    title: "Catálogos | Petry Distribuidora",
};

export default function CatalogosPage() {
    return (
        <main className="mt-10">
            <section className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <div className="relative p-6 sm:p-10">
                    <div className="pointer-events-none absolute inset-0 cl-glow-emerald opacity-70" />
                    <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.10]" />
                    <div className="relative">
                        <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                            Downloads
                        </p>
                        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                            Catálogos Petry
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-3xl">
                            Baixe nossos catálogos de perfis e acessórios. Se precisar, chamamos no WhatsApp e
                            ajudamos a escolher a linha certa.
                        </p>
                    </div>
                </div>
            </section>

            <CatalogosGrid />
        </main>
    );
}