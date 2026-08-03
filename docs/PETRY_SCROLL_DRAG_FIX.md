# PETRY DISTRIBUIDORA — Corrigir o scroll da fileira de tubos: Documento de Direção Criativa

**Objetivo:** consertar a rolagem da faixa de miniaturas em `components/site/linhas/TubosShowcase.tsx` — hoje, com mouse comum (sem trackpad), não dá pra rolar de jeito nenhum. Adicionar arraste com o clique do mouse (drag-to-scroll), rolagem pela roda do mouse, e um aviso visual pra quem não vai adivinhar que dá pra arrastar.

**Escopo:** só a interação de scroll da faixa `.strip`. Não mexe em layout, cores nem nos dados dos tubos.

---

## 1. Causa provável do bug

Isso é efeito colateral direto do documento anterior (`PETRY_SCROLLBAR_TUBOS.md`, Opção B): escondemos a scrollbar nativa do sistema (`scrollbar-width: none` + `::-webkit-scrollbar{display:none}`) pra ficar visualmente consistente em qualquer aparelho. Isso resolveu a estética, mas **tirou a única forma de rolar que um mouse comum tinha** — sem trackpad (gesto de dois dedos) e sem touch (celular), a pessoa não tem como mover uma `overflow-x: auto` só com o mouse, porque a barra que dava pra arrastar sumiu e nada foi colocado no lugar dela pra continuar permitindo o gesto.

Ou seja: a barra ficou bonita, mas ficou também a única forma de interação — e ela sumiu sem um substituto funcional. Precisa de uma forma de mover o conteúdo que não dependa de scrollbar nenhuma.

---

## 2. A correção: 3 formas de mover, nenhuma depende da scrollbar

### a) Arrastar com o clique do mouse (a principal)

Usa Pointer Events (uma API só cobre mouse, caneta e touch — mas aqui vamos ignorar `pointerType === 'touch'` de propósito, pra não atrapalhar o gesto nativo de touch que já funciona sozinho no celular):

```tsx
const stripRef = useRef<HTMLDivElement>(null);
const dragState = useRef({ down: false, startX: 0, startScroll: 0 });

function onPointerDown(e: React.PointerEvent) {
  if (e.pointerType === 'touch') return; // touch já rola nativo, não interceptar
  const el = stripRef.current;
  if (!el) return;
  dragState.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
  el.setPointerCapture(e.pointerId);
  el.classList.add('is-dragging');
}

function onPointerMove(e: React.PointerEvent) {
  if (!dragState.current.down) return;
  const el = stripRef.current;
  if (!el) return;
  const dx = e.clientX - dragState.current.startX;
  el.scrollLeft = dragState.current.startScroll - dx;
}

function endDrag() {
  dragState.current.down = false;
  stripRef.current?.classList.remove('is-dragging');
}
```
```jsx
<div
  ref={stripRef}
  className="strip"
  onPointerDown={onPointerDown}
  onPointerMove={onPointerMove}
  onPointerUp={endDrag}
  onPointerLeave={endDrag}
  onPointerCancel={endDrag}
>
```

```css
.strip {
  cursor: grab;
  touch-action: pan-x; /* deixa o navegador cuidar do swipe nativo no touch */
  user-select: none;   /* não selecionar texto dos cards durante o arraste */
}
.strip.is-dragging {
  cursor: grabbing;
}
```

### b) Roda do mouse rola na horizontal

Quem tem mouse comum (sem trackpad) normalmente só tem roda vertical. Convertendo o `deltaY` da rolagem vertical em movimento horizontal, a pessoa nem precisa descobrir que dá pra arrastar:

```tsx
useEffect(() => {
  const el = stripRef.current;
  if (!el) return;

  function onWheel(e: WheelEvent) {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // já é gesto horizontal, não mexe
    el!.scrollLeft += e.deltaY;
    e.preventDefault();
  }

  // precisa ser addEventListener manual com passive:false —
  // o onWheel do JSX no React 17+ é passive por padrão e preventDefault() não funciona nele
  el.addEventListener('wheel', onWheel, { passive: false });
  return () => el.removeEventListener('wheel', onWheel);
}, []);
```

