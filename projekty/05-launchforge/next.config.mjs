/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // picsum.photos placeholders are served unoptimized to avoid optimizer
    // round-trips and the fastly redirect. Swap for real assets before launch.
    unoptimized: true,
  },
};

export default nextConfig;
