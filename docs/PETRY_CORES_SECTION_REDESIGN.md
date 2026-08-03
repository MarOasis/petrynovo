# PETRY DISTRIBUIDORA — Redesign da seção "Cores & Acabamentos": Documento de Direção Criativa

**Objetivo:** alinhar `components/site/CoresSection.tsx` com a identidade `hero-*` já usada no resto do site, e corrigir um problema de conteúdo real que passou despercebido: o painel "Aplicações comuns" mostra sempre o mesmo texto, não importa qual cor está selecionada.

**Escopo:** só `components/site/CoresSection.tsx`.

---

## 1. O que já está certo (não mexer)

A interação já é boa: grade de swatches clicáveis, painel lateral com a cor selecionada, preview do hex. Isso fica. É pele + um bug de conteúdo, não uma reinvenção.

---

## 2. O bug de conteúdo (o mais importante deste documento)

```tsx
<div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
    <p className="font-extrabold text-white/90">Aplicações comuns</p>
    <p className="mt-1">Esquadrias • Fachada • Ripado/Lambris • Detalhes</p>
</div>
```

Esse texto é fixo no JSX — não vem do objeto `Cor` selecionado. Clica em Preto, Branco, Bronze ou Fiamatto: o painel muda o nome, a nota e o hex, mas "Aplicações comuns" nunca muda. Pelas notas que já existem em cada cor (`"Amadeirado • impacto"` pra Cerejeira, `"Destaque • ripado/lambris"` pra Fiamatto), dá pra ver que cada acabamento tem uma aplicação típica diferente — Fiamatto já entrega a dica "ripado/lambris" na própria nota, então nem faz sentido a aplicação comum ser idêntica à do Preto.

**Correção:** adicionar `aplicacoes: string[]` em cada cor:

```tsx
type Cor = { name: string; hex: string; note: string; aplicacoes: string[] };

const CORES: Cor[] = [
  { name: "Preto",     hex: "#0A0A0A", note: "Moderno • muito procurado",  aplicacoes: ["Esquadrias", "Portões", "Perfis estruturais"] },
  { name: "Fosco",     hex: "#DADADA", note: "Elegante • visual clean",    aplicacoes: ["Esquadrias", "Interiores", "Guarda-corpos"] },
  { name: "Branco",    hex: "#FFFFFF", note: "Versátil • alta saída",      aplicacoes: ["Esquadrias", "Fachada residencial", "Reformas"] },
  { name: "Bronze",    hex: "#5C4A2F", note: "Premium • fachada",          aplicacoes: ["Fachada comercial", "Pele de vidro", "Brises"] },
  { name: "Cerejeira", hex: "#7A431B", note: "Amadeirado • impacto",       aplicacoes: ["Fachada", "Portas de giro", "Detalhes decorativos"] },
  { name: "Fiamatto",  hex: "#F2B43A", note: "Destaque • ripado/lambris",  aplicacoes: ["Ripado", "Lambris", "Elementos de destaque"] },
];
```
E o painel passa a ler `sel.aplicacoes.join(" • ")` em vez do texto fixo. **Confirmar com você se essas aplicações batem com a realidade** (§6) — são um chute educado a partir das notas que já existiam, não dado confirmado.

---

## 3. Tokens (mesma extensão do resto do site)

| Onde | Hoje | Depois |
|---|---|---|
| Fundo da seção | `bg-emerald-950/20` | `bg-hero-graphite/40` (ou mantém transparente sobre o fundo geral, como as outras seções) |
| Eyebrow | `text-emerald-200/70` | `font-mono-hero`, `text-hero-brass` |
| Anel do swatch ativo | `rgba(16,185,129,.14)` | `rgba(201,169,97,.16)` (hero-brass) |
| Divisor no painel lateral | `from-emerald-400/25` | `from-hero-brass/30` |
| Botão "Consultar acabamentos" | `bg-emerald-500` | mantém verde — é o único CTA e não é WhatsApp, então também pode virar contorno `hero-brass`, mesma lógica já aplicada nos Catálogos, pra não confundir com o padrão visual do botão de WhatsApp |

