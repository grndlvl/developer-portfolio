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
        destination: 'https://mozilla.github.io/pdf.js/web/viewer.html?file=https://raw.githubusercontent.com/grndlvl/resume/master/jonathan_delaigle.pdf',
        permanent: false,
      },
    ]
  }
}
