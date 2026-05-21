import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribuidora de Alumínios — Catálogo & Atendimento",
  description: "Distribuidora de alumínios e acessórios. Linhas, produtos e atendimento.",
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
