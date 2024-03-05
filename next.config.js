/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'directus-production-c628.up.railway.app',
      },
    ],
  },}

module.exports = nextConfig
