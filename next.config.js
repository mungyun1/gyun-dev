/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["jnqnxyjduaqlurkxszil.supabase.co"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
  experimental: {
    appDir: true,
  },
};
