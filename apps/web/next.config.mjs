/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@m-nav/ui"],
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      's3.us-west-2.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp']
  }
}

export default nextConfig
