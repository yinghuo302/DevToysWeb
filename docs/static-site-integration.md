# 静态子站接入指南

DevToysWeb 只构建静态文件，并由本地 Nginx 托管。独立网站保留自身 HTML/CSS/JS/图片结构，不要求 Next.js 运行时或自建 API。

## 添加一个已构建的静态网站

1. 确认网站可由静态服务器运行，入口为根目录 `index.html`，并检查许可证、第三方脚本和 service worker。
2. 选一个唯一的 URL 前缀，例如 `reports-site`，把整个目录复制到 `public/reports-site/`：

   ```bash
   mkdir -p public/reports-site
   cp -a /path/to/reports-site/. public/reports-site/
   ```

   PowerShell 示例：

   ```powershell
   New-Item -ItemType Directory -Force public/reports-site | Out-Null
   Copy-Item -Path 'C:\path\to\reports-site\*' -Destination 'public\reports-site\' -Recurse -Force
   ```

   需要时单独复制隐藏文件。不要覆盖 `public/` 根目录，也不要与应用的 `/_next/`、favicon 或其他子站撞路径。
3. 检查资源引用。子目录网站优先使用 `./css/app.css`、`./assets/logo.svg` 等相对路径；若使用绝对路径，应带上 `/reports-site/` 前缀。避免从 `/js/...` 这样的主机根路径引用资源。
4. 若要从 DevToysWeb 的首页或导航打开子站，添加普通 `<a href="/reports-site/">` 链接，并为日语、英语、简体中文补齐标题与说明。原始 `public/` HTML 不是 App Router 页面，不要用 Next 客户端路由代替完整页面导航。
5. 若需要搜索引擎收录，将该子站的绝对 URL 单独加入 sitemap；没有实际本地化版本时，不要伪造 locale/hreflang 路由。

Next.js 静态导出会把 `public/reports-site/` 原样复制到 `dist/reports-site/`。由于项目启用了 `trailingSlash: true`，`/reports-site/` 对应 `index.html`。Nginx 的 `index index.html` 和 `try_files $uri $uri/ =404` 可直接服务该目录；开发模式如 `/reports-site/` 返回 404，可先访问 `/reports-site/index.html`，或为该目录增加只在 `next dev` 下生效的 rewrite。生产静态导出不要依赖 Next rewrites。

### Next.js 16 在 Windows 构建后的 RSC 404

Next.js 16 的静态导出在 Windows 构建时可能把 RSC payload 写入嵌套目录，例如 `__next.$d$locale/$d$category/$d$tool/__PAGE__.txt`，而浏览器请求的是同目录下点分隔的 `__next.$d$locale.$d$category.$d$tool.__PAGE__.txt`。这会导致链接预取出现 404；这是构建产物路径问题，不是 Nginx 缺少 SPA fallback。项目在 `next.config.js` 中启用构建 adapter，将这些 `.txt` payload 移到 Next.js 客户端请求的路径。Windows 上更新 adapter 后请重新运行 `pnpm build` 并重新部署完整的 `dist/`。Linux/macOS 构建通常不会产生此路径差异。参考 [Next.js issue #85374](https://github.com/vercel/next.js/issues/85374)。

## 构建与 Nginx 部署

从仓库根目录构建：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost pnpm build
```

确认 `dist/reports-site/index.html` 和所需资源存在，再把 `dist/` 的**内容**复制到 Nginx `root`。配置示例见 [`nginx-static-site.conf`](./nginx-static-site.conf)。不要把整个 `dist/` 套一层目录，也不要配置所有 URL 都回退到根 `index.html` 的 SPA rewrite；Next 静态导出会为每条路由生成独立 HTML。相机、定位和 Web Crypto 需要安全上下文：HTTP 下建议使用 `localhost`，其他本地域名请配置 HTTPS。

## 网络功能与数据边界

仓库没有自建后端 API。仅在有可用免费公共服务时保留网络工具，并在界面、指南中披露数据流和限制：

- OGP 使用 [Microlink API](https://microlink.io/docs/api/parameters/data)；页面 URL 会发送给服务商，免费方案[当前为每天 25 次请求](https://microlink.io/pricing)。
- 域名注册信息通过 [RDAP.org](https://about.rdap.org/) 查询；提交的域名会发送到 RDAP 服务。
- JWT 签名和声明在浏览器本地验证；JWKS 模式会由浏览器直接请求用户提供的 URL。
- 综合 DNS/TLS/HTTP 诊断和 SEO 审计需要服务器抓取目标网页，因没有合适的免费等价服务而不再提供。

独立子站的 JavaScript 与主站同源运行。若子站包含 service worker，确保它的注册脚本和 scope 被限制在子目录（例如 `/reports-site/`），不要让它控制 `/`。不可信或无权再分发的站点应放在单独子域名隔离，而不是复制到同源 `public/`。
