/** @type {import('next').NextConfig} */
const nextPwa = require('next-pwa');
const pwaPlugin = (nextPwa.default || nextPwa)({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/**
 * Empty-string env vars (common after a bad Vercel sync) break NextAuth at
 * module load: `new URL("")` → Invalid URL during prerender.
 * Prefer an explicit public URL, then the platform VERCEL_URL.
 */
function firstHttpUrl(...candidates) {
  for (const raw of candidates) {
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (!value || value === '[SENSITIVE]') continue;
    if (/^https?:\/\//i.test(value)) return value.replace(/\/$/, '');
  }
  return undefined;
}

function ensureAuthPublicUrl() {
  const resolved = firstHttpUrl(
    process.env.NEXTAUTH_URL,
    process.env.APP_PUBLIC_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  );
  if (resolved) {
    process.env.NEXTAUTH_URL = resolved;
    if (!firstHttpUrl(process.env.APP_PUBLIC_URL)) {
      process.env.APP_PUBLIC_URL = resolved;
    }
  }
}

ensureAuthPublicUrl();

function resolveApiRewriteBase() {
  return (
    firstHttpUrl(
      process.env.API_INTERNAL_URL,
      process.env.NEXT_PUBLIC_API_URL,
      process.env.NEXT_PUBLIC_PYTHON_URL,
    ) || 'http://127.0.0.1:8000'
  );
}

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  turbopack: {},
  allowedDevOrigins: [
    'raushni-dev.com',
    'www.raushni-dev.com',
    'api.raushni-dev.com',
    'cms.raushni-dev.com',
  ],

  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'api.raushni.com' },
      { protocol: 'https', hostname: 'cms.raushni.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async rewrites() {
    const apiUrl = resolveApiRewriteBase();

    // /api/auth/* → NextAuth
    // /api/v1/* → BFF Route Handler
    // /cms/api/* → CMS BFF Route Handler (app/cms/api/[...path]) — do not rewrite to Strapi
    // other /api/* → FastAPI (legacy paths if any)
    return {
      afterFiles: [
        {
          source: '/api/:path((?!auth(?:/|$)|v1(?:/|$)).*)',
          destination: `${apiUrl}/api/:path*`,
        },
      ],
    };
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // next-pwa v2 injects a webpack hook; keep only the supported key.
  webpack: pwaPlugin.webpack,
};

module.exports = nextConfig;
