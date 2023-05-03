/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images:{
    domains:["miro.medium.com","lh3.googleusercontent.com", "avatars.githubusercontent.com" , "upload.wikimedia.org","wallpapers.com", "res.cloudinary.com"]
  }
}

module.exports = nextConfig
