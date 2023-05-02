/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  images:{
    domains:["miro.medium.com","lh3.googleusercontent.com", "avatars.githubusercontent.com" , "upload.wikimedia.org","wallpapers.com"]
  }
}

module.exports = nextConfig
