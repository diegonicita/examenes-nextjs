/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'examenes.com.ar',
        'www.examenes.com.ar',
        'localhost:5000',
      ],
    },
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mercado.webapp.ar',
        port: '',
        pathname: '/images_medicina/**',
      },
      {
        protocol: 'https',
        hostname: '**.api-ninjas.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
