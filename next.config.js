/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images:{
    domains:["miro.medium.com","lh3.googleusercontent.com", "avatars.githubusercontent.com" ,"ucarecdn.com", "upload.wikimedia.org","wallpapers.com", "res.cloudinary.com"]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config}
}

module.exports = nextConfig
