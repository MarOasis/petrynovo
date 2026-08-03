# PETRY DISTRIBUIDORA — Novo estilo de rodapé: Documento de Direção Criativa

**Objetivo:** substituir o rodapé atual (tudo centralizado numa coluna só: logo, menu, ícones sociais, linha de baixo) por um rodapé em colunas, no mesmo espírito de "ficha técnica" que já é a identidade visual do resto do site — e usar esse espaço pra mostrar dado de contato real, que hoje só existe na página `/contato`.

**Escopo:** `components/site/Footer.tsx` inteiro. Inclui a migração de paleta `emerald-*` → `hero-*` que ficou pendente no documento anterior, e já incorpora o crédito "Desenvolvido por Atlas Labs" (`PETRY_FOOTER_CREDITO_ATLASLABS.md`) — esse componente vira uma coisa só, não duas tarefas separadas.

---

## 1. Por que trocar

O rodapé atual é o layout mais genérico de "site institucional" que existe — logo centralizado, menu embaixo, ícones sociais, linha de copyright. Funciona, mas não conta nada sobre a Petry que as outras seções já não contam melhor. E, mais concreto: o rodapé não tem nem telefone nem endereço, que já existem prontos em `ContatoGrid.tsx` — a pessoa que rolou a página inteira até o fim, procurando um contato rápido, não encontra nada além do botão de WhatsApp.

---

## 2. Dados reais que já existem no projeto (não são novos)

De `components/site/contato/ContatoGrid.tsx`:
- Endereço: `Rua Ronco Dágua, 2201, Itinga, Joinville - SC, 89235-390`
- Telefone: `(47) 3842-1734` · WhatsApp: `(47) 9 9286-6123`

Não tem horário de atendimento cadastrado em nenhum lugar do projeto — se quiser incluir, precisa me passar.

---

## 3. Layout (conceito)

```
┌──────────────────────────────────────────────────────────────────┐
│  ● PETRY DISTRIBUIDORA           NAVEGAÇÃO      CONTATO             │
│    Alumínios & Acessórios        Início          Rua Ronco Dágua,   │
│                                   Catálogos        2201 · Itinga     │
│    Distribuição de alumínio      Produtos         Joinville - SC     │
│    e acessórios com padrão       Linhas                             │
│    para Joinville e região.      Serviços        (47) 3842-1734     │
│                                   Sobre            (47) 9 9286-6123   │
│    [Instagram] [WhatsApp]        Contato                            │
│                                                   [Chamar no          │
│                                                    WhatsApp →]        │
│  ─────────────────────────────────────────────────────────────────  │
│  © 2026 PETRY — Todos os direitos reservados.                        │
│                        Suporte · Empresa · Desenvolvido por Atlas Labs Brasil│
└──────────────────────────────────────────────────────────────────┘
```

3 colunas no desktop (`grid-cols-3`), empilha em 1 coluna no mobile. Cada coluna com um rótulo mono pequeno no topo ("NAVEGAÇÃO", "CONTATO") — mesma linguagem de eyebrow em `font-mono-hero`/`hero-brass` já usada em todas as outras seções, em vez do menu solto sem cabeçalho que tem hoje.

---

## 4. Código

```jsx
<footer id="site-footer" className="mt-14">
  <div className="relative overflow-hidden bg-hero-graphite ring-1 ring-hero-aluminum/10">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_0%,rgba(201,169,97,.10),transparent_60%)]" />

    <div className="relative px-6 py-14 sm:px-10 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* coluna 1: marca */}
        <div>
          <div className="inline-flex items-center gap-3">
            <span className="h-10 w-10 rounded-2xl bg-hero-brass/15 ring-1 ring-hero-brass/25 grid place-items-center">
              <span className="h-4 w-4 rounded-full bg-hero-brass shadow-[0_0_24px_rgba(201,169,97,.5)]" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg font-black tracking-tight text-hero-ivory">PETRY DISTRIBUIDORA</p>
              <p className="text-xs font-semibold tracking-wide text-hero-aluminum">Alumínios &amp; Acessórios</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-hero-aluminum leading-relaxed max-w-xs">
            Distribuição de alumínio e acessórios com padrão para Joinville e região.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Social href={INSTAGRAM} label="Instagram" icon={<IconInstagram />} />
            <Social href={`https://wa.me/${WHATSAPP}`} label="WhatsApp" icon={<IconWhats />} />
          </div>
        </div>

        {/* coluna 2: navegação */}
        <div>
          <p className="font-mono-hero text-[11px] tracking-[0.15em] uppercase text-hero-brass mb-4">Navegação</p>
          <ul className="space-y-2.5 text-sm font-semibold text-hero-aluminum">
            <li><a className="hover:text-hero-ivory transition" href="/">Início</a></li>
            <li><a className="hover:text-hero-ivory transition" href="/catalogos">Catálogos</a></li>
            <li><a className="hover:text-hero-ivory transition" href="/produtos">Produtos</a></li>
            <li><a className="hover:text-hero-ivory transition" href="/linhas">Linhas</a></li>
            <li><a className="hover:text-hero-ivory transition" href="/servicos">Serviços</a></li>
            <li><a className="hover:text-hero-ivory transition" href="/sobre">Sobre</a></li>
            <li><a className="hover:text-hero-ivory transition" href="/contato">Contato</a></li>
          </ul>
        </div>

        {/* coluna 3: contato */}
        <div>
          <p className="font-mono-hero text-[11px] tracking-[0.15em] uppercase text-hero-brass mb-4">Contato</p>
          <address className="not-italic text-sm text-hero-aluminum leading-relaxed">
            Rua Ronco Dágua, 2201<br />
            Itinga, Joinville - SC<br />
            89235-390
          </address>
          <a href="tel:+554738421734" className="mt-3 block text-sm text-hero-aluminum hover:text-hero-ivory transition">
            (47) 3842-1734
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="block text-sm text-hero-aluminum hover:text-hero-ivory transition">
            (47) 9 9286-6123
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-neutral-950 hover:bg-emerald-400 transition"
          >
            Chamar no WhatsApp →
          </a>
        </div>
      </div>

      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-hero-aluminum/15 to-transparent" />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-hero-aluminum/70">
        <p>© {new Date().getFullYear()} PETRY — Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-hero-ivory transition" href="/contato">Suporte</a>
          <a className="hover:text-hero-ivory transition" href="/sobre">Empresa</a>
          <a className="hover:text-hero-ivory transition" href="https://atlaslabsbrasil.com.br" target="_blank" rel="noopener noreferrer">
            Desenvolvido por Atlas Labs
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

