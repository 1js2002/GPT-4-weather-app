/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.weatherbit.io"], // whitelisted
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react'],
  },
}

module.exports = nextConfig
