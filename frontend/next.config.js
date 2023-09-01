/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1", "localhost"],
  }
}

module.exports = nextConfig
