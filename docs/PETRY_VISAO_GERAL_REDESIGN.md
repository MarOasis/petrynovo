# PETRY DISTRIBUIDORA — Redesign da seção "Visão Geral": Documento de Direção Criativa

**Objetivo:** reimaginar o layout de `components/site/VisaoGeralSection.tsx` (seção que aparece logo abaixo do Hero na home) para que ela deixe de parecer um bloco genérico "cards escuros com hairline" e passe a se ler como continuação do sistema visual já validado no Hero (`docs/PETRY_HERO_REDESIGN.md`) — grafite, latão, alumínio, tipografia técnica.

**Escopo:** só `VisaoGeralSection.tsx` e o que for necessário em `tailwind.config.ts`/`lib/fonts.ts` para reutilizar os tokens do Hero aqui. Não mexe em `Hero.tsx`, `Header.tsx` nem nas outras seções da home.

**Como usar este arquivo:** cole este `.md` inteiro pro Claude Code no repo (`distribuidora-aluminio-site/`) e peça a implementação. As seções 4–7 já têm as decisões de design prontas; a seção 8 lista o que ainda precisa da sua confirmação antes de codar.

---

## 1. Fundamentação (por que mexer nisso)

O Hero já resolveu um problema de identidade: em vez do preto+esmeralda-neon genérico, a Petry ganhou uma paleta própria (grafite quente + latão fosco + alumínio + marfim) e uma tipografia técnica (mono para rótulos, grotesca firme para títulos) que remete a ficha de especificação de perfil, não a banner de e-commerce.

A seção "Visão Geral" é o primeiro bloco que o visitante vê *depois* do Hero — e hoje ela quebra a experiência: volta pro `emerald-950/35` padrão do Tailwind, sem nenhum traço do que acabou de aparecer 300px acima. O efeito é de duas seções feitas por pessoas diferentes, não de uma home coesa.

Além disso, o conteúdo da seção (Nossa Visão / Compromisso com o Padrão / Quem Atendemos) é, na prática, uma **declaração institucional** — o tipo de texto que em uma distribuidora técnica normalmente vive numa "ficha" ou "certificado", não num card de blog. Isso é a deixa certa pra um elemento de assinatura: os 3 blocos podem se comportar como fichas técnicas empilhadas, com um cabeçalho mono + uma marca de canto discreta — reforçando "padrão e previsibilidade" (que é literalmente o que o texto da própria seção promete) através da própria forma do componente.

---

## 2. Crítica do layout atual (print em anexo)

| Problema | Por quê incomoda |
|---|---|
| Paleta `emerald-*` do Tailwind puro, desconectada da paleta `hero-*` (grafite/latão/alumínio/marfim) já validada | Duas identidades visuais na mesma home, uma logo abaixo da outra |
| Fonte padrão do sistema nos títulos dos cards | Hero já trouxe Space Grotesk + JetBrains Mono; aqui volta pro default, perde o "ar técnico" |
| Divisor `h-px w-full bg-gradient-to-r` no rodapé de cada card | É o hairline genérico — decoração que não carrega nenhuma informação real |
| Cards são retângulos idênticos sem hierarquia entre si | Visão / Compromisso / Quem atendemos têm pesos diferentes de conteúdo, mas o layout trata os três como intercambiáveis |
| Imagem (`empresa/petr.jpeg`, fachada) não bate com o texto do overlay ("Giro alto + separação organizada" fala de estoque, não de fachada) | Foto genérica de "prédio da empresa" no lugar onde o texto pede estoque organizado |

---

## 3. Sistema de tokens (reaproveitando o Hero — passe 1)

### Paleta — reusar `hero.*` já existente em `tailwind.config.ts`, sem criar cor nova

| Nome | Hex | Uso nesta seção |
|---|---|---|
| `hero-graphite` | `#0C0F0E` | fundo dos cards/fichas (troca o `emerald-950/35`) |
| `hero-brass` | `#C9A961` | eyebrow mono, marca de canto das fichas, hover de link secundário |
| `hero-aluminum` | `#AEB4B2` | hairline fino, ícones dos segmentos em "Quem atendemos" |
| `hero-ivory` | `#EDEAE2` | corpo de texto sobre fundo escuro |
| `brand-500` (emerald já existente) | `#10B981` | **mantido só no CTA do WhatsApp** — verde ali tem função (reconhecimento do botão), não é decoração, então não vira latão |

### Tipografia — reusar `lib/fonts.ts` (já configurado, self-hosted via `next/font/google`, zero request externo novo)

- Eyebrows dos 3 cards e o eyebrow "VISÃO GERAL": `font-mono-hero` (JetBrains Mono, já existe)
- Headline da seção e título de cada card: `font-display` (Space Grotesk, já existe)
- Corpo dos parágrafos: mantém a fonte padrão do site (Inter/system), sem mudar — só o display e o mono migram

*Isso significa: nenhuma fonte nova, nenhuma dependência nova — só apontar as classes que o Hero já usa para dentro deste componente.*

### Layout (conceito)

```
┌──────────────────────────────────────────────────────────┐
│                    VISÃO GERAL (mono, latão)               │
│              Excelência em Alumínio e Acessórios            │
│                     subtítulo marfim/70                     │
├───────────────────────┬──────────────────────────────────┤
│                       │  ⌐ DESDE 1975         │
│   foto: estoque real  │  Nossa visão                       │
│   (separacao-org.jpeg)│  ...................               │
│   scrim grafite       │──────────────────────────────────  │
│   [tag] Estrutura &   │  ⌐ CONTROLE DE QUALIDADE           │
│   Estoque             │  Compromisso com o padrão           │
│   [CTA verde] [CTA    │  ...................               │
│    contorno latão]    │──────────────────────────────────  │
│                       │  ⌐ SEGMENTOS ATENDIDOS              │
│                       │  Quem atendemos                     │
│                       │  [ícones: 🔧 🪟 🏗 ⚙] + texto       │
└───────────────────────┴──────────────────────────────────┘
```

