import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
// import FloatingMobileCTA from "@/components/site/FloatingMobileCTA";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";

<html lang="pt-BR" className="overflow-x-hidden"></html>

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {children}
        <FloatingWhatsApp />
        {/* <FloatingMobileCTA /> */}
      </main>
      <Footer />
    </div>
  );
}
