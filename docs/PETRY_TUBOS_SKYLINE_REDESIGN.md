# PETRY DISTRIBUIDORA — Refazer a seção de tubos sem scroll horizontal: Documento de Direção Criativa

**Objetivo:** manter a ideia que já validou e gostou — os tubos desenhados em escala real, clicáveis, com cotas no detalhe — mas tirar o scroll horizontal de dentro da equação. Depois de 3 rodadas de correção na mesma faixa (scrollbar, drag, fade grudando no card) o problema não é mais "um bug específico", é a abordagem: uma faixa que rola por arraste tem gente demais de peça em movimento (pointer events, wheel, fade posicionado certo, threshold de drag vs. clique) pra algo que devia ser só "mostrar 16-30 formas geométricas". Troca de abordagem, não mais um remendo.

**Escopo:** `components/site/linhas/TubosShowcase.tsx` inteiro (a parte da fileira). Os dados (`lib/tubos.ts`) e o painel de detalhe com o desenho grande cotado continuam exatamente como estão — só a fileira que rola muda de estrutura.

---

## 1. Por que sem scroll (e por que não virar "só uma grade qualquer")

Sem scroll horizontal elimina de uma vez toda a classe de bug que a gente vem perseguindo: não tem mais `overflow-x`, não tem mais pointer capture, não tem mais wheel listener disputando com o scroll da página, não tem mais fade que pode grudar em lugar errado. É o navegador fazendo o que ele já sabe fazer sozinho (`flex-wrap`), sem JS de interação de arraste nenhum.

Mas você pediu "nada tão simples também" — e uma grade comum (cards do mesmo tamanho, um do lado do outro) perderia exatamente a parte que você gostou: a sensação de ver o tamanho real de cada bitola. A solução: manter os desenhos em tamanhos proporcionais de verdade (raiz quadrada, do ajuste anterior), só que agora **organizados numa "escada"/skyline** — todos alinhados numa linha de base comum, tamanhos crescendo da esquerda pra direita, quebrando linha automaticamente quando não cabe mais (sem scroll, sem drag, o navegador quebra a linha sozinho).

Isso não é mais simples que a faixa rolável — é uma leitura visual diferente e, honestamente, mais informativa: em vez de esconder a maioria das bitolas fora da tela até a pessoa arrastar, o "skyline" já entrega a comparação de tamanho inteira num golpe só, tipo um perfil de linha do horizonte onde cada prédio é uma bitola.

---

## 2. Layout (conceito)

```
┌──────────────────────────────────────────────────────────────┐
│  TUBOS · TABELA TÉCNICA                                        │
│  Da bitola ao peso, sem sair do site                            │
│                                                                    │
│  [Retangulares]   [Quadrados]   [Redondos]                       │
│                                                                    │
│   ▁  ▂  ▃  ▃  ▄  ▄  ▅  ▅  ▅  ▆  ▆  ▇  ▇  █  █  █                  │  ← todas as bitolas
│  ─────────────────────────────────────────────────  linha base   │     alinhadas na base,
│  (quebra pra 2ª/3ª linha sozinho se não couber tudo)              │     crescendo em ordem
│                                                                    │
│  ┌──── selecionado: TG-210 ─────────────────────────────┐       │
│  │  [desenho grande cotado — igual já está]                │       │
│  └──────────────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

- As bitolas ficam **ordenadas por tamanho crescente** (menor primeiro) — isso faz a leitura da esquerda pra direita já contar a história, sem precisar de nenhuma instrução tipo "arraste para ver mais".
- `align-items: flex-end` no container: todo mundo encostado na mesma linha de base, só a altura de cada forma varia — é isso que cria o efeito skyline.
- `flex-wrap: wrap`: quando não cabe mais uma bitola do lado da outra, quebra pra próxima linha sozinho. Em mobile, isso naturalmente vira 2-3 por linha em vez de 6-8 — sem precisar de nenhum media query especial de scroll.

---

## 3. Código (substitui a fileira, mantém o resto)

```tsx
// ordenar por tamanho crescente uma vez só, fora do render
const itemsOrdenados = [...fam.items].sort((a, b) => a.a - b.a);
```

```css
.skyline {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;   /* a base comum — é o que cria o efeito escada */
  gap: 16px;
  padding: 20px 0 0;
  border-bottom: 1px solid rgba(174,180,178,.15); /* a "linha do chão" */
}

.skyline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: none;
  border: none;
}