### Assinatura (o elemento que essa seção vai ser lembrada)

Cada card ganha uma **marca de canto tipo carimbo de ficha técnica**: um pequeno `⌐` (bracket de canto, feito em CSS puro com `border-top` + `border-left`, 16×16px, cor `hero-brass`) no canto superior esquerdo, alinhado com o eyebrow mono. É a mesma linguagem visual de canto de registro usada em desenho técnico/plantas — reforça "padrão" sem precisar de ícone importado. Substitui o hairline decorativo do rodapé (que não representa nada) por um elemento que representa literalmente "isto é uma especificação".

Os eyebrows mono ganham textos técnicos reais em vez de repetir o título do card:
- Card 1: `DESDE 1975` (ano de fundação da Petry — dado real da empresa, não enfeite; substitui a sugestão original `LIGA 6063 · REF. PADRÃO`, trocada a pedido do Marco)
- Card 2: `CONTROLE DE QUALIDADE`
- Card 3: `SEGMENTOS ATENDIDOS`

---

## 4. Foto do painel esquerdo — trocar o asset

O componente atual usa `/banners/empresa/petr.jpeg` (fachada). O texto do overlay fala de **estoque e separação organizada**. No repo já existe `public/banners/servicos/separacao-org.jpeg` — bate literalmente com a copy ("Giro alto + separação organizada"). Recomendo trocar para essa imagem (ou `servicos/estoque.jpeg` como segunda opção) em vez de continuar usando uma foto de fachada onde o texto fala de outra coisa.

Tratamento do scrim: replicar o gradiente do Hero (`from-neutral-950/70 via-neutral-950/20 to-transparent` já existe, ok manter) mas trocar o glow radial de `rgba(16,185,129,.20)` (emerald puro) para um tom de latão bem discreto, tipo `rgba(201,169,97,.14)` — mesma lógica do Hero, sem copiar 1:1 pra não competir com a foto.

---

## 5. Ícones "Quem atendemos" (sem dependência nova)

O projeto não tem `lucide-react` nem outra lib de ícones instalada — não vale a pena trazer uma só pra isso. Usar 4 SVGs inline simples (chave de fenda/ferramenta para serralheiro, gota/vidro para vidraceiro, prédio para construtora, engrenagem para indústria), `stroke="currentColor"` na cor `hero-aluminum`, 18×18px, ao lado dos nomes dos segmentos no card 3. Mantém o `npm audit` limpo como no Hero.

---

## 6. Plano de implementação (arquivos)

1. `components/site/VisaoGeralSection.tsx` — trocar classes `emerald-*` pelas `hero-*`, importar `heroDisplay`/`heroMono` de `lib/fonts.ts`, trocar imagem, adicionar bracket de canto + eyebrows técnicos + ícones de segmento.
2. `tailwind.config.ts` — só atualizar o comentário da cor `hero` (hoje diz "Hero-only palette... additive, does not replace `brand`") para deixar claro que agora também é usada em `VisaoGeralSection`. Não precisa criar nenhum token novo.
3. Nenhuma mudança em `lib/fonts.ts`, `Hero.tsx`, `Header.tsx` ou outras seções.

---

## 7. Performance e segurança (mesma régua usada no Hero)

- Zero dependências novas (sem lib de ícones, sem lib de animação nova — `useInView` que o componente já usa continua servindo).
- `next/image` com `sizes` correto mantido; trocar só o `src`.
- Link do WhatsApp mantém `target="_blank" rel="noreferrer"` (já está correto no código atual).
- Animação de entrada continua via CSS/Tailwind (`transition-all` + `useInView`), que já respeita `prefers-reduced-motion` dentro do próprio hook — não precisa de nada novo aqui.
- Validar ao final: `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev` (comparar com baseline pré-existente, igual foi feito nas 4 fases do Hero).

---

## 8. Decisões que faltam sua confirmação antes de implementar

| Pergunta | Opções |
|---|---|
| Foto do painel esquerdo | `servicos/separacao-org.jpeg` (recomendada, bate com o texto) vs `servicos/estoque.jpeg` vs manter `empresa/petr.jpeg` |
| Botão secundário "Ver catálogo" | contorno latão (`hero-brass`, alinhado com a nova paleta) vs manter contorno branco/neutro atual |
| Escopo do comentário em `tailwind.config.ts` | ok renomear o comentário de "Hero-only" para algo mais amplo, já que a paleta passa a valer para 2 seções? |

---

## Status: concluída

Implementado com as 3 decisões do §8 confirmadas: `servicos/separacao-org.jpeg` no painel esquerdo, botão "Ver catálogo" com contorno `hero-brass`, comentário em `tailwind.config.ts` renomeado para "Hero + Visão Geral palette".

`VisaoGeralSection.tsx` migrado para `hero-*`/`font-display`/`font-mono-hero`, cards viraram fichas técnicas com marca de canto (bracket `⌐` em CSS puro), eyebrows técnicos reais e ícones SVG inline em "Quem atendemos" (sem dependência nova).

Dois ajustes pedidos depois, numa iteração rápida:
- Eyebrow do card 1 trocado de `LIGA 6063 · REF. PADRÃO` para `DESDE 1975`.
- Travessão removido do texto de "Quem atendemos" ("...indústria — com soluções..." → "...indústria, com soluções...").

Validado com `tsc --noEmit`, `npm run build` e teste visual no navegador.
