import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // API 라우트에 대한 CORS 헤더 설정
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.gyun-dev.co.kr",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin",
          },
          { key: "Access-Control-Max-Age", value: "86400" },
        ],
      },
    ];
  },
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
