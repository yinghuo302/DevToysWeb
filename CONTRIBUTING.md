# Contributing

DevToysWeb is a single pnpm project and prefers Node.js 26.

```sh
pnpm install
pnpm dev
```

The repository contains a statically exported Next.js app in `src`; `pnpm build` writes production files to the root `dist/` directory, served by local Nginx. See `AGENTS.md` and `docs/static-site-integration.md` for the repository map, static hosting constraints, and sub-site workflow.

Before opening a pull request, run:

```sh
pnpm test
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```

Keep pull requests focused, include tests for logic changes, and provide Japanese, English, and Simplified Chinese copy for user-facing features. Do not commit generated output such as `.next`, `dist`, or `*.tsbuildinfo`.
