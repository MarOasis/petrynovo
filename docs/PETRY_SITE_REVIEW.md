# PETRY DISTRIBUIDORA — Website Review

**Review date:** 2026-07-30
**Reviewer scope:** Full repository audit (review-only, no source changes made)
**Repository:** `distribuidora-aluminio-site` (local clone of `https://github.com/MarOasis/petrynovo.git`, branch `main`)

---

## 1. Executive Summary

**Overall condition.** This is a small, single-developer Next.js 14 (App Router) marketing site for an aluminum/hardware distributor in Joinville, SC. It has real business content (address, phone, email, hours, product lines, WhatsApp CTAs) and a visually ambitious dark/emerald design system built entirely with Tailwind utility classes and hand-rolled animations. The codebase is functional and type-checks cleanly, but it shows clear signs of fast, iterative, manual editing without a safety net: no tests, no CI, no linter configuration, no SEO infrastructure, several dead/broken components left in the tree, and at least one **broken lead-capture CTA currently live in the mobile menu**.

**Strengths worth preserving:**
- Clean App Router structure with one page per business section and consistent use of the `(site)` route group.
- A coherent, intentional dark/emerald visual identity with real motion-reduction (`prefers-reduced-motion`) handling in several components.
- Server-side handling of the one third-party secret in the codebase (`CURRENCYAPI_KEY` is only read in a server Route Handler, never shipped to the client).
- TypeScript compiles with **zero errors** (`tsc --noEmit` clean).
- Real, specific business content (address, two phone numbers, email, precise weekday hours) is present and usable today.

