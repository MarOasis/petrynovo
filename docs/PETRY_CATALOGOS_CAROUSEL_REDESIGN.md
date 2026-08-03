# PETRY DISTRIBUIDORA — Redesign da seção "Explore nossos catálogos" (home): Documento de Direção Criativa

**Objetivo:** reimaginar `components/site/CatalogosCinematic.tsx` — o carrossel "Explore nossos catálogos" da home — alinhando com a identidade `hero-*` já em uso no Hero/Visão Geral/Linhas, trocando as capas por um render genérico repetido pelas capas reais do catálogo, e corrigindo um funil quebrado: hoje o CTA tira o visitante do site direto pro Google Drive, sem passar pela página `/catalogos` que já existe e é melhor pra conversão.

**Escopo:** só `components/site/CatalogosCinematic.tsx`. Não mexe em `/catalogos` (`CatalogosGrid.tsx`) nem em `ProdutosHero.tsx` — só sinaliza a sobreposição entre os três (§4).

**Como usar este arquivo:** mesma dinâmica dos três anteriores — cola no Claude Code dentro do repo.

---

## 1. Fundamentação

Diferente das seções anteriores, essa aqui **não tem um problema de assunto errado** — Ken Burns sutil + film grain + capa de catálogo é uma ideia de assinatura que já faz sentido pro produto (é literalmente um catálogo impresso, a sensação de "abrir um material físico" é apropriada, mantém). O problema é mais cirúrgico: paleta fora do sistema, capas que não são o documento real, e um CTA que joga a pessoa pra fora do site antes da hora.

**As capas usadas aqui (`ctg-perfil.jpg`, `ctg-perfetta.jpg`, `ctg-ace1.jpg`, `ctg-tecnico.jpg`) não são a capa real do catálogo — são um render de "flat lay" genérico** (mockup de tablet/livro com a palavra "LINHA COMPLETA" por cima), **repetido de forma idêntica pros 4 catálogos**, só trocando a foto pequena dentro do mockup. Isso é o mesmo problema de fundo que o Hero antigo tinha e a Visão Geral também tinha: um template reaproveitado no lugar do material real.

**A boa notícia: a capa real já existe no repo.** `public/banners/catalogos/capa1.jpg`, `capa2.png`, `capa3.jpg`, `capa4.png` são usadas em `CatalogosGrid.tsx` (a página `/catalogos`) — são a capa de verdade de cada PDF, retrato, sem mockup por cima. É mais autêntico e também resolve a inconsistência de ter duas fotos diferentes representando o mesmo catálogo em duas páginas do site.

---

## 2. Crítica do layout atual (print em anexo)

| Problema | Por quê incomoda |
|---|---|
| Paleta `emerald-*` nos dots, ring de destaque e botão | Desconectada de `hero-*`, mesmo padrão já corrigido nas outras 3 seções |
| Capas `ctg-*.jpg`: mockup genérico repetido, não é o documento real | Foge do material real da marca — a mesma "moldura de tablet" aparece nos 4 catálogos, só troca a foto miniatura lá dentro |
| CTA "Explorar catálogo →" abre direto o Google Drive (`target="_blank"`) | Tira o visitante do site sem ele nunca ver `/catalogos`, que já tem descrição de cada catálogo + botão de WhatsApp — a home devia ser um teaser pra essa página, não um atalho que pula ela |
| Mesmos 4 catálogos, 3 lugares diferentes do site (`CatalogosCinematic` na home, botões dentro de `ProdutosHero.tsx`, grid completo em `/catalogos`) | Três componentes mantendo a mesma lista de links do Drive de forma independente — se um link mudar, tem que lembrar de atualizar em 3 lugares |
| Thumbnails column com scroll interno (`lg:max-h-[420px]`) | Funciona, mas é mais estrutura de UI do que o conteúdo (só 4 itens) precisa |

---

## 3. Sistema de tokens e mudanças (reaproveitando o Hero)

Sem paleta nova. Troca direta:

