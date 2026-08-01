import type { Metadata } from "next";
import ServicosPage from "@/components/site/servicos/ServicosPage";

export const metadata: Metadata = {
  title: "Serviços | Petry Distribuidora",
  description:
    "Atendimento que acelera a obra com padrão e previsibilidade: separação organizada, suporte na escolha da linha e atendimento direto no WhatsApp.",
  alternates: { canonical: "/servicos" },
};

export default function Page() {
  return <ServicosPage />;
}
