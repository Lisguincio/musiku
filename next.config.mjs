/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "cdn.discordapp.com",
      },
    ],
  },
};

export default nextConfig;
