import "./globals.css";
import type { Metadata } from "next";

const SITE_URL = "https://www.petrydistribuidora.com.br";
const SITE_NAME = "Petry Distribuidora";
const SITE_DESCRIPTION = "Distribuidora de alumínios e acessórios. Linhas, produtos e atendimento.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Distribuidora de Alumínios — Catálogo & Atendimento",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Distribuidora de Alumínios — Catálogo & Atendimento",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Distribuidora de Alumínios — Catálogo & Atendimento",
    description: SITE_DESCRIPTION,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+554738421734",
  email: "Petry@petrydistribuidora.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Ronco Dágua, 2201, Itinga",
    addressLocality: "Joinville",
    addressRegion: "SC",
    postalCode: "89235-390",
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "07:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "13:00",
      closes: "17:45",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "07:00",
      closes: "12:00",
    },
  ],
  sameAs: ["https://www.instagram.com/petry.distribuidora/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-black text-white antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
