# PETRY DISTRIBUIDORA — Backlog Pendente

Consolidado a partir de `PETRY_SITE_REVIEW.md`, `PETRY_STABILIZATION_PACKAGE_01.md` e `PETRY_HERO_REDESIGN.md`, cruzado com o estado real do código nesta data. Lista só o que **ainda falta** — tudo que já foi resolvido nas sessões anteriores (horários, domínio, marcas, favicon, CI, robots/sitemap, JSON-LD, hero completo, seção de logística) não aparece aqui.

Cada item tem o arquivo/local exato e o que falta decidir ou fazer. Itens marcados **[negócio]** não são tarefa de código — dependem de uma resposta ou material do cliente antes de qualquer implementação.

---

## 1. Segurança

- [ ] **Upgrade Next.js/PostCSS.** `npm audit --omit=dev` confirma 2 vulnerabilidades altas nas versões atuais (`next@14.2.25`, `postcss` transitivo). Corrigir exige `next@16` (salto de 2 major versions) — recomendado como pacote próprio, testado isoladamente, **depois** de existir alguma cobertura de teste (item 4), pra dar pra validar a migração automaticamente. Não fazer junto com nenhuma outra mudança.
- [ ] **Dependências de dev desatualizadas** (`eslint`, `@typescript-eslint`, `glob`, `js-yaml`, etc. — visíveis no `npm audit` completo, sem `--omit=dev`). Menor urgência que o item acima (não afeta o site publicado, só o ambiente de build), mas vale revisar ao mesmo tempo do upgrade do Next.

*(Já resolvido: headers de segurança em `next.config.mjs` — CSP, HSTS, X-Frame-Options, etc. — adicionados e validados; nenhum segredo exposto no client; nenhum `dangerouslySetInnerHTML`/`eval` no código da aplicação.)*

---

## 2. Performance / otimização de imagem

- [ ] **`components/site/Header.tsx:21`** — a logo ainda é uma tag `<img>` pura, não `next/image`. É o único warning de lint que aparece em **todo** build do projeto (`@next/next/no-img-element`). Precisa decidir `width`/`height` fixos ou um wrapper com `fill` sem quebrar o layout do header.
- [ ] **Imagens sitewide não otimizadas.** Só os banners do hero e alguns de `desktop/`/`catalogos/` foram convertidos pra JPG comprimido/`next/image`. As pastas `public/banners/produtos/`, `public/banners/linhas/`, `public/banners/servicos/`, `public/banners/empresa/` continuam com PNGs de vários MB, sem passar por `next/image`.
- [ ] **Open Graph share image.** `app/layout.tsx` tem `title`/`description` no `openGraph`/`twitter`, mas nenhum campo `images` — quando alguém compartilha o link do site, não aparece nenhuma imagem de preview.

---

## 3. Testes e qualidade

- [ ] **Zero testes automatizados.** Nenhum test runner configurado (`jest`/`vitest`/etc.), nenhum arquivo `*.test.*`/`*.spec.*` no projeto.
- [ ] **Acessibilidade nunca testada.** Nenhuma rodada de axe/Lighthouse, nenhum teste manual de teclado ou leitor de tela.
- [ ] **`InfoCards.tsx`** (versão anterior à redesign) tinha um `catch (e: any)` — vale conferir se sobrou algum `any` solto no componente atual.
- [ ] **Duplicação de dados** — catálogo/metadata de produtos ainda aparece hardcoded em mais de um componente em vez de centralizado em `lib/`. Não quebra nada hoje, mas é a causa raiz de bugs de "esqueci de atualizar os dois lugares" (como já aconteceu com os horários, já corrigido).

---

## 4. Código morto / componentes pela metade **[decisão de negócio para maioria]**

- [ ] **`components/site/AcabamentosSection.tsx`** — pronto no código, mas comentado em `page.tsx`. Esperando fotos reais aprovadas pra ativar. **[negócio]**
- [ ] **`components/site/sobre/SobreVideo.tsx`** — comentado em `sobre/page.tsx`. Esperando vídeo real da empresa, ou confirmação de que não vai ter e o componente pode ser apagado. **[negócio]**
- [ ] **Redes sociais mortas no `Footer.tsx`** — Facebook, LinkedIn e X estão comentados com URLs placeholder (`facebook.com/`, sem perfil). Falta confirmar quais contas existem de verdade: ligar as reais, apagar o código das que não existem. **[negócio]**
- [ ] **Assets órfãos em `public/`** — `public/logo.svg`, `banners/logo/logo.png`, `banners/logo/looogo.png`, arquivos duplicados com `(1)`/`(2)` no nome. Puramente faxina, baixo risco, sem urgência.

---

## 5. Conteúdo e informações do negócio **[todos precisam de resposta/material do cliente]**

- [ ] **Razão social e CNPJ** — não aparecem em lugar nenhum do site (rodapé só tem "© PETRY"). Necessário pra um JSON-LD `LocalBusiness` completo e pra qualquer página legal futura.
- [ ] **Depoimentos/avaliações de clientes** — nenhum no site hoje; gap de credibilidade comum em site B2B.
- [ ] **Área de atendimento/entrega** — o site mostra o endereço em Joinville mas não diz explicitamente até onde a entrega cobre (só a cidade? região? todo SC?).
- [ ] **Política de privacidade / aviso legal** — inexistente no repositório inteiro. Não é urgente hoje (o site não usa cookies nem analytics), mas vira obrigatório assim que qualquer analytics, formulário ou rastreamento for adicionado.
- [ ] **Fotos/vídeo reais** — necessários pra ativar os itens 4 (Acabamentos, SobreVideo) e enriquecer a seção de Cobertura Logística (`components/site/CoberturaLogisticaSection.tsx`), que hoje é só texto — a foto do caminhão (`public/banners/hero-banner/petry_banner_10_2560x1440.jpg`) já está no repo e pronta pra uso ali, se quiser.

---

## Fora desta lista (decisão já tomada, não reabrir)

- Navbar transparente flutuando sobre o hero — avaliado e descartado (ver `PETRY_HERO_REDESIGN.md` §8).
