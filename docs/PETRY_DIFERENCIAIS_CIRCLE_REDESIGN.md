# PETRY DISTRIBUIDORA — Redesign da seção "Diferenciais" (círculo orbital): Documento de Direção Criativa

**Objetivo:** reimaginar `components/site/DiferenciaisCircle.tsx` — mantendo a engenharia de interação, que já está boa — trocando a paleta emerald por `hero-*` e substituindo a metáfora visual do centro (anel neon genérico) por algo que vem do produto real da Petry.

**Escopo:** só `components/site/DiferenciaisCircle.tsx`. É mudança de pele + um elemento central, não de arquitetura.

**Como usar este arquivo:** mesma dinâmica dos documentos anteriores — cola no Claude Code dentro do repo.

---

## 1. O que já está certo (não mexer)

Diferente das seções anteriores, esta já tem uma base de interação sólida — vale reconhecer antes de criticar:
- Auto-rotate que pausa no hover, pausa 12s depois de clique manual, e para de vez se `prefers-reduced-motion` ou tela pequena — tudo já implementado em `useEffect` com `matchMedia`.
- Navegação por teclado (`ArrowLeft`/`ArrowRight`) com `role="tablist"` e `aria-pressed` nos dots.
- Fallback mobile decente: vira acordeão em vez de tentar espremer o círculo numa tela pequena.

Nada disso muda. O redesign é só de pele (cor/tipografia) e do elemento central (§3).

---

## 2. Fundamentação — por que mexer mesmo assim

O anel com glow neon atrás dos cards flutuando é, hoje, o mais "descrito por IA" dos seis componentes revisados até agora — é literalmente o padrão descrito como clichê no material de referência de design que uso: **fundo quase-preto + halo neon de um acento só** ao redor de um centro flutuante. Com `rgba(16,185,129,...)` nas 3 camadas de sombra (`shadow-[0_0_0_10px_rgba(16,185,129,.06),0_0_80px_rgba(16,185,129,.12)]`), é exatamente essa estética.

**A boa notícia: a disposição circular em si não precisa sumir — ela é justificada pelo conteúdo.** Olhando os 6 itens, eles não são uma lista arbitrária: "reposição e recorrência" e "atendimento direto" descrevem literalmente um ciclo (o cliente compra → é atendido bem → volta a comprar). Diferente do aviso geral contra "01/02/03 decorativo", aqui um layout circular tem justificativa real: representa recorrência, não é só estética. O que precisa mudar é o que preenche o centro do círculo.

**Ideia de substituição, vinda do próprio catálogo da Petry:** a distribuidora vende `Tubos Redondos` (item real, já visto no índice de Linhas). O corte transversal de um tubo redondo — anéis concêntricos, brilho metálico na borda — é literalmente um desenho técnico do produto, e visualmente já é "um círculo com anel" — só que fundamentado no material de verdade em vez de um halo neon genérico. Ele substitui o glow de emerald por um efeito de **anel metálico** (gradiente radial grafite→alumínio→latão na borda, como luz pegando a borda cortada de um tubo de alumínio) — mesmo lugar na tela, motivação de design completamente diferente.

---

## 3. Sistema de tokens e mudanças

| Onde | Hoje | Depois |
|---|---|---|
| Glow do anel central | `radial-gradient(...,rgba(16,185,129,.18),...)` + `shadow-[...rgba(16,185,129,...)]` | anel metálico: `conic-gradient` ou `radial-gradient` grafite→`hero-aluminum`→`hero-brass` na borda, simulando o corte de um tubo (ver §4) |
| Eyebrow "DIFERENCIAL ATIVO" | `text-emerald-200/80` | `font-mono-hero`, cor `hero-brass` |
| Título do centro / cards ao redor | fonte padrão | título do centro em `font-display`; cards ao redor mantêm a fonte padrão (não precisa de Space Grotesk em todo canto, senão perde hierarquia) |
| Dots + card ativo | `bg-emerald-400` / `bg-emerald-500/15 ring-emerald-500/30` | `bg-hero-brass` / `bg-[hero-brass]/12 ring-hero-brass/30` |
| Legenda "Clique para ver detalhes" (repetida nos 6 cards) | texto genérico, sempre igual | trocar por um recorte real da descrição do item (`desc.slice(0, 40) + "…"`), já que o dado existe no array `items` e hoje está sendo ignorado — dá mais valor de leitura sem precisar abrir o card |

Nenhuma cor nova além de `hero-*`, que já existe no `tailwind.config.ts`.

---

## 4. O anel central (novo elemento de assinatura)

Substituir:
```css
bg-[radial-gradient(circle_at_center,rgba(16,185,129,.18),transparent_60%)]
border border-white/15
shadow-[0_0_0_10px_rgba(16,185,129,.06),0_0_80px_rgba(16,185,129,.12)]
```
por um anel que lê como corte de tubo de alumínio:
- Base: `conic-gradient` girando lentamente (a rotação de 28s já existe no código — `animate-[spin_28s_linear_infinite]` — só troca o que tem dentro do elemento que gira) misturando `hero-graphite` → `hero-aluminum` → `hero-graphite`, criando uma faixa de "reflexo" que percorre a borda, como luz batendo numa superfície cilíndrica polida.
- Borda: `border border-hero-aluminum/25`, com um segundo anel mais fino em `hero-brass/30` por dentro — a combinação de dois metais (alumínio + latão do logo) em vez de um brilho monocromático.
- Sem sombra difusa neon — troca por uma sombra curta e realista (`shadow-[0_8px_30px_rgba(0,0,0,.5)]`), como objeto físico, não como luz ambiente de tela.

Isso é sutil de propósito — o objetivo não é chamar mais atenção que os cards, é parar de parecer "glow de dashboard SaaS genérico" e passar a parecer "peça de alumínio real", coerente com o resto do site.

---

## 5. Copy — pequeno ajuste, não reescrita

Os 6 títulos e descrições já são bons (específicos, com verbo de ação, sem enrolação — ex: "Você não fica na mão quando o cliente pede 'mais 2 barras'" é ótimo, som real de atendimento). Não precisa reescrever nada aqui, só a troca do §3 (legenda repetida → recorte real da descrição).

---

## 6. Performance e segurança

- Zero dependência nova — troca é só CSS/Tailwind.
- Toda a lógica de acessibilidade e `prefers-reduced-motion` já existe e continua igual — não precisa tocar.
- Validar ao final: `npx tsc --noEmit`, `npm run build`, `npm audit --omit=dev`.

---

## 7. Decisões que faltam sua confirmação

| Pergunta | Opções |
|---|---|
| Trocar o glow neon pelo anel "corte de tubo" (§4) | Confirmar direção — é a parte mais subjetiva deste doc |
| Legenda dos cards ao redor: recorte da descrição real vs. manter "Clique para ver detalhes" | Recomendo o recorte, mas é rápido reverter se preferir o texto genérico |

---

## Status: concluída

As 2 decisões do §7 confirmadas: anel metálico (`conic-gradient` grafite/alumínio + borda dupla alumínio/latão, sombra realista curta no lugar do glow neon) e legenda com recorte real da descrição (`desc.slice(0, 40)+"…"`).

Toda a engenharia de interação existente (auto-rotate com pausa no hover/clique, navegação por teclado, acordeão mobile, `prefers-reduced-motion`) ficou intocada — só a paleta (emerald → `hero-brass`/`hero-aluminum`) e o elemento central mudaram, como escopado no documento.

Validado com `tsc --noEmit`, `npm run build` e teste no navegador — anel metálico renderizando como "brushed metal" sutil, legendas reais nos 6 cards, clique trocando o centro corretamente.
