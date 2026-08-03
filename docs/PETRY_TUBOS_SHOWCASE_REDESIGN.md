# PETRY DISTRIBUIDORA — Nova seção "Linhas" → Vitrine Técnica de Tubos: Documento de Direção Criativa

**Objetivo:** substituir o índice de linhas com filtro/busca que acabamos de implementar (46 pills categorizadas — print em anexo) por uma **vitrine técnica de tubos**: cada bitola desenhada em escala real, com as medidas (A/B/E, polegada, peso por metro) visíveis na hora, no mesmo espírito do post do Instagram da Petry que teve bastante alcance mostrando tudo sobre os tubos que eles vendem.

**Decisão confirmada com o Marco:** os tubos passam a ser **a seção inteira** — não é um destaque em cima do índice antigo, é a substituição completa. O catálogo completo (as outras ~40 linhas: Perfetta, Suprema, Gold, Vidro, Brises etc.) continua acessível em `/produtos` e no restante do site — essa seção da home vira conteúdo de impacto, não índice enciclopédico.

**Escopo:** o componente que hoje renderiza o índice de linhas na home (era `LinhasSection.tsx`/`LinhasMarquee.tsx` antes da última implementação — **confirme o nome atual do arquivo no repo**, já trabalhei a última vez a partir de um snapshot anterior a essa implementação). `app/(site)/page.tsx` só troca qual componente é importado ali.

---

## 1. Fundamentação

A Petry já testou isso no mundo real e funcionou: um post no Instagram (`instagram.com/p/DbEZFpmhrcC`) mostrando as opções de tubo teve alcance bem acima do normal. Isso é sinal de mercado, não palpite de design — o público (serralheiro, esquadrias, construtora) quer **ver a peça com a medida certa**, rápido, sem precisar abrir um PDF de catálogo de 140 páginas pra achar a bitola.

O documento anterior (índice de 46 linhas com filtro) resolvia "achar o nome da linha". Esse aqui resolve um problema diferente e mais forte: **"essa medida existe? qual o peso por metro?"** — pergunta técnica de quem já sabe o que precisa e só quer confirmar antes de pedir. Menos alcance de catálogo, mais conversão de quem já está pronto pra comprar.

---

## 2. Dados reais (Tubos Retangulares — já temos)

Do PDF que você mandou (`tubos.pdf`, página "TABELADOS" nº7). 16 bitolas reais, prontas pra virar dado estruturado — colar direto num arquivo `lib/tubos.ts`:

```ts
export type TuboRetangular = {
  codigo: string;
  a_mm: number; // lado maior
  b_mm: number; // lado menor
  e_mm: number; // espessura de parede
  a_pol?: string;
  b_pol?: string;
  e_pol?: string;
  kgPorBarra: number; // barra de 6m (padrão do setor — confirmar com o Marco)
  kgPorMetro: number;
};

export const TUBOS_RETANGULARES: TuboRetangular[] = [
  { codigo: "TG-074L", a_mm: 25.40, b_mm: 12.70, e_mm: 0.70, a_pol: "1",     b_pol: "1/2",   kgPorBarra: 0.834,  kgPorMetro: 0.139 },
  { codigo: "TG-073F", a_mm: 50.80, b_mm: 25.40, e_mm: 0.70, a_pol: "2",     b_pol: "1",     e_pol: "1/32", kgPorBarra: 1.657,  kgPorMetro: 0.276 },
  { codigo: "TG-015",  a_mm: 50.80, b_mm: 12.70, e_mm: 0.90, a_pol: "2",     b_pol: "1/2",   kgPorBarra: 1.806,  kgPorMetro: 0.301 },
  { codigo: "TG-020L", a_mm: 76.20, b_mm: 38.10, e_mm: 1.10, a_pol: "3",     b_pol: "1.1/2", kgPorBarra: 4.008,  kgPorMetro: 0.668 },
  { codigo: "TG-020P", a_mm: 76.20, b_mm: 38.10, e_mm: 3.05, a_pol: "3",     b_pol: "1.1/2", kgPorBarra: 10.734, kgPorMetro: 1.789 },
  { codigo: "TUB-500", a_mm: 101.60, b_mm: 50.80, e_mm: 1.20, kgPorBarra: 5.868,  kgPorMetro: 0.978 },
  { codigo: "TUB-512", a_mm: 101.60, b_mm: 50.80, e_mm: 2.00, kgPorBarra: 9.648,  kgPorMetro: 1.608 },
  { codigo: "TG-155",  a_mm: 150.00, b_mm: 50.00, e_mm: 2.20, kgPorBarra: 13.992, kgPorMetro: 2.332 },
  { codigo: "TG-156",  a_mm: 150.00, b_mm: 50.00, e_mm: 1.50, kgPorBarra: 9.606,  kgPorMetro: 1.601 },
  { codigo: "TG-175",  a_mm: 150.00, b_mm: 75.00, e_mm: 1.80, kgPorBarra: 12.954, kgPorMetro: 2.159 },
  { codigo: "TG-200",  a_mm: 150.00, b_mm: 100.00, e_mm: 2.00, kgPorBarra: 15.996, kgPorMetro: 2.666 },
  { codigo: "TG-210",  a_mm: 200.00, b_mm: 100.00, e_mm: 3.00, kgPorBarra: 30.995, kgPorMetro: 5.165 },
  { codigo: "TG-250",  a_mm: 200.00, b_mm: 50.00, e_mm: 2.00, kgPorBarra: 15.996, kgPorMetro: 2.666 },
  { codigo: "TG-285",  a_mm: 280.00, b_mm: 50.00, e_mm: 3.18, kgPorBarra: 33.414, kgPorMetro: 5.569 },
  { codigo: "TG-280",  a_mm: 280.00, b_mm: 140.00, e_mm: 3.50, kgPorBarra: 46.900, kgPorMetro: 7.816 },
  { codigo: "TG-350",  a_mm: 350.00, b_mm: 50.00, e_mm: 3.18, kgPorBarra: 40.650, kgPorMetro: 6.775 },
];
```

