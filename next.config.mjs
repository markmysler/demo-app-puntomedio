/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "ui-avatars.com" },
    ],
  },
}

export default nextConfig
