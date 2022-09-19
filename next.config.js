/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_URL: 'http://localhost:4003/'
  }
}

module.exports = nextConfig
