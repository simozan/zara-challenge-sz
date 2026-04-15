/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
      },
      {
        protocol: 'http',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
      },
      {
        protocol: 'https',
        hostname: '**.apple.com',
      },
      {
        protocol: 'https',
        hostname: '**.samsung.com',
      },
      {
        protocol: 'https',
        hostname: '**.google.com',
      },
    ],
  },
};

export default nextConfig;
