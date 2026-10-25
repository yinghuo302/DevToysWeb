# ADR 0007: Normalize Windows static-export RSC payload paths

- Status: Accepted
- Date: 2026-10-26

## Context

Next.js 16.3.0 can emit App Router RSC payloads into nested directories when `output: 'export'` is built on Windows. The client requests the corresponding dot-separated `__next.*.txt` filename, so static hosting returns 404 even though the payload exists in the export. This is a Next.js path-normalization bug, not a missing Nginx route.

## Decision

Use Next.js's build adapter API to flatten nested static RSC payload paths after export. The adapter only moves `.txt` files below a `__next.*` segment; all other exported files and route content remain unchanged.

## Consequences

Windows builds produce the flat RSC filenames requested by the Next.js client and can be deployed as ordinary static files. Linux builds are unchanged because their RSC files are already emitted with the expected names. Revisit the adapter after upgrading Next.js to a version that includes the upstream path-normalization fix.

## References

- [Next.js issue #85374](https://github.com/vercel/next.js/issues/85374)
- [Next.js adapter configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/adapterPath)
- [Static sub-site integration guide](../static-site-integration.md)
- [Agent repository guide](../../AGENTS.md)