**Tubos Redondos e Tubos Quadrados — recebidos, dados reais abaixo** (`redondos_e_quadrados.pdf`, página "TABELADOS" nº6):

```ts
export type TuboRedondo = { codigo: string; diametro_mm: number; e_mm: number; diametro_pol?: string; e_pol?: string; kgPorBarra: number; kgPorMetro: number };
export type TuboQuadrado = { codigo: string; lado_mm: number; e_mm: number; lado_pol?: string; e_pol?: string; kgPorBarra: number; kgPorMetro: number };

export const TUBOS_REDONDOS: TuboRedondo[] = [
  { codigo: "TR-018", diametro_mm: 19.05,  e_mm: 0.80, diametro_pol: "3/4",   e_pol: "1/32", kgPorBarra: 0.738, kgPorMetro: 0.123 },
  { codigo: "TR-025", diametro_mm: 25.40,  e_mm: 1.00, diametro_pol: "1",     kgPorBarra: 1.248, kgPorMetro: 0.208 },
  { codigo: "TR-070", diametro_mm: 38.10,  e_mm: 1.30, diametro_pol: "1.1/2", kgPorBarra: 2.442, kgPorMetro: 0.407 },
  { codigo: "TR-050", diametro_mm: 50.70,  e_mm: 1.20, kgPorBarra: 3.042, kgPorMetro: 0.507 },
  { codigo: "TR-060", diametro_mm: 63.50,  e_mm: 1.59, diametro_pol: "2.1/2", e_pol: "1/16", kgPorBarra: 5.004, kgPorMetro: 0.834 },
  { codigo: "TR-076", diametro_mm: 76.20,  e_mm: 1.27, diametro_pol: "3",     kgPorBarra: 4.860, kgPorMetro: 0.810 },
  { codigo: "TR-100", diametro_mm: 101.60, e_mm: 1.50, diametro_pol: "4",     kgPorBarra: 7.656, kgPorMetro: 1.276 },
];

export const TUBOS_QUADRADOS: TuboQuadrado[] = [
  { codigo: "TQ-019",  lado_mm: 19.05,  e_mm: 1.59, lado_pol: "3/4",   e_pol: "1/16", kgPorBarra: 2.010,  kgPorMetro: 0.335 },
  { codigo: "TQ-009",  lado_mm: 25.40,  e_mm: 0.85, lado_pol: "1",     e_pol: "1/32", kgPorBarra: 1.356,  kgPorMetro: 0.226 },
  { codigo: "TQ-013",  lado_mm: 38.10,  e_mm: 0.80, lado_pol: "1.1/2", e_pol: "1/32", kgPorBarra: 1.932,  kgPorMetro: 0.322 },
  { codigo: "TQ-055L", lado_mm: 50.80,  e_mm: 1.30, lado_pol: "2",     kgPorBarra: 4.182,  kgPorMetro: 0.697 },
  { codigo: "TQ-076",  lado_mm: 76.20,  e_mm: 1.59, lado_pol: "3",     e_pol: "1/16", kgPorBarra: 7.362,  kgPorMetro: 1.227 },
  { codigo: "TQ-100",  lado_mm: 100.00, e_mm: 2.00, kgPorBarra: 12.750, kgPorMetro: 2.125 },
  { codigo: "TQ-102",  lado_mm: 100.00, e_mm: 1.50, e_pol: "1/16",     kgPorBarra: 9.648,  kgPorMetro: 1.608 },
];
```

