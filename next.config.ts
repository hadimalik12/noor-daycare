import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: 'export' as const } : {}),
  basePath: isGitHubPages ? '/noor-daycare' : '',
  assetPrefix: isGitHubPages ? '/noor-daycare/assets-v2' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
