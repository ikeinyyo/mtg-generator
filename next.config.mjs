/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "dalleprodsec.blob.core.windows.net",
      },
      {
        hostname: "*.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
