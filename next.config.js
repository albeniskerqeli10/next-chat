/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:["miro.medium.com","lh3.googleusercontent.com", "avatars.githubusercontent.com" , "upload.wikimedia.org"]
  }
}

module.exports = nextConfig
