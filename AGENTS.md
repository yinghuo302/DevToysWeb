# AGENTS.md

This file is the operating guide for coding agents working in this repository.

## Repository overview

DevToysWeb is a single pnpm project: a localized developer-tool website supporting Japanese, English, and Simplified Chinese. The repository has no pnpm workspace, Turborepo, backend API, or production Node server.

- `src/`: Next.js App Router application source
- `public/`: static assets and independent static sub-sites
- `dist/`: generated static export served by local Nginx; never edit or commit it
- `configs/`: shared local tooling configuration (not workspace packages)
- `.github/workflows/`: CI validation only; deployment is performed by copying `dist/` to a local Nginx root

Use pnpm from the repository root. Node.js 26 is the preferred runtime (`.nvmrc`); the package manager version is pinned in the root `package.json`.

## Before changing code

1. Read the nearest source files and their callers before editing.
2. Check `git status --short`; preserve unrelated and user-authored changes.
3. Prefer existing feature boundaries and UI primitives over introducing new patterns.
4. Do not edit generated directories: `.next`, `dist`, `node_modules`, or `*.tsbuildinfo`.

## Where changes belong

- Tool metadata, paths, categories, and localized names: `src/libs/domain/catalog.ts`
- Pure text conversions and generators: `src/features/converter/` and `src/libs/domain/`
- Tool interface components, hooks, and constants: `src/features/<feature>/`; keep each feature's components/hooks/functions colocated
- Workspace registry and shared interfaces: `src/workspaces/`
- UI shared by several workspaces (shell, panes, copy button, search fields): `src/components/`
- Browser clients for public third-party services: `src/libs/api/public-services.ts`
- Local JWT verification: `src/features/jwt/functions/verify-jwt.ts`
- Shared UI primitives: `src/components/ui/`
- Cross-cutting components and hooks used by more than one feature (locale/theme providers, `useTranslate`): `src/components/` and `src/hooks/`
- Japanese, English, and Simplified Chinese shared copy: `src/i18n/dictionaries.ts`
- Canonical URLs, `hreflang`, Open Graph, and JSON-LD: `src/features/seo/`; sitemap and robots routes live in `src/app/sitemap.ts` and `src/app/robots.ts`
- Static sub-site import guide: `docs/static-site-integration.md`
- Local Nginx configuration example: `docs/nginx-static-site.conf`

When adding a tool, update the catalog and all supported locales together. Reuse an existing workspace when possible; otherwise extend the workspace union, add a flat `src/workspaces/<workspace>/` folder, and register the component in `src/workspaces/registry.ts`. Keep state and derivation in the workspace's hook so its component stays declarative, and push framework-free logic down into `domain/` or `functions/`.

Keep transformations in the browser. The project has no backend API: network-dependent tools may call a documented free public service directly from the browser; if no suitable free replacement exists, remove the tool. Make each third-party data transfer and quota visible to users.

## Project constraints

- The application uses Next.js `output: 'export'`; `pnpm build` runs the Next.js build/typecheck and writes the deployable static site directly to root `dist/`. Use the pnpm scripts rather than invoking package-scoped commands.
- Keep the homepage free of a popular-tools list/section unless specifically requested; use categories and recent tools for discovery.
- On all localized app routes, pin the top bar to the viewport and reserve its height in normal flow; tool pages and the homepage share this fixed-header behavior.
- Do not add Next.js features that require a runtime server, such as server actions, middleware, or dynamic server rendering.
- Routes must remain compatible with static output and `trailingSlash: true`.
- Keep the Next.js build adapter that normalizes Windows static-export RSC `.txt` paths until the upstream fix is included in the pinned Next.js release.
- Imports from `src/` may use the `@/` alias.
- Follow the existing Biome style: two spaces, single quotes, no semicolons, 100 columns.
- Use the existing shadcn/Base UI components and Tailwind tokens before adding dependencies or custom primitives.
- User-facing shared text must be supplied in every supported locale (Japanese, English, and Simplified Chinese).
- Do not add a backend API, AWS/CDK deployment path, or production Node server.
- Third-party browser requests must use a documented free provider and disclose sent data and quotas; otherwise remove the tool.

## Validation

Run the smallest relevant check during iteration, then the repository-level checks before hand-off when the scope warrants it.

```sh
pnpm verify             # check, typecheck, test, and build in CI order
pnpm typecheck
pnpm lint               # Biome lint
pnpm format:check       # formatting without modifying files
pnpm test
pnpm build              # static export into ./dist
```

For UI changes, inspect both `/ja/` and `/en/`, plus a representative tool route at mobile and desktop widths. A successful typecheck alone does not validate the static export.

## External services

The static site has no self-hosted API. Browser-side network tools use public services:

- OGP extraction calls Microlink directly. Its current free plan allows 25 requests per day; the submitted page URL is sent to Microlink.
- Domain-registration lookup uses public RDAP. The queried domain is sent to the RDAP service.
- JWT verification runs locally with Web Crypto. JWKS mode makes a direct browser request to the supplied URL; the JWT and key are not uploaded.
- Tests inject mocked `fetch` implementations. Do not call live third-party services from tests.

If a future network tool has no suitable free public service, remove it rather than adding a self-hosted API or cloud dependency.

## Tests and change hygiene

- Add focused tests for pure logic, browser-side public-service clients, and local cryptography.
- Place tests beside the source as `*.test.ts`; the root `tsx` runner executes them.
- Avoid broad formatting churn. Run `pnpm exec biome check --write <changed-files>` for targeted fixes when useful.
- Do not commit generated build output or local environment files.
- Summarize changed behavior and list the validation commands actually run.

## Architecture decisions

Record new technical decisions in `docs/adr/` before implementation. Keep the ADR concise and link related historical material when it exists.
