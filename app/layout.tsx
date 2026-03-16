import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribuidora de Alumínios — Catálogo & Orçamentos",
  description: "Distribuidora de alumínios e acessórios. Linhas, produtos, atendimento rápido e orçamento.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
