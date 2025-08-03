import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    // 프로덕션 빌드에서만 콘솔문 제거
    if (!dev) {
      const TerserPlugin = require("terser-webpack-plugin");
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // console.log, console.info, console.debug 제거
              drop_debugger: true, // debugger 제거
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
