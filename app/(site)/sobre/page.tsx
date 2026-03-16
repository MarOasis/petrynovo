import SobreHero from "@/components/site/sobre/SobreHero";
// import SobreVideo from "@/components/site/sobre/SobreVideo";
import SobreDestaques from "@/components/site/sobre/SobreDestaques";
import SobreTimeline from "@/components/site/sobre/SobreTimeline";
// import SobreEquipe from "@/components/site/sobre/SobreEquipe";

export default function SobrePage() {
  return (
    <main className="pageIn">
        <SobreHero />
        {/* <SobreVideo /> */}
        <SobreDestaques />
        <SobreTimeline />
        {/* <SobreEquipe /> */}
    </main>
  );
}
