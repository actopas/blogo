import NextBundleAnalyzer from '@next/bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';

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

  // 自定义 Webpack 配置
  webpack(config, { isServer }) {
    if (!isServer && process.env.NODE_ENV === 'production') {
      if (!config.optimization) config.optimization = {};
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 移除 console.log
            },
          },
        }),
      ];
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
      };
    }

    if (!config.resolve) config.resolve = {};
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};

export default withBundleAnalyzer(config);
