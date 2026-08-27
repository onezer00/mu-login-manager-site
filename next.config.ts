import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = 'mu-login-manager-site';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath: `/${repositoryName}`,
      assetPrefix: `/${repositoryName}`,
      images: { unoptimized: true },
      trailingSlash: true,
    }
  : {};

export default nextConfig;
