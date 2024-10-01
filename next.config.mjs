import NextBundleAnalyzer from '@next/bundle-analyzer';

import i18nConfig from './next-i18next.config.mjs';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
const config = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  i18n: i18nConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.aliyuncs.com',
      },
      {
        protocol: 'http',
        hostname: '**.aliyuncs.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default withBundleAnalyzer(config);
