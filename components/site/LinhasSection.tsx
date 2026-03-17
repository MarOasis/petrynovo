"use client";

import Image from "next/image";
import { useInView } from "@/components/site/useInView";
import BannerRotator from "@/components/site/BannerRotator";

const LINHAS_BANNERS = [
    { desktop: "/banners/linhas/c10.png", mobile: "/banners/linhas/c14.png", alt: "Linhas 1" },
    { desktop: "/banners/linhas/c5 (2).png", mobile: "/banners/linhas/c5.png", alt: "Linhas 2" },
    { desktop: "/banners/linhas/c7.png", mobile: "/banners/linhas/c8.png", alt: "Linhas 3" },
    { desktop: "/banners/linhas/c16.png", mobile: "/banners/linhas/c17.png", alt: "Linhas 4" },
];

export default function LinhasSection() {
    const wrap = useInView<HTMLElement>();

    return (
        <section className="mt-12">
            <div className="relative overflow-hidden border border-white/10 bg-white/5">
                <BannerRotator
                    slides={LINHAS_BANNERS}
                    heightClass="h-[160px] sm:h-[210px] lg:h-[240px]"
                    showOverlay={false}
                    showArrows={true}   // (opcional) geralmente fica mais clean sem setas
                    showDots={true}      // ✅ dots ativados
                    intervalMs={4200}
                />
                
            </div>
            
            {/* abaixo: LinhasMarquee */}
        </section>
        
    );
}
