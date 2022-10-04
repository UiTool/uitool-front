/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_URL: 'http://localhost:4003/',
    GOOGLE_CLIENT_ID: '155056270335-lpmculk3o4dumjk9hkeurnvv9trt56sj.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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'
  }
}

module.exports = nextConfig
