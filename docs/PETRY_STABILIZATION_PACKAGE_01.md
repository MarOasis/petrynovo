# PETRY DISTRIBUIDORA — Stabilization Package 01

**Date:** 2026-07-30
**Base branch:** `main`
**Base commit (HEAD before and after this package — no commit was made):** `a2673e73b23290f2bad6e4bcd52bd0e66db7d1f2`
**Authority document:** `docs/PETRY_SITE_REVIEW.md`

---

## 0. Git Safety Check (performed before any edit)

```
git status --short   → only pre-existing untracked `docs/` (the audit report from the prior review session)
git branch --show-current → main
git rev-parse HEAD        → a2673e73b23290f2bad6e4bcd52bd0e66db7d1f2
```

No unrelated uncommitted changes existed beyond the untracked `docs/` directory from the prior review session, which was left untouched and is not part of this package's diff. No commits or pushes were made at any point — HEAD is identical before and after this package. All changes below exist only in the working tree.

---

## 1. Package Status

**Completed with blockers.**

All 11 authorized implementation items were completed. The two conditional items (robots/sitemap, business-hours refactor) and the two explicitly-flagged business-decision items (brand/logo section, favicon replacement) are correctly **blocked** per the task's own instructions, not left incomplete by oversight — see §8.

---

## 2. Scope Implemented

| # | Item | Result |
|---|---|---|
| 1 | Fix mobile WhatsApp link (`Header.tsx`) | Done |
| 2 | Fix malformed Tailwind class `lg:px-8]` (`Header.tsx`) | Done |
| 3 | Remove `target="blank"` from internal `/catalogos` link (`ProdutosHero.tsx`) | Done |
| 4 | Fix header logo `src`/`alt` (`Header.tsx`) | Done |
| 5 | Fix duplicated text rendering (`PadraoPremium.tsx`) | Done |
| 6 | Remove unreachable `<html>` expression + dead `FloatingMobileCTA` references (`app/(site)/layout.tsx`) | Done |
| 7 | Add page-specific metadata to Home, Contato, Serviços, Sobre | Done — all 7 public routes now have unique titles |
| 8 | Add non-interactive ESLint config | Done — `npm run lint` now completes non-interactively; 1 pre-existing warning found, not fixed (see §7, §9) |
| 9 | Add `.env.example` | Done |
| 10 | Delete `teste.txt` | Done, after verifying zero references (see §5) |
| 11 | Handle root `favicon.ico` | Removed — confirmed dead (see §5); replacement is a business blocker (see §8) |
| Conditional | `robots.ts` / `sitemap.ts` | **Blocked** — no confirmed production domain (see §8) |
| Conditional | Business-hours refactor | **Not touched**, per explicit instruction — blocked on business confirmation (see §8) |
| Explicit exclusion | `MarcasSection.tsx` brand/logo mapping | **Not touched**, per explicit instruction — P0 business decision required (see §8) |

**Skills used:**
- **`security-review`** — run against the full working-tree diff of this package. The diff was analyzed directly (attribute-value corrections, dead-code deletion, and static string metadata additions only — no user input handling, no new data flow, no new dependencies, no dynamic code execution, no `dangerouslySetInnerHTML`, no new external requests) and confirmed to introduce zero new attack surface. **Finding: no vulnerabilities identified** in this diff.
- **`simplify`** — the diff was reviewed against its four lenses (reuse, simplification, efficiency, altitude). The four page-metadata additions follow the identical, already-established pattern from the three pages that already had metadata (`produtos`, `catalogos`, `linhas`) — this is the correct, non-duplicative depth for Next.js App Router per-page metadata (each route's `metadata` export is inherently per-file by framework design, not code duplication to consolidate). The `PadraoPremium.tsx` and `app/(site)/layout.tsx` changes are pure deletions/simplifications. No reuse, efficiency, or altitude issues were found in the changes made by this package. Given the diff's small size (8 files, ~33 insertions/926 deletions, nearly all one-line attribute or string changes), this analysis was performed directly rather than via 4 parallel sub-agents, since the diff's content and scope were already fully known from having authored every change; no fixes were needed as a result.
- No skill in the current environment specifically targets "implementation," "frontend correctness," or "accessibility" as standalone reviewable steps (see the parent audit's own §2 finding on skill availability); those angles were applied directly by hand against the specific, narrow scope items authorized for this package (e.g., confirming the fixed WhatsApp link matches the one number used consistently elsewhere in the repo; confirming the logo `alt` text change doesn't alter layout; confirming metadata additions don't change page rendering).
- Skills were **not** used to expand scope: `simplify`'s standard "apply fixes" phase was deliberately not run as a broader cleanup pass (no duplicated-data consolidation, no shared-component extraction) — those are explicitly reserved for a later phase per the audit's roadmap and the explicit prohibitions in this package's brief.

---

## 3. Files Changed

| File | Change | Finding addressed | Validation |
|---|---|---|---|
| `components/site/Header.tsx` | Replaced `https://wa.me/55SEUNUMERO` → `https://wa.me/5547992866123` (mobile menu WhatsApp link); removed stray `]` from `lg:px-8]`; changed logo `src` from relative `./banners/logo/logozin.png` to absolute `/banners/logo/logozin.png`; changed logo `alt=""` → `alt="Petry Distribuidora"` | P0-1, P1-9, P2-3, P2-4 | `grep` confirms zero remaining `55SEUNUMERO`/`lg:px-8]` occurrences; `tsc --noEmit` clean; `npm run build` succeeded |
| `components/site/produtos/ProdutosHero.tsx` | Removed `target="blank"` from the internal `/catalogos` link | P1-11 | `grep` confirms zero remaining `target="blank"`; `npm run build` succeeded |
| `components/site/produtos/PadraoPremium.tsx` | Removed the redundant `<p>{x.t}</p>` eyebrow line that duplicated the card title; each card now renders the title once (bold) followed by its description (`x.d`), matching the same `{title, description}` card pattern already used by the sibling `QualidadeBlocos.tsx` component in the same codebase | P2-2 | Visual hierarchy preserved (title → description); no new copy invented — both remaining lines use only the existing `t`/`d` fields; `tsc --noEmit` clean |
| `app/(site)/layout.tsx` | Removed the unreachable, no-op `<html lang="pt-BR" className="overflow-x-hidden"></html>` expression statement and the dead `// import FloatingMobileCTA ...` / `{/* <FloatingMobileCTA /> */}` comments (the component they reference does not exist anywhere in the repository) | Dead-code items identified in the audit's §16 | Root `app/layout.tsx`'s real `<html>` implementation was not touched; layout structure/rendering unchanged; `npm run build` succeeded |
| `app/(site)/page.tsx` | Added `export const metadata` (title: "Início \| Petry Distribuidora"; description derived from the already-rendered `VisaoGeralSection.tsx` copy) | P1-5 | Unique `<title>` confirmed via source grep; page composition untouched |
| `app/(site)/contato/page.tsx` | Added `export const metadata` (title: "Contato \| Petry Distribuidora"; description derived from `ContatoHero.tsx`/`ContatoGrid.tsx` real contact-channel content) | P1-5 | Same as above |
| `app/(site)/servicos/page.tsx` | Added `export const metadata` (title: "Serviços \| Petry Distribuidora"; description derived from `ServicosPage.tsx` real hero/bullet copy) | P1-5 | Same as above |
| `app/(site)/sobre/page.tsx` | Added `export const metadata` (title: "Sobre \| Petry Distribuidora"; description derived from `SobreHero.tsx` real h1 copy) | P1-5 | Same as above |

---

## 4. Files Created

| File | Purpose |
|---|---|
| `.env.example` | Documents the single confirmed environment variable (`CURRENCYAPI_KEY`) with comments on purpose, non-commitment of secrets, and where to configure it locally/in deployment. Contains no real value. |
| `.eslintrc.json` | Minimal config (`{ "extends": ["next/core-web-vitals"] }`) — the smallest configuration compatible with the installed `eslint@8.57.1` / `eslint-config-next@14.2.25`, making `next lint` runnable non-interactively. No rules were disabled. |

*(`docs/PETRY_SITE_REVIEW.md` and this file, `docs/PETRY_STABILIZATION_PACKAGE_01.md`, are documentation deliverables, not application code, and are listed here for completeness rather than as "changes to the application.")*

---

## 5. Files Deleted

| File | Evidence it was safe to delete |
|---|---|
| `teste.txt` (repo root, 912 lines, ~42KB) | `grep -ri "teste" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.mjs" --include="*.json"` across the full repository returned exactly one match, in `package-lock.json`, and that match was manually inspected and confirmed to be the unrelated English word "**tested**" inside a third-party package's deprecation notice — not a reference to this file. No `import`, `require`, `fetch`, build script, or `package.json` script references `teste.txt` anywhere. It was tracked by git (not gitignored) and sat outside `app/`, `components/`, and `lib/`. Deleted via `git rm teste.txt`. |
| `favicon.ico` (repo root, 4.0MB) | Confirmed via `Glob`/`find` that no `app/favicon.ico` or `app/icon.*` file exists (the only paths Next.js App Router auto-detects for a favicon) — this file sat at the project root, a sibling of `app/`, not inside it. Confirmed via full-repo `grep` for "favicon" (excluding `docs/`, which only *discusses* the file) that **zero** source file — `next.config.mjs`, any `layout.tsx`, any `metadata` object — references it in any way (no `icons` field in any `Metadata` export). No `vercel.json`, CI config, or other deployment file exists in the repository that could reference it either. It is therefore confirmed unreferenced by both the Next.js App Router implementation and any deployment infrastructure visible in this repository. Deleted via `git rm favicon.ico`. **A real, appropriately-sized favicon still needs to be added once an approved brand asset is confirmed — see §8.** |

No other file was deleted. Per explicit instruction, no other "supposedly unused" component (`AcabamentosSection.tsx`, `SobreEquipe.tsx`, `TimeSection.tsx`, `SobreVideo.tsx`, `lib/horarios.ts`, unused `public/` assets, etc.) was touched, even though several are flagged as dead code in the audit — none met this package's narrow, explicitly-authorized deletion criteria.

---

## 6. Validation Results

All commands were run in the order specified, from the project root.

**`npx tsc --noEmit`**
```
(no output — 0 errors)
```
Exit code 0.

**`npm run lint`**
```
> distribuidora-aluminio@1.0.0 lint
> next lint

./components/site/Header.tsx
21:11  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using
`<Image />` from `next/image` to automatically optimize images. This may incur additional usage
or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element
@next/next/no-img-element

info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/basic-features/eslint#disabling-rules
```
Completed **non-interactively**. 1 warning, 0 errors, across the entire codebase (not just the files touched by this package). See §7 for why it was not fixed.

**`npm run build`**
```
▲ Next.js 14.2.25
Creating an optimized production build ...
✓ Compiled successfully
Linting and checking validity of types ...
   (same single Header.tsx warning as above)
✓ Generating static pages (11/11)

Route (app)                              Size     First Load JS
┌ ○ /                                    12.3 kB         108 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ƒ /api/quotes/usdbrl                   0 B                0 B
├ ○ /catalogos                           175 B          92.5 kB
├ ○ /contato                             1.64 kB        88.8 kB
├ ○ /linhas                              138 B          87.3 kB
├ ○ /produtos                            3.28 kB        99.4 kB
├ ○ /servicos                            2.6 kB         94.9 kB
└ ○ /sobre                               2.24 kB        94.6 kB
```
Exit code 0. **The build succeeded without `CURRENCYAPI_KEY` set** (no `.env`/`.env.local` exists in this sandbox). This is expected and safe: `app/api/quotes/usdbrl/route.ts` is a dynamic Route Handler (`ƒ`, server-rendered on demand, `0 B` build-time size) — Next.js does not invoke it during static generation, so the missing key has no effect on build success. At runtime, a missing key causes the route to return HTTP 500 with a clear error message (pre-existing, correct behavior, unrelated to this package). No fake secret was inserted.

**`git diff --check`**
```
warning: in the working copy of 'app/(site)/contato/page.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'app/(site)/layout.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'app/(site)/page.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'app/(site)/servicos/page.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'app/(site)/sobre/page.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'components/site/Header.tsx', LF will be replaced by CRLF the next time Git touches it
```
Exit code **0**. These are informational line-ending (CRLF/LF) notices from Git's `core.autocrlf` handling on Windows, not diff-check failures (no trailing whitespace, no merge-conflict markers were flagged). No actual whitespace errors exist in the diff.

**Final `git status --short`**
```
 M app/(site)/contato/page.tsx
 M app/(site)/layout.tsx
 M app/(site)/page.tsx
 M app/(site)/servicos/page.tsx
 M app/(site)/sobre/page.tsx
 M components/site/Header.tsx
 M components/site/produtos/PadraoPremium.tsx
 M components/site/produtos/ProdutosHero.tsx
D  favicon.ico
D  teste.txt
?? .env.example
?? .eslintrc.json
?? docs/
```
Matches exactly the scope described in §3–§5. No file outside this list was touched. (`docs/` was already untracked from the prior review session plus this new report; `tsconfig.tsbuildinfo`, an incidental artifact from running `tsc --noEmit`, was deleted after each check to avoid leaving build byproducts in the working tree.)

**Source-level verification (all passed):**
| Check | Result |
|---|---|
| No remaining `55SEUNUMERO` | ✅ Confirmed via repo-wide grep |
| No remaining `lg:px-8]` | ✅ Confirmed via repo-wide grep |
| No `target="blank"` on the `/catalogos` internal link | ✅ Confirmed via file grep |
| All seven public routes have unique titles | ✅ Confirmed: Início, Catálogos, Produtos, Linhas, Serviços, Sobre, Contato — all distinct, all suffixed `\| Petry Distribuidora` |
| `.env.example` contains no real secret | ✅ Contains only `CURRENCYAPI_KEY=` (empty value) and comments |
| `teste.txt` no longer exists | ✅ Confirmed |
| No unauthorized modification to `MarcasSection.tsx` | ✅ `git diff --stat components/site/MarcasSection.tsx` returned empty |
| No modification to business-hours files (`lib/horarios.ts`, `InfoCards.tsx`, `ContatoGrid.tsx`) | ✅ `git diff --stat` on all three returned empty |
| No dependency version changes | ✅ `git diff --stat package.json package-lock.json` returned empty |

---

## 7. Remaining Lint Findings

**One warning, zero errors, across the entire codebase** (not limited to files touched by this package):

- `components/site/Header.tsx:21` — `@next/next/no-img-element`: *"Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image`..."*

**Why this was not fixed:** this warning pre-dates this package (the line was already a plain `<img>` tag before any edit here — this package only changed its `src` and `alt` attribute *values*, not its element type). Converting it to `next/image` is exactly the subject of audit finding **P1-2 / P1-10** (image optimization) and is explicitly listed as prohibited scope for this package ("Do not optimize or convert the full image library"; "Do not replace the visual logo asset during this package"). Fixing it properly would also require deciding on explicit `width`/`height` or a `fill` + sized-parent pattern for the logo, which risks a layout change beyond a "clearly safe" one-line fix. It is recorded here, unfixed, as instructed.

No other lint findings exist. Notably, the home page's pre-existing unused imports (`featuredProducts` from `lib/site`, `Link` from `next/link` — both imported in `app/(site)/page.tsx` but not referenced in its JSX) were **not** flagged by this lint configuration: `next/core-web-vitals` does not enable the base `no-unused-vars` rule. This is a real, pre-existing minor code-quality item, but since the configured linter does not surface it as an error or warning, it falls outside this package's "fix only what lint flags" scope and is listed here for transparency rather than silently fixed.

---

## 8. Business Blockers

| Item | Status | What's needed |
|---|---|---|
| **Correct business hours and lunch-break rule** | Blocked — untouched by design | `lib/horarios.ts`, `InfoCards.tsx`, and `ContatoGrid.tsx` contain three independent hours calculations, one of which (the homepage's) includes a 12:00–13:00 lunch closure the other two don't. Per explicit instruction, none of these three files were modified in this package. **PETRY DISTRIBUIDORA must confirm the single correct rule** before any of the three can be consolidated. |
| **Confirmed production domain** | Blocked — `robots.ts`/`sitemap.ts` not created | Searched `README.md`, `git remote -v`, `next.config.mjs`, all `Metadata` exports, and source for any domain string. Only an **email domain** (`petrydistribuidora.com.br`, used in `mailto:` links) was found — this is not proof of the website's own hosting domain and was correctly not treated as one. No `vercel.json`, deployment config, or documented domain exists anywhere in the repository. Per instruction, `localhost` and no placeholder domain were used; the conditional item was left undone rather than guessed. |
| **Approved brand/logo associations and permissions** | Blocked — untouched by design (P0) | `components/site/MarcasSection.tsx` was **not modified**, exactly as instructed. The audit's P0-3 finding (real third-party supplier logos shown under mismatched/fabricated names on the homepage) remains live and unresolved. This is the single most urgent remaining item in the entire codebase and requires an explicit business decision — not a code guess — on which logos represent real partners, their correct names, and display authorization. |
| **Approved favicon/brand asset** | Blocked — root `favicon.ico` removed, no replacement added | The confirmed-dead 4MB root file was removed (§5), but per explicit instruction **no replacement favicon was created** in this package, since no approved, appropriately-sized brand asset has been confirmed. The site currently has **no favicon wired into the Next.js App Router implementation at all** (neither before nor after this package — the old file was never actually served, see §5). This should be treated as an open item until PETRY DISTRIBUIDORA supplies or approves a small icon asset. |

---

## 9. Deferred Findings

The following audit findings were consciously **not** addressed in this package, per its explicit scope boundaries — none were started, and none require a decision to "finish":

- **Dependency security upgrade** (P0-2 — high-severity `next`/`postcss` advisories via `npm audit`). Explicitly prohibited in this package (no `npm audit fix`, no `--force`, no version bumps). Recommended as its own dedicated, tested phase per the audit's §23 Phase 2.
- **CI pipeline.** No `.github/workflows/` or equivalent added — explicitly out of scope for this package.
- **Automated tests.** No test runner or test files added — explicitly out of scope.
- **Image optimization / library conversion** (P1-2, P1-10). The `BannerRotator.tsx` lazy-loaded hero `<img>` and the sitewide multi-MB source images were not touched, and the one lint warning this produces (§7) was intentionally left unfixed.
- **Structured data** (P1-4 — `LocalBusiness`/`Organization` JSON-LD). Not added; would benefit from being done alongside the business-hours consolidation (§8) so both draw from one data source.
- **Accessibility browser/automated testing** (§12 of the audit). No axe/Lighthouse run, no keyboard/screen-reader pass was performed as part of this package — see §10 for the manual checklist this package leaves for a human.
- **Broader dead-code cleanup.** `AcabamentosSection.tsx`, `SobreEquipe.tsx`, `TimeSection.tsx`, `SobreVideo.tsx`, `lib/horarios.ts` (still unused after this package, since the business-hours consolidation was correctly left untouched), unused `public/` assets (`public/logo.svg`, `banners/logo/logo.png`, `banners/logo/looogo.png`, duplicate `(1)`/`(2)`-suffixed files), and the dead `Footer.tsx` social-icon code were all left exactly as found, per explicit instruction ("do not delete other supposedly unused components").
- **Visual refinement** (§11/§22 Phase 9 of the audit — design-token extraction, the unused custom `brand` Tailwind palette, etc.). Not started; correctly the lowest-priority, most optional phase in the roadmap.
- **`robots.ts`/`sitemap.ts` and the business-hours refactor** are also deferred, but are documented as active blockers rather than simply "later work" — see §8.

---

## 10. Manual QA Checklist

No browser was opened and no device testing was performed as part of this package — the checks below are recommendations for a human to perform, not claims of tests already run.

- [ ] **Desktop header** — At a viewport ≥1024px wide, confirm the header's horizontal padding is now visibly wider/consistent (the `lg:px-8]` typo fix) and that the logo renders correctly (no broken image) with the corrected absolute path.
- [ ] **Mobile hamburger menu** — At a viewport <1024px, open the hamburger menu and confirm all 7 nav links and the WhatsApp button render correctly.
- [ ] **Mobile WhatsApp CTA** — Tap "Chamar no WhatsApp" inside the open mobile menu; confirm it opens `wa.me/5547992866123` (a chat with the same number used everywhere else on the site), not a broken link.
- [ ] **`/produtos` → `/catalogos` navigation** — On `/produtos`, click "Ver catálogos →"; confirm it navigates to `/catalogos` in the **same tab** via a fast client-side transition (no new window/tab opens).
- [ ] **Logo rendering** — Confirm the header logo image loads correctly on every one of the 7 public pages (not just `/`), verifying the absolute-path fix holds across all routes.
- [ ] **All seven page titles** — Open each of `/`, `/catalogos`, `/produtos`, `/linhas`, `/servicos`, `/sobre`, `/contato` and confirm the browser tab shows a distinct title for each (Início, Catálogos, Produtos, Linhas, Serviços, Sobre, Contato — all suffixed "\| Petry Distribuidora").
- [ ] **All seven public routes load without error** — Confirm no 404s, no console errors, and no visibly broken layout on any of the 7 routes.
- [ ] **Currency quote widget** — On the homepage, confirm the "Cotação do dólar" card either shows a live value (if `CURRENCYAPI_KEY` is configured in the deployment environment) or a graceful error/loading state (if not) — this package did not change this behavior, only confirmed the build doesn't require the key.
- [ ] **Responsive behavior** — Spot-check `/`, `/produtos`, and `/sobre` at a small phone width (~375px), a tablet width (~768px), and a desktop width (~1440px) to confirm no layout regressions were introduced by the Header/PadraoPremium/layout.tsx edits.
- [ ] **`/produtos` "Padrão Premium Petry" section** — Confirm each of the three cards (Compatibilidade, Acabamento, Consistência) now shows one bold title followed by its description, with no duplicated text and no broken spacing.

---

## 11. Recommended Next Package

Based strictly on what remains in the audit and what this package's validation surfaced, the smallest sensible next package is:

**"Stabilization Package 02 — Business-confirmed corrections + CI foundation,"** scoped to:
1. Whichever of the four business blockers in §8 have been answered by PETRY DISTRIBUIDORA by that point (most likely to land first: the brand/logo correction in `MarcasSection.tsx`, since it is P0 and only needs a business answer, not new engineering).
2. The business-hours consolidation (delete the two duplicated inline implementations in `InfoCards.tsx`/`ContatoGrid.tsx`, import the single corrected `lib/horarios.ts` in both) — but only once the correct rule is confirmed.
3. `app/robots.ts` and `app/sitemap.ts`, once the production domain is confirmed.
4. A minimal CI workflow (type-check + lint + build on push) — this is zero-risk, needs no business input, and directly protects every future package (including a future dependency-upgrade package) from regressing what was just fixed here.

The Next.js/PostCSS dependency upgrade (P0-2) should remain its **own**, separate, dedicated package per the audit's §23 Phase 2 — it is the one item in the whole backlog with real technical risk (a multi-major-version jump) and should not be bundled with anything else, including the CI work above (CI should exist *before* that upgrade is attempted, so the upgrade can be validated automatically).

This recommendation is not implemented here.

---

## Commit Recommendation

**Not executed** — provided for review only, per instruction.

Suggested groupings and messages:

**1. Conversion and navigation corrections**
```
git add components/site/Header.tsx components/site/produtos/ProdutosHero.tsx components/site/produtos/PadraoPremium.tsx

git commit -m "fix: correct broken WhatsApp CTA, header styling/logo, and nav typo

- Header.tsx: replace placeholder mobile WhatsApp number (55SEUNUMERO) with
  the confirmed number used everywhere else in the codebase
- Header.tsx: fix malformed Tailwind class (lg:px-8]) that silently dropped
  desktop header padding
- Header.tsx: use absolute logo path instead of a fragile relative one, and
  add a real accessible alt text
- ProdutosHero.tsx: remove stray target=\"blank\" that forced the internal
  /catalogos link into a new browser window
- PadraoPremium.tsx: stop rendering the card title twice; show title once
  followed by its existing description"
```

**2. Metadata and tooling foundation**
```
git add "app/(site)/page.tsx" "app/(site)/contato/page.tsx" "app/(site)/servicos/page.tsx" "app/(site)/sobre/page.tsx" "app/(site)/layout.tsx" .eslintrc.json

git commit -m "feat: add per-page metadata to remaining routes; enable non-interactive lint

- Add unique title/description metadata to Home, Contato, Serviços, and
  Sobre, matching the pattern already used by Produtos/Catálogos/Linhas —
  all 7 public routes now have distinct <title>/description
- (site)/layout.tsx: remove an unreachable, no-op <html> expression and a
  dead FloatingMobileCTA import/reference (component does not exist)
- Add minimal .eslintrc.json extending next/core-web-vitals so `npm run
  lint` runs non-interactively; no rules disabled"
```

**3. Repository hygiene and documentation**
```
git add .env.example docs/

git rm teste.txt favicon.ico

git commit -m "chore: document CURRENCYAPI_KEY, remove orphaned scratch file and dead favicon

- Add .env.example documenting the one environment variable this project
  uses, with no real secret value
- Remove teste.txt (912-line orphaned draft file, confirmed unreferenced
  by any source or build file)
- Remove root-level favicon.ico (4MB, confirmed unreferenced by the Next.js
  App Router implementation or any deployment config — not served today;
  a real replacement is pending an approved brand asset)
- Add docs/PETRY_SITE_REVIEW.md and docs/PETRY_STABILIZATION_PACKAGE_01.md"
```