**Most serious weaknesses:**
- The **mobile-menu WhatsApp button uses a placeholder phone number** (`Header.tsx:83`) — the single highest-traffic CTA for a WhatsApp-first B2B business is currently non-functional for mobile users who open the hamburger menu.
- **`MarcasSection.tsx` displays real third-party company logos under fabricated/mismatched brand names** on the homepage (e.g., the Ciser logo labeled "Perfetta", the Dxmax logo labeled "Udinese", etc.) — a credibility and potential misrepresentation risk shown to every visitor.
- The pinned `next`/`postcss` versions carry multiple **confirmed high-severity security advisories** (`npm audit`), unresolved.
- Zero SEO infrastructure: no `robots.txt`, no `sitemap.xml`, no structured data, and three of seven pages have no page-specific `<title>`/description at all.
- Zero automated tests, zero CI pipeline, no linter configuration (the `npm run lint` script is not actually usable non-interactively).
- Business hours logic is duplicated in three independent places, and one of the three copies **contradicts the other two** (a lunch-break closure that doesn't exist anywhere else).

**Production-readiness classification: Requires stabilization before production.**
The site is live-content-ready and technically deployable, but it currently ships a broken primary conversion path, unresolved high-severity dependency vulnerabilities, and a homepage section with fabricated brand attribution. None of these require a rebuild — they are targeted, well-isolated fixes — but they should not be left unresolved.

**Recommended modernization approach:** targeted corrections + incremental refactoring (see §22). No redesign or rebuild is justified by the evidence.

**First action after this review:** fix the mobile WhatsApp number in `Header.tsx:83` and correct or remove the mismatched brand/logo pairs in `MarcasSection.tsx` — both are one-line-per-item, zero-risk corrections with direct revenue/trust impact, and both should ship before anything else in this document is touched.

---

## 2. Review Scope and Method

**Directories inspected:** `app/`, `components/`, `lib/`, `public/` (full file tree), plus root-level config (`package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `.gitignore`, `README.md`) and the orphaned root file `teste.txt`.

**Method:** every `.tsx`/`.ts` source file in `app/` and `components/` was read in full (not sampled). All 90+ files under `public/` were enumerated and checked for size, duplication, and cross-references from source code via targeted `grep`.

**Commands executed (all non-destructive; no source or config files were changed):**
```
git log --oneline -30
git remote -v
git status --porcelain          (run before and after validation commands)
npx tsc --noEmit                 → 0 errors
npx next lint                    → aborted: requires interactive ESLint setup, no config exists
npm outdated                     → read-only report
npm audit --omit=dev             → read-only report, 2 high-severity advisories on `next`/`postcss`
```
One incidental artifact, `tsconfig.tsbuildinfo`, was created by `tsc --noEmit` (TypeScript's incremental build cache) and was deleted immediately after inspection to leave the working tree exactly as found. `git status` was re-verified clean afterward.

**`next build` was deliberately not run.** It would compile the app and, more importantly, hit the internal `/api/quotes/usdbrl` route or otherwise touch environment-dependent behavior in ways that are harder to guarantee are side-effect-free in this sandbox (no `.env` file exists locally, so a build could also produce misleading failures unrelated to the codebase). This is flagged as a risk rather than executed — see §19.

**Skills used:**
- No installed Claude Code skill specifically targets Next.js/React frontend code review, accessibility auditing, SEO auditing, or security review of a static marketing site's source; the available skills (`frontend-design`, `security-review`, `review`, `simplify`, `dataviz`, etc.) are oriented at either greenfield visual design, PR/diff review, or code-quality cleanup — not a full audit-and-report deliverable against a fixed 26-section template. **No specialized skill was available for any of the nine required audit angles (frontend review, code quality, UX/UI, accessibility, SEO, performance, security, architecture, production readiness); all analysis in this document was performed directly by reading source, config, and assets, and by running the read-only tooling listed above.**

**Limitations / areas not tested:**
- No browser rendering was performed — no visual QA, no Lighthouse/PageSpeed run, no real Core Web Vitals measurement, no actual keyboard-navigation or screen-reader pass. All accessibility and performance findings are static-code-based risk analysis, not measured results, and are labeled accordingly.
- No `next build` / `next start` run, so no confirmation of production bundle size, route-level JS payload, or runtime behavior of the `/api/quotes/usdbrl` route.
- `CURRENCYAPI_KEY` availability was not verified (no `.env` file present); whether the currency widget works in the live deployment is unconfirmed.
- No access to the live/deployed site, to Google Search Console, to analytics, or to any PETRY DISTRIBUIDORA business systems (CRM, ERP, social accounts) — anything requiring those is marked as an assumption or a question in §17/§25.
- Legal/privacy content (privacy policy, terms, cookie notice) was checked only for presence in the repository; no legal review of adequacy was performed or is offered.
- Visual/perceptual judgments (contrast "feel," aesthetic quality) are explicitly separated from code-verifiable facts throughout §11–§12.

**Assumptions made** (all flagged again inline where used):
- The site is assumed to already be deployed/live in some form, based on git history spanning months of incremental content commits and the presence of real, specific business data — not confirmed via direct access to a production URL.
- Deployment platform is assumed to be Vercel (or a Vercel-like zero-config Next.js host) because there is no committed CI/CD configuration, `Dockerfile`, or IaC of any kind, and the project structure otherwise matches a from-`create-next-app` scaffold. This is unconfirmed.

---

## 3. Current Technical Baseline

| Aspect | Finding |
|---|---|
| Framework | Next.js **14.2.25**, App Router (`app/` directory), React **18.3.1** |
| Language | TypeScript 5.7.3, `strict: true` in `tsconfig.json`; a handful of files are effectively untyped via `any` in `catch` blocks (`InfoCards.tsx:140`) |
| Rendering model | Mixed: most page components and nearly every interactive section are `"use client"` (client components with `useEffect`/`useState`); only 3 route files (`catalogos`, `linhas`, `produtos`) export `metadata` and stay server components at the page-file level. The single API route (`app/api/quotes/usdbrl/route.ts`) runs server-side (`runtime = "nodejs"`) with a 60s revalidate cache. |
| Styling | Tailwind CSS 3.4.17 (utility-first) + a sizeable hand-written `app/globals.css` (keyframes, `.cl-*` utility classes for marquees/glows/grain) + several components additionally use scoped `<style jsx>` blocks (styled-jsx, bundled with Next). Three different animation/CSS mechanisms coexist (Tailwind utilities, global custom CSS, styled-jsx) — see §16. |
| Package manager | npm (`package-lock.json` present, lockfile v2/v3 format consistent with npm ≥7) |
| Project structure | `app/(site)/*` — one route group holding all public pages; `app/api/quotes/usdbrl` — one Route Handler; `components/site/**` — all UI, organized by page (`contato/`, `produtos/`, `sobre/`, `servicos/`, `catalogos/`, `linhas/`) plus shared top-level components (`Header`, `Footer`, `FloatingWhatsApp`, `BannerRotator`, etc.); `lib/` — two tiny data/utility modules (`site.ts`, `horarios.ts`). |
| Routing | File-based App Router routes, all static paths, no dynamic segments, no middleware, no route groups beyond the single `(site)` group. |
| Deployment model | Not documented in-repo. No CI/CD config, no `Dockerfile`, no `vercel.json`, no `.nvmrc`. Inferred (unconfirmed) to be a Vercel git-integration deployment given the `next.config.mjs` comment ("não é obrigatório na Vercel"). |
| Integrations | One external API call: `api.currencyapi.com` (USD→BRL quote), proxied server-side through `/api/quotes/usdbrl`. Google Maps iframe embed (no API key required, uses the public `?output=embed` form). Google Drive links used as static PDF hosting for catalogs (external, no API). No CMS of any kind — all content is hardcoded in `.tsx`/`.ts` files. |
| Content model | 100% hardcoded in source (arrays of objects inside components, plus `lib/site.ts` for nav/banner/product copy). No headless CMS, no MDX, no database. |
| Environment configuration | Exactly one environment variable is used in code: `CURRENCYAPI_KEY` (`app/api/quotes/usdbrl/route.ts:7`). No `.env`, `.env.example`, or `.env.local` file exists in the repository (correctly gitignored per `.gitignore:5`), but there is also no documentation of the required variable for a new developer or deployment target. |
| Validation tooling | `package.json` declares `lint` (`next lint`), but **no ESLint configuration file exists** anywhere in the project (confirmed: only `node_modules/**/.eslintrc` matches exist). Running `next lint` drops into an interactive "how would you like to configure ESLint" wizard — it cannot run unattended or in CI today. TypeScript type-checking works and is currently clean. No test runner (Jest/Vitest/Playwright/etc.) is installed. |

---

## 4. Current Sitemap and Page Inventory

| Page / route | Purpose | Current status | Main problems | Priority |
|---|---|---|---|---|
| `/` (`app/(site)/page.tsx`) | Homepage — hero, info/quote cards, overview, product lines, catalog carousel, differentiators, colors, brand partners, contact CTA | Complete | No page-specific `<title>`/description (inherits generic root metadata); contains `MarcasSection` with mismatched brand logos (P0-3); `InfoCards` shows a lunch-break closure that contradicts `/contato` (P1-1) | P0 |
| `/catalogos` | Catalog downloads (4 PDFs via Google Drive links) | Complete | Duplicates data already defined in the homepage's `CatalogosCinematic` component with a *different* set of cover images for the same 4 catalogs (P2-1) | P2 |
| `/produtos` | Product showcase (profiles + accessories), "premium standard" messaging | Complete | Internal "Ver catálogos" link incorrectly uses `target="blank"` (opens a stray browser window instead of a normal in-app navigation) (P1-11) | P2 |
| `/linhas` | Full catalog of product lines/systems/accessories (three long lists) | Complete | Very long flat lists with no search/filter; one line item spelled "Maxin-ar" here vs. "Maxim-ar" everywhere else (P3-1) | P3 |
| `/servicos` | Services & support (separation, line guidance, restocking, WhatsApp support) | Complete | No page-specific metadata (P1-5) | P2 |
| `/sobre` | About Petry — hero, highlights, company timeline (1975→today) | Partially complete | No page-specific metadata; two commented-out sections (`SobreVideo`, `SobreEquipe`) sit dead in the codebase pointing at a Rickroll placeholder video and non-existent team photos respectively (P1-8, P2-11) | P1 |
| `/contato` | Contact — WhatsApp/address/phone/email cards, map embed, FAQ | Complete | Contains its own independent "store open now" calculation that already matches `lib/horarios.ts` but **not** the homepage's version (P1-1) | P1 |
| `/api/quotes/usdbrl` | Server route proxying a USD→BRL currency quote | Complete | Fails closed with a clear 500 if `CURRENCYAPI_KEY` is missing — acceptable, but there is no documented fallback/UX for a sustained outage beyond the client's own error string | P3 |
| *(none)* `robots.txt` / `sitemap.xml` | — | **Missing** | No crawl directives or sitemap exist anywhere in `app/` or `public/` | P1 |
| *(dead)* `components/site/AcabamentosSection.tsx` | Was meant to be a homepage "finishes" section | Unused / abandoned | Commented out of `page.tsx`; references images (`/banners/destaques/*.webp`) that do not exist in `public/` at all | P2 |
| *(dead)* `components/site/sobre/SobreEquipe.tsx` | Team grid for `/sobre` | Unused / abandoned | Not imported anywhere; hardcodes 6 real employee first names/roles; references `/sobre/equipe/*.jpg`, none of which exist in `public/` | P1 |
| *(dead)* `components/site/sobre/TimeSection.tsx` | Near-duplicate of `SobreEquipe.tsx` | Unused / abandoned, duplicated | Same 6 people, different (also non-existent) image paths `/time/*.jpg`; never imported by any page | P1 |
| *(dead)* `components/site/sobre/SobreVideo.tsx` | Company video embed for `/sobre` | Unused / abandoned | Commented out; embeds YouTube ID `dQw4w9WgXcQ` (the "Never Gonna Give You Up" placeholder), never replaced | P2 |

---

## 5. Component and Feature Inventory

| Component / feature | Location | Responsibility | Condition | Reuse level | Observations |
|---|---|---|---|---|---|
| `Header` | `components/site/Header.tsx` | Sticky nav, desktop/mobile menu, WhatsApp CTA | Buggy | Site-wide (1 instance, in `(site)/layout.tsx`) | Mobile WhatsApp link uses placeholder number (P0-1); stray `]` typo breaks the `lg:px-8` desktop padding class (P1-9); logo uses a relative `src` path and empty `alt` |
| `Footer` | `components/site/Footer.tsx` | Site footer, nav mirror, socials, copyright | Good, minor dead code | Site-wide (1 instance) | `FACEBOOK`/`LINKEDIN`/`X` constants and their icon components are defined but only ever referenced inside JSX comments (P2-6) |
| `FloatingWhatsApp` | `components/site/FloatingWhatsApp.tsx` | Persistent floating WhatsApp button, hides near footer | Good | Site-wide (1 instance, in `(site)/layout.tsx`) | Correct number; clean `IntersectionObserver` cleanup; respects footer proximity |
| `BannerRotator` | `components/site/BannerRotator.tsx` | Generic image/slide carousel (crossfade, arrows, dots, swipe) | Functional, perf risk | Reused 2× (home hero, `LinhasSection`) | Uses a plain `<img>` (not `next/image`) with `loading="lazy"` even when used as the above-the-fold hero — likely the page's LCP element (P1-2) |
| `InfoCards` | `components/site/InfoCards.tsx` | Homepage hours/quote/CTA 3-card row | Functional, data-integrity issue | Homepage only | Own copy of "open now" logic that adds a 12:00–13:00 lunch closure not present in `lib/horarios.ts` or `ContatoGrid.tsx` (P1-1); polls the currency API every 30s client-side |
| `lib/horarios.ts` | `lib/horarios.ts` | "Store open now" helper | Unused! | 0 — not imported anywhere | Dead utility module; the logic it contains was copy-pasted inline into both `InfoCards.tsx` and `ContatoGrid.tsx` instead of being imported, and then drifted (P1-1) |
| `ContatoGrid` | `components/site/contato/ContatoGrid.tsx` | Contact cards (WhatsApp, address, hours, phone, email) | Good, has real data | `/contato` only | Correct, specific business data; own inline copy of the hours logic (3rd copy, see P1-1) |
| `MarcasSection` | `components/site/MarcasSection.tsx` | Homepage "brand partners" marquee | **Broken data integrity** | Homepage only | Brand `name` fields do not match the `logo` files they're paired with — real supplier logos shown under wrong/fabricated names (P0-3) |
| `CatalogosCinematic` | `components/site/CatalogosCinematic.tsx` | Homepage catalog carousel | Good, duplicated data | Homepage only | Defines its own `cats[]` array duplicating `CatalogosGrid`'s `catalogos[]` with different cover images for the same 4 PDFs (P2-1) |
| `CatalogosGrid` | `components/site/catalogos/CatalogosGrid.tsx` | `/catalogos` page grid | Good, duplicated data | `/catalogos` only | See above |
| `DiferenciaisCircle` | `components/site/DiferenciaisCircle.tsx` | Interactive rotating "differentiators" wheel | Good | Homepage only | Solid accessibility touches: `aria-pressed`, `role="tablist"`, keyboard arrow support, `prefers-reduced-motion` respected |
| `CoresSection` | `components/site/CoresSection.tsx` | Color/finish picker | Good | Homepage only | "Fosco" (a finish) listed alongside actual colors (P3-5); otherwise clean |
| `LinhasMarquee` / `MarcasSection` marquee | `globals.css` (`.cl-marquee*`) vs. `MarcasSection.tsx` (`<style jsx>` `.cl-track*`) | Infinite scrolling ticker | Functional, duplicated mechanism | 2 near-identical implementations | Two separate marquee CSS systems coexist with overlapping naming conventions (P3-4) |
| `ProdutosVitrine` | `components/site/produtos/ProdutosVitrine.tsx` | Reusable product-grid section (used twice on `/produtos`) | Good, minor dead code | 2× on `/produtos` | Contains a ~15-line commented-out badge feature (P3-3); good `next/image` usage with `sizes` |
| `PadraoPremium` | `components/site/produtos/PadraoPremium.tsx` | "Premium standard" 3-card block | Buggy | `/produtos` only | Renders the same field (`x.t`) twice instead of a distinct heading + body (P2-2) |
| `SobreTimeline` | `components/site/sobre/SobreTimeline.tsx` | Company history timeline (1975→today) | Good | `/sobre` only | Clean, uses `useInView`, alternating layout, real narrative content |
| `useInView` | `components/site/useInView.ts` | Shared scroll-reveal hook | Good | Reused ~10× across homepage/timeline sections | Well-written: disconnects after first trigger, respects `prefers-reduced-motion` |
| `AcabamentosSection` | `components/site/AcabamentosSection.tsx` | Homepage "highlights" filterable card grid | **Dead / broken** | 0 — commented out of `page.tsx` | References `/banners/destaques/*.webp`, none of which exist in `public/` (P2-10) |
| `SobreEquipe` / `TimeSection` | `components/site/sobre/*.tsx` | Team grids | **Dead / broken, duplicated** | 0 — neither imported | See §4; both reference nonexistent image paths and hardcode real names (P1-8) |
| `SobreVideo` | `components/site/sobre/SobreVideo.tsx` | Company video embed | **Dead**, placeholder content | 0 — commented out | Rickroll placeholder video ID never swapped (P2-11) |
| `/api/quotes/usdbrl` route | `app/api/quotes/usdbrl/route.ts` | Server-side currency quote proxy | Good | 1 consumer (`InfoCards`) | Correct pattern: secret stays server-side, sensible caching headers, explicit error handling |

---

## 6. What Is Already Good

- **Secret handling is correct.** The one API key in the project (`CURRENCYAPI_KEY`) is read only inside a server Route Handler and never reaches client bundles — this is the right pattern and should be the template for any future integration (e.g., a real contact-form backend).
- **TypeScript is clean.** `strict` mode is on and `tsc --noEmit` reports zero errors across the whole project — a genuinely useful, currently-passing safety net that just needs a linter and tests alongside it.
- **Accessibility instincts exist in places.** `DiferenciaisCircle.tsx` implements `role="tablist"`, `aria-pressed`, and keyboard arrow-key navigation without being asked to; `useInView.ts` and several animation classes correctly branch on `prefers-reduced-motion`. This is above the bar for a small business site built quickly.
- **Real, specific, usable business content already exists**: a full street address, two working phone numbers, an email address, and precise weekday/Saturday hours are present verbatim in `ContatoGrid.tsx` — this is exactly the kind of content that's normally the hardest to get out of a client, and it's already in the repo.
- **The visual identity is coherent and intentional**, not a generic template: the dark/emerald palette, "cinematic" grain/glow treatments, and consistent card/pill vocabulary read as a considered design decision, not an accident. This is worth preserving through any future refactor rather than being redesigned away.
- **The product-line taxonomy is thorough.** `/linhas` encodes a genuinely large, specific catalog of real product lines and accessory categories — this is domain knowledge that would be expensive to reconstruct and should be treated as a content asset, not boilerplate.
- **The currency-quote widget is a small but real technical differentiator** for a B2B aluminum distributor (pricing is dollar-linked in this industry) and is implemented with sensible caching (`s-maxage=60, stale-while-revalidate=120`) rather than hammering the upstream API.

---

## 7. Critical Findings (P0)

### P0-1 — Mobile-menu WhatsApp CTA uses a placeholder phone number
- **Severity:** P0 — Critical
- **Evidence:** `components/site/Header.tsx:81-88`. The desktop nav WhatsApp link (`Header.tsx:46`) correctly uses `https://wa.me/5547992866123`, and the same number is used correctly in 12 other files. The **mobile** hamburger-menu WhatsApp button, however, reads:
  ```tsx
  <a className="mt-2 px-4 py-3 rounded-xl text-sm font-extrabold bg-emerald-500 text-neutral-950 text-center"
     href="https://wa.me/55SEUNUMERO" target="_blank" rel="noopener">
    Chamar no WhatsApp
  </a>
  ```
  `55SEUNUMERO` ("55YOURNUMBER") is the literal placeholder from the original template README (`README.md:13`: "troque `55SEUNUMERO`"), never replaced in this one spot.
- **Impact:** Any visitor who opens the site on a phone (a large share of traffic for a WhatsApp-first B2B trade business), opens the hamburger menu, and taps the primary WhatsApp button gets sent to an invalid `wa.me` link. This is the single most direct revenue-facing bug in the codebase — it is on the mobile navigation, which is likely the highest-traffic entry point.
- **Recommended direction:** Replace `55SEUNUMERO` with `5547992866123` in `Header.tsx:83`, matching every other instance in the codebase.
- **Estimated effort:** XS (single-line change)
- **Dependencies:** None
- **Validation method:** Open the site on a mobile viewport, open the hamburger menu, tap "Chamar no WhatsApp," confirm it opens a chat with `+55 47 99286-6123`.

### P0-2 — Confirmed high-severity vulnerabilities in pinned framework dependencies
- **Severity:** P0 — Critical
- **Evidence:** `npm audit --omit=dev` (run 2026-07-30) reports **2 high-severity advisory groups** against the exact pinned versions in `package.json`:
  - `next@14.2.25` (range `0.9.9 - 16.3.0-canary.5` affected) — a long list of GHSA advisories including SSRF via Middleware/Server Actions (GHSA-4342-x723-ch2f, GHSA-89xv-2m56-2m9x, GHSA-p9j2-gv94-2wf4), cache poisoning (GHSA-3g8h-86w9-wvmq, GHSA-wfc6-r584-vfw7, GHSA-ggv3-7p47-pfv8), multiple Denial-of-Service advisories in Server Components (GHSA-mwv6-3258-q52c, GHSA-5j59-xgg2-r9c4, GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj), and an Image Optimization content-injection issue (GHSA-xv57-4mr9-wg8v).
  - `postcss@≤8.5.17` (bundled transitively via `next`) — XSS via unescaped `</style>` output (GHSA-qx2v-qp2m-jg93) and two path-traversal/source-map disclosure advisories (GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849).
- **Impact:** These are published, indexed advisories against the exact dependency versions this project ships, not speculative risk. Several (SSRF, cache poisoning, DoS) are meaningful for any publicly reachable Next.js deployment, regardless of how simple the site's own code is — the vulnerable surface is inside the framework itself. This is squarely a "security readiness" blocker per §9.
- **Recommended direction:** Plan an upgrade of `next` (14.2.25 → a patched 14.x or the current stable line) and verify `postcss` is pulled to a patched version afterward. `npm audit fix --force` currently offers `next@16.2.12`, a **major** version jump (App Router-to-App Router, but with breaking changes across 2 major versions) — this should be a planned, tested upgrade, not a blind `--force` apply. At minimum, identify and pin the latest patched *14.x* release if one exists, as a lower-risk interim step.
- **Estimated effort:** M–L depending on how far the upgrade path goes (patch release vs. major-version jump)
- **Dependencies:** Should happen before any other dependency-touching work; needs a full manual QA pass afterward (no test suite exists to catch regressions automatically — see P1-7)
- **Validation method:** `npm audit` returns 0 high/critical; manual smoke test of all 7 pages, the API route, and the mobile menu after upgrade

### P0-3 — Fabricated/mismatched brand-partner logos on the homepage
- **Severity:** P0 — Critical
- **Evidence:** `components/site/MarcasSection.tsx:11-24`:
  ```tsx
  const brands: Brand[] = [
      { name: "Perfetta", logo: "/banners/parceiros/Ciser.png" },
      { name: "Udinese", logo: "/banners/parceiros/Dxmax.png" },
      { name: "Rotofer", logo: "/banners/parceiros/celsus.png" },
      { name: "AluTech", logo: "/banners/parceiros/Colorsud.png" },
      { name: "Suprema", logo: "/banners/parceiros/Emteco.png" },
      { name: "Gold", logo: "/banners/parceiros/Perfisud.png" },
      { name: "Linha 25", logo: "/banners/parceiros/Soprano (1).png" },
      { name: "Fachada Cortina", logo: "/banners/parceiros/Stam.png" },
      { name: "Conexões", logo: "/banners/parceiros/Udinese.png" },
      { name: "Temperados", logo: "/banners/parceiros/Walplas.png" },
      { name: "Policarbonato", logo: "/banners/parceiros/3F (1).png" },
      { name: "Acessórios Premium", logo: "/banners/parceiros/Alushow (1).png" },
  ];
  ```
  The `public/banners/parceiros/` folder contains logos for real, identifiable companies (Ciser, Dxmax, Colorsud, Emteco, Perfisud, Soprano, Stam, Udinese, Walplas, Alushow, celsus, 3F — these read as genuine fastener/hardware/aluminum-industry suppliers). But the `name` field paired with each logo is **not that company's name** — it's either a Petry *product line* name (Suprema, Gold, Linha 25 are product lines defined elsewhere in this same codebase, e.g. `lib/site.ts` and `LinhasPage.tsx`, not manufacturer names) or an unrelated invented name (e.g., the real "Udinese" logo file is used twice: once correctly-ish at index 2 (labeled "Udinese") and once mislabeled "Conexões" at index 9 — note even the one row that *keeps* the name "Udinese" pairs it with the **wrong file**, `Dxmax.png`, not `Udinese.png`).
- **Impact:** This section renders under the heading "Trabalhamos com as melhores marcas do mercado" ("We work with the best brands in the market") on the homepage, visible to every visitor. Displaying a real company's logo under a different, incorrect name is a credibility problem at minimum (any visitor who recognizes one of these supplier brands will immediately notice the mismatch) and a potential trademark/misrepresentation issue at worst (implying partnerships or product identities that the logo owner did not authorize). This needs a business decision, not just a code fix — see §17 and §25 for the exact confirmation needed from PETRY DISTRIBUIDORA.
- **Recommended direction:** **Business decision required.** Do not silently "fix" the pairing — first confirm with PETRY DISTRIBUIDORA (a) which of these are real supplier partners, (b) the correct name for each logo file, and (c) whether display of each logo is authorized. Only then correct the `name`/`logo` pairs (or remove unauthorized ones).
- **Estimated effort:** XS once the correct pairing is confirmed by the business; the blocker is entirely informational, not technical.
- **Dependencies:** Requires business input (§25) before any code change.
- **Validation method:** Visual review of the rendered section against a confirmed, business-approved brand/logo list.

---

## 8. High-Priority Findings (P1)

### P1-1 — Business-hours logic duplicated in three places, with a real contradiction
- **Severity:** P1 — High
- **Evidence:** Three independent implementations of "is the store open right now":
  1. `lib/horarios.ts:1-25` — `getStatusLojaAgora()`: Mon–Thu continuous 07:00–17:45, Fri 07:00–12:00. **Not imported anywhere in the codebase** (confirmed dead file).
  2. `components/site/InfoCards.tsx:23-69` — `getStatusAgora()` (homepage): Mon–Thu **07:00–12:00, closed 12:00–13:00 for lunch, then 13:00–17:45**; Fri 07:00–12:00.
  3. `components/site/contato/ContatoGrid.tsx:49-68` — `getStatusLojaAgora()` (`/contato` page): identical logic to #1 (continuous, no lunch break).
  The displayed static hours text also differs slightly in presentation but agrees with the "no lunch break" version in both `InfoCards.tsx:261-277` (static table) and `ContatoGrid.tsx:101-106` (static text) — meaning the *dynamic* open/closed badge on the homepage can say "Fechado agora" (closed) during the 12:00–13:00 window while the homepage's own static hours table right next to it says the store is open 07:00–17:45 with no gap, and the `/contato` page's dynamic badge will simultaneously say "Aberto agora" (open) for the exact same minute.
- **Impact:** A customer checking the homepage at, say, 12:30 on a Tuesday sees a "Fechado agora" badge next to a table that implies continuous hours, and would see the opposite ("Aberto agora") if they instead checked `/contato`. This directly undermines trust in the stated hours and is a real, user-visible content contradiction, not a cosmetic issue.
- **Recommended direction:** Confirm with PETRY DISTRIBUIDORA whether a lunch closure actually exists (see §17/§25), then implement the single correct rule once in `lib/horarios.ts`, delete the two inline duplicates, and import the shared helper from both `InfoCards.tsx` and `ContatoGrid.tsx`.
- **Estimated effort:** S
- **Dependencies:** Needs the business-hours fact confirmed first (§25)
- **Validation method:** Manually set system/test clock across the Mon–Fri boundary times (07:00, 12:00, 13:00, 17:45) and confirm identical open/closed state is reported on both `/` and `/contato`

### P1-2 — Hero carousel uses a lazy-loaded, unoptimized `<img>` for the likely LCP element
- **Severity:** P1 — High
- **Evidence:** `components/site/BannerRotator.tsx:31-43` (`PictureFill`) renders a plain `<img loading="lazy" ...>` inside a `<picture>` element — not `next/image`. This component is used for the homepage hero (`app/(site)/page.tsx:21`, the very first visible content on the page) with source files up to several MB (see P1-10). `loading="lazy"` on the first above-the-fold image works against the browser's own LCP optimization, since lazy-loading defers fetch until the image nears the viewport — normally unnecessary and counterproductive for content already in the viewport on load.
- **Impact:** Probable Largest Contentful Paint (LCP) regression on the homepage — the exact metric Core Web Vitals weighs most heavily, and the one most tied to bounce rate on a first-impression marketing page. This is a **risk based on code inspection, not a measured result** (no Lighthouse run was performed).
- **Recommended direction:** Convert `BannerRotator`'s image rendering to `next/image` with `priority` on the first slide (mirroring the pattern already used correctly in `VisaoGeralSection.tsx`, `SobreHero.tsx`, and other components), and drop `loading="lazy"` for the initially-visible slide.
- **Estimated effort:** S
- **Dependencies:** None
- **Validation method:** Run Lighthouse/PageSpeed Insights against the homepage before/after; confirm LCP element and timing improve

### P1-3 — No `robots.txt` or `sitemap.xml`
- **Severity:** P1 — High
- **Evidence:** Confirmed absent via full-repo search (`app/robots.ts`, `app/sitemap.ts`, `public/robots.txt`, `public/sitemap.xml` — none exist).
- **Impact:** Search engines have no explicit crawl guidance and no discovery aid for the 6 public routes. For a low-authority local-business site, an XML sitemap materially helps initial and ongoing indexing; its absence is a pure loss with no offsetting benefit.
- **Recommended direction:** Add `app/robots.ts` and `app/sitemap.ts` (both trivial with the Next.js App Router metadata file conventions — no new dependency required) listing the 6 static routes.
- **Estimated effort:** XS
- **Dependencies:** Needs the final production domain to be known (see §25) to set `sitemap.xml`'s absolute URLs correctly
- **Validation method:** `curl https://<domain>/robots.txt` and `/sitemap.xml` return valid content; validate sitemap via Google Search Console

### P1-4 — No structured data (Organization / LocalBusiness schema)
- **Severity:** P1 — High
- **Evidence:** Full-repo search for `application/ld+json` / `schema.org` found zero matches.
- **Impact:** A real street address, phone numbers, and hours already exist in the codebase (`ContatoGrid.tsx`) but are not exposed to search engines in a structured, machine-readable way. For a physical, local B2B distributor, `LocalBusiness` JSON-LD is one of the highest-leverage, lowest-effort local-SEO improvements available (Google Business Profile / local pack visibility, rich snippets), and all the source data for it is already sitting in the codebase.
- **Recommended direction:** Add a `LocalBusiness` (or more specific `HardwareStore`/`Store`) JSON-LD block to the root or `/contato` layout, populated from the same address/phone/hours values already in `ContatoGrid.tsx` (ideally by extracting them to a single shared data source first, addressing P1-1 and this item together).
- **Estimated effort:** S
- **Dependencies:** Confirmed legal company name/CNPJ if desired for full schema completeness (see §25); not blocking for a basic `LocalBusiness` block
- **Validation method:** Google's Rich Results Test against the page

### P1-5 — Missing per-page `<title>`/description on Home, Contato, Serviços, Sobre
- **Severity:** P1 — High
- **Evidence:** Only 3 of 7 route files export `metadata`: `app/(site)/catalogos/page.tsx:3-5`, `app/(site)/linhas/page.tsx:3-7`, `app/(site)/produtos/page.tsx:7-11`. `app/(site)/page.tsx` (home), `app/(site)/contato/page.tsx`, `app/(site)/servicos/page.tsx`, and `app/(site)/sobre/page.tsx` export none, so all four fall back to the single generic title/description defined in `app/layout.tsx:4-7` ("Distribuidora de Alumínios — Catálogo & Atendimento").
- **Impact:** Search results and browser tabs cannot distinguish the homepage from the Contact, Services, or About pages — all four show the identical title and meta description. This is a basic, well-understood technical SEO defect (duplicate title tags) that actively suppresses click-through and indexing quality for 4 of 7 pages.
- **Recommended direction:** Add a page-specific `export const metadata` object to each of the four missing pages, following the exact pattern already used correctly in `produtos/page.tsx`.
- **Estimated effort:** XS
- **Dependencies:** None
- **Validation method:** View source / inspect `<title>` on all 7 routes, confirm all are unique and descriptive

### P1-6 — `next lint` is not actually usable (no ESLint configuration exists)
- **Severity:** P1 — High
- **Evidence:** `package.json:9` declares `"lint": "next lint"`, and `eslint`/`eslint-config-next` are installed as devDependencies, but no `.eslintrc.json`/`.eslintrc.js`/`eslint.config.*` exists anywhere in the repository root. Running `npx next lint` (confirmed live during this review) drops into an interactive "How would you like to configure ESLint?" wizard and cannot complete non-interactively — meaning it also cannot run in any CI pipeline as-is.
- **Impact:** The one static-analysis quality gate this project claims to have does not function. Combined with zero tests (P1-7), this means there is currently no automated mechanism that would have caught any of the bugs in this report (the stray `]` in a className, the `target="blank"` typo, the duplicated/contradictory hours logic, etc.) before or after the fact.
- **Recommended direction:** Run the ESLint setup wizard once (or hand-author a minimal config extending `next/core-web-vitals`), commit the resulting config file, and re-run `next lint` to establish a baseline of current warnings/errors to triage.
- **Estimated effort:** XS to add the config; S–M to triage whatever the first real lint run surfaces
- **Dependencies:** None
- **Validation method:** `npm run lint` completes non-interactively with a clear pass/fail and a finite list of issues

### P1-7 — Zero automated tests and zero CI pipeline
- **Severity:** P1 — High
- **Evidence:** No `*.test.*`/`*.spec.*` files anywhere in the repo; no test runner in `package.json` devDependencies; no `.github/workflows/`, no other CI config of any kind found in the repository.
- **Impact:** Every change to this codebase — including the fixes recommended in this very document — currently relies entirely on manual, ad-hoc verification. Given the codebase's history of drifted duplicated logic (P1-1) and small typos that silently degrade behavior (P1-9, P1-11) rather than crashing, this is a real, demonstrated regression risk, not a theoretical one.
- **Recommended direction:** At minimum, add the ESLint config (P1-6) and a CI workflow that runs `tsc --noEmit` + `next lint` + `next build` on every push/PR before any further feature work — this catches an entire class of the issues in this report automatically and cheaply. A small Playwright smoke test (page loads, key CTAs resolve to the right `href`) would directly prevent regressions like P0-1.
- **Estimated effort:** S for CI + type/lint gate; M for a minimal smoke-test suite
- **Dependencies:** P1-6 (needs a working lint config first)
- **Validation method:** A PR with an intentionally broken CTA link fails CI

### P1-8 — Dead components hardcode real employee data and reference nonexistent images
- **Severity:** P1 — High
- **Evidence:** `components/site/sobre/SobreEquipe.tsx:3-10` and `components/site/sobre/TimeSection.tsx:12-19` both hardcode the same six real first names and job roles (Sr Lucas, Roger, Emidio, Mario, Renata, Renan) with short first-person-style quotes attributed to them. Neither component is imported by any page (`SobreEquipe` is explicitly commented out in `app/(site)/sobre/page.tsx:5,14`; `TimeSection` is not referenced anywhere at all). Both reference image paths (`/sobre/equipe/*.jpg` and `/time/*.jpg` respectively) that do not exist anywhere under `public/` — confirmed via full directory search.
- **Impact:** Two separate concerns: (1) real personal data (names, roles, and quotes attributed to real people) is committed to source control in components that were apparently meant to ship but never did, which is worth the business's attention independent of code quality; (2) this is duplicated, broken, dead code that would render broken images immediately if anyone re-enabled either component without also fixing the paths.
- **Recommended direction:** **Business decision required** on whether a team section is wanted for `/sobre` at all (see §25). If yes: pick one of the two implementations (they're near-identical; `SobreEquipe.tsx`'s presentation slightly better matches the rest of `/sobre`'s visual style), get real photos placed at correct paths, and delete the other. If no: delete both files outright.
- **Estimated effort:** XS to delete; S–M to actually finish one if the business wants it, pending real photos
- **Dependencies:** Business decision + real employee photos
- **Validation method:** N/A until business decision is made

### P1-9 — Broken Tailwind class silently drops desktop header padding
- **Severity:** P1 — High
- **Evidence:** `components/site/Header.tsx:19`:
  ```tsx
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8] py-4 flex items-center gap-4">
  ```
  Note the stray `]` at the end of `lg:px-8]`. Tailwind's JIT compiler does not recognize `lg:px-8]` as a valid utility class (it looks like a malformed arbitrary-value class) and silently drops it — Tailwind has no mechanism to warn about unrecognized class strings at build time by default.
- **Impact:** At the `lg` breakpoint and above (desktop), the header's horizontal padding utility for that breakpoint is never applied; the header falls back to the `sm:px-6` value on large screens instead of the intended `px-8`. This is a small, code-verifiable visual defect, not a subjective judgment — the exact opposite of what a `lg:` prefix is meant to do (visual gap between "intended" and "actual" CSS, confirmable by reading the class list, no browser required).
- **Recommended direction:** Remove the stray `]` → `lg:px-8`.
- **Estimated effort:** XS
- **Dependencies:** None
- **Validation method:** Inspect the compiled CSS/computed styles on the header container at ≥1024px viewport width and confirm `padding-left/right: 2rem` is applied

### P1-10 — Sitewide unoptimized image weight (multiple 1–6.6MB assets)
- **Severity:** P1 — High
- **Evidence:** Direct file-size inspection of `public/banners/**` found dozens of PNG/JPEG assets over 1MB actively referenced from components, including (non-exhaustive): `hero/petry.jpg` (6.6MB, used in `VisaoGeralSection.tsx`... note: actual reference is `empresa/petr.jpeg`), `catalogos/ctg-perfetta.png` (3.3MB), `desktop/Banner12.png` (3.5MB, used as a homepage hero slide), `catalogos/capa3.png` (4.3MB), `catalogos/capa4.png` / `capa2.png` (2.7–2.8MB), `sobre/pt.png` and `empresa/pt.png` (2.7MB each), several `servicos/*.jpeg` files (1.1–1.4MB each, all rendered on a single page via `ServicosPage.tsx`), and more. None of these appear to be pre-compressed or served in a modern format (WebP/AVIF) at source.
- **Impact:** Even where `next/image` is used correctly elsewhere (it performs on-the-fly optimization/resizing at request time), the *source* files being multiple megabytes each still costs real build/optimization-cache time and increases cold-start optimization latency; the ones going through the raw `<img>` path in `BannerRotator` (P1-2) get **no** optimization at all and are served at full original size/format to every visitor. This is a code/asset-level risk, not a measured Core Web Vitals result.
- **Recommended direction:** Batch-compress and convert the `public/banners/**` tree to WebP (or let a build step do it) before altering any component code; prioritize the images used above-the-fold (homepage hero slides, `/servicos` mosaic, `/sobre` hero) first.
- **Estimated effort:** M (bulk asset pass, ideally scripted, then spot-check visual quality)
- **Dependencies:** None
- **Validation method:** Compare total transferred bytes per page in browser DevTools Network tab before/after

### P1-11 — Internal navigation link forced into a new window via a `target` typo
- **Severity:** P1 — High
- **Evidence:** `components/site/produtos/ProdutosHero.tsx:26-31`:
  ```tsx
  <a  target="blank"
      href="/catalogos"
      className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-neutral-950 hover:bg-emerald-400 transition"
  >
      Ver catálogos →
  </a>
  ```
  `target="blank"` (missing the leading underscore) is not the `_blank` browser keyword — it is a literal, reusable named window/frame target called `"blank"`. This is the only internal link in the entire codebase that sets any `target` attribute at all; every other internal `<a href="/...">` correctly omits `target` and lets Next.js client-side routing handle it in-app.
- **Impact:** Clicking this specific "Ver catálogos" button on `/produtos` breaks the single-page-app navigation experience — instead of a fast client-side transition to `/catalogos`, it forces a full page load in a separate (and, due to the typo, oddly-named/reusable) browser window/tab, inconsistent with identical-looking buttons everywhere else on the site.
- **Recommended direction:** Remove the `target="blank"` attribute entirely (internal links should not set `target` at all).
- **Estimated effort:** XS
- **Dependencies:** None
- **Validation method:** Click "Ver catálogos" on `/produtos`, confirm it navigates in the same tab

---

## 9. Medium and Low-Priority Findings

### P2 — Medium

- **P2-1 — Duplicated catalog data (`CatalogosGrid.tsx` vs. `CatalogosCinematic.tsx`).** Both define a near-identical 4-item `catalogos`/`cats` array for the same Google Drive files, but with *different* cover image assets (`capa1-4.png` vs. `ctg-*.png`) for what is presented as the same catalog set. **Impact:** any future catalog swap requires editing two files or risks the homepage carousel and `/catalogos` page showing different covers for "the same" PDF, which has already effectively happened. **Effort:** S — extract to one shared array in `lib/`.
- **P2-2 — `PadraoPremium.tsx:66` renders the same field twice.** `<p className="text-xs uppercase ...">{x.t}</p>` followed immediately by `<p className="mt-2 text-lg font-black ...">{x.t}</p>` — the second line almost certainly should show different copy (or the description `x.d`, which is instead relegated to a third, smaller line). **Effort:** XS.
- **P2-3 — Fragile relative image path for the site logo.** `Header.tsx:21` uses `src="./banners/logo/logozin.png"` (relative) instead of an absolute `/banners/logo/logozin.png`. It happens to resolve correctly today only because every route in this app is a single path segment; it would silently break the moment any nested route (e.g. `/produtos/algum-item`) is introduced. **Effort:** XS.
- **P2-4 — Meaningful logo marked `alt=""`.** `Header.tsx:21` sets `alt=""` on the actual company logo/wordmark image (correct only for purely decorative images) instead of a real accessible name like `alt="Petry Distribuidora"`. **Effort:** XS.
- **P2-5 — Unmanaged/duplicate asset filenames in `public/`.** Confirmed present: `desktop/b21 (1).png` / `b21 (2).png`, `desktop/b22 (1).png` alongside `b22.png`, `desktop/Banner4 (1).png`, `linhas/c5 (1).png` / `c5 (2).png`, `parceiros/3F (1).png`, `Alushow (1).png`, `Soprano (1).png`, `produtos/barrachatas (1).png`. These "(1)"/"(2)" suffixes are the signature of repeated manual drag-and-drop uploads without cleanup, and `public/logo.svg` plus `banners/logo/logo.png` and `banners/logo/looogo.png` are never referenced by any component at all (only `banners/logo/logozin.png` is used). **Effort:** S — audit and remove genuinely unused files (verify each is truly unreferenced before deleting).
- **P2-6 — Dead social-icon code in `Footer.tsx`.** `FACEBOOK`, `LINKEDIN`, `X` constants (lines 5-7) and the `IconFacebook`/`IconX`/`IconLinkedIn` components (lines 145-172) are defined but only ever invoked inside commented-out JSX (`Footer.tsx:80-83`). **Effort:** XS — either wire them up (if those accounts exist, see §25) or delete the dead code.
- **P2-7 — Orphaned 912-line scratch file at repo root.** `teste.txt` (~42KB) sits at the project root, outside `app/`/`components/`/`lib/`, containing what appears to be an earlier draft data structure for the lines/products catalog. It is not imported or referenced by any build file. **Effort:** XS — confirm nothing in it is needed, then remove it from the repo (it is currently tracked in git, not gitignored).
- **P2-8 — No `.env.example`.** The single required environment variable, `CURRENCYAPI_KEY`, is undocumented anywhere in the repo (not in `README.md`, no `.env.example`). A new developer or a redeployment to a new hosting account has no in-repo way to discover this requirement short of reading `route.ts` source. **Effort:** XS.
- **P2-9 — 4MB `favicon.ico` at repo root, not wired into the app at all.** `favicon.ico` (4.0MB) sits at the project root (sibling to `app/`), not inside `app/` or `public/`. Next.js App Router only auto-serves a favicon from `app/favicon.ico` (or an `icons` entry in `metadata`) — this file is in neither location, so it is not served by the site at all; it is pure dead weight in the git history (a 4MB blob) while the live site likely falls back to a browser default or no favicon. **Effort:** XS to remove the stray file; S to properly add a real, appropriately-sized (a few KB) favicon via `app/icon.png` or `metadata.icons`.
- **P2-10 — `AcabamentosSection.tsx` dead code with broken image references.** Commented out of `page.tsx:7,29`; its `itens[]` array (lines 20-66) points at `/banners/destaques/*.webp` files that do not exist anywhere in `public/`. **Effort:** XS to delete, or M to actually finish it if the business wants a "highlights" section (needs real images either way).
- **P2-11 — Placeholder Rickroll video ID in dead `SobreVideo.tsx`.** `components/site/sobre/SobreVideo.tsx:22` embeds `https://www.youtube.com/embed/dQw4w9WgXcQ` — the classic "Rick Astley" placeholder — never swapped for a real company video, inside a component that's currently commented out of `/sobre` (`app/(site)/sobre/page.tsx:2,11`). **Effort:** XS to delete if no video exists; needs a real video asset to finish properly.

### P3 — Low

- **P3-1 — Spelling inconsistency: "Maxin-ar" vs. "Maxim-ar."** `components/site/linhas/LinhasPage.tsx:30` reads "Perfetta 45 - Maxin-ar e Fixo," while the same line item is spelled "Maxim-ar" everywhere else it appears (`LinhasMarquee.tsx:10`, home marquee data). **Effort:** XS.
- **P3-2 — Redundant double page-transition animation.** `app/(site)/template.tsx` already wraps every route change in a `.pageIn`-animated `<div>` for the whole `(site)` route group, but `contato/page.tsx:8` and `sobre/page.tsx:9` additionally add their own `className="pageIn"` on their `<main>` — harmless today (same animation, same timing) but redundant and inconsistent with the other 5 pages, which rely on `template.tsx` alone. **Effort:** XS.
- **P3-3 — ~15 lines of commented-out "badge" feature in `ProdutosVitrine.tsx:73-87`.** Dead JSX block plus an unused computed `badge` variable (lines 43-45) left in a component that is otherwise clean. **Effort:** XS.
- **P3-4 — Two parallel marquee/ticker CSS implementations.** `app/globals.css:74-107` defines a global `.cl-marquee`/`.cl-marquee-track` system used by `LinhasMarquee.tsx` and `LinhasPage.tsx`; `MarcasSection.tsx:99-160` independently reimplements the same visual effect via a scoped `<style jsx>` block with its own `.cl-marquee`/`.cl-track` class names. Functionally harmless (styled-jsx scopes its classes), but confusing for a future maintainer trying to find "the" marquee implementation. **Effort:** S to consolidate.
- **P3-5 — "Fosco" (a finish, not a color) listed in the color picker.** `CoresSection.tsx:14` lists "Fosco" (Portuguese for "matte/frosted," a *finish*, not a hue) alongside actual named colors (Preto, Branco, Bronze, etc.) with a plain gray hex swatch — a minor taxonomy inconsistency worth a content pass, not a code defect. **Effort:** XS, content-only.
- **P3-6 — DevDependencies are one-to-two major versions behind latest.** `npm outdated` (evidence, §2) shows Next 14→16, React 18→19, Tailwind 3→4, TypeScript 5.7→7 all available. No urgency on its own, but worth folding into the same upgrade planning as P0-2 rather than doing two separate major-version migrations later. **Effort:** L (major-version upgrade planning), not urgent in isolation.

---

## 10. UX and Conversion Review

**User journey.** The primary intended journey is: land on homepage → understand product range → contact via WhatsApp (or download a catalog PDF first). This journey is short and well-supported by design — WhatsApp CTAs are present on nearly every section and page (14 separate instances found in code) and the phone number is consistent everywhere *except* the one broken mobile-menu instance (P0-1). Once P0-1 is fixed, the conversion path is genuinely strong for a trade/B2B audience that primarily wants to message quickly rather than fill out a form.

**Content clarity.** Product/service copy is specific and benefit-oriented in Portuguese ("Você não fica na mão quando o cliente pede 'mais 2 barras'" — colloquial, credible trade-industry language), not generic template filler. The product-line taxonomy (`/linhas`) is thorough to the point of being slightly overwhelming as a flat list with no search or filter — a content-organization opportunity rather than a defect.

**Calls to action.** CTA hierarchy is consistent: emerald "primary" WhatsApp/contact buttons vs. white/10 "secondary" buttons (catalogs, product pages) appears intentionally and consistently applied across nearly all sections reviewed.

**Credibility.** Real address, real phone numbers, and a real timeline (1975→today) support credibility strongly — until a visitor reaches the brand-partners section (P0-3), which actively undermines it for anyone who recognizes a supplier logo.

**Lead-generation friction.** Very low by design (WhatsApp-first, one tap) — the main friction *introduced* is the P0-1 bug itself, which is a self-inflicted, fixable regression rather than a structural UX problem.

**Mobile experience.** Structurally sound (hamburger menu, responsive grids, touch-swipe support in `BannerRotator`), but not verified in an actual mobile browser as part of this review (see §2 limitations); the one confirmed mobile-specific defect is P0-1.

**Recommended direction:** fix P0-1 immediately; consider adding a lightweight category filter/search to `/linhas` given its length; otherwise the conversion architecture does not need structural rework.

---

## 11. Visual and Design-System Review

*(Objective, code-verifiable observations are marked **[code]**; subjective visual judgments are marked **[subjective]**.)*

- **[code]** Color usage is centralized around Tailwind's default `neutral`/`emerald` scales plus one custom `brand` scale defined in `tailwind.config.ts:11-25` — but the custom `brand` palette is **never actually used** anywhere in the codebase (a `grep` for `brand-` utility classes returns nothing); every emerald tone in the actual UI comes from Tailwind's built-in `emerald-*` scale instead. The custom palette is dead configuration.
- **[code]** Typography is Tailwind-default (no custom font is loaded via `next/font` or `@font-face` anywhere) — the site relies entirely on the system font stack. This is a legitimate, deliberate choice for performance (zero font-loading cost) but also means there is currently no distinctive typographic identity beyond weight/tracking utilities.
- **[code]** Spacing/radius vocabulary is consistent: `rounded-2xl`/`rounded-3xl` and a `p-5`–`p-10` range recur predictably across nearly every card-like component reviewed — a real, if implicit, design system exists in practice even though it isn't formally extracted into Tailwind theme tokens or a component library.
- **[code]** Button hierarchy is consistent (see §10) — one clear primary (emerald, filled) and one clear secondary (white/10, outlined) treatment reused everywhere reviewed.
- **[subjective]** The dark, "cinematic" aesthetic (grain overlays, glow gradients, crossfades) reads as intentional and premium rather than templated — a genuine strength worth preserving.
- **[subjective]** Some sections (`CatalogosCinematic`, `MarcasSection`) layer 3–4 simultaneous visual effects (grain + glow + gradient + blur) which may read as slightly busy on lower-end displays or in bright ambient light; this is a taste judgment, not a defect.
- **[code]** No form components exist anywhere in the codebase (no `<form>`, `<input>`, or form library) — all "data entry" is delegated to WhatsApp/phone/email links. This is a legitimate, low-maintenance choice for this business model, not a gap, given the CTA strategy in §10.
- **[code]** No loading/empty/error state exists for the currency widget beyond three text strings computed inline in `InfoCards.tsx:175-199` ("Carregando cotação...", the error message, or the value) — functional but minimal; no skeleton or spinner.
- **[code]** Hover/focus states: hover states are present and consistent (`hover:bg-white/10` etc. throughout); **explicit `focus-visible` styling exists only in `DiferenciaisCircle.tsx:168,244`** — the vast majority of interactive elements (nav links, all WhatsApp buttons, catalog cards, color swatches) rely entirely on the browser's default focus ring rather than a deliberate focus style. See §12 for the accessibility implication.
- **[subjective/code mixed]** Reusable design tokens are implicit (repeated utility strings) rather than extracted — a `Button`, `Card`, and `SectionHeading` component (or a small `cva`/variant helper) would remove a large amount of the class-string duplication visible across nearly every file read during this review, and would make the "premium standard" pattern (title + description + two CTAs, repeated near-verbatim in `ProdutosHero`, `PadraoPremium`, `ProdutosCTA`, `ContatoCTASection`, and others) a single maintained component instead of five near-identical copies.

---

## 12. Accessibility Review

**Confirmed (code-verifiable) findings:**
- `app/layout.tsx:11` correctly sets `<html lang="pt-BR">` — language declaration is present and correct.
- Landmark structure is present: `<header>` (`Header.tsx:18`), `<main>` (`(site)/layout.tsx:12`), `<footer id="site-footer">` (`Footer.tsx:11`) — a real, if minimal, landmark skeleton exists on every page.
- **No skip-to-content link exists anywhere** — a keyboard user must tab through the entire header/nav on every single page load before reaching page content.
- Focus-visible styling is implemented in exactly one component (`DiferenciaisCircle.tsx`, see §11) out of dozens of interactive elements reviewed; everywhere else (nav links, all `wa.me` buttons, catalog download links, color/line-item pickers) relies on browser-default focus indication only, which varies significantly by browser and is sometimes suppressed by other CSS in the cascade (not independently verified here, but the absence of an explicit style is a confirmed **probable risk**.
- `Header.tsx:21`: the site's logo/wordmark image has `alt=""` (see P2-4) — a meaningful image marked as decorative is an accessible-name defect, confirmed in code.
- Several purely decorative background images correctly use `alt=""` (e.g., `CatalogosCinematic.tsx:95`, blurred background layer) — this is the *correct* pattern, applied inconsistently relative to the logo case above.
- `DiferenciaisCircle.tsx` (lines 148-172, 234-269) implements real semantic/ARIA affordances: `role="tablist"`, `aria-label`, `aria-pressed`, `aria-expanded`, and keyboard arrow-key handling — the strongest accessibility implementation found anywhere in the codebase and a good template for other interactive widgets (e.g. `CoresSection.tsx`'s color picker, which has no equivalent keyboard/ARIA support).
- Heading hierarchy was spot-checked across pages: each page has exactly one `<h1>` (in its hero component) followed by `<h2>`/`<h3>` for sections — no confirmed skip-level or duplicate-`<h1>` issues found in the files read.
- Form labeling is not applicable — no `<form>`/`<input>` elements exist anywhere in the codebase (see §11).
- `prefers-reduced-motion` is explicitly respected in `globals.css:110-128`, `useInView.ts:14-18`, `DiferenciaisCircle.tsx:71`, `CatalogosCinematic.tsx` (styled-jsx), and `MarcasSection.tsx` (styled-jsx) — a genuinely above-average, repeated pattern across this codebase.
- Touch target sizing: primary CTA buttons consistently use `px-5 py-3`/`px-6 py-3` padding (comfortably exceeding the 24×24px WCAG 2.2 minimum in practice); the mobile hamburger button (`Header.tsx:55-61`) is a fixed `h-10 w-10` (40×40px) — passes.

**Probable risks (not measured, flagged for validation):**
- Numerous text treatments use low-opacity white/neutral tones on dark backgrounds (`text-white/50`, `text-white/45`, `text-neutral-400`, `text-neutral-500` — dozens of occurrences across nearly every component) which are common WCAG 2.2 AA contrast-ratio failure points (the 4.5:1 body-text / 3:1 large-text thresholds) on a pure black (`bg-black`) background. **This was not measured with a contrast tool as part of this review** — it is flagged as a probable risk requiring an automated contrast audit (e.g., axe DevTools or Lighthouse accessibility run) before being treated as confirmed.
- The Google Maps and YouTube `<iframe>` embeds (`ContatoMapa.tsx:19-25`, dead `SobreVideo.tsx:20-26`) have a `title` attribute (good) but were not tested for keyboard operability or screen-reader announcement behavior inside third-party iframe content.
- Modal/menu focus management: the mobile menu (`Header.tsx:65-91`) toggles visibility via conditional rendering and state but does not trap focus, move focus into the opened menu, or return focus to the toggle button on close — a probable keyboard-navigation gap, not confirmed via an actual screen reader/keyboard pass.
- No screen-reader-only (`sr-only`) text was found anywhere in the codebase for icon-only buttons beyond `aria-label` attributes (which is an acceptable alternative, but worth confirming in a real screen-reader pass rather than code inspection alone).

**Validation recommendations:** run an automated pass (axe DevTools or Lighthouse Accessibility) against all 7 routes, and a manual keyboard-only + screen-reader (NVDA or VoiceOver) pass focused specifically on the mobile menu, the color/differentiator pickers, and the two iframe embeds, before making any accessibility claim beyond what's confirmed above. **No WCAG conformance level is claimed for this site** — the evidence gathered here is insufficient to certify any level and should not be represented as such.

---

## 13. SEO Review

**Technical SEO:**
- P1-3 (no `robots.txt`/`sitemap.xml`) — confirmed missing.
- P1-5 (4 of 7 pages share one generic `<title>`/description) — confirmed via source inspection.
- No canonical URLs (`alternates.canonical`) are set on any page — not independently harmful for a site with no duplicate-content risk today, but worth adding alongside the P1-5 fix since it's the same `metadata` object.
- No Open Graph or Twitter card metadata exists anywhere (`openGraph`/`twitter` fields absent from every `metadata` export found) — link previews shared in WhatsApp, Facebook, or Instagram (all channels this business plausibly uses) will render with no image and a generic title.
- `next.config.mjs` sets no `images.remotePatterns`/`domains` — fine today since every image is local, but would need updating the moment any external image host (e.g., a CMS) is introduced.

**Content SEO:**
- Body copy is specific, in natural Portuguese, and avoids obvious keyword-stuffing — a genuine strength.
- Heading structure (one `<h1>` per page, confirmed in §12) is SEO-sound.
- No blog, articles, or other frequently-updated content type exists — acceptable for a small distributor site, but a content gap if organic search growth is ever a stated goal (see §25).

**Local SEO:**
- P1-4 (no `LocalBusiness` structured data) — confirmed missing despite all source data (address, phone, hours) already existing in `ContatoGrid.tsx`.
- No `NAP` (Name/Address/Phone) consistency issue was found — the address and phone numbers are identical everywhere they appear in the codebase.
- No mention of a Google Business Profile link, and no embedded reviews/testimonials widget exists — a local-SEO and trust-signal opportunity (see §17).

**Structured data:** none exists at all (Organization, LocalBusiness, Product, BreadcrumbList, FAQPage — all absent). The `ContatoFaq.tsx` component in particular is a ready-made candidate for `FAQPage` schema with zero new content required.

**Items requiring PETRY DISTRIBUIDORA business information:** legal company name/CNPJ for full `Organization`/`LocalBusiness` schema completeness; confirmation of the production domain for `sitemap.xml`/canonical URLs; a preferred Open Graph share image; confirmation of active social profiles (see §17, §25).

---

## 14. Performance Review

**Measured evidence:** none. No Lighthouse, PageSpeed Insights, or WebPageTest run was performed (see §2 limitations) — nothing in this section should be read as a Core Web Vitals score.

**Code-based risk analysis:**
- P1-2 (lazy-loaded, unoptimized hero `<img>`) — the single highest-confidence performance risk identified, because it directly affects the LCP candidate element via source-code inspection (not measurement).
- P1-10 (sitewide multi-MB source images) — a broad risk affecting total page weight on `/`, `/catalogos`, `/servicos`, and `/sobre` in particular, all of which render several large images per page.
- Every interactive homepage section (`BannerRotator`, `InfoCards`, `VisaoGeralSection`, `LinhasSection`, `CatalogosCinematic`, `DiferenciaisCircle`, `CoresSection`, `MarcasSection`, `ContatoCTASection`) is a `"use client"` component — meaning almost the entire homepage ships as client-side JavaScript rather than static server-rendered HTML, even for content (product descriptions, brand names, color swatches) that has no interactivity requirement and could be server-rendered. This is a code-architecture observation with a plausible (unmeasured) JS-payload and hydration-cost impact, not a confirmed regression.
- `InfoCards.tsx` polls `/api/quotes/usdbrl` every 30 seconds (line 147) for as long as the homepage tab stays open — a small, continuous background network/CPU cost with no visibility/tab-focus check (`document.visibilityState`) to pause it when the tab isn't active.
- Several components (`CatalogosCinematic`, `MarcasSection`) use `<style jsx>` blocks, which Next.js compiles to per-component runtime style injection — a minor, well-understood styled-jsx cost, negligible at this scale but worth being aware of if the client-JS-heavy pattern above is addressed.
- No explicit code-splitting/dynamic `import()` is used anywhere — every homepage section loads as part of the initial route bundle rather than being deferred (e.g., via `next/dynamic`) for below-the-fold sections like `MarcasSection` or `ContatoCTASection`.
- Layout shift risk: most images use fixed aspect-ratio containers (`aspect-[16/10]`, `fill` + sized parent) — a correct pattern that mitigates CLS risk in the majority of cases reviewed; no obvious CLS-inducing pattern (e.g., unsized images) was found in the components read.
- Font loading: no custom web fonts are loaded (see §11) — this is actually a performance *positive* (zero font-loading cost, no FOIT/FOUT risk), noted here for completeness since §6 already credits it as a strength.

**Recommendation:** treat every item in this section as "risk to validate," not "confirmed regression" — the correct next step is a real Lighthouse/PageSpeed run against a deployed instance before prioritizing performance work beyond the already-clear P1-2/P1-10 image fixes.

---

## 15. Security and Privacy Review

*(No secret values are reproduced below, only file locations and risk descriptions.)*

- **Confirmed:** P0-2 — high-severity published advisories against the pinned `next`/`postcss` versions (see §7 for full detail and advisory IDs).
- **Confirmed:** the one secret used by this codebase (`CURRENCYAPI_KEY`) is referenced only in `app/api/quotes/usdbrl/route.ts:7`, read via `process.env`, and never interpolated into any client-visible response beyond the already-fetched numeric quote — correct handling, no exposure found. No `.env`/`.env.local` file exists in the working tree to inspect, and none is committed to git (`.gitignore:5` correctly excludes `.env`).
- **Confirmed:** no client-side API keys, tokens, or credentials of any kind were found in any `.tsx`/`.ts` file, `next.config.mjs`, or `package.json` — a full-repository search for common secret patterns and hardcoded credentials returned nothing beyond the one server-side key already discussed.
- **Confirmed:** no `dangerouslySetInnerHTML`, `eval`, or other unsafe HTML-rendering pattern was found anywhere in the codebase — no XSS-via-unsafe-rendering vector exists in this project's own code (independent of the framework-level advisories in P0-2).
- **Confirmed:** no contact/lead-capture form exists anywhere in the codebase (see §11) — there is therefore no form-abuse, spam, or input-validation surface to assess; all "submissions" are delegated to WhatsApp/phone/email links outside this application's control.
- **Confirmed:** no security headers (CSP, `X-Frame-Options`, `Strict-Transport-Security`, `Referrer-Policy`, etc.) are configured in `next.config.mjs` — the file contains no `headers()` function at all. This is a **probable risk** rather than an active exploit, but is worth closing given how cheap it is relative to the two `<iframe>` embeds already present (Google Maps, and the dead YouTube embed) and the framework-level advisories in P0-2 that specifically involve middleware/header handling.
- **Confirmed:** the two `<iframe>` embeds (`ContatoMapa.tsx:19-25` — Google Maps; dead `SobreVideo.tsx:20-26` — YouTube) both point at trusted, well-known third-party origins and use appropriate `referrerPolicy`/`allow` scoping — no obvious embed-based risk found.
- **Probable risk (external, not code-controlled):** the site links out to `wa.me`, `drive.google.com`, `instagram.com`, `facebook.com`, `linkedin.com`, and `x.com` via plain anchors. Every externally-opening link (`target="_blank"`) that was inspected correctly pairs it with `rel="noopener"` or `rel="noreferrer"` (the classic `window.opener` tab-nabbing risk is mitigated everywhere checked) — this is a confirmed **good** pattern, called out here rather than as a finding.
- **HTTPS assumptions:** the app itself makes no HTTP (non-TLS) requests anywhere in source (the one external API call, `api.currencyapi.com`, uses `https://` — `route.ts:17`); actual TLS enforcement in production depends entirely on hosting configuration, which is outside this repository's control and unconfirmed (see §2 assumptions).
- **Cookies / analytics consent / privacy policy:** no cookies are set anywhere in this codebase (confirmed — no `document.cookie`, no cookie library, no analytics scripts of any kind found, see §17), and **no privacy policy, terms of service, or cookie-notice page/content exists anywhere in the repository.** Since no analytics or tracking currently exists, there is no active consent obligation being violated today — but the complete absence of a privacy policy is itself a content gap worth closing before any analytics or form is added (see §17, §25).
- **Personal data in source:** P1-8 (real employee names/roles/quotes hardcoded in two dead, unused components) is also a minor privacy-hygiene finding independent of its dead-code status — committing real people's names/quotes to a public GitHub repository (confirmed public-style remote URL, `github.com/MarOasis/petrynovo`) is worth a second look regardless of whether those components ever ship.

---

## 16. Code Quality and Architecture Review

- **Separation of concerns** is reasonable at the page level (one component tree per route, organized under `components/site/<page>/`) but weak at the data level: business content (product lists, catalog metadata, brand names, hours) is embedded directly inside presentational components rather than centralized, which is the direct cause of P1-1 (hours logic drift) and P2-1 (catalog data drift). `lib/site.ts` and `lib/horarios.ts` show the right instinct (a data layer) but are incomplete and, in `horarios.ts`'s case, entirely unused in favor of copy-pasted inline duplicates.
- **Duplication** is the single most recurring theme in this codebase: business-hours logic (3 copies, P1-1), catalog data (2 copies, P2-1), team-member data (2 dead copies, P1-8), and marquee/ticker CSS (2 parallel systems, P3-4) are all the same information maintained in more than one place. None of these are large refactors individually, but together they represent the main regression-risk pattern going forward — any future content update has multiple candidate locations to edit, and at least one (P1-1) has already drifted into a real contradiction.
- **Component size/responsibility** is generally appropriate — no single component reviewed was unreasonably large or doing an unmanageable number of unrelated things; the largest (`InfoCards.tsx`, ~410 lines) is doing one cohesive job (three related dashboard-style cards) rather than mixing concerns.
- **Hardcoded content** is pervasive by design (see §3, "Content model") — acceptable for a small static marketing site without a CMS, but worth flagging as a scaling constraint: every content change currently requires a code change and redeploy, with no separation between "content a non-developer could safely edit" and "logic."
- **Naming consistency** is mostly good (Portuguese domain terms used consistently — "Linhas," "Perfis," "Acessórios" mean the same thing everywhere they appear) with a few rough edges: `getStatusAgora` vs. `getStatusLojaAgora` (same concept, two names, P1-1); the `Cor` vs. `Item` vs. `Cat` vs. `Linha` type-naming pattern is idiomatic-enough per-file but not unified.
- **Type safety** is strong overall (strict TypeScript, 0 compile errors) with one narrow gap: `InfoCards.tsx:140` catches with `(e: any)`, the only untyped `any` found in application code during this review.
- **Error handling**: the one network call with real failure modes (`/api/quotes/usdbrl`, consumed by `InfoCards.tsx`) has real, user-visible error handling (a distinct error string state, a red status color) — a good pattern; there is no equivalent to replicate elsewhere because no other component performs I/O.
- **Dead code** is a recurring, confirmed pattern: `AcabamentosSection.tsx`, `SobreEquipe.tsx`, `TimeSection.tsx`, `SobreVideo.tsx`, `lib/horarios.ts` (unused despite looking load-bearing), commented-out imports (`FloatingMobileCTA` in `(site)/layout.tsx:3,15` — referencing a component that doesn't exist anywhere in the repo, confirming it was deleted without its dead import being cleaned up), and the stray, non-functional `<html>` JSX expression statement at `(site)/layout.tsx:6` (a bare, unused, unreachable expression left over from an edit — it compiles and does nothing, but is confusing dead code sitting directly above the real `SiteLayout` function).
- **Configuration management**: minimal but appropriate for the project's size — the one real gap is P2-8 (undocumented required env var).
- **Regression risk for future changes:** **elevated**, not because the code is badly written, but because of the combination of (a) genuine content/logic duplication already shown to drift (P1-1), (b) zero automated tests or working lint gate (P1-6, P1-7) to catch the next drift or typo, and (c) a habit of leaving finished-looking-but-broken components in the tree rather than deleting them, which makes "is this file actually live?" a real, recurring question a new contributor would have to answer by hand (as this review had to).
- **Testability**: nothing in the current architecture actively resists testing (no tight coupling to browser globals beyond standard `window`/`document` APIs used defensively), so introducing tests (P1-7) is a tooling gap, not an architectural blocker.

---

## 17. Content and Business Information Gaps

The following facts are either missing, unconfirmed, or actively contradictory in the current codebase and should be confirmed with PETRY DISTRIBUIDORA before being relied upon or corrected in code:

- **Official company description / positioning statement** — the current copy is confident and specific but was written by (or for) the site, not confirmed as an approved company description.
- **Complete, authoritative product/brand list** — required specifically to resolve P0-3 (which supplier logos are real partners, and what each is actually called).
- **Legal company name and CNPJ** — not present anywhere in the codebase (footer copyright reads only "© PETRY," no registered legal entity name), needed for complete `LocalBusiness`/`Organization` structured data (§13) and any future legal/privacy page.
- **Confirmed, single source of truth for business hours** — required to resolve P1-1 (does a lunch closure exist or not?).
- **Confirmed production domain** — needed for `sitemap.xml`/canonical URLs (P1-3, §13).
- **Active social media accounts** — `Footer.tsx:5-7` hardcodes `FACEBOOK`/`LINKEDIN`/`X` as bare placeholder URLs (`https://facebook.com/`, `https://linkedin.com/`, `https://x.com/` — not company-specific paths) while only Instagram (`@petry.distribuidora`) and WhatsApp have real, specific URLs and are actually rendered (P2-6). Confirm which of Facebook/LinkedIn/X actually exist for the business before either wiring them up or deleting the dead code.
- **Approved testimonials/reviews** — none exist anywhere in the current content; a common trust-signal gap for a B2B distributor site (see §10, credibility).
- **Official/approved photography** — needed specifically to resolve the two dead team-section components (P1-8) and the dead "highlights" section (P2-10), all of which are blocked purely on missing real images, not code.
- **A real company video (or confirmation none is planned)** — needed to resolve P2-11 (or justify deleting `SobreVideo.tsx` outright).
- **Privacy policy / legal notice content** — confirmed entirely absent from the repository (§15); needs business/legal sign-off on content before it can be added, independent of any code work.
- **Preferred Open Graph share image and social preview copy** — needed for the Open Graph gap noted in §13.
- **Service area** — the site states a single physical address (Joinville, SC) but does not explicitly state whether service/delivery extends beyond the city/region; worth confirming so it can be stated explicitly (a common trust/conversion detail for B2B buyers deciding whether to even reach out).

---

## 18. Dependency and Integration Review

**Dependencies (from `package.json`):**
| Package | Current | Latest | Notes |
|---|---|---|---|
| `next` | 14.2.25 | 16.2.12 | **High-severity advisories present at current version — see P0-2** |
| `react` / `react-dom` | 18.3.1 | 19.2.8 | One major behind; no advisories found |
| `postcss` | 8.4.49 (direct) / ≤8.5.17 (transitive via `next`) | 8.5.25 | **High-severity advisories on the transitive copy — see P0-2** |
| `tailwindcss` | 3.4.17 | 4.3.3 | One major behind; no advisories found |
| `typescript` | 5.7.3 | 7.0.2 | Two majors behind; no advisories found, and current version type-checks clean |
| `eslint` / `eslint-config-next` | 8.57.1 / 14.2.25 | 10.8.0 / 16.2.12 | Installed but **unconfigured**, see P1-6 |
| `autoprefixer` | 10.4.20 | 10.5.4 | Minor version behind only |

No unused dependencies were found in `package.json` — every declared dependency is genuinely used somewhere in the codebase (Tailwind, PostCSS/Autoprefixer for the CSS pipeline; Next/React for the app itself).

**External services/integrations:**
- **currencyapi.com** — one outbound server-side call (`app/api/quotes/usdbrl/route.ts:16-25`), keyed via `CURRENCYAPI_KEY`, cached 60s. Single point of failure is handled gracefully (explicit error states surfaced to the UI, no crash). No documented fallback if the API key expires or the free-tier quota is exceeded beyond the generic error message.
- **Google Maps** (iframe embed, no API key) — low risk, no integration to maintain.
- **Google Drive** (4 static PDF share links used as the entire "catalog download" feature) — functional today, but represents an availability dependency on links that are not owned/versioned by this repository; if a file is moved, renamed, or a Drive sharing setting changes, catalog downloads break silently with no code-level way to detect it. Consider whether hosting the PDFs directly under `public/` (or a real asset host) is preferable long-term.
- **WhatsApp (`wa.me`)** — the core "integration," used as plain links, no Business API/webhook integration exists (nor would one be expected for a site this size).
- **No CMS, no database, no auth provider, no payment provider, no analytics provider, no error-monitoring/logging service (e.g., Sentry) of any kind** — confirmed absent from both `package.json` and source.
- **Hosting dependency:** inferred Vercel (or equivalent), unconfirmed — see §2 assumptions.

---

## 19. Production Readiness Checklist

| Item | Status | Notes |
|---|---|---|
| Build succeeds without errors | Not verified | `next build` was deliberately not run in this review (see §2); `tsc --noEmit` (a strong proxy) passes clean |
| Type checking passes | **Passed** | `tsc --noEmit` — 0 errors |
| Linting passes | **Failed** | No usable lint configuration exists (P1-6) |
| Automated tests exist and pass | **Failed** | Zero tests exist (P1-7) |
| CI/CD pipeline configured | **Failed** | No CI config found anywhere in the repository |
| Environment variables documented | **Failed** | `CURRENCYAPI_KEY` is required but undocumented (P2-8) |
| Secrets excluded from git | **Passed** | `.gitignore` correctly excludes `.env`; no secrets found committed |
| Dependency vulnerabilities resolved | **Failed** | 2 high-severity advisory groups outstanding (P0-2) |
| Primary conversion path functional | **Failed** | Mobile WhatsApp CTA broken (P0-1) |
| SEO crawlability (robots/sitemap) | **Failed** | Both missing (P1-3) |
| Structured data present | **Failed** | None exists (P1-4) |
| Unique per-page metadata | **Partial** | 3 of 7 routes have it (P1-5) |
| Security headers configured | **Failed** | None configured in `next.config.mjs` (§15) |
| Privacy policy / legal content | **Failed** | Does not exist (§15, §17) |
| Broken/dead routes | **Passed** | No broken internal routes found; all `<Link>`/`<a href="/...">` targets resolve to real pages |
| Custom error pages (404/500) | **Not verified** | No custom `app/not-found.tsx` or `app/error.tsx` found — Next.js default fallbacks would apply; not tested live |
| Responsive layout coverage | **Not verified** | Code uses responsive utility classes consistently across all components reviewed, but no real device/viewport testing was performed |
| Browser compatibility | **Not verified** | No browser matrix testing performed; nothing in the codebase (e.g., unprefixed bleeding-edge CSS) raised an obvious red flag during source review |
| Analytics/monitoring | **Not applicable / Failed** | None configured; not applicable if the business has not decided it wants any (see §25), but flagged as failed against a general production-readiness bar |
| Content accuracy (brand/logo section) | **Failed** | Confirmed mismatched (P0-3) |
| Content consistency (business hours) | **Failed** | Confirmed contradictory (P1-1) |
| Backups | **Not applicable** | No database or user-generated content exists to back up |

---

## 20. Prioritized Findings Matrix

| ID | Finding | Area | Severity | Impact | Effort | Dependency | Recommended order |
|---|---|---|---|---|---|---|---|
| P0-1 | Mobile WhatsApp CTA placeholder number | UX/Conversion | P0 | Very High | XS | None | 1 |
| P0-3 | Mismatched brand/logo pairs on homepage | Content/Legal | P0 | Very High | XS (post-decision) | Business confirmation | 2 |
| P1-9 | Broken Tailwind class drops header padding | Code quality | P1 | Low-Medium | XS | None | 3 |
| P1-11 | `target="blank"` typo breaks internal nav | Code quality | P1 | Medium | XS | None | 4 |
| P1-5 | Missing per-page metadata (4 pages) | SEO | P1 | High | XS | None | 5 |
| P1-3 | No robots.txt / sitemap.xml | SEO | P1 | High | XS | Production domain | 6 |
| P1-1 | Contradictory business-hours logic (3 copies) | Content/Code quality | P1 | High | S | Business confirmation | 7 |
| P1-6 | `next lint` unconfigured | Tooling | P1 | High (systemic) | XS | None | 8 |
| P1-7 | Zero tests, zero CI | Tooling | P1 | High (systemic) | S–M | P1-6 | 9 |
| P1-4 | No structured data | SEO | P1 | Medium-High | S | None | 10 |
| P1-2 | Hero image lazy-loaded, unoptimized | Performance | P1 | Medium-High | S | None | 11 |
| P1-10 | Sitewide oversized images | Performance | P1 | Medium-High | M | None | 12 |
| P0-2 | High-severity dependency vulnerabilities | Security | P0 | High | M–L | P1-7 (tests first) | 13 |
| P1-8 | Dead components with real personal data | Privacy/Code quality | P1 | Medium | XS (delete) / M (finish) | Business decision | 14 |
| P2-1 | Duplicated catalog data | Code quality | P2 | Low-Medium | S | None | 15 |
| P2-9 | Unused 4MB favicon.ico, no real favicon | Repo hygiene/Branding | P2 | Low-Medium | XS/S | None | 16 |
| P2-3 / P2-4 | Logo relative path + empty alt | Code quality/A11y | P2 | Low | XS | None | 17 |
| P2-5 / P2-7 | Unmanaged duplicate/orphan files | Repo hygiene | P2 | Low | S | None | 18 |
| P2-6 | Dead social-icon code | Code quality | P2 | Low | XS | Business confirmation (§25) | 19 |
| P2-8 | No `.env.example` | Tooling | P2 | Low | XS | None | 20 |
| P2-2 | Duplicated title text bug | Content | P2 | Low | XS | None | 21 |
| P2-10 / P2-11 | Dead broken sections (Acabamentos, SobreVideo) | Code quality/Content | P2 | Low | XS (delete) | Business decision | 22 |
| §15 headers | No security headers configured | Security | P2 | Low-Medium | S | None | 23 |
| §17 privacy | No privacy policy content | Legal | P1 (business-facing) | Medium | Business-owned | Business/legal input | as needed |
| P3-1…P3-6 | Spelling, redundant animation wrapper, dead comments, dual marquee systems, color/finish taxonomy, outdated devDeps | Polish | P3 | Low | XS–L | None | opportunistic |

*(Sort rationale: zero-risk, zero-dependency, high-visibility fixes first (1–4); metadata/SEO quick wins next (5–6); the one confirmed content contradiction (7); tooling foundations before the dependency upgrade so the upgrade can be validated (8–9); SEO/performance follow-through (10–12); the dependency upgrade itself, deliberately sequenced after tooling exists to catch regressions (13); everything requiring a business decision is pushed slightly later so it doesn't block pure-code fixes (14, 19, 22); hygiene and polish last.)*

---

## 21. Quick Wins

All of the following are low-risk, require no business input, and are individually under an hour of focused work. **None have been implemented — this is a list for the next work session, not a change log.**

1. Fix `Header.tsx:83` — replace `55SEUNUMERO` with `5547992866123` (P0-1).
2. Fix `Header.tsx:19` — remove the stray `]` in `lg:px-8]` (P1-9).
3. Fix `ProdutosHero.tsx:26` — remove `target="blank"` (P1-11).
4. Add `export const metadata` to `page.tsx` (home), `contato/page.tsx`, `servicos/page.tsx`, `sobre/page.tsx` (P1-5).
5. Add `app/robots.ts` and `app/sitemap.ts` (P1-3) — trivial once the production domain is confirmed.
6. Fix `PadraoPremium.tsx:66` — stop rendering `x.t` twice (P2-2).
7. Fix `Header.tsx:21` — change the logo `src` to an absolute path and give it a real `alt` (P2-3, P2-4).
8. Delete `lib/horarios.ts` if it stays unused, or (better) actually import it from `InfoCards.tsx`/`ContatoGrid.tsx` once the hours question in §25 is answered (P1-1).
9. Delete the stray unreachable `<html>...</html>` expression statement at `(site)/layout.tsx:6` and the dead `FloatingMobileCTA` import comment at lines 3/15.
10. Delete `teste.txt` from the repository root (P2-7).
11. Remove the root-level 4MB `favicon.ico` (P2-9) and, separately, add a small real one via `app/icon.png`.
12. Add a `.env.example` documenting `CURRENCYAPI_KEY` (P2-8).
13. Run the ESLint setup wizard once and commit the resulting config (P1-6) — unblocks everything downstream in §8/§9 that depends on tooling existing.

---

## 22. Modernization Strategy

**Recommendation: targeted corrections + incremental refactoring.** Neither a partial redesign nor a full frontend rebuild is supported by the evidence gathered in this review.

**Why not a redesign/rebuild:** the visual identity is coherent and intentional (§6, §11), the technology choice (Next.js App Router + Tailwind) is current and appropriate for this project's size, TypeScript is strict and clean, and the actual defects found are consistently small, isolated, and mechanical (a placeholder string, a stray character, a missing underscore, duplicated data) rather than symptoms of a flawed architecture. Rebuilding would discard real, hard-to-recreate assets — the product taxonomy, the timeline content, the visual system — to fix problems that don't require it.

**What should be preserved:** the App Router structure, the Tailwind-based visual system (§6, §11), the `useInView` hook and its consistent reuse, the correct server-side secret-handling pattern in the API route, and all real business content (address/phone/hours/product data) once the one contradiction (P1-1) is resolved.

**What should be improved (incremental refactoring, no rewrite):**
- Extract the repeated duplicated data (hours, catalog metadata) into single-source `lib/` modules and actually import them (directly addresses P1-1, P2-1, and the broader duplication pattern in §16).
- Extract the repeated "title + description + two CTAs" section pattern (seen near-verbatim in at least 5 components, §11) into one shared component.
- Establish the missing tooling foundation (lint config, CI, a minimal test suite) *before* the dependency upgrade (P0-2), so the upgrade itself can be validated automatically rather than by hand.

**What should be replaced:** the two dead team components (§4, P1-8) should become one, once real photos exist; the dead `AcabamentosSection`/`SobreVideo` should be deleted or genuinely finished, not left half-built.

**What should be investigated (requires business input, not more code archaeology):** the brand-partner logo mismatch (P0-3), the true business-hours rule (P1-1), and the full content-gap list in §17 — all are informational blockers, not technical ones.

---

## 23. Proposed Execution Roadmap

### Phase 1 — Project stabilization
- **Objective:** stop active harm (broken CTA, mismatched brand content) and establish a tooling safety net.
- **Findings included:** P0-1, P0-3 (pending business input), P1-6, P1-9, P1-11, P2-2, P2-3, P2-4.
- **Dependencies:** P0-3 needs the business confirmation from §25 before the code fix; everything else is independent.
- **Risks:** none technical; the only risk is delaying P0-1/P0-3 further while other work proceeds — these two should not wait for the rest of this phase.
- **Acceptance criteria:** mobile WhatsApp CTA verified working on a real device; brand section either corrected or temporarily removed pending confirmation; `npm run lint` runs non-interactively.
- **Suggested validation:** manual click-through of every CTA on every page on both a desktop and a real mobile browser.

### Phase 2 — Critical functionality & security
- **Objective:** resolve the confirmed high-severity dependency vulnerabilities and the business-hours contradiction.
- **Findings included:** P0-2, P1-1.
- **Dependencies:** ideally follows Phase 3's test-suite work so the upgrade can be validated automatically; the hours fix needs the business confirmation from §25.
- **Risks:** the Next.js upgrade path (14→16) is a breaking, multi-major-version jump per `npm audit`'s own suggestion — this is the single highest-technical-risk item in the whole roadmap and should get a dedicated branch, a full manual QA pass of all 7 pages, and be done separately from all other changes.
- **Acceptance criteria:** `npm audit` reports 0 high/critical; both pages agree on open/closed status at every hour boundary.
- **Suggested validation:** full manual regression pass of all pages post-upgrade (no automated suite exists yet in Phase 1, so this phase should budget real QA time).

### Phase 3 — Architecture and maintainability
- **Objective:** remove the duplication pattern that caused Phase 2's P1-1 bug in the first place, and add a real regression safety net.
- **Findings included:** P1-7, P2-1, P2-6, P2-9, P2-10, P2-11, §16 duplication items, P3-2, P3-3, P3-4.
- **Dependencies:** benefits from happening early (ideally interleaved with Phase 1) since P1-7 (tests/CI) directly de-risks Phase 2.
- **Risks:** low — mostly deletions and consolidations of already-identified dead/duplicated code.
- **Acceptance criteria:** CI pipeline runs type-check + lint + build on every push; at least one smoke test covers the P0-1-class failure mode (a CTA `href` regression) so it cannot recur silently.
- **Suggested validation:** intentionally introduce a broken CTA link in a test branch and confirm CI catches it.

### Phase 4 — UX and responsive improvements
- **Objective:** address the confirmed navigation/UX defects and validate the (currently unverified) responsive/mobile experience directly.
- **Findings included:** P1-11 (if not done in Phase 1), the `/linhas` content-organization observation (§10).
- **Dependencies:** none blocking.
- **Risks:** low.
- **Acceptance criteria:** real device/browser testing performed across at least one small-phone, one tablet, and one desktop viewport for all 7 pages (not yet done in this review — see §2).
- **Suggested validation:** manual cross-device pass; consider a lightweight visual-regression tool if this becomes a recurring need.

### Phase 5 — Accessibility
- **Objective:** convert the "probable risks" in §12 into confirmed, remediated findings.
- **Findings included:** contrast audit, skip-link addition, focus-visible styling rollout beyond `DiferenciaisCircle.tsx`, mobile-menu focus management, keyboard support for `CoresSection`'s color picker.
- **Dependencies:** benefits from Phase 4's real-device testing infrastructure.
- **Risks:** low; mostly additive CSS/ARIA work.
- **Acceptance criteria:** an automated axe/Lighthouse accessibility run reports no critical issues; a real keyboard-only pass can reach and operate every interactive element, including the mobile menu.
- **Suggested validation:** axe DevTools + a manual keyboard-only pass.

### Phase 6 — SEO and structured data
- **Objective:** close the technical/local SEO gaps identified in §13.
- **Findings included:** P1-3, P1-4, P1-5, Open Graph metadata gap.
- **Dependencies:** production domain confirmation (§25); legal company name if full schema completeness is desired.
- **Risks:** low — purely additive metadata work.
- **Acceptance criteria:** unique title/description per page; valid sitemap and robots.txt; `LocalBusiness` schema passes Google's Rich Results Test.
- **Suggested validation:** Google Search Console submission + Rich Results Test.

### Phase 7 — Performance
- **Objective:** convert the code-based performance risks in §14 into measured, resolved issues.
- **Findings included:** P1-2, P1-10, the client-component-heavy homepage observation (§14).
- **Dependencies:** none blocking; benefits from being done after the image asset cleanup in Phase 3-adjacent hygiene work.
- **Risks:** low; the main risk is image-compression quality loss if done carelessly — spot-check visually after conversion.
- **Acceptance criteria:** a real Lighthouse run against the deployed homepage, with LCP/CLS/INP scores recorded as the first real baseline this project will have had.
- **Suggested validation:** Lighthouse/PageSpeed Insights before/after.

### Phase 8 — Content and credibility
- **Objective:** resolve every item in §17 that depends on business input, and finish or delete the components blocked on it.
- **Findings included:** P0-3 (final resolution), P1-8, P2-6, P2-10, P2-11, privacy policy content (§15/§17).
- **Dependencies:** entirely dependent on business responses to §25.
- **Risks:** none technical.
- **Acceptance criteria:** every "business decision required" item in this document has an explicit answer on record.
- **Suggested validation:** sign-off checklist against §17/§25.

### Phase 9 — Visual refinement
- **Objective:** optional, lower-priority polish once every functional/technical phase above is complete.
- **Findings included:** §11's design-token extraction opportunity, P3-1, P3-5, the unused custom `brand` Tailwind palette (§11).
- **Dependencies:** none blocking; purely opportunistic.
- **Risks:** low; mostly subjective, should be treated as optional rather than required.
- **Acceptance criteria:** a small, reusable component set (Button/Card/SectionHeading) replaces the largest instances of copy-pasted class strings identified in §11/§16.
- **Suggested validation:** visual diff review, no functional test needed.

### Phase 10 — Final validation and production release
- **Objective:** confirm every phase's acceptance criteria before treating the site as fully stabilized.
- **Findings included:** the full §19 checklist, re-run end-to-end.
- **Dependencies:** all prior phases.
- **Risks:** low if prior phases were validated incrementally rather than saved up.
- **Acceptance criteria:** every row in §19 reads "Passed" or "Not applicable" (with a documented reason).
- **Suggested validation:** full checklist re-run + one final cross-device, cross-page manual walkthrough.

---

## 24. Recommended First Implementation Package

**Exact scope:** the 13 items listed in §21 ("Quick Wins") plus P0-3's *investigation* (not yet its code fix, which depends on business confirmation).

**Files likely to be affected:**
- `components/site/Header.tsx` (P0-1, P1-9, P2-3, P2-4)
- `components/site/produtos/ProdutosHero.tsx` (P1-11)
- `app/(site)/page.tsx`, `app/(site)/contato/page.tsx`, `app/(site)/servicos/page.tsx`, `app/(site)/sobre/page.tsx` (P1-5 — add `metadata` exports)
- `app/robots.ts`, `app/sitemap.ts` (new files, P1-3)
- `components/site/produtos/PadraoPremium.tsx` (P2-2)
- `lib/horarios.ts`, `components/site/InfoCards.tsx`, `components/site/contato/ContatoGrid.tsx` (P1-1 — only once the hours question is answered; otherwise defer this one file group to Phase 2)
- `app/(site)/layout.tsx` (remove dead `<html>` expression statement and dead `FloatingMobileCTA` import comment)
- Repo root: delete `teste.txt`, delete `favicon.ico` (P2-7, P2-9)
- New file: `.env.example` (P2-8)
- New file: `.eslintrc.json` (or equivalent) from running the ESLint setup wizard (P1-6)

**Findings addressed:** P0-1, P1-1 (conditionally), P1-3, P1-5, P1-6, P1-9, P1-11, P2-2, P2-3, P2-4, P2-7, P2-8, P2-9, plus the dead-code cleanup called out in §21 item 9.

**What must not be changed:** `MarcasSection.tsx`'s brand/logo pairing (P0-3) must **not** be silently "corrected" as part of this package — it requires business confirmation first (§25); no visual/design-system changes (§11, §22 Phase 9) should be bundled into this package; no dependency version bumps (P0-2, part of Phase 2) should be included here — this package is deliberately dependency-upgrade-free so it carries near-zero regression risk and can ship immediately.

**Acceptance criteria:**
- Mobile WhatsApp button opens a chat with the correct number on a real device.
- All 7 routes show a unique `<title>` in the browser tab / page source.
- `/robots.txt` and `/sitemap.xml` both resolve with valid content.
- `npm run lint` completes without dropping into an interactive prompt.
- `tsc --noEmit` still reports 0 errors after all changes.
- `git status` / repo size confirms `teste.txt` and the root `favicon.ico` are gone.
- Visual spot-check of `Header.tsx` at a ≥1024px viewport confirms the intended padding is now applied.

**Validation commands:**
```
npx tsc --noEmit
npm run lint
```
(A real `next build` and a manual click-through of all 7 pages and every WhatsApp/CTA link on both desktop and a real mobile device should also be performed before considering this package complete — not run as part of this review, per §2.)

**Rollback considerations:** every change in this package is a small, independent, single-file edit or deletion of an already-dead file — each can be reverted individually via `git revert` on its own commit with no cross-file dependency risk. Recommend committing each numbered item in §21 as its own small commit (or at most a few logically-grouped commits) specifically so rollback can be surgical if any single change needs to be undone.

---

## 25. Questions for PETRY DISTRIBUIDORA

**Business**
- What is the legal company name and CNPJ, for use in structured data and any future legal/privacy page?
- What is the actual production domain the site is (or will be) deployed to?
- Does the company serve customers/deliver beyond Joinville, SC? Should a service area be stated explicitly?

**Products and services**
- Which of the logos currently shown in the homepage "brand partners" section (`MarcasSection.tsx`) represent real, current supplier relationships, and what is the correct name for each? (Directly resolves P0-3.)
- Is a Facebook, LinkedIn, or X/Twitter account active for the business? (`Footer.tsx` currently links to generic, non-company URLs for all three.)

**Branding**
- Is there an approved logo file (vector/high-res) to replace the current `logozin.png`, and should the unused `logo.svg`/`logo.png`/`looogo.png` files in `public/` be treated as outdated drafts safe to delete?
- Is there a preferred image to use for social-media link previews (Open Graph image)?

**Content**
- What are the exact, current business hours — specifically, is there a lunch closure (12:00–13:00) or not? (Directly resolves P1-1.)
- Is a "meet the team" section wanted for `/sobre`? If yes, can real staff photos be provided for the six people already named in the dead `SobreEquipe.tsx`/`TimeSection.tsx` components?
- Is there a real company video to embed on `/sobre`, or should that section (currently a dead placeholder) be removed entirely?
- Are there any customer testimonials or reviews that could be approved for use on the site?

**Contact and sales**
- Are both phone numbers listed in `ContatoGrid.tsx` (landline and the WhatsApp mobile number) still current and correctly labeled?
- Is the WhatsApp number (`5547992866123`) the single correct number for all CTAs sitewide, confirming the mobile-menu placeholder (P0-1) should simply be replaced with this same number?

**Legal and privacy**
- Is there existing privacy policy or terms-of-service content (even informal) that can be adapted for the site, given none currently exists?
- Does the business anticipate adding any form that collects personal data (a contact form, a newsletter signup) in the near future? (Affects whether a privacy policy becomes urgent sooner rather than later.)

**Integrations**
- Should the four catalog PDFs continue to be hosted via Google Drive links long-term, or should they be moved to be hosted directly by the site for reliability/branding reasons?
- Is the `currencyapi.com` integration (USD/BRL quote widget) something the business specifically wants, or was it a developer-driven addition? (Relevant context for the API-key documentation gap, P2-8, and for prioritizing the dependency upgrade's risk to this specific feature.)

**Analytics and marketing**
- Does the business want any analytics (e.g., a privacy-friendly, cookieless analytics tool) added? Currently none exists at all.
- Is there a Google Business Profile for the company that could be linked/referenced for local SEO purposes?

---

## 26. Final Recommendation

The site's actual condition is that of a **functionally complete, visually intentional small-business marketing site that was built quickly and has since been edited by hand without a safety net.** The core architecture (Next.js App Router, Tailwind, a real content/product taxonomy, correct secret handling) is sound and does not need to be replaced. What it lacks is exactly what fast, manual iteration typically leaves behind: a working lint/test/CI foundation, a single source of truth for content that currently exists in more than one place, up-to-date dependencies free of known vulnerabilities, basic SEO infrastructure, and a final pass to catch small, mechanical mistakes (a placeholder string, a stray character, a typo'd attribute) that only a human reading every file — or an automated gate that has never existed here — would catch.

**The safest improvement strategy is targeted corrections followed by incremental refactoring** (§22): fix the handful of confirmed, isolated, zero-risk defects first; add the tooling that would have caught them; consolidate the duplicated content sources that already drifted once; then plan the one genuinely risky piece of work (the Next.js major-version upgrade required to clear P0-2) as its own deliberate, tested effort — not bundled with anything else.

**The recommended execution order** is exactly as laid out in §20/§23: fix P0-1 and investigate P0-3 immediately (today, not as part of a larger sprint); ship the zero-dependency Quick Wins in §21 as a single first package (§24); build the tooling foundation (lint, CI, a minimal test suite) before touching dependencies; then execute the Next.js upgrade as its own carefully validated phase; then work through SEO, performance, accessibility, and content-dependent items in the order given in §23, closing with visual polish only once every functional and technical phase is done.

**What the next Claude Code session must do first:** implement the Recommended First Implementation Package (§24) exactly as scoped — the 13 quick wins plus the two immediate P0 items (fixing the WhatsApp number outright; flagging the brand/logo section for the business decision in §25 rather than guessing at a fix) — and nothing beyond that scope until this package is validated (`tsc --noEmit` clean, `npm run lint` runs non-interactively, all 7 pages manually click-tested). No dependency upgrades, no visual redesign, and no silent "fix" of the brand-logo mismatch should happen until this package ships and the business has answered the questions in §25.
