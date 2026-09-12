import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: 'export' as const } : {}),
  basePath: isGitHubPages ? '/maliks-daycare' : '',
  assetPrefix: isGitHubPages ? '/maliks-daycare/assets-v2' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
