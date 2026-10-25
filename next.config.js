/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  adapterPath: require.resolve('./scripts/next-static-export-rsc-adapter.cjs'),
  reactStrictMode: true,
  experimental: {
    useTypeScriptCli: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
