import BannerRotator from "@/components/site/BannerRotator";
import InfoCards from "@/components/site/InfoCards";
import VisaoGeralSection from "@/components/site/VisaoGeralSection";
import LinhasSection from "@/components/site/LinhasSection";
import LinhasMarquee from "@/components/site/LinhasMarquee";
// destaques
// import AcabamentosSection from "@/components/site/AcabamentosSection";
import CatalogosCinematic from "@/components/site/CatalogosCinematic";
import DiferenciaisCircle from "@/components/site/DiferenciaisCircle";
import CoresSection from "@/components/site/CoresSection";
import MarcasSection from "@/components/site/MarcasSection";
import ContatoCTASection from "@/components/site/ContatoCTASection";
import { featuredProducts } from "@/lib/site";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Banner full-width (escapa do container do layout) */}
      <div className="relative left-1/2 -ml-[50vw] w-[100vw]">
        <BannerRotator />
      </div>
      <InfoCards />
      <VisaoGeralSection />
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <LinhasSection />
      </div>
      <LinhasMarquee />
      {/* <AcabamentosSection /> destaques */}
      <CatalogosCinematic />
      <DiferenciaisCircle />
      <CoresSection />
      <MarcasSection />
      <ContatoCTASection />
    </div>
  );
}
