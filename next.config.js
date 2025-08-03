/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@next/font"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  rewrites: async () => {
    return [
      {
        source: "/rss.xml",
        destination: "/api/feed",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
  eslint: {
    dirs: ["pages", "components", "lib", "utils", "hooks", "app"],
  },
};

module.exports = nextConfig;
