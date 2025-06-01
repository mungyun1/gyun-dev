/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jnqnxyjduaqlurkxszil.supabase.co",
      },
    ],
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
