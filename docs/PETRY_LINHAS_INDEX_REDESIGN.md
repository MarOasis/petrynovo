# PETRY DISTRIBUIDORA — Redesign da seção "Linhas" (banner + marquee de pills): Documento de Direção Criativa

**Objetivo:** substituir o bloco `LinhasSection` (carrossel de banner genérico "Do projeto à entrega...") + `LinhasMarquee` (ticker infinito de 46 pills) por uma seção única, útil de verdade pra quem visita — que deixe o catálogo de linhas **navegável**, não só decorativo — mantendo a identidade grafite/latão/alumínio já em uso no Hero e na Visão Geral.

**Escopo:** `components/site/LinhasSection.tsx` e `components/site/LinhasMarquee.tsx` (viram um componente só, ou os dois continuam existindo mas com responsabilidades diferentes — ver §6). Toca também `components/site/BannerRotator.tsx` só na ponta (ver §7, vira candidato a código morto). Não mexe em `Hero.tsx`, `VisaoGeralSection.tsx` nem nas páginas `/produtos` e `/linhas`.

**Como usar este arquivo:** mesma dinâmica dos dois anteriores — cola no Claude Code dentro do repo. §8 lista o que precisa da sua confirmação.

---

## 1. Fundamentação

Essa seção, hoje, é a única do site que ainda não passa pelo crivo que o Hero e a Visão Geral já passaram. Ela tem dois problemas de naturezas diferentes:

**O banner (`LinhasSection`) é imagem de banco genérica com texto embutido no PNG.** "Do projeto à entrega, excelência em cada detalhe" + mão segurando maquete de casa é o tipo exato de imagem que o próprio `PETRY_HERO_REDESIGN.md` já identificou como problema no hero antigo (§2 daquele doc: "fala de logística/genérico, não do produto"). Aqui o problema é pior ainda porque o texto está **cozido dentro do PNG** — não dá pra estilizar, não é lido por leitor de tela (só tem `alt="Linhas 1"`), não indexa no Google, e não tem nenhuma relação com alumínio, com a Petry ou com o que a seção realmente anuncia (as linhas de produto).

**O marquee (`LinhasMarquee`) é bonito mas inútil.** 46 linhas de produto reais — Perfetta, Suprema, Gold, Pele de Vidro, Brises, etc. — passando em scroll automático, sem clique, sem link, sem busca. É puro enfeite: quem já sabe o nome da linha que procura não consegue parar o scroll e clicar; quem não sabe o nome não tem como filtrar por tipo de produto. Você pediu explicitamente "que seja uma seção bem útil pra quem está vendo" — hoje ela é o oposto disso.

A correção certa não é só trocar a estética: é transformar a lista decorativa em **índice navegável do catálogo**, que é o que ela deveria ser desde o início — a Petry tem 46 linhas reais, isso é uma força de vendas (mostra variedade e especialização), mas só funciona como força se a pessoa conseguir *achar* a linha que precisa.

---

## 2. Crítica do layout atual (print em anexo)

| Problema | Por quê incomoda |
|---|---|
| Banner com foto de banco de imagens (mão + maquete de casa) | Zero relação com o produto real da Petry; é o mesmo erro que o Hero antigo já cometia e foi corrigido lá |
| Texto "Do projeto à entrega..." cozido no PNG | Não é acessível, não é indexável, não pode ser editado sem reabrir o arquivo de imagem |
| 4 banners de carrossel pesados: `c16.png`/`c17.png` têm **1,3MB cada**, 1920×600 | Prejudica LCP logo abaixo do Hero e da Visão Geral, que já são as duas seções mais pesadas da home |
| Marquee de 46 itens sem interação | Não é navegação, é decoração — não ajuda quem já sabe o que procura nem quem está explorando |
| Paleta emerald genérica nos pills (`cl-pill--hi`) | Mesma desconexão com `hero-*` já resolvida na Visão Geral |

---

## 3. Sistema de tokens (mesma extensão do Hero — sem paleta nova)

Reaproveita integralmente `hero-graphite` / `hero-brass` / `hero-aluminum` / `hero-ivory` e as fontes `font-display` (Space Grotesk) / `font-mono-hero` (JetBrains Mono), do mesmo jeito que a Visão Geral passou a usar. Nenhum token novo.

### Layout (conceito)

Em vez de "banner acima, marquee abaixo" (dois componentes que não conversam), a seção vira um bloco único: **cabeçalho com número real + índice filtrável**.

```
┌────────────────────────────────────────────────────────────┐
│         CATÁLOGO DE LINHAS (mono, latão)                     │
│         46 linhas. Uma distribuidora só.                     │
│    Da esquadria ao acabamento, sem trocar de fornecedor.      │
│                                                                │
│  [Todas] [Esquadrias] [Estrutural] [Vidro] [Fachada] [Outros] │  ← filtro (tabs)
│  ┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐    │
│  │Perfetta 45││ Gold   ││ Suprema ││ ... pills reais...  │    │
│  └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘    │
│  (grid que reflui, não ticker automático — some/aparece         │
│   pill por pill ao trocar de categoria, via Framer Motion,      │
│   já instalado)                                                 │
└────────────────────────────────────────────────────────────┘
```

### Assinatura

As 46 linhas já vêm agrupadas naturalmente pelo próprio catálogo da Petry — isso é o dado real que vira estrutura, em vez de indicador genérico (evita o erro de "01/02/03" que não significa nada). Grupos propostos, direto do conteúdo de `LINHAS_TICKER`/`LinhasPage.tsx`:

| Categoria | Exemplos (dos itens já existentes) |
|---|---|
| Esquadrias & Portas | Perfetta 35/40/45/55/75, Linha 25, Suprema, Gold, Trilhos |
| Estrutural & Acabamento | Perfis "U", Cantoneiras, Barras Chatas, Tubos, Contramarcos, Arremates |
| Vidro & Temperados | Vidro/Baguete/Gaxeta, Box Temperado, Temperados 8/10mm, Pele de Vidro |
| Fachada & Externo | Brises, Cercas e Portões, Lambris, Ripados, Venezianas, Policarbonato, Gradil, Fachada Cortina |
| Diversos | Conexões, Diversos |

Clicar numa categoria filtra o grid de pills (client-side, `useState`, sem chamada de rede). O número "46" no headline não é estático — calculado a partir do `.length` do array real, então se a lista crescer o texto atualiza sozinho.

Opcional (ver §8): campo de busca por texto acima do grid, pra quem já sabe o nome da linha digitar direto (ex: "gold") e filtrar sem precisar navegar pelas categorias.

---

## 4. O que sai, o que fica

- **Sai:** `BannerRotator` desta seção (as 4 imagens `c10/c5(2)/c7/c16.png` — banco de imagem genérico, pesado, com texto não acessível).
- **Sai:** scroll automático infinito do marquee.
- **Fica:** os 46 nomes de linha reais (só migram de `cl-pill` decorativo pra pill clicável/filtrável).
- **Fica:** o estilo visual do pill (glass/blur/uppercase) — só troca o destaque `emerald` por `hero-brass`, pra alinhar com o resto da home.

---

## 5. Boom visual (sem foto de banco)

Em vez do banner genérico, o "impacto visual" vem de dois lugares que já existem no repo:

1. **Fundo do cabeçalho:** mini-mosaico com 5–6 fotos reais de produto já presentes em `public/banners/produtos/` (cantoneiras, roldanas, tubos, etc. — todas fotografia real da Petry, não render nem banco de imagem), em baixa opacidade atrás do headline, com um véu grafite por cima pra manter o texto legível. Reaproveita asset existente, não pede foto nova.
2. **Transição dos pills:** ao trocar de categoria, os pills que saem/entram animam com Framer Motion (já é dependência do projeto, zero peso novo) — sensação de "boom" vem do movimento orquestrado no clique, não de imagem estática.

---

## 6. Plano de implementação (arquivos)

1. `components/site/LinhasSection.tsx` — reescrito: vira o componente único (cabeçalho + filtro + grid), absorve o papel que hoje é do `LinhasMarquee`.
2. `components/site/LinhasMarquee.tsx` — o array `LINHAS_TICKER` migra para um `lib/linhas.ts` novo, já **categorizado** (`{ nome: string; categoria: Categoria }[]`) em vez de lista plana — resolve de quebra parte do item 3 do backlog ("duplicação de dados/catálogo hardcoded"). O componente em si é removido (função dele passa a ser do novo `LinhasSection`).
3. `app/(site)/page.tsx` — remove o import de `LinhasMarquee` (não existe mais separado); `LinhasSection` continua no mesmo lugar do fluxo da home.
4. `app/globals.css` — `.cl-pill--hi` troca `rgba(16,185,129,...)` (emerald) por equivalente em `hero-brass`; `.cl-marquee`/`.cl-marquee-track`/`@keyframes clMarquee` somem (não tem mais scroll automático).

