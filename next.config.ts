import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