Com isso as 3 famílias (16 retangulares + 7 redondos + 7 quadrados = 30 bitolas) já têm dado real — as abas "em breve" do §4 somem, as 3 ficam ativas desde o lançamento.

---

## 3. Fundamentação visual — por que "escala real" é a assinatura certa

O próprio PDF da Petry já desenha isso (o diagramazinho A/B/E no topo da tabela) — só que estático, pequeno, e sem noção de escala entre as bitolas. A ideia central da vitrine: **cada tubo desenhado no tamanho relativo real**, um do lado do outro. TG-074L (25×12mm) ao lado de TG-280 (280×140mm) mostra visualmente uma diferença de 11× no tamanho — isso é informação que a tabela numérica sozinha não comunica tão rápido quanto o olho.

Isso segue a mesma lógica das fichas técnicas da Visão Geral e do anel de tubo dos Diferenciais: usar o vocabulário real do produto (dimensão, código, peso) como o próprio material de design, em vez de decoração em cima.

---

## 4. Layout (conceito)

```
┌────────────────────────────────────────────────────────────┐
│  TUBOS · TABELA TÉCNICA (mono, latão)                        │
│  Da bitola ao peso, sem sair do site                          │
│  16 medidas de tubo retangular, com peso por metro pronto      │
│  pra orçamento.                                                │
│                                                                  │
│  [Retangulares]      [Quadrados]      [Redondos]                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  TG-074L    TG-073F   TG-015  ...   TG-350             │    │
│  │  ▭ 25×12    ▭▭ 50×25  ...            ▭▭▭▭▭▭▭ 350×50    │    │  ← todas as 16, desenhadas
│  │                                                          │    │    em escala relativa real,
│  │                                                          │    │    lado a lado numa régua
│  └──────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──── selecionado: TG-210 ─────────────────────────────┐     │
│  │  [desenho grande, com cotas A/B/E marcadas como no      │     │
│  │   PDF original — setas + números]                       │     │
│  │  200,00 × 100,00 mm · parede 3,00mm                     │     │
│  │  5,165 kg/m  ·  30,995 kg/barra                          │     │
│  │  [Chamar no WhatsApp com essa medida →]                 │     │
│  └──────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────┘
```

- **Fileira superior:** as 16 (ou N, conforme a família) bitolas desenhadas em miniatura, todas na mesma escala matemática entre si (maior valor de A da lista define 100% da largura disponível, o resto escala proporcional) — clicável.
- **Painel de detalhe:** ao clicar numa bitola, abre o desenho grande com cotas (réplica melhorada do diagrama do PDF: setas indicando A, B, E) + os números + os dois pesos (por metro, que é o que mais importa pra quem calcula estrutura, e por barra).
- **CTA com contexto:** o botão de WhatsApp já leva o código da bitola selecionada na mensagem pré-preenchida (`https://wa.me/55...?text=Quero%20saber%20mais%20sobre%20o%20tubo%20TG-210` — dado real, não link genérico). Pequeno detalhe, mas fecha o ciclo "vi a medida → já mando a dúvida específica" sem a pessoa ter que digitar o código de novo.

### Desenho técnico (SVG, sem lib nova)

Os três formatos são geometria simples — não precisa de canvas nem lib de gráfico:
- **Retangular:** `<rect>` com proporção `width:height = a_mm:b_mm`, borda mais grossa simulando a parede (`e_mm`), cotas desenhadas com `<line>` + `<text>` (mesma linguagem visual do diagrama do PDF original).
- **Quadrado:** mesmo componente, `a_mm === b_mm`.
- **Redondo:** `<circle>` com anel de espessura `e_mm`, cota do diâmetro.
- Escala calculada em runtime: `scale = larguraDisponível / maiorDimensãoDaFamília`, então cada tubo é desenhado no tamanho relativo certo — não precisa gerar imagem nem asset, é tudo matemática simples em cima de um `<svg>`.

