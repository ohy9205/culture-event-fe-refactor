/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "culture.seoul.go.kr",
      },
    ],
  },
};

module.exports = nextConfig;
