# PETRY DISTRIBUIDORA — Corrigir o "borrão" preso em cima do card ao arrastar: Documento de Direção Criativa

**Objetivo:** o arraste da fileira de tubos já está funcionando (confirmado no print), mas o fade da borda direita — que devia ficar parado, colado na borda do container, indicando "tem mais conteúdo pra rolar" — está se comportando como se fosse mais um item dentro da fileira: ele anda junto com o scroll e "pousa" em cima de qualquer card que parar embaixo dele no final do arraste.

**Escopo:** só o elemento de fade (`.strip-wrap::before`/`::after`, do documento `PETRY_SCROLL_DRAG_FIX.md`). Não mexe no drag, no wheel nem nos dados dos tubos, que já estão certos.

---

## 1. Causa quase certa

Fade de borda só funciona se ele estiver **fora** do elemento que rola — precisa ficar num container-pai que não tem `overflow-x`, posicionado `position: absolute` colado na borda esquerda/direita **desse pai**, flutuando por cima da fileira. Se o Claude Code colocou o `::before`/`::after` na própria `.strip` (o elemento que tem o `overflow-x-auto` e que a gente arrasta), o fade passa a fazer parte do conteúdo que rola junto — por isso ele "gruda" em cima de qualquer card que ficar por baixo dele quando o arraste para, em vez de ficar fixo na borda da tela.

A estrutura certa tem duas camadas, não uma:

```
.strip-wrap  (não rola — é aqui que o fade fica, position: relative)
  └── .strip  (rola — overflow-x, é aqui que os cards ficam)
  └── fade esquerdo  (position: absolute, dentro do .strip-wrap, fora do .strip)
  └── fade direito   (position: absolute, dentro do .strip-wrap, fora do .strip)
```

Hoje provavelmente está assim (errado — fade dentro do elemento que rola):
```jsx
<div className="strip-wrap">
  <div className="strip"> {/* rola */}
    {cards}
    {/* fade aqui dentro por engano — anda junto com o scroll */}
  </div>
</div>
```

---

## 2. Correção

```jsx
<div className="strip-wrap">
  <div className="strip-fade strip-fade--left" aria-hidden="true" />
  <div className="strip-fade strip-fade--right" aria-hidden="true" />

  <div className="strip" ref={stripRef} /* ...handlers de drag/wheel... */>
    {cards}
  </div>
</div>
```

```css
.strip-wrap {
  position: relative;
  overflow: hidden; /* garante que o fade não vaze pra fora do card visível */
}

.strip-fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  z-index: 3;
  pointer-events: none; /* crítico — sem isso o fade bloqueia o clique/arraste do card por baixo */
}
.strip-fade--left {
  left: 0;
  background: linear-gradient(90deg, var(--hero-graphite) 0%, transparent 100%);
}
.strip-fade--right {
  right: 0;
  background: linear-gradient(270deg, var(--hero-graphite) 0%, transparent 100%);
}
```

Dois pontos que evitam o mesmo bug voltar de outra forma:

- **`pointer-events: none` no fade é obrigatório.** Sem isso, mesmo com a posição certa, o fade fica em cima dos cards na pilha de z-index e pode capturar o clique/arraste em vez de deixar passar pro card — o que pareceria "o card não responde perto da borda".
- **O fade tem que estar fora do elemento com `overflow-x`**, nunca dentro. Qualquer `position: absolute` colocado *dentro* de um elemento que rola se move junto com o conteúdo — é a raiz exata do bug do print.

---

## 3. Enquanto isso, o que pedir pro Claude Code verificar

Como não tenho o código desta sessão em mãos, o mais direto é pedir pra ele mesmo checar antes de aplicar às cegas:

> "Confirma onde o `.strip-fade` (ou equivalente) está no JSX hoje: ele está dentro da `div` que tem `overflow-x`/`ref={stripRef}`, ou fora, num wrapper separado? Se estiver dentro, é isso que está causando o fade grudar no card errado ao arrastar — mover pra fora, na estrutura de duas camadas do §2."

Isso evita o Claude Code aplicar o CSS por cima de uma estrutura JSX que já está errada e o bug continuar de outro jeito.

---

## 4. Performance e segurança

- Nenhuma mudança de JS — é só reorganizar onde o elemento de fade vive no HTML/CSS.
- `pointer-events: none` não afeta acessibilidade porque o fade é só decorativo (`aria-hidden="true"`, como já estava).
- Nenhuma dependência nova.
- Validar: `npx tsc --noEmit`, `npm run build`, e testar visualmente arrastando até o fim da fileira nas 3 famílias (retangulares/quadrados/redondos) — o fade tem que ficar sempre na mesma posição da tela, não em cima de um card específico.

---

## Status: bug não reproduzido, depois moot

Investigado antes de aplicar qualquer correção às cegas (seguindo a recomendação do §3): a estrutura já estava correta — o fade já era `::before`/`::after` do `.tubos-strip-wrap` (o wrapper que não rola), não do `.tubos-strip` (que rola). Testado arrastando até o scroll máximo via `PointerEvent`s reais em duas rodadas (antes e depois da mudança) — o fade ficou fixo na mesma posição da tela nas duas bordas, nunca grudou em um card.

Apliquei mesmo assim a camada de segurança extra do §2 (`overflow: hidden` no `.tubos-strip-wrap`), de baixo risco. Durante o teste descobri e corrigi um problema à parte: rodar `npm run build` com `npm run dev` ativo na mesma pasta corrompe o cache `.next` do dev server (não relacionado ao fade).

**Ficou sem efeito** em `docs/PETRY_TUBOS_SKYLINE_REDESIGN.md` — o elemento de fade foi removido por completo junto com o resto do scroll horizontal.
