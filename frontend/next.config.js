/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: process.env.NODE_ENV === 'production'
      ? ['api.raushni.com', 'raushni.s3.amazonaws.com']
      : ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },

  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
                   (process.env.NODE_ENV === 'production'
                     ? 'https://api.raushni.com'
                     : 'http://backend:5000');

    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
      {
        source: '/python/:path*',
        destination: process.env.NEXT_PUBLIC_PYTHON_URL || 'http://python-service:8000/:path*',
      },
    ];
  },

  output: 'standalone',

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'date-fns'],
  },

  poweredByHeader: false,

  compress: true,

  generateEtags: true,
};

module.exports = nextConfig;