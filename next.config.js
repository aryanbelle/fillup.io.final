/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization for API routes
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  // Add output configuration
  output: 'standalone',
  // Disable special character handling in routes
  trailingSlash: false,
  // Disable automatic static optimization
  reactStrictMode: true,
  swcMinify: true,
  // Add specific configuration for the (root) directory
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Configure rewrites to handle the (root) directory
  async rewrites() {
    return [
      {
        source: '/(dashboard|myforms|newform|form|security|settings|ai)/:path*',
        destination: '/main/$1/:path*',
      },
    ];
  },
  // Add any other configuration options here
};

module.exports = nextConfig; 