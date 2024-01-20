/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['www.examenes.com.ar', 'localhost:5000'],
    },
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mercado.webapp.ar',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '**.api-ninjas.com',
        port: '',
        pathname: '/**',

      }
      
    ],
  },
}

export default nextConfig
