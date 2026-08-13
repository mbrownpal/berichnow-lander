import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/mastermind',
        destination: '/mastermind.html',
      },
    ];
  },
};

export default nextConfig;
