import type { Metadata } from "next";
import SobreHero from "@/components/site/sobre/SobreHero";
// import SobreVideo from "@/components/site/sobre/SobreVideo";
import SobreDestaques from "@/components/site/sobre/SobreDestaques";
import SobreTimeline from "@/components/site/sobre/SobreTimeline";

export const metadata: Metadata = {
  title: "Sobre | Petry Distribuidora",
  description:
    "Padrão, reposição e suporte para você comprar certo e entregar acabamento superior — conheça a história da Petry Distribuidora.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <main className="pageIn">
        <SobreHero />
        {/* <SobreVideo /> */}
        <SobreDestaques />
        <SobreTimeline />
    </main>
  );
}
