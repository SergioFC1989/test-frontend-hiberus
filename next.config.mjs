/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"]
  },
  images: {
    domains: ["i.annihil.us", "gateway.marvel.com"]
  }
};

export default nextConfig;