.skyline-shape {
  background: linear-gradient(160deg, rgba(174,180,178,.4), rgba(174,180,178,.14));
  border: solid var(--hero-aluminum);
  border-radius: 2px;
  transition: border-color .18s ease, background .18s ease;
}

.skyline-item.active .skyline-shape {
  border-color: var(--hero-brass);
  background: linear-gradient(160deg, rgba(201,169,97,.55), rgba(201,169,97,.2));
}

.skyline-code {
  font-family: var(--font-mono-hero);
  font-size: 10.5px;
  color: rgba(237,239,236,.6);
}
.skyline-item.active .skyline-code { color: var(--hero-brass); }
```

O cálculo de tamanho (raiz quadrada, piso mínimo de 22px, espessura de traço proporcional) é exatamente o mesmo do ajuste anterior — só o container em volta que troca de `overflow-x-auto` pra `flex-wrap`. **Todo o código de drag (`onPointerDown`/`onPointerMove`), o listener de `wheel`, e o `.strip-fade` das bordas saem do componente** — não tem mais nada rolando, então não tem mais nada disso pra fazer.

---

## 4. O painel de detalhe (não muda)

Continua igual: clica numa forma do skyline, abre o painel grande com o desenho cotado (A/B/E ou Ø), pesos, e o botão de WhatsApp com o código da bitola. Nenhuma mudança aqui — essa parte nunca teve bug, só a fileira de cima.

---

## 5. Performance, robustez e acessibilidade

- **Bug surface bem menor**: zero JS de interação de scroll (nem pointer, nem wheel, nem cálculo de posição de fade) — só cálculo de tamanho (que já existia) e ordenação (`Array.sort`, uma linha).
- Navegação por teclado fica mais simples também: cada `.skyline-item` é um `<button>` normal, focável na ordem natural do DOM (tab), sem precisar de nenhum tratamento especial de "setas movem o scroll".
- `flex-wrap` é suportado por qualquer navegador desde sempre — não tem risco de comportamento diferente entre desktop/mobile, que era exatamente o problema raiz do scroll (Documento `PETRY_SCROLL_DRAG_FIX.md`, §1).
- Validar: `npx tsc --noEmit`, `npm run build`, e testar visualmente redimensionando a janela — a quebra de linha tem que acontecer suave em qualquer largura, sem nenhuma bitola cortada.

---

## 6. O que remover do código atual

Pra não sobrar código morto disputando com a abordagem nova:
- `stripRef`, `dragState`, `onPointerDown`/`onPointerMove`/`endDrag`
- O `useEffect` do listener de `wheel`
- `.strip-fade`, `.strip-wrap`, `strip-fade--left/right` e o CSS relacionado
- O texto de aviso "↔ Arraste para ver todas as bitolas" (não faz mais sentido, não tem mais arraste)

---

## 7. Decisão

| Pergunta | Opções |
|---|---|
| Ordem crescente (menor → maior, recomendado) vs. mantém a ordem original do catálogo (por código) | Crescente conta a história visual sozinha; por código é mais "tabela", mas perde o efeito skyline |
| Base do skyline: linha simples (`border-bottom`) ou algo mais desenhado (tipo régua com marcações) | Linha simples é mais limpo; régua com marcações reforça ainda mais o tema de medidas, mas é mais um elemento pra desenhar |

---

## Status: concluída

As 2 decisões do §7 confirmadas: ordem crescente e linha de base simples (`border-bottom`).

`TubosShowcase.tsx` reescrito por completo: `stripRef`, `dragState`, os handlers de pointer, o `useEffect` do `wheel`, a trilha custom e o fade das bordas — tudo removido, conforme §6. Bitolas ordenadas por tamanho (`sort((a,b) => a.a - b.a)`), renderizadas num `flex flex-wrap items-end` com `border-bottom` como linha do chão. Tamanho de cada silhueta calculado com raiz quadrada da maior dimensão real (piso 22px, teto 100px, escolhido nesta implementação já que o documento não especificava o teto) — comprime a razão entre a menor e a maior bitola sem perder a leitura de escala. Painel de detalhe intocado, como escopado.

Validado com `tsc --noEmit`, `npm run build` (bundle menor, sem o código de drag) e teste visual nas 3 famílias — quebra automática em 2 linhas confirmada, e confirmado via `getComputedStyle` que `flex-wrap: wrap`/`align-items: flex-end` estão aplicados (o `resize_window` do ambiente de teste não afeta o viewport real neste setup, então a responsividade foi validada pelo mecanismo CSS em vez de captura visual em várias larguras).
