/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/work", destination: "/treasury", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
