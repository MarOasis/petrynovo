# PETRY DISTRIBUIDORA — Nova Hero: Documento de Direção Criativa

**Objetivo:** substituir o hero atual (carrossel de 3 slides com fundo genérico tipo "burst" atrás de fotos de caminhão) por uma hero cinematográfica, única, elegante — que não pareça template nem "cara de IA" — usando o vocabulário visual real do negócio da Petry.

---

## 1. Fundamentação (o que a Petry realmente vende)

Antes de desenhar qualquer coisa, o hero precisa nascer do produto, não de um clichê de "distribuidora com caminhão". A Petry trabalha com:

- **Pele de vidro / Pele de vidro PVII** — fachadas de vidro estruturadas em alumínio
- **Brises** — palhetas de alumínio que filtram luz solar (literalmente "cortam" a luz em faixas)
- **Cercas e portões, gradil** — perfis metálicos, linhas retas, repetição modular
- **Lambris, ripados** — ripas de alumínio com espaçamento rítmico
- **Venezianas** — persianas de alumínio, luz e sombra em faixas horizontais
- **Policarbonato** — translucidez, luz difusa

**O padrão comum entre quase todos os produtos: luz atravessando alumínio em faixas/ripas.** Isso é o ouro que o hero atual está ignorando. Brise, ripado, veneziana e lambris são, na prática, a mesma ideia formal: **luz cortada em lâminas por perfis metálicos.** Esse é o ponto de partida certo para um elemento de assinatura — não é decoração, é o próprio produto.

**Público:** construtoras, arquitetos, serralherias, revendedores — B2B técnico, decisão via WhatsApp. A hero precisa comunicar precisão e qualidade de material rápido, sem enrolação, com um CTA de WhatsApp claro.

---

## 2. Crítica do hero atual

| Problema | Por quê incomoda |
|---|---|
| Fundo com "burst" radial genérico atrás dos caminhões | Visual de banco de imagem / template — não tem nada a ver com alumínio ou construção |
| 3 slides de carrossel competindo | Dilui a mensagem; usuário nunca vê a "tese" da marca em um golpe só |
| Imagem de caminhão como herói visual | Fala de logística, não do produto — é conteúdo de seção "Serviços", não de abertura |
| `<img loading="lazy">` não otimizado no LCP (já identificado no review) | Ponto técnico real que precisa ser corrigido junto da troca de imagem |

Isso não significa remover a mensagem de cobertura logística — ela continua real e importante — só não deveria ser o *primeiro* golpe visual do site.

---

## 3. Sistema de tokens (passe 1 — brainstorm)

### Paleta (mantendo e refinando a identidade já existente — preto/esmeralda/dourado — em vez de trocar por algo novo)

| Nome | Hex | Uso |
|---|---|---|
| Grafite Profundo | `#0C0F0E` | fundo base, levemente mais quente que preto puro |
| Verde Petry | `#0E3B2A` | cor de marca já usada em CTAs, mantida |
| Latão Petry | `#C9A961` | refinamento do dourado do logo — mais latão fosco, menos amarelo brilhante de banner |
| Alumínio | `#AEB4B2` | linhas, molduras, elementos técnicos (referência literal ao material) |
| Marfim | `#EDEAE2` | texto de corpo sobre fundo escuro |

Isso preserva o reconhecimento de marca (o logo já é dourado sobre preto) em vez de descartar identidade existente — só eleva a execução.

### Tipografia

- **Display (títulos):** uma grotesca técnica de traço firme, tracking largo em versalete para o "eyebrow" — remete a desenho técnico/ficha de especificação de perfil de alumínio, não a uma vitrine de moda. (Ex.: família estilo Neue Montreal / General Sans.)
- **Técnica/eyebrow/legendas:** uma monoespaçada (estilo JetBrains Mono / Söhne Mono) para pequenos rótulos técnicos — "PVII · ALUMÍNIO · SC" — reforça o caráter de material industrial de precisão sem parecer decorativo.
- **Corpo:** uma humanista sem serifa neutra e legível (Inter / Public Sans) — texto de apoio não deve competir com o display.

