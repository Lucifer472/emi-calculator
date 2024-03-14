/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.drivingexamexpert.com",
        pathname: "/blogs/*",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
