# ADR 0005: Single pnpm project with root src and dist

- Status: Accepted
- Date: 2026-11-12
- Supersedes: workspace/package-layout decisions in ADR 0001 and the app/output paths in ADR 0004

## Context

The project no longer has a self-hosted API or cloud deployment workflow. The only production deliverable is the statically exported browser application, so a pnpm workspace and Turborepo add nesting and package indirection without providing needed coordination.

## Decision

- Keep one pnpm project at the repository root; place the application code in root `src/`, public assets and static sub-sites in root `public/`, and the app's Next.js configuration beside the root `package.json`.
- Remove the pnpm workspace and Turborepo configuration. Dependencies and project scripts are owned by the root `package.json`; TypeScript and Biome settings remain plain local configuration files.
- Keep Next.js `output: 'export'` and configure its export output directory as root `dist/`. `pnpm build` must produce the Nginx-ready static site there.
- Treat `dist/` as generated output: ignore it in Git and do not edit or commit it.
- Preserve the local Nginx deployment model and the browser-only / free-public-service limits documented in ADR 0004.

## Consequences

Contributors install, develop, test, typecheck, and build from the repository root with ordinary pnpm commands; there are no package filters. Nginx receives the contents of `dist/`. Independent static sites are added under `public/<slug>/` and appear at `dist/<slug>/` after export.

## Alternatives considered

- Keep the `apps/web` workspace and its package filters: rejected because there is only one application and no backend package.
- Move the whole Next.js project directory to `src/`: rejected because it would make `src/` the package root and leave the repository root dependent on a nested project path. Instead, `src/` contains application source while project configuration stays at the repository root.
- Keep Next.js's default `out/` export directory: rejected because the requested deployable artifact should be at the root `dist/` path.

## References

- [ADR 0001: Repository conventions](0001-repository-conventions.md)
- [ADR 0004: Static export and local Nginx hosting](0004-host-standalone-static-sites.md)
- [Static sub-site integration guide](../static-site-integration.md)
- [Agent repository guide](../../AGENTS.md)
