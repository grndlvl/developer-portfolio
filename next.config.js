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
    // Build redirects array, including host-based redirect only if SHORT_DOMAIN is set
    const redirects = [];
    if (process.env.SHORT_DOMAIN) {
      // Redirect root path on short domain to main domain
      redirects.push({
        source: '/',
        has: [{ type: 'host', value: process.env.SHORT_DOMAIN }],
        destination: `https://${process.env.MAIN_DOMAIN || 'grndlvl.com'}`,
        permanent: false,
      });
      // Redirect links page on short domain to main domain links page
      redirects.push({
        source: '/links',
        has: [{ type: 'host', value: process.env.SHORT_DOMAIN }],
        destination: `https://${process.env.MAIN_DOMAIN || 'grndlvl.com'}/links`,
        permanent: false,
      });
    }
    redirects.push({
      source: '/JonathanDeLaigle.pdf',
      destination:
        'https://mozilla.github.io/pdf.js/web/viewer.html?file=https://raw.githubusercontent.com/grndlvl/resume/master/jonathan_delaigle.pdf',
      permanent: false,
    });
    return redirects;
  }
}