**Atenção nesse detalhe:** se o Claude Code tentar resolver só com `onWheel={...}` direto no JSX, o `e.preventDefault()` pode não segurar a rolagem da página por trás — desde o React 17 os listeners de wheel/touch são passive por padrão nos elementos gerenciados pelo React. Por isso o snippet acima usa `addEventListener` manual dentro de um `useEffect`, que permite `{ passive: false }` de verdade.

### c) Touch no celular

Já funciona nativamente (é `overflow-x: auto` normal) — só não interceptar com o pointer handler do item (a), que já está resolvido com o `if (e.pointerType === 'touch') return`.

---

## 3. Avisar quem não vai adivinhar

Um texto pequeno, discreto, que some depois da primeira interação:

```
↔ Arraste para ver todas as bitolas
```
- Posição: alinhado à direita da fileira, mesmo estilo do `.strip-label` que já existe ali (mono, `hero-aluminum`).
- Lógica de sumiço: um `useState<boolean>` que vira `false` no primeiro `onPointerDown` ou no primeiro evento de `scroll` da faixa — depois que a pessoa já arrastou uma vez, não precisa mais do aviso.
- Reforça com o fade nas bordas que já estava no documento anterior — a combinação "texto + fade" deixa claro que tem mais conteúdo, sem depender só de scrollbar visível.
- Se quiser um empurrãozinho a mais: um leve `translateX` de ida e volta (2-3px, meio segundo) só uma vez ao carregar a seção, pra chamar atenção pro gesto — respeitando `prefers-reduced-motion` (pula direto pro estado final se a pessoa pediu menos movimento).

---

## 4. A trilha customizada do documento anterior — o que fazer com ela

Se já foi implementada, mantém — mas ela deveria refletir o `scrollLeft` real durante o arraste também (não só durante `wheel`/touch), então o mesmo `useEffect` que escuta `scroll` no item (b) é quem atualiza a posição da trilha, cobrindo os 3 jeitos de mover de uma vez só:

```tsx
useEffect(() => {
  const el = stripRef.current;
  if (!el) return;
  function onScroll() {
    const max = el!.scrollWidth - el!.clientWidth;
    setScrollPct(max > 0 ? el!.scrollLeft / max : 0);
  }
  el.addEventListener('scroll', onScroll, { passive: true });
  return () => el.removeEventListener('scroll', onScroll);
}, []);
```

---

## 5. Performance e acessibilidade

- Pointer Events é uma API nativa do navegador, sem lib nova.
- `{ passive: false }` só no listener de `wheel` (que precisa bloquear o padrão às vezes); o de `scroll` fica `passive: true` (só lê, nunca bloqueia) — não pesa na rolagem.
- `user-select: none` fica só na `.strip`, não no resto da página, então não atrapalha quem quer selecionar texto normal em outro lugar.
- Continua dando pra navegar por teclado (setas, com a `.strip` focável via `tabIndex={0}`) — arraste é um complemento, não substitui o teclado.

---

## 6. Decisão

| Pergunta | Opções |
|---|---|
| Texto do aviso | "Arraste para ver todas as bitolas" (sugestão) vs. outro texto |
| Animação de dica no carregamento (leve vai-e-volta) | Incluir vs. só o texto estático, sem animação |

---

## Status: implementada, depois removida

Implementado como especificado: arraste via Pointer Events (ignorando `pointerType === "touch"`), roda do mouse convertendo `deltaY` em `scrollLeft` via `addEventListener("wheel", ..., { passive: false })`, texto "↔ Arraste para ver todas as bitolas" (sugestão do documento) que some após a primeira interação, sem a animação de dica no carregamento.

Validado disparando `PointerEvent`/`WheelEvent` reais via JS, já que o simulador de clique-arrasto do Chrome DevTools Protocol não dispara Pointer Events — confirmado que `scrollLeft` respondia corretamente aos 3 métodos.

**Removido por completo** em `docs/PETRY_TUBOS_SKYLINE_REDESIGN.md` — sem scroll horizontal, não existe mais nada pra arrastar ou rolar com a roda do mouse.
