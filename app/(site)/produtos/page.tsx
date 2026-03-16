import ProdutosHero from "@/components/site/produtos/ProdutosHero";
import ProdutosVitrine from "@/components/site/produtos/ProdutosVitrine";
import PadraoPremium from "@/components/site/produtos/PadraoPremium";
import QualidadeBlocos from "@/components/site/produtos/QualidadeBlocos";
import ProdutosCTA from "@/components/site/produtos/ProdutosCTA";

export const metadata = {
  title: "Produtos | Petry Distribuidora",
  description:
    "Perfis e acessórios com padrão, compatibilidade e acabamento premium. Estoque com giro alto e suporte para escolha da linha.",
};

export default function ProdutosPage() {
  return (
    <main className="pb-14">
      <div className="container">
        <ProdutosHero />

        <ProdutosVitrine
          id="perfis"
          eyebrow="Perfis de Alumínio"
          title="Padrão de encaixe, acabamento e consistência de linha"
          desc="Na Petry, você compra com segurança. Trabalhamos com perfis de alto giro e linhas consolidadas, pra manter padrão na obra e evitar retrabalho."
          items={[
            { name: "Perfis 'U'", tag: "Estrutural / Reforço", img: "banners/produtos/u2.png" },
            { name: "Cantoneiras", tag: "Acabamento / Proteção", img: "banners/produtos/cantoneiras.png" },
            { name: "Barras Chatas", tag: "Fixação / Estrutura", img: "banners/produtos/barrachatas (1).png" },
            { name: "Tubos Retangulares", tag: "Estrutural", img: "banners/produtos/TG.png" },
            { name: "Tubos Quadrados", tag: "Estrutural", img: "banners/produtos/TQ.png" },
            { name: "Tubos Redondos", tag: "Estrutural", img: "banners/produtos/TR.png" },
          ]}
        />

        <PadraoPremium />

        <ProdutosVitrine
          id="acessorios"
          eyebrow="Acessórios"
          title="O conjunto completo: roldanas, vedação, fechos e conexões"
          desc="Acessório certo é obra sem volta. A Petry trabalha com itens compatíveis com as linhas do mercado pra você montar, vedar e finalizar com previsibilidade."
          items={[
            { name: "Roldanas", tag: "Deslizamento Suave", img: "banners/produtos/roldanas.png" },
            { name: "Fechos", tag: "Segurança", img: "banners/produtos/fechos.png" },
            { name: "Conexões", tag: "Montagem", img: "banners/produtos/conexoes.png" },
            { name: "Escovas", tag: "Vedação / Ruído", img: "banners/produtos/vedacoes.png" },
            { name: "Borrachas", tag: "Proteção e Durabilidade", img: "banners/produtos/borrachas.png" },
            { name: "Temperados", tag: "Alta Recorrência", img: "banners/produtos/temperados.png" },
          ]}
        />

        <QualidadeBlocos />

        <ProdutosCTA />
      </div>
    </main>
  );
}
