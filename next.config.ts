import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',    value: 'on' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

// Anciennes pages retirées (chiffres fictifs) : on redirige plutôt que de laisser des 404.
const anciennesPages = [
  { source: '/ecosystem', destination: '/produits' },
  { source: '/roadmap', destination: '/a-propos#feuille-de-route' },
  { source: '/dashboard', destination: '/produits' },
  { source: '/performance', destination: '/produits' },
  { source: '/auth/login', destination: '/' },
  { source: '/produits/mifa-life', destination: '/produits' },
  { source: '/produits/ueemt-tokat', destination: '/produits' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return anciennesPages.map((r) => ({ ...r, permanent: true }))
  },
};

export default nextConfig;