O botão de WhatsApp continua verde de propósito (não vira `hero-brass`) — é o mesmo raciocínio já usado em todas as outras seções: verde é a cor que a pessoa já associa a "ação de contato", latão é a cor de identidade/rótulo, não de botão de conversão.

---

## 5. Tokens

| Onde | Hoje | Depois |
|---|---|---|
| Fundo | `bg-neutral-950` | `bg-hero-graphite` |
| Glow de fundo | `rgba(16,185,129,.18)` (emerald) | `rgba(201,169,97,.10)` (hero-brass, mais discreto — rodapé não deve competir com o resto da página) |
| Badge do logo | `bg-emerald-500/15 ring-emerald-300/20`, bolinha `emerald-400` | `bg-hero-brass/15 ring-hero-brass/25`, bolinha `hero-brass` |
| Rótulos de coluna (novo) | — | `font-mono-hero`, `text-hero-brass` |
| Texto secundário | `text-white/60`/`text-white/80` | `text-hero-aluminum` |
| Botão WhatsApp | `emerald-500`/`emerald-400` hover | mantém — ver §4 |

---

## 6. Performance e segurança

- Nenhuma dependência nova, nenhuma chamada externa nova.
- `<address>` é a tag semântica certa pro HTML (melhora SEO local e leitura por leitor de tela) — hoje o endereço nem existe no rodapé, então isso é ganho líquido de acessibilidade.
- Link do WhatsApp e do site da Atlas Labs com `rel="noopener noreferrer"`.
- Validar: `npx tsc --noEmit`, `npm run build`.

---

## 7. Decisão

| Pergunta | Opções |
|---|---|
| 3 colunas (marca / navegação / contato) é a divisão certa, ou quer uma 4ª coluna (ex: atalho pros catálogos, ou newsletter)? | Confirmar — 3 é o mínimo que já resolve o problema de "não tem contato no rodapé"; 4 cabe se quiser mais |
| Horário de atendimento — incluir na coluna de contato? | Preciso que você me passe, não existe em nenhum lugar do projeto ainda |
| Botão de WhatsApp na coluna de contato, ou só os ícones sociais bastam? | Botão é mais direto pra quem chegou até o fim da página querendo comprar; ícone sozinho é mais discreto |

---

## Status: concluída

As 3 decisões do §7 confirmadas: 3 colunas, sem horário de atendimento (não existe o dado ainda), botão de WhatsApp incluído na coluna de contato.

`Footer.tsx` reescrito conforme o código do §4: marca (logo + descrição + sociais, Facebook/LinkedIn/X seguem comentados — item já sinalizado no backlog) / navegação (7 links, eyebrow `font-mono-hero`/`hero-brass`) / contato (`<address>` com o endereço real, telefone `tel:`, WhatsApp, botão verde "Chamar no WhatsApp →"). Paleta migrada de `emerald-*`/`neutral-950` pra `hero-*`. Crédito "Desenvolvido por Atlas Labs Brasil" (ajustado depois — o documento original sugeria só "Atlas Labs") linkando pra `atlaslabsbrasil.com.br` com `target="_blank" rel="noopener noreferrer"`.

Validado com `tsc --noEmit`, `npm run build` e teste no navegador — conferido via JS que os 3 links de WhatsApp, o `tel:` e o link da Atlas Labs apontam corretamente com os atributos de segurança certos.
