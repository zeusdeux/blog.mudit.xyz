const contentfulManagement = require('contentful-management')

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CMA_TOKEN
  })

  return contentfulClient
    .getSpace(process.env.SPACE_ID)
    .then(space => space.getEnvironment('master'))
}
