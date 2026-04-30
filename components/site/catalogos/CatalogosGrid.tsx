import Image from "next/image";

type Catalogo = {
    title: string;
    desc: string;
    year: string;
    cover: string; // imagem em /public
    file: string;  // pdf em /public
    badge?: string;
};

const catalogos: Catalogo[] = [
    {
        title: "Catálogo de Perfis",
        desc: "Linhas, sistemas e perfis para esquadrias e soluções estruturais.",
        year: "2026",
        badge: "",
        cover: "/banners/catalogos/capa1.png",
        file: "https://drive.google.com/file/d/1Oq3tlzbxbyEZj_ioNU2bNKY8NAQN0i_D/view?usp=sharing",
    },
    {
        title: "Catálogo Perfetta",
        desc: "Sistema premium com acabamento e encaixe pensados para o dia a dia.",
        year: "2026",
        badge: "",
        cover: "/banners/catalogos/capa3.png",
        file: "https://drive.google.com/file/d/1vYUZJicuP3yJUL4xJYrge8cmH6WrO0nl/view?usp=drive_link",
    },
    {
        title: "Catálogo de Acessórios",
        desc: "Ferragens, vedação, consumíveis e complementos para fechar a obra.",
        year: "2026",
        badge: "",
        cover: "/banners/catalogos/capa2.png",
        file: "https://drive.google.com/file/d/1TYWHCDBgWYcIK3kovEfGMLaGwZzxcrnq/view?usp=drive_link",
    },
    {
        title: "Catálogo Técnico",
        desc: "Guilhotina Deslizante, Catálogo Técnico",
        year: "2026",
        badge: "",
        cover: "/banners/catalogos/capa4.png",
        file: "https://drive.google.com/file/d/15fcDI2UYwRf5xfRR_V5KMIr9mzMxQIRb/view?usp=sharing",
    },
];

export default function CatalogosGrid() {
    return (
        <section className="mt-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
                {catalogos.map((c) => (
                    <div
                        key={c.title}
                        className="group rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden hover:bg-white/[0.07] transition"
                    >
                        <div className="relative aspect-[3/4]">
                            <Image
                                src={c.cover}
                                alt={c.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                sizes="(max-width: 1024px) 100vw, 33vw"
                            />
                            {/* overlay cinematic */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                            <div className="pointer-events-none absolute inset-0 cl-grain opacity-[0.12]" />

                            {/* badge */}
                            <div className="absolute left-4 top-4 flex gap-2">
                                <span className="rounded-full bg-black/45 ring-1 ring-white/10 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] uppercase text-white/85">
                                    {c.year}
                                </span>
                                {c.badge && (
                                    <span className="rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/25 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] uppercase text-emerald-200">
                                        {c.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <h3 className="text-xl font-black tracking-tight">{c.title}</h3>
                            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{c.desc}</p>

                            <div className="mt-5 flex items-center gap-3">
                                <a
                                    href={c.file}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-extrabold text-black hover:brightness-110 transition"
                                >
                                    Baixar PDF →
                                </a>
                                <a 
                                    href="https://wa.me/5547992866123"
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-flex items-center justify-center rounded-2xl bg-black/30 ring-1 ring-white/10 px-4 py-2.5 text-sm font-extrabold text-white/85 hover:bg-black/40 transition"
                                >
                                    Pedir ajuda →
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}