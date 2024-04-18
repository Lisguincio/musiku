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
      {
        protocol: "https",
        hostname: "ixtrrinleuvsocnsxkmc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