*Evitando o clichê:* nada de serifa alta-contraste sobre fundo creme (visual "IA" #1), nada de esmeralda-neon isolado sem paleta de apoio (visual "IA" #2), nada de layout jornal com hairlines (visual "IA" #3). A combinação preto-quente + latão fosco + mono técnica é específica da Petry, não um default.

### Layout (conceito — atualizado, direção confirmada)

**Decisão de imagem:** meio-termo entre fachada reconhecível e close cinematográfico — plano fechado o suficiente pra ter peso cinematográfico, mas ainda reconhecível como uma instalação real de alumínio.

**Decisão de navegação (referência trazida pelo Marco):** em vez do carrossel automático atual com bolinhas, um **carrossel manual por miniaturas** — o usuário controla a troca de imagem, não fica esperando auto-play. Estrutura:

- Imagem grande de fundo, full-bleed, cinematográfica (brise/veneziana/pele de vidro com luz rasante).
- Título fixo à esquerda, sobre a imagem, com gradiente sutil de contraste (não bloco sólido).
- Barra de progresso fina abaixo do título, indicando quanto tempo falta até a próxima imagem trocar (ou só como indicador visual de posição, sem auto-avanço forçado).
- Botão de CTA discreto no canto inferior esquerdo.
- No canto inferior direito: setas de navegação (‹ ›) + miniaturas quadradas das imagens disponíveis, com a ativa destacada (maior/com borda).

**A ideia forte:** os thumbnails quadrados podem funcionar como **amostras de perfil** — cada miniatura mostra um recorte de um produto diferente (brise, veneziana, pele de vidro, ripado), então trocar de imagem no hero também comunica "olha a variedade de linhas que a gente tem", sem precisar de texto extra.

```
┌────────────────────────────────────────────────────────────┐
│  ●                                              ⎯⎯   ⎯⎯     │
│                                                                │
│           [ imagem full-bleed: luz atravessando               │
│             lâminas de brise/veneziana, plano                 │
│             fechado, profundidade de campo rasa ]              │
│                                                                │
│   Luz, precisão                                                │
│   e alumínio.                                                  │
│   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  (barra de progresso)          │
│                                                                │
│  [ Falar no WhatsApp ]            ‹  [▢][▢][■▢]  ›            │
└────────────────────────────────────────────────────────────┘
```

A mensagem de "cobertura logística em SC" não desaparece — ela vira uma seção própria logo abaixo do hero (como já existe), só não abre o site.

**Navbar:** fica fixa/flutuante *sobre* a imagem do hero (mesmo padrão já usado no header atual: `sticky` + `backdrop-blur` + borda sutil `border-white/10`), não como uma barra sólida separada acima. A imagem do hero é full-bleed e ocupa a viewport inteira desde o topo, com a navbar sobreposta e legível por causa do blur — isso evita a sensação de "caixa" cortando o topo da tela e mantém o efeito cinematográfico.

### Elemento de assinatura

**As próprias lâminas do produto como dispositivo de UI.** Uma camada de "ripas" finas (CSS/SVG, cor Alumínio, opacidade baixa) sobrepostas à imagem do hero — não como decoração aleatória, mas como uma referência literal ao brise/veneziana/ripado que a empresa vende. No carregamento da página, essas lâminas giram/abrem como um brise real se abrindo, revelando a imagem por trás — um único momento orquestrado, não uma sequência de efeitos soltos. Depois disso, ficam paradas (ou com paralaxe muito sutil no scroll) — sem animação constante, respeitando `prefers-reduced-motion` com fallback de fade simples.

---

## 4. Autocrítica (passe 2 — antes de construir)

- Isso lê como "qualquer distribuidora"? Não — o motivo "luz atravessando lâminas de alumínio" é derivado diretamente do catálogo real de produtos (brise, veneziana, ripado), não é um efeito genérico aplicado por cima.
- Isso é um dos 3 defaults de "design de IA"? Não bate com nenhum dos três (não é creme+serifa, não é preto+um-acento-neon-isolado sem paleta, não é jornal com hairlines).
- O elemento de assinatura é único o suficiente pra ser lembrado? Sim — a metáfora "as lâminas se abrem e revelam a imagem" é específica e só faz sentido pra quem vende exatamente esse tipo de perfil.
- Contido o suficiente? Sim — um efeito orquestrado no load, nada de brilhos/partículas/glassmorphism adicionais competindo por atenção.

---

## 5. Necessidades de imagem/asset

Para isso funcionar, a imagem do hero precisa ser **fotografia real** de um brise/veneziana/pele de vidro com luz rasante — não uma imagem de banco genérica de "construção" e definitivamente não uma imagem gerada por IA (ficaria óbvio e contradiz o próprio pedido). Opções, em ordem de preferência:

1. Foto real de uma obra/instalação da própria Petry ou de um cliente (mais autêntico, reforça prova social).
2. Sessão de foto/still-life de um perfil de brise/veneziana da linha de produtos, com luz controlada — pode ser feita com celular bom + luz de janela à tarde, não precisa de equipamento caro.
3. Banco de imagens premium (não genérico) com direitos claros, especificamente buscando "aluminum louvers sunlight shadow" ou "brise soleil facade" — evitando qualquer imagem com marca d'água ou watermark de IA.

Vou poder gerar variações de referência visual pra alinhar o mood antes de você decidir — quer que eu busque algumas imagens de brise/veneziana com essa luz rasante pra usar como moodboard de referência?

---

## 6. Notas técnicas para implementação

- Trocar `<img loading="lazy">` do `BannerRotator` por `next/image` com `priority` na imagem do hero (resolve o achado P1-2 do review, já é uma correção necessária de qualquer forma).
- Comprimir a imagem final para WebP/AVIF antes de subir ao repositório (o review já identificou vários assets de vários MB sem compressão — não repetir o erro na imagem nova).
- Animação de abertura das lâminas: pode ser feita com GSAP (já em uso no projeto SvelteKit da Petry; para o Next.js atual, Framer Motion também resolve bem e já é comum no ecossistema React) — CSS puro com `clip-path` também é uma opção mais leve se quiser evitar dependência nova.
- Manter apenas **uma** imagem no hero (sem carrossel) — a mensagem de "cobertura logística SC" migra para a seção logo abaixo, que já existe no site.

---

## 7. Próximos passos

1. ~~Validar esse direcionamento com você (paleta, tipografia, conceito de lâminas).~~ Feito — ver §8.
2. Buscar/selecionar a imagem real (ou fazer moodboard de referência comigo). **Ainda pendente** — ver §8.
3. ~~Escrever o componente do novo hero.~~ Feito — ver §8.

---

## 8. Implementação — Fase 1 (Claude Code)

**Status: construído e validado, rodando localmente. Não commitado, não publicado.**

Decisões tomadas com o Marco antes de implementar (as 3 que ficavam em aberto no §7 original):

| Decisão em aberto | Resolução |
|---|---|
| Imagem real de brise/veneziana (§5) | Ainda não existe. Usado como placeholder temporário o único asset do repo que é literalmente lâminas de alumínio: `public/banners/desktop/Banner2.png` (render "Muxarabi", não foto). Cropado (`object-position` deslocado pra direita) e escurecido com gradiente pra esconder o texto de marketing já embutido na imagem. Trocar por `HERO_IMAGE` em `components/site/Hero.tsx` assim que a foto definitiva existir — nenhum outro código precisa mudar. |
| Tipografia paga (Neue Montreal / Söhne Mono) | Substituída por equivalentes gratuitos via `next/font/google`, self-hosted pelo Next (sem chamada externa): **Space Grotesk** (display) e **JetBrains Mono** (eyebrow técnico). Aplicadas só dentro do `Hero.tsx` — o resto do site mantém a fonte atual, sem mudança global. |
| Animação das lâminas (GSAP/Framer Motion/CSS) | **Framer Motion** (nova dependência, `^12.43.0`). `npm audit --omit=dev` confirmou zero vulnerabilidades novas em produção introduzidas por ela. |

### O que foi construído
- `components/site/Hero.tsx` (novo) — hero full-bleed, uma imagem só (sem carrossel), eyebrow mono + headline display + CTA WhatsApp (mesmo número usado no resto do site), lâminas animadas na entrada via Framer Motion (`useReducedMotion()` respeitado — pula a animação e mostra o hero já "aberto" para quem pede movimento reduzido).
- `lib/fonts.ts` (novo) — setup das duas fontes via `next/font/google`.
- `tailwind.config.ts` — novo grupo de cor `hero` (graphite/brass/aluminum/ivory, aditivo, não mexe no `brand` esmeralda existente) e duas entradas em `fontFamily` (`display`, `mono-hero`), tudo escopado ao hero.
- `app/(site)/page.tsx` — troca `<BannerRotator priority />` por `<Hero />` no mesmo wrapper full-bleed já existente.

### O que ficou fora desta fase (deliberadamente)
- **Foto real do produto.** Continua sendo o maior bloqueador — o placeholder atual é um render de catálogo, não a fotografia cinematográfica que o documento pede em §5.
- **Carrossel manual por miniaturas** (§3). Exige múltiplas fotos reais coerentes entre si, que ainda não existem — fica pra quando a foto definitiva chegar.
- **Mensagem "Cobertura logística em SC".** O documento original presumiu que ela migraria pra "uma seção própria logo abaixo do hero (como já existe)" — na prática **essa seção não existe** na home (conferido por busca no código). A mensagem foi removida do hero e não recriada em nenhum lugar. Fica em aberto: criar uma seção nova pra ela, incorporá-la em algum lugar já existente (ex: InfoCards, Serviços), ou descartá-la — decisão de negócio, não técnica.
- **`Header.tsx` não foi tocado.** Ele já é `sticky` + `backdrop-blur` + fundo translúcido, o que já entrega a leitura "navbar sobre a imagem" pedida no documento, sem precisar tornar um componente usado nas outras 6 páginas do site condicional/transparente por conta de uma página só.
- **`BannerRotator.tsx` não foi tocado** — segue em uso em `LinhasSection.tsx` (carrossel "Persiana Integrada" etc., mais abaixo na home), fora do escopo deste pedido.

### Validação
- `npx tsc --noEmit` e `npm run build` limpos.
- `npm audit --omit=dev` inalterado (2 altas pré-existentes em `next`/`postcss`, nada relacionado a esta mudança).
- Testado em `next build && next start` local via navegador: hero carrega, animação das lâminas dispara uma vez, sem texto de marketing vazando por trás, CTA do WhatsApp funciona, console limpo (sem erro de CSP — a CSP de produção não tem `unsafe-eval` e o Framer Motion não precisou dele), `/linhas` conferida sem efeito colateral (usa `BannerRotator`, componente separado).
- Impacto de bundle: rota `/` foi de 108 kB → 148 kB de First Load JS (+40 kB, só nessa rota — as outras 6 páginas do site continuam exatamente como estavam).
- Revisão de segurança (skill `security-review`) rodada sobre o diff completo desta fase: nenhum achado.
