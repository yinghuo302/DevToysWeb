<h1 align="center">
  DevToysWeb
</h1>
<p align="center">
  面向 Web 的开发者瑞士军刀
</p>
<p align="center">
  <a style="text-decoration:none" href="https://dev-toys-web.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/%E7%BD%91%E7%AB%99-DevToysWeb-blue" alt="网站" />
  </a>
</p>

## 项目简介

本项目受到以下项目的启发，打造了一个 Web 版本：

- [DevToys](https://github.com/veler/DevToys)
- [DevToysMac](https://github.com/ObuchiYuki/DevToysMac)
- [DevBox](https://www.dev-box.app/)
- [DevUtils](https://devutils.app/)

在跟进原版功能的同时，也加入了一些自有工具，例如密码生成器。

界面支持日语、英语和简体中文，默认使用简体中文（`/zh-CN/`）。访问根路径 `/` 会自动跳转到简体中文首页。

## 安装与运行

```sh
# 克隆仓库
git clone https://github.com/s-yoshiki/DevToysWeb.git
cd DevToysWeb

# 安装依赖并启动开发服务器（默认 http://localhost:3000）
pnpm install
pnpm dev

# 检查代码
pnpm check
pnpm format:check
pnpm typecheck
pnpm test
```

## 本地静态站点部署

生产部署只生成静态文件，由本地 Nginx 直接托管；仓库不包含后端 API、Node.js 生产服务器或云部署流程。

```sh
# 构建静态站点，输出到根目录 dist/
NEXT_PUBLIC_SITE_URL=http://localhost pnpm build

# 将产物复制到 Nginx root（根据服务器配置调整路径）
sudo mkdir -p /var/www/devtoys/current
sudo cp -a dist/. /var/www/devtoys/current/
sudo nginx -t && sudo systemctl reload nginx
```

Windows PowerShell 构建示例：

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'http://localhost'
pnpm build
```

Nginx 配置示例见 [`docs/nginx-static-site.conf`](./docs/nginx-static-site.conf)。`dist/` 包含各语言路由和 `public/` 静态资源；Nginx 使用 `index index.html` 与 `try_files $uri $uri/ =404` 服务目录下的页面。相机、定位和 Web Crypto 需要安全上下文：`localhost` 可使用 HTTP，局域网域名或 IP 应配置 HTTPS。

## 网络工具与第三方服务

- OGP 检查使用 [Microlink API](https://microlink.io/docs/api/parameters/data)；[免费计划目前限制为每天 25 次](https://microlink.io/pricing)。输入的页面 URL 会发送给 Microlink。
- 域名注册查询使用 [RDAP.org 公共服务](https://about.rdap.org/)；提交的域名会发送给 RDAP 服务。
- JWT 签名验证在浏览器中本地运行。选择 JWKS URL 模式时，浏览器会直接请求该 URL。
- 综合 DNS/TLS/HTTP 诊断和 SEO 审计需要服务器抓取任意网页，当前没有合适的免费替代服务，已从工具列表删除。

使用网络工具前，请勿提交含有秘密或认证信息的 URL、域名或 JWKS 地址。Microlink 和 RDAP 的可用性、跨域策略及使用限制由相应第三方服务决定。

## 工具

目前提供多种工具，包括：

- 转换工具
  - `angle`
  - `date`
  - `number_base`
  - `yaml2json`
- 编码与解码
  - `base64`
  - `crypto`
  - `html`
  - `url`
- 格式化工具
  - `json`
  - `sql`
- 生成器
  - `hash`
  - `password`
  - `uuid`

还有更多工具正在开发中！

## 参与贡献

请参阅[贡献指南](./CONTRIBUTING.md)。
