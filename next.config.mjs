import UnoCSS from "@unocss/webpack";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  webpack: (config) => {
    config.cache = false;
    config.externals = [...config.externals, "bcrypt"];
    config.plugins.push(UnoCSS());
    return config;
  },
};

export default nextConfig;
