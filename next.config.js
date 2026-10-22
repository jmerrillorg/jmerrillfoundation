/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{ source: '/admin/thanksgiving', headers: [
      { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
    ] }]
  },
}

module.exports = nextConfig
