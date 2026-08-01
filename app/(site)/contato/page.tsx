import type { Metadata } from "next";
import ContatoHero from "@/components/site/contato/ContatoHero";
import ContatoGrid from "@/components/site/contato/ContatoGrid";
import ContatoMapa from "@/components/site/contato/ContatoMapa";
import ContatoFaq from "@/components/site/contato/ContatoFaq";

export const metadata: Metadata = {
  title: "Contato | Petry Distribuidora",
  description:
    "Fale com a Petry Distribuidora pelo WhatsApp, telefone ou e-mail para cotar perfis e acessórios de alumínio.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <main className="pageIn">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ContatoHero />
        <ContatoGrid />
        <ContatoMapa />
        <ContatoFaq />
      </div>
    </main>
  );
}
