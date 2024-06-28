/** @type {import('next').NextConfig} */

const nextConfig = {
  serverComponentsExternalPackages: ["bcrypt"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

// export default nextConfig;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)