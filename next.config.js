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
