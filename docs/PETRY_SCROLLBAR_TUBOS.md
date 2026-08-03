# PETRY DISTRIBUIDORA — Barra de rolagem da vitrine de tubos: Documento de Direção Criativa

**Objetivo:** substituir a barra de rolagem padrão do navegador na fileira horizontal de miniaturas (`components/site/linhas/TubosShowcase.tsx`, a faixa `.strip`/`overflow-x-auto` com as bitolas) por algo que combine com a identidade grafite/latão/alumínio, em vez do cinza genérico do sistema operacional.

**Escopo:** só esse trecho — a faixa de miniaturas roláveis. Nenhuma outra parte da vitrine de tubos muda.

**Como usar:** cola no Claude Code dentro do repo, na mesma sessão que já está aplicando a vitrine (ou numa nova, como você já fez).

---

## 1. O problema, rapidinho

Scrollbar de sistema operacional não obedece a paleta do site — no Windows/Chrome aparece cinza claro grosso, no Mac fica um traço fino cinza que só aparece ao rolar. Em nenhum dos dois casos combina com o resto da vitrine (grafite + latão que construímos em todas as outras seções).

**Detalhe técnico que vale saber antes de escolher a solução:** dá pra estilizar scrollbar via CSS (`::-webkit-scrollbar` no Chrome/Edge/Safari desktop, `scrollbar-color` no Firefox), mas **no celular isso não funciona** — iOS e Android usam uma scrollbar overlay do próprio sistema que ignora CSS custom quase por completo. Then, se a solução for só "estilizar a barra nativa", o site fica com cara diferente no desktop (on-brand) e no mobile (padrão do aparelho) — inconsistente, e mobile é onde a maior parte do tráfego de um distribuidor B2B local costuma vir do WhatsApp compartilhado.

---

## 2. Duas soluções, e a recomendação

### Opção A — Estilizar a scrollbar nativa (mais simples, funciona só em desktop)
```css
.strip {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: var(--hero-brass) transparent; /* Firefox */
}
.strip::-webkit-scrollbar {
  height: 5px;
}
.strip::-webkit-scrollbar-track {
  background: transparent;
}
.strip::-webkit-scrollbar-thumb {
  background: var(--hero-brass);
  border-radius: 999px;
}
.strip::-webkit-scrollbar-thumb:hover {
  background: var(--hero-aluminum);
}
```
Zero JS, 10 linhas de CSS. **Mas** no celular continua aparecendo a barra padrão do sistema (ou nenhuma, dependendo do aparelho) — a maioria dos visitantes não vê essa personalização.

### Opção B — Esconder a nativa, desenhar uma barra própria (recomendada)
Funciona igual em qualquer navegador e em qualquer aparelho, porque para de depender do que o sistema operacional deixa estilizar:

```css
.strip {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge antigo */
}
.strip::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
```
E no lugar dela, uma trilha fina desenhada por nós, com uma marca que se move proporcional ao scroll — pensei numa régua bem discreta (faz sentido temático: a seção inteira é sobre medidas):

```tsx
// dentro do componente, ao lado da .strip
const [scrollPct, setScrollPct] = useState(0);
const stripRef = useRef<HTMLDivElement>(null);

function handleScroll() {
  const el = stripRef.current;
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  setScrollPct(max > 0 ? el.scrollLeft / max : 0);
}
```
```css
.scroll-track {
  position: relative;
  height: 3px;
  border-radius: 999px;
  background: rgba(174,180,178,.15); /* hero-aluminum bem fraco */
  margin-top: 10px;
  overflow: hidden;
}
.scroll-thumb {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 18%; /* largura fixa proporcional ao conteúdo visível */
  border-radius: 999px;
  background: var(--hero-brass);
  transition: transform .1s linear;
  /* transform: translateX(${scrollPct * (100 - 18)}%) — calculado em JS/inline style */
}
```
Complementar (opcional, mas recomendo junto): **fade nas bordas** da faixa, pra deixar visualmente óbvio que tem mais bitola pra rolar antes mesmo da pessoa perceber a barrinha:
```css
.strip-wrap {
  position: relative;
}
.strip-wrap::before,
.strip-wrap::after {
  content: "";
  position: absolute;
  top: 0; bottom: 0;
  width: 32px;
  pointer-events: none;
  z-index: 2;
}
.strip-wrap::before {
  left: 0;
  background: linear-gradient(90deg, var(--hero-graphite), transparent);
}
.strip-wrap::after {
  right: 0;
  background: linear-gradient(270deg, var(--hero-graphite), transparent);
}
```

---

## 3. Por que a B em vez da A

Não é só estética — é a mesma questão de consistência que já resolvemos em todas as outras seções (Hero, Visão Geral, Linhas, Diferenciais): não faz sentido caprichar em latão/grafite em tudo e deixar justo o detalhe de scroll dependendo de sorte do navegador/aparelho de quem está olhando. A opção B custa uma tela a mais de código, mas garante que todo mundo vê a mesma coisa.

---

## 4. Performance e segurança

- Zero dependência nova — é CSS + um `useState`/`useRef` que o React já tem.
- O `handleScroll` deve rodar com um `throttle` simples (ou `requestAnimationFrame`) se quiser suavidade extra, mas pra uma faixa de 16-30 itens isso é opcional — o evento nativo já é leve o bastante aqui.
- Nada de acessibilidade perdida: esconder a scrollbar nativa via CSS não remove a possibilidade de rolar com teclado/touch/trackpad, só o desenho dela. Vale manter `tabIndex={0}` na `.strip` pra quem navega por teclado conseguir focar e usar as setas.

---

## 5. Decisão

| Pergunta | Opções |
|---|---|
| A (nativa estilizada) ou B (custom + fade) | Recomendo B pela consistência mobile, mas A é bem mais rápida de aplicar se quiser algo hoje e deixar a B pra depois |

---

## Status: implementada, depois removida

Opção B implementada como especificada: scrollbar nativa escondida, trilha custom em latão sincronizada com `scrollLeft`, fade nas bordas. Corrigi um bug encontrado no teste (o fade ficava invisível porque as pseudo-elementos estavam posicionados dentro do padding lateral do card em vez de sobre o conteúdo visível).

**Removida por completo** em `docs/PETRY_TUBOS_SKYLINE_REDESIGN.md` — a fileira deixou de rolar, então não existe mais scrollbar (nativa ou custom) pra estilizar.
