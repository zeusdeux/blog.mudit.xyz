module.exports = {
  trailingSlash: false,
  env: {
    CDA_TOKEN: process.env.CDA_TOKEN,
    PREVIEW_TOKEN: process.env.PREVIEW_TOKEN,
    SPACE_ID: process.env.SPACE_ID
  },
  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: true
      },
      {
        source: '/posts/',
        destination: '/',
        permanent: true
      }
    ]
  }
}
