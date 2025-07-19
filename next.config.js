const path = require('path')
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/JonathanDeLaigle.pdf',
        destination: 'https://drive.google.com/file/d/1sEKV7Mi1JuPDUGbmkH5AIfCFLheq66e3/view?usp=sharing',
        permanent: false,
      },
    ]
  }
}
