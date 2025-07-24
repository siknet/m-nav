/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@m-nav/ui"],
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  env: {
    NOTION_PAGE_ID: process.env.NOTION_PAGE_ID,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID
  },
}

export default nextConfig
