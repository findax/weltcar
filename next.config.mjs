import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: Boolean(process.env.IMAGE_OPTIMIZATION),
    domains: [
      'localhost',
      'stageapi.weltcar.de',
      'weltcar.s3.eu-central-1.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SERVER_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_APP_HOSTNAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