---

## 5. Tokens (mesma extensão do resto do site)

Sem paleta nova: `hero-graphite` de fundo, `hero-brass` nas cotas/números de destaque e na aba ativa, `hero-aluminum` no traço do desenho técnico (faz sentido literal — é a cor do próprio alumínio), `font-mono-hero` nos códigos (`TG-210` lido como dado técnico) e nos números de medida, `font-display` no headline.

---

## 6. Plano de implementação (arquivos)

1. `lib/tubos.ts` (novo) — os 3 arrays de dados do §2.
2. `components/site/linhas/TubosShowcase.tsx` (novo) — a vitrine completa: abas de família, fileira de miniaturas em escala, painel de detalhe, SVG de cota.
3. `components/site/linhas/TuboDiagramSVG.tsx` (novo, opcional separar) — o componente de desenho técnico reutilizável (recebe formato + dimensões, devolve o SVG cotado).
4. `app/(site)/page.tsx` — troca o componente antigo do índice de linhas por `<TubosShowcase />` no mesmo lugar do fluxo da home.
5. Componente antigo do índice de 46 pills — não apagar ainda; comentar o import (mesmo padrão já usado pro `AcabamentosSection`) até confirmar que a vitrine de tubos está validada em produção. Se quiser manter as outras linhas acessíveis a partir da home, um link simples "ver catálogo completo →" pra `/produtos` no rodapé da vitrine resolve, sem precisar reviver o índice inteiro.

---

## 7. Performance e segurança

- Zero dependência nova — SVG + matemática de escala é só JS/React puro.
- Dado é só número, sem input de usuário nem consulta externa — nenhuma superfície de ataque nova.
- Link do WhatsApp com código da bitola: `encodeURIComponent` na mensagem antes de montar a URL (evita quebrar o link se algum código tiver caractere especial no futuro).
- Manter o fallback "em breve" no código mesmo com os 3 arrays populados agora — é barato e protege contra um array vindo vazio por engano no futuro (nova família de tubo, por exemplo) sem quebrar a tela.
- Validar ao final: `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev`.

---

## 8. Decisões que faltam sua confirmação

| Pergunta | Opções |
|---|---|
| "Kg/b" da tabela = barra de quantos metros? | Preciso confirmar (assumi 6m no comentário do §2, padrão comum do setor, mas é seu dado — confirma ou corrige) |
| O que acontece com as outras ~40 linhas que saem desta seção | Só um link "ver catálogo completo → /produtos" no rodapé da vitrine (recomendado) vs. quer manter alguma outra chamada na home |
| Mensagem do WhatsApp pré-preenchida por bitola | Confirmar o texto padrão (sugeri "Quero saber mais sobre o tubo [código]") vs. outro texto |
| ~~Quando os PDFs de Redondos/Quadrados chegarem~~ | Recebidos e já incluídos no §2 — as 3 famílias estão completas |

---

## Status: implementada, depois substituída

Implementado como planejado: `lib/tubos.ts` com as 30 bitolas reais (16 retangulares + 7 redondos + 7 quadrados, `BARRA_METROS = 6` confirmado), `TuboDiagramSVG.tsx` (desenho técnico cotado), `TubosShowcase.tsx` (fileira rolável + painel de detalhe + CTA de WhatsApp com código pré-preenchido). `LinhasSection.tsx` comentado em `app/(site)/page.tsx`, substituído por `<TubosShowcase />`. Link "Ver catálogo completo → /produtos" no rodapé, conforme recomendado.

Durante o teste, ajustei o desenho grande do painel de detalhe pra usar escala própria (`maxA={selecionado.a}`) em vez da escala da família — com a escala da família, bitolas pequenas (ex. TG-074L) ficavam quase invisíveis no painel grande.

**A fileira rolável passou por 3 rodadas de correção** (`PETRY_SCROLLBAR_TUBOS.md`, `PETRY_SCROLL_DRAG_FIX.md`, `PETRY_FADE_OVERLAY_FIX.md`) e foi **finalmente substituída** por `docs/PETRY_TUBOS_SKYLINE_REDESIGN.md`, que elimina o scroll horizontal por completo. O painel de detalhe e `lib/tubos.ts` permanecem exatamente como implementados aqui.
