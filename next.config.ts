import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "yetitoursandtrek.com" }],
        destination: "https://www.yetitoursandtrek.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
