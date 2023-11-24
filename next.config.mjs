/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mercado.webapp.ar',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
