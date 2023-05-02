/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
    reactStrictMode: true
  },
  images:{
    domains:["miro.medium.com","lh3.googleusercontent.com", "avatars.githubusercontent.com" , "upload.wikimedia.org","wallpapers.com"]
  }
}

module.exports = nextConfig
