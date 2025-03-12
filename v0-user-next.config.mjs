/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  // Remove basePath and assetPrefix for local development
  // basePath: '/hiv-aids-info',
  // assetPrefix: '/hiv-aids-info/',
};

export default nextConfig;