---

## 7. `BannerRotator.tsx` fica órfão — sinalizar, não apagar ainda

Depois desta mudança, `BannerRotator` não é mais usado em nenhum lugar do site (o Hero já não usa desde a Fase 1 do redesign; esta era a última seção que ainda dependia dele). Não apagar o arquivo nesta mesma tarefa — só deixar marcado no `PETRY_BACKLOG_PENDENTE.md`, item 4 ("código morto"), pra virar uma decisão separada (apagar o componente + as imagens `banners/linhas/*` e `banners/desktop/*` que só ele consumia). Mistura de escopo é exatamente o padrão que os outros docs já evitaram.

---

## 8. Performance e segurança

- **Ganho direto de peso:** remove do carregamento da home 4 PNGs de até 1,3MB (`c16.png`, `c17.png`) que hoje entram no `BannerRotator` desta seção — nenhuma imagem nova entra no lugar (o mosaico do §5 reusa fotos de produto já existentes e pequenas).
- **Menos JS:** sai o `setInterval` do carrossel + toda a lógica de touch/swipe do `BannerRotator`; entra só um `useState` de categoria ativa — troca líquida, não soma.
- Nenhuma dependência nova obrigatória. Framer Motion já está instalado (usado no Hero).
- Se decidir pela busca por texto (§3, opcional): dá pra fazer só com `.filter()` de string simples, sem lib — só considerar uma lib tipo `fuse.js` (~3kb) se quiser tolerância a erro de digitação/acento. Não é necessário pro MVP.
- Validar ao final: `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev` (mesma régua das outras duas implementações).
- Nenhum dado sensível envolvido (lista de produtos é conteúdo público); sem novo `dangerouslySetInnerHTML`, sem novo link externo além dos que já existem.

---

## 9. Decisões que faltam sua confirmação antes de implementar

| Pergunta | Opções |
|---|---|
| Campo de busca por texto além dos filtros por categoria | Sim, incluir vs. só os filtros por categoria (mais simples) |
| Nomes/quantidade das 5 categorias propostas em §3 | Confirmar como estão vs. ajustar (você conhece o catálogo melhor que eu — pode ter linha que classifiquei errado) |
| `BannerRotator.tsx` e as imagens órfãs de `banners/linhas/`/`banners/desktop/` | Só sinalizar no backlog (recomendado) vs. já apagar nesta mesma tarefa |
| Fotos do mosaico de fundo (§5) | Posso sugerir 5–6 específicas de `banners/produtos/` no próprio prompt do Claude Code, ou prefere escolher você antes |

---

## Status: implementada, depois substituída

Implementado como planejado: `lib/linhas.ts` criado com as 46 linhas categorizadas, `LinhasSection.tsx` reescrito como índice único (mosaico de 6 fotos de `banners/produtos/`, chips de categoria, busca por texto incluída, grid animado via Framer Motion), `LinhasMarquee.tsx` removido, `.cl-pill--hi` migrado pra `hero-brass`. `BannerRotator.tsx` e as imagens órfãs de `banners/linhas/`/`desktop/` sinalizados no `PETRY_BACKLOG_PENDENTE.md`, não apagados.

**Depois substituído**: `docs/PETRY_TUBOS_SHOWCASE_REDESIGN.md` (e sua evolução, `PETRY_TUBOS_SKYLINE_REDESIGN.md`) trocou essa seção inteira da home pela vitrine técnica de tubos — o índice de 46 linhas deixou de fazer sentido como conteúdo de destaque da home (virou "índice enciclopédico" no lugar de "conteúdo de impacto"). `LinhasSection.tsx` e `lib/linhas.ts` continuam no repo, mas o import em `app/(site)/page.tsx` está comentado (mesmo padrão do `AcabamentosSection`) — candidatos a sinalizar no backlog como código não mais renderizado na home.