---

## 4. Preencher o espaço vazio abaixo da grade de cores — ícones de aplicação

No layout atual, a coluna das cores (grade de 6 swatches) fica bem mais baixa que o painel lateral, sobrando espaço vazio embaixo. Testamos duas direções em mockup e a escolhida foi uma grade de ícones: reaproveita o mesmo array `aplicacoes: string[]` do §2 (não é dado novo) — só mostra ele com ícone em vez de só texto corrido, reforçando de novo, com outra linguagem visual, que a aplicação muda conforme a cor selecionada.

Em vez de mudar o tipo `Cor` (que já ficou definido no §2), um mapa separado traduz cada rótulo de aplicação pro ícone correspondente:

```tsx
const ICON_POR_APLICACAO: Record<string, IconName> = {
  "Esquadrias": "janela",
  "Portões": "portao",
  "Perfis estruturais": "viga",
  "Interiores": "predio",
  "Guarda-corpos": "corrimao",
  "Fachada residencial": "casa",
  "Reformas": "martelo",
  "Fachada comercial": "predio",
  "Pele de vidro": "vidro",
  "Brises": "persiana",
  "Fachada": "predio",
  "Portas de giro": "porta",
  "Detalhes decorativos": "estrela",
  "Ripado": "ripado",
  "Lambris": "lambris",
  "Elementos de destaque": "estrela",
};
```

```jsx
<div className="app-icons-panel">
  <p className="app-icons-title">Onde essa cor costuma aparecer</p>
  <div className="app-icons-grid">
    {sel.aplicacoes.map((label) => (
      <div key={label} className="app-icon-item">
        <Icon name={ICON_POR_APLICACAO[label] ?? "estrela"} />
        <span>{label}</span>
      </div>
    ))}
  </div>
</div>
```

Ícones em SVG inline simples (linha fina, `stroke="currentColor"` na cor `hero-brass`) — sem trazer nenhuma lib de ícones nova pro projeto. O painel lateral ("Aplicações comuns", em texto) continua existindo do jeito que já estava — o bloco de ícones abaixo da grade é reforço visual do mesmo dado, não uma duplicata redundante: ajuda quem escaneia a seção rápido sem ler parágrafo.

---

## 5. Pequeno ajuste de forma (opcional, mas barato)

Como o resto do site já usa a "etiqueta de ficha técnica" (Visão Geral) e o "corte de tubo" (Diferenciais) como assinatura recorrente vinda do produto, dá pra fazer o mesmo aqui sem inventar de novo: um contorno sutil em formato de perfil (um "D" ou meia-cana, lembrando a seção transversal de um perfil de alumínio anodizado) em vez do círculo genérico de seletor de cor de qualquer site. Não é obrigatório — o círculo já funciona bem — mas fica registrado como opção de reforço de identidade.

---

## 6. Performance e segurança

- Nenhuma dependência nova.
- Mudança é só dado (`aplicacoes` por cor) + troca de classes de cor — zero risco técnico.
- Validar: `npx tsc --noEmit`, `npm run build`.

---

## 7. Decisão

| Pergunta | Opções |
|---|---|
| As aplicações sugeridas em cada cor (§2) batem com a realidade? | Confirmar/corrigir — foi um chute a partir das notas existentes, não dado seu |
| "Fosco" está na lista como se fosse uma cor, mas é um tipo de acabamento (fosco = não-brilhante). É uma cor cinza específica ou um acabamento que pode ser aplicado a outras cores da lista? | Se for acabamento, talvez valha separar "cor" de "tipo de acabamento" na estrutura de dados no futuro — fora do escopo desta tarefa, só sinalizando |
| Forma do swatch: círculo simples (atual) vs. formato de perfil (§5) | Círculo é mais rápido de aplicar; formato de perfil reforça mais a identidade mas exige um SVG novo |
