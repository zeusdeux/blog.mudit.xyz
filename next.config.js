const { createClient } = require('contentful')

const ctfl = createClient({
  space: 'pe315guv55pz',
  accessToken: process.env.CDA_TOKEN
})

module.exports = {
  exportTrailingSlash: false,
  env: {
    CDA_TOKEN: process.env.CDA_TOKEN
  }
}
