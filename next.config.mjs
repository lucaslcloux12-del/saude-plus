/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbopack: false   // ← isso desativa o Turbopack que está travando
  },
};

export default nextConfig;
