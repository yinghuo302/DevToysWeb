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

# 安装依赖
pnpm install

# 启动热重载开发服务器（默认 http://localhost:3000）
pnpm dev

# 构建并启动生产版本
pnpm build
pnpm start

# 使用 Biome 检查代码并格式化
pnpm check
pnpm format
```

## API 模拟

DNS、TLS 和 HTTP 诊断、WHOIS 查询、OGP 检查、SEO 检查以及 JWT 签名验证会调用 `apps/api` 中的 Lambda 接口。在本地开发时，[MSW](https://mswjs.io/) 会模拟这些接口的响应，无需连接 AWS 即可测试相关功能。

```sh
# 启用 Service Worker 并启动开发服务器
pnpm --filter @repo/web dev:mock
```

请求处理器位于 `apps/web/src/mocks/handlers.ts`，测试数据位于 `apps/web/src/mocks/fixtures.ts`。可以使用以下主机名测试不同场景：

| 输入 | 行为 |
| --- | --- |
| 任意 URL 或域名 | 返回正常的页面报告 |
| `sloppy.example.com` | 缺少元标签和标题；SEO/OGP 检查会返回警告和失败项 |
| `unreachable.example.com` | 模拟请求失败并显示错误提示 |
| `redirected.example.com` | 重定向后返回 404 |
| `localhost`、`10.0.0.1` 等 | 显示 SSRF 防护错误信息 |

`pnpm --filter @repo/web test` 会使用相同的 Node.js 模拟处理器，验证 API 客户端的请求内容和错误处理。模拟功能仅在设置 `NEXT_PUBLIC_API_MOCKS=enabled` 且运行开发构建时启用，不会包含在生产静态文件中。

## AWS 部署

生产环境使用私有 S3 存储桶，并通过 CloudFront 提供服务；`/api/*` 请求会转发到 Lambda Function URL。CDK 应用位于 `scripts/infra`，服务端 API 处理器位于 `apps/api`。

开发环境使用 Node.js 26，CI 会在 Node.js 24 和 26 上验证仓库。Lambda 暂时使用 AWS 最新的托管 Node.js 运行时（24），待 Node.js 26 托管运行时可用后再升级。

生产站点为 `https://devtoys.ex-foundry.com`（prd），开发站点为 `https://dev.devtoys.ex-foundry.com`（dev）。两个域名都位于委派的 `devtoys.ex-foundry.com` 托管区域中。CloudFront 仅接受来自 `us-east-1` 的证书，因此 ACM 证书由固定部署在该区域的独立 Stack 创建，再通过跨区域引用传递给站点 Stack；这也是需要同时 bootstrap `us-east-1` 的原因。

```sh
# 首次部署时，为目标账号和区域执行一次 bootstrap。即使只运行 bootstrap，CDK 应用也会被求值，因此必须提供环境上下文。
AWS_PROFILE=ex-foundry pnpm --filter @repo/infra cdk bootstrap aws://822013579886/ap-northeast-1 --context environment=prd

# CloudFront 证书 Stack 位于 us-east-1
AWS_PROFILE=ex-foundry pnpm --filter @repo/infra cdk bootstrap aws://822013579886/us-east-1 --context environment=prd

# 构建静态网站，并从本机部署到 dev 或 prd。
# 这两个命令会一起部署证书 Stack 和站点 Stack。
pnpm install
pnpm build
AWS_PROFILE=ex-foundry pnpm --filter @repo/infra deploy:dev
AWS_PROFILE=ex-foundry pnpm --filter @repo/infra deploy:prd
```

环境 Stack 名称为 `DevDevToysStack` 和 `PrdDevToysStack`，对应的证书 Stack 名称为 `DevDevToysCertificateStack` 和 `PrdDevToysCertificateStack`。两个环境均部署到 AWS 账号 `822013579886` 的 `ap-northeast-1` 区域；本地操作使用 `AWS_PROFILE=ex-foundry`。执行上述命令前，请确认该 profile 指向账号 `822013579886`。如需临时指定其他账号或区域，可在 CDK 命令中传入 `-c account=<id>` / `-c region=<region>`，或设置 `CDK_DEPLOY_REGION`。为避免 shell 中的环境变量意外改变部署目标，`AWS_REGION` 会被忽略。

通过 CloudFront 域名访问 `GET /api/health` 可获取 API 健康状态。

GitHub Actions 会将推送到 `main` 分支的变更部署到 `prd`。也可以手动运行工作流并选择 `dev` 或 `prd` 环境。请在两个 GitHub 环境中配置变量 `AWS_DEPLOY_ROLE_ARN`，并可选配置 `AWS_REGION` 和 `AWS_ACCOUNT_ID`。两个工作流都会检查被 Assume 的角色是否属于 `AWS_ACCOUNT_ID`（默认值为 `822013579886`），以便在角色 ARN 过期或配置错误时提前失败，避免部署到错误账号。该角色必须信任此仓库的 GitHub OIDC Provider，并拥有部署 CDK Stack 的权限。无需配置长期有效的 AWS 访问密钥。

共享 OIDC Provider 和各环境的部署角色由 `s-yoshiki/aws-terraform` 集中管理，不属于本仓库的 CDK 应用。

`Deploy website content` 工作流可为选定环境单独更新 S3 中的静态网站文件，而不运行 CDK。该工作流会从环境 Stack 读取存储桶名称和 CloudFront 分发 ID，同步 `apps/web/out`，并刷新 CloudFront 缓存。添加这些 Stack 输出后，请先运行一次 CDK 部署。部署角色还需要 S3 对象写入/删除权限、`cloudformation:DescribeStacks` 和 `cloudfront:CreateInvalidation` 权限。

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
