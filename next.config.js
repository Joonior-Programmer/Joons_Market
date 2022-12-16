/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "imagedelivery.net",
      "customer-lz62w384m4nqsbd2.cloudflarestream.com",
    ],
  },
};

module.exports = nextConfig;
