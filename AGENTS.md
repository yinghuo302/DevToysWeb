# AGENTS.md

This file is the operating guide for coding agents working in this repository.

## Repository overview

DevToysWeb is a pnpm/Turborepo monorepo for a localized developer-tool website supporting Japanese, English, and Simplified Chinese.

- `apps/web`: Next.js App Router frontend, statically exported for local Nginx hosting
- `.github/workflows`: CI validation only; deployment is performed by copying static output to a local Nginx root

Use pnpm from the repository root. The expected runtime is Node.js 26 and the package
manager version is pinned in the root `package.json`.

Workspace packages use the shared `@repo/*` scope. Keep the root project name separate from
workspace package names, and update package-scoped commands, workflow filters, and docs together
when renaming a package.

## Before changing code

1. Read the nearest source files and their callers before editing.
2. Check `git status --short`; preserve unrelated and user-authored changes.
3. Prefer existing feature boundaries and UI primitives over introducing new patterns.
4. Do not edit generated directories: `.next`, `out`, `.turbo`, `node_modules`,
   or `*.tsbuildinfo`.

## Where changes belong

- Tool metadata, paths, categories, and localized names:
  `apps/web/src/features/tools/domain/catalog.ts`
- Pure text conversions and generators:
  `apps/web/src/features/tools/domain/transformers.ts`
- Other framework-free logic (parsers, formatters, encoders):
  `apps/web/src/features/tools/domain/`
- One flat folder per tool interface, colocating its component(s), hook, and any
  constants (files named `*-workspace.tsx` / `use-*.ts`, not split into subfolders):
  `apps/web/src/features/tools/workspaces/<workspace>/`; the `workspace` value on a
  catalog entry is mapped to its component in
  `apps/web/src/features/tools/workspaces/registry.ts`, and tools without one fall back
  to `workspaces/converter/`
- UI shared by several workspaces (shell, panes, copy button, search fields):
  `apps/web/src/features/tools/components/`
- Hooks shared by several workspaces: `apps/web/src/features/tools/hooks/`
- Browser clients for public third-party services: `apps/web/src/libs/api/public-services.ts`
- Local JWT verification: `apps/web/src/features/jwt/functions/verify-jwt.ts`
- Shared UI primitives: `apps/web/src/components/ui/`
- Cross-cutting components and hooks used by more than one feature
  (locale/theme providers, `useTranslate`): `apps/web/src/components/` and
  `apps/web/src/hooks/`
- Japanese, English, and Simplified Chinese shared copy: `apps/web/src/i18n/dictionaries.ts`
- Canonical URLs, `hreflang`, Open Graph, and JSON-LD:
  `apps/web/src/features/seo/`; the sitemap and robots routes live in
  `apps/web/src/app/sitemap.ts` and `apps/web/src/app/robots.ts`
- Static sub-site import guide: `docs/static-site-integration.md`
- Local Nginx configuration example: `docs/nginx-static-site.conf`

When adding a tool, update the catalog and all supported locales together. Reuse an existing
workspace when possible; otherwise extend the `workspace` union, add a flat
`workspaces/<workspace>/` folder (`<workspace>-workspace.tsx` plus `use-<workspace>.ts`),
and register the component in `workspaces/registry.ts`. Keep state and derivation in the
workspace's hook so its component stays declarative, and push framework-free logic down
into `domain/`.
Keep transformations in the browser. The project has no backend API: network-dependent tools may call a documented free public service directly from the browser; if no suitable free replacement exists, remove the tool. Make each third-party data transfer and quota visible to users.

## Project constraints

- The web application uses `output: 'export'`. Do not add Next.js features that require a
  runtime server, such as server actions, middleware, or dynamic server rendering.
- Routes must remain compatible with static output and `trailingSlash: true`.
- Imports within `apps/web` may use the `@/` alias.
- Follow the existing Biome style: two spaces, single quotes, no semicolons, 100 columns.
- Use the existing shadcn/Base UI components and Tailwind tokens before adding dependencies
  or custom primitives.
- User-facing shared text must be supplied in every supported locale (Japanese, English, and Simplified Chinese).
- Do not add a backend API, AWS/CDK deployment path, or production Node server.
- Third-party browser requests must use a documented free provider and disclose sent data and quotas; otherwise remove the tool.

## Validation

Run the smallest relevant check during iteration, then the repository-level checks before
hand-off when the scope warrants it.

```sh
pnpm verify             # check, typecheck, test, and build in CI order
pnpm typecheck          # all TypeScript packages
pnpm lint               # Biome lint
pnpm format:check       # formatting without modifying files
pnpm test               # repository tests
pnpm build              # production build and static export
```

Package-scoped equivalents are faster for focused work:

```sh
pnpm --filter @repo/web typecheck
pnpm --filter @repo/web test
pnpm --filter @repo/web build
```

For UI changes, inspect both `/ja/` and `/en/`, plus a representative tool route at mobile
and desktop widths. A successful typecheck alone does not validate the static export.

## External services

The static site has no self-hosted API. Browser-side network tools use public services:

- OGP extraction calls Microlink directly. Its current free plan allows 25 requests per day;
  the submitted page URL is sent to Microlink.
- Domain-registration lookup uses public RDAP. The queried domain is sent to the RDAP service.
- JWT verification runs locally with Web Crypto. JWKS mode makes a direct browser request to
  the supplied URL; the JWT and key are not uploaded.
- Tests inject mocked `fetch` implementations. Do not call live third-party services from tests.

If a future network tool has no suitable free public service, remove it rather than adding a
self-hosted API or cloud dependency.

## Tests and change hygiene

- Add focused tests for pure logic, browser-side public-service clients, and local cryptography.
- Place tests beside the source as `*.test.ts`; the package's `tsx` runner executes them.
- Avoid broad formatting churn. Run `pnpm exec biome check --write <changed-files>` for
  targeted fixes when useful.
- Do not commit generated build output or local environment files.
- Summarize changed behavior and list the validation commands actually run.

## Architecture decisions

Record new technical decisions in `docs/adr/` before implementation. Keep the ADR concise and link related historical material when it exists.
