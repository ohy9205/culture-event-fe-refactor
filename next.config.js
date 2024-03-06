/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    imageSizes: [],
    deviceSizes: [640, 768, 1024, 1280],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "culture.seoul.go.kr",
      },
    ],
  },
  headers: () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache,no-store,max-age=0,must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