| Onde | Hoje | Depois |
|---|---|---|
| Dots de navegação | `bg-emerald-400` / `bg-white/35` | `bg-hero-brass` / `bg-hero-aluminum/35` |
| Ring de destaque na thumbnail ativa | `ring-emerald-400/45` | `ring-hero-brass/50` |
| Radial glow de fundo | `rgba(16,185,129,.18)` | `rgba(201,169,97,.14)` (mesmo valor já usado na Visão Geral) |
| Botão "Explorar catálogo" | `bg-emerald-500` | mantém verde — é o único CTA desta seção e não é WhatsApp, então pode virar contorno `hero-brass` pra não competir visualmente com o verde que already significa "WhatsApp" em todo o resto do site (ver §8 dos docs anteriores) |
| Eyebrow "Catálogos" / título | fonte padrão | `font-mono-hero` no eyebrow, `font-display` no título — mesmo tratamento já aplicado na Visão Geral e no índice de Linhas |
| Capas do carrossel | `ctg-perfil.jpg` / `ctg-perfetta.jpg` / `ctg-ace1.jpg` / `ctg-tecnico.jpg` (mockup genérico) | `capa1.jpg` / `capa3.jpg` / `capa2.png` / `capa4.png` (capa real, mesma usada em `/catalogos`) |

**Atenção ao trocar a proporção:** as capas atuais são paisagem (1200×600, ratio ~2:1) porque foram feitas pro mockup. As capas reais são retrato (1600×2236, ratio ~3:4, é a proporção natural de uma folha de catálogo). O palco principal (`aspect-[16/8.6]`) precisa mudar pra uma proporção retrato ou um formato "livro aberto" (capa + faixa lateral) — ver wireframe abaixo — não dá pra só trocar o arquivo de imagem sem ajustar o container, ou a capa fica cortada de forma estranha.

### Layout (conceito revisado)

```
┌──────────────────────────────────────────────────────────────┐
│  CATÁLOGOS (mono, latão)                          ● ○ ○ ○     │
│  Explore nossos catálogos                                      │
│                                                                  │
│  ┌───────────────┐   ┌──────────────────────────────┐         │
│  │               │   │ Catálogo de Perfis — 2026      │         │
│  │  capa real    │   │                                 │         │
│  │  (retrato,    │   │ [thumb] [thumb] [thumb] [thumb] │         │
│  │  capa1.jpg)   │   │  (4 miniaturas em linha, sem     │         │
│  │               │   │   scroll — só 4 itens)           │         │
│  │  Ken Burns +  │   │                                 │         │
│  │  film grain   │   │ [← →]      [Ver todos os        │         │
│  │  (mantido)    │   │             catálogos →]         │         │
│  └───────────────┘   └──────────────────────────────┘         │
└──────────────────────────────────────────────────────────────┘
```

CTA principal muda de nome e destino: **"Ver todos os catálogos →"** (em vez de "Explorar catálogo →") apontando pra `/catalogos` (rota interna do Next, `<Link>`), não mais direto pro Google Drive. A pessoa chega na página que já tem a descrição de cada catálogo e o botão de WhatsApp — o carrossel da home vira uma vitrine/convite, a página `/catalogos` é quem entrega o link real de download. Isso também remove a necessidade de guardar as 4 URLs do Drive dentro deste componente — ele passa a só precisar do nome e da capa de cada catálogo, a lista de links fica centralizada em um único lugar (`CatalogosGrid.tsx`).

---

## 4. Sobreposição com outros componentes (sinalizar, não resolver aqui)

Encontrei os mesmos 4 links do Google Drive hardcoded em **3 lugares**: `CatalogosCinematic.tsx` (este), `components/site/produtos/ProdutosHero.tsx` (4 botões) e `components/site/catalogos/CatalogosGrid.tsx`. Com a mudança do §3 (o carrossel da home deixa de guardar link direto), sobra 2 lugares. Vale considerar depois — **fora do escopo desta tarefa** — centralizar essa lista em `lib/catalogos.ts` (mesmo padrão sugerido pro `lib/linhas.ts` no documento anterior), pra mudar uma URL do Drive em um lugar só. Anotar no `PETRY_BACKLOG_PENDENTE.md`, não implementar agora.

