import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hmec.pythonanywhere.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
