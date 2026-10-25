# ADR 0004: 静态导出与本地 Nginx 托管

- Status: Accepted
- Date: 2026-10-24
- Supersedes: AWS certificate-retention and Lambda-hosting decisions in ADR 0002/0003

## Context

The project is a browser-first developer-tool site. Production should be a static export hosted on a local Nginx server; there is no requirement for a self-hosted API or cloud deployment. Independent built websites must retain their directory structure when included in the export.

## Decision

- Keep Next.js `output: 'export'` and serve `apps/web/out/` from local Nginx. Configure `NEXT_PUBLIC_SITE_URL` at build time for canonical URLs and sitemap output.
- Import independent static sites under `apps/web/public/<slug>/`; the static export copies them to `out/<slug>/`. Use a normal page navigation link for each sub-site.
- Do not keep an API server, AWS Lambda/CDK resources, or AWS deployment workflows in this repository.
- Preserve network tools only with a browser-local implementation or a documented free public service: JWT uses local Web Crypto, domain registration lookup uses public RDAP, and OGP uses Microlink's free API. Remove comprehensive site diagnostics and SEO auditing because there is no suitable free replacement with equivalent capabilities.

## Consequences

Nginx needs only static files and directory-index resolution; the production site does not need Node.js. Microlink and RDAP requests leave the browser directly, are subject to provider CORS/availability/quotas, and must be disclosed to users. JWKS mode fetches the supplied URL from the browser. The local Nginx example and static-sub-site guide document these constraints.

## Alternatives considered

- Retain Lambda and CloudFront for server-side page fetching: rejected because deployment is required to remain local and static-only.
- Replace all network tools with arbitrary CORS proxies: rejected because there is no reliable free equivalent for full DNS/TLS/HTTP/SEO diagnostics and proxy use would add privacy and availability concerns.