---

## 5. Assets órfãos depois da troca

Se a troca de capas do §3 for feita, `ctg-perfil.jpg`, `ctg-perfetta.jpg`, `ctg-ace1.jpg` e `ctg-tecnico.jpg` (o mockup genérico) ficam sem uso em lugar nenhum do site. Mesmo tratamento do `BannerRotator` no documento anterior: sinalizar no backlog como candidatos a remoção, não apagar dentro desta tarefa.

---

## 6. Performance e segurança

- **Atenção a um trade-off real:** as capas novas (`capa1.jpg` a `capa4.png`) são mais pesadas que as atuais — `capa2.png` (425KB) e `capa4.png` (477KB) especialmente, por serem PNG em vez de JPG. O `next/image` já otimiza no build/request (o projeto tem `sharp` instalado), então o peso final entregue ao navegador não é o do arquivo fonte — mas ainda assim vale converter `capa2.png`/`capa4.png` pra JPG comprimido na origem, já que não têm transparência e não precisam ser PNG. Baixo esforço, ganho direto, e resolve uma linha a mais do item 2 do backlog de performance.
- CTA "Ver todos os catálogos" via `<Link href="/catalogos">` (navegação interna do Next, sem `target="_blank"`) é mais rápido que abrir uma aba nova pro Drive — usa prefetch automático do Next.
- Nenhuma dependência nova.
- Ken Burns/film grain/autoplay continuam como estão — já respeitam `prefers-reduced-motion` e já pausam fora da viewport (`useInView`); nenhuma mudança necessária aí.
- Validar ao final: `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev`.

---

## 7. Decisões que faltam sua confirmação antes de implementar

| Pergunta | Opções |
|---|---|
| Trocar capas do mockup genérico pelas capas reais (§3) | Confirmar — acho que sim, mas é sua marca, você decide se prefere manter o mockup "flat lay" |
| CTA principal mudar de "abrir Drive direto" pra "levar pra `/catalogos`" | Confirmar — isso muda o funil (a pessoa não baixa o PDF direto da home mais, passa pela página primeiro) |
| Converter `capa2.png`/`capa4.png` pra JPG agora, junto desta tarefa, ou deixar pro backlog de performance geral | Junto agora (baixo risco, arquivo já existe) vs. depois |
| Centralizar os 4 links do Drive em `lib/catalogos.ts` | Fazer nesta tarefa também vs. deixar só sinalizado no backlog (recomendado, pra não misturar escopo) |

---

## Status: concluída

As 4 decisões do §7 confirmadas: capas reais (`capa1.jpg`/`capa3.jpg`/`capa2.jpg`/`capa4.jpg`), CTA principal virou `<Link href="/catalogos">Ver todos os catálogos →</Link>` (sem `target="_blank"`, navegação interna), `capa2.png`/`capa4.png` convertidos pra JPG comprimido via `sharp` nesta mesma tarefa (425KB→165KB e 477KB→152KB, PNGs originais removidos), centralização dos links do Drive só sinalizada no backlog (não implementada), conforme recomendado.

`CatalogosCinematic.tsx` migrado pra `hero-*`, palco trocado de paisagem (`16/8.6`) pra retrato (`aspect-[3/4]`, capa grande + coluna de thumbs em linha). Mockups órfãos (`ctg-*.jpg`) e a duplicação restante de links (`ProdutosHero.tsx`/`CatalogosGrid.tsx`) sinalizados em `PETRY_BACKLOG_PENDENTE.md`.

Validado com `tsc --noEmit`, `npm run build` e teste no navegador — inclusive o funil completo (clique no CTA da home navega client-side pra `/catalogos`, que exibe as mesmas capas reais).
