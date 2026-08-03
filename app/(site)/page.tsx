import type { Metadata } from "next";
import Hero from "@/components/site/Hero";
import CoberturaLogisticaSection from "@/components/site/CoberturaLogisticaSection";
import InfoCards from "@/components/site/InfoCards";
import VisaoGeralSection from "@/components/site/VisaoGeralSection";
import TubosShowcase from "@/components/site/linhas/TubosShowcase";
// substituído pela vitrine de tubos (docs/PETRY_TUBOS_SHOWCASE_REDESIGN.md) — mantido até validar em produção
// import LinhasSection from "@/components/site/LinhasSection";
// destaques
// import AcabamentosSection from "@/components/site/AcabamentosSection";
import CatalogosCinematic from "@/components/site/CatalogosCinematic";
import DiferenciaisCircle from "@/components/site/DiferenciaisCircle";
import CoresSection from "@/components/site/CoresSection";
import MarcasSection from "@/components/site/MarcasSection";
import ContatoCTASection from "@/components/site/ContatoCTASection";
import { featuredProducts } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Início | Petry Distribuidora",
  description:
    "Distribuição de alumínio e acessórios com padrão, reposição e suporte técnico para comprar certo e manter a obra no ritmo.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero full-width (escapa do container do layout) */}
      <div className="relative left-1/2 -ml-[50vw] w-[100vw]">
        <Hero />
      </div>
      <CoberturaLogisticaSection />
      <InfoCards />
      <VisaoGeralSection />
      <TubosShowcase />
      {/* <AcabamentosSection /> destaques */}
      <CatalogosCinematic />
      <DiferenciaisCircle />
      <CoresSection />
      <MarcasSection />
      <ContatoCTASection />
    </div>
  );
}
