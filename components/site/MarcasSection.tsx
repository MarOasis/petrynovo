"use client";

import Image from "next/image";
import { useInView } from "@/components/site/useInView";

type Brand = {
    name: string;
    logo?: string; // opcional: "/marcas/nome.svg"
};

const brands: Brand[] = [
    { name: "Perfetta", logo: "/banners/parceiros/Ciser.png" },
    { name: "Udinese", logo: "/banners/parceiros/Dxmax.png" },
    { name: "Rotofer", logo: "/banners/parceiros/celsus.png" },
    { name: "AluTech", logo: "/banners/parceiros/Colorsud.png" },
    { name: "Suprema", logo: "/banners/parceiros/Emteco.png" },
    { name: "Gold", logo: "/banners/parceiros/Perfisud.png" },
    { name: "Linha 25", logo: "/banners/parceiros/Soprano (1).png" },
    { name: "Fachada Cortina", logo: "/banners/parceiros/Stam.png" },
    { name: "Conexões", logo: "/banners/parceiros/Udinese.png" },
    { name: "Temperados", logo: "/banners/parceiros/Walplas.png" },
    { name: "Policarbonato", logo: "/banners/parceiros/3F (1).png" },
    { name: "Acessórios Premium", logo: "/banners/parceiros/Alushow (1).png" },
];

function Pill({ b }: { b: Brand }) {
    return (
        <div className="cl-pill">
            {b.logo ? (
                <div className="relative h-6 w-24 sm:w-28">
                    <Image
                        src={b.logo}
                        alt={b.name}
                        fill
                        className="object-contain opacity-90"
                        sizes="120px"
                    />
                </div>
            ) : (
                <span className="cl-pill-text">{b.name}</span>
            )}
        </div>
    );
}

export default function MarcasSection() {
    const wrap = useInView<HTMLElement>();
    const rowA = [...brands, ...brands];
    const rowB = [...brands.slice().reverse(), ...brands.slice().reverse()];

    return (
        <section ref={wrap.ref} className="mt-14">
            <div
                className={[
                    "rounded-3xl bg-emerald-950/20 ring-1 ring-white/10 overflow-hidden",
                    "transition-all duration-700 ease-out",
                    wrap.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
            >
                {/* topo */}
                <div className="px-6 sm:px-10 pt-8 sm:pt-10">
                    <p className="text-xs font-extrabold tracking-[0.22em] uppercase text-emerald-200/70">
                        Parceiros & qualidade
                    </p>
                    <h3 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                        Trabalhamos com as melhores marcas do mercado
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-3xl">
                        Linhas reconhecidas por compatibilidade, padrão e consistência para você comprar certo e
                        entregar acabamento superior no projeto.
                    </p>
                </div>

                {/* marquee */}
                <div className="relative mt-8 pb-10 cl-marcas-fade">
                    {/* fade nas bordas (cinematic) */}


                    {/* Row 1 */}
                    <div className="cl-marquee">
                        <div className="cl-track">
                            {rowA.map((b, idx) => (
                                <Pill b={b} key={`a-${idx}-${b.name}`} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2 (contramão) */}
                    <div className="cl-marquee mt-4">
                        <div className="cl-track cl-track-reverse">
                            {rowB.map((b, idx) => (
                                <Pill b={b} key={`b-${idx}-${b.name}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* css local */}
                <style jsx>{`
                .cl-marcas-fade {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%);
  }
          .cl-marquee {
            overflow: hidden;
            width: 100%;
          }
          .cl-track {
            display: flex;
            gap: 14px;
            padding: 0 16px;
            width: max-content;
            animation: marquee 26s linear infinite;
            will-change: transform;
          }
          .cl-track-reverse {
            animation: marqueeReverse 30s linear infinite;
          }

          .cl-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            height: 56px;
            padding: 0 18px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.10);
            transition: transform .25s ease, background .25s ease, border-color .25s ease;
            backdrop-filter: blur(10px);
          }
          .cl-pill:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.09);
            border-color: rgba(255, 255, 255, 0.18);
          }
          .cl-pill-text {
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.88);
            white-space: nowrap;
          }

          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marqueeReverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }

          @media (prefers-reduced-motion: reduce) {
            .cl-track, .cl-track-reverse { animation: none !important; }
          }
        `}</style>
            </div>
        </section>
    );
}
