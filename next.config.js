/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: true,
  experimental: {
    useTypeScriptCli: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
