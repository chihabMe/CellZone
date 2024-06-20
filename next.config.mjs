/** @type {import('next').NextConfig} */
const nextConfig = {
  serverComponentsExternalPackages: ["bcrypt"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
