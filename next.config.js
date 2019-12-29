const got = require('got')
const { createClient } = require('contentful')

const ctfl = createClient({
  space: 'pe315guv55pz',
  accessToken: process.env.CDA_TOKEN
})

module.exports = {
  exportTrailingSlash: false,
  exportPathMap: async function() {
    const posts = await ctfl.getEntries({
      content_type: 'blogPost'
    })

    const pathsToPosts = posts.items.reduce((acc, post) => {
      acc[`/posts/${post.fields.slug}`] = {
        page: '/posts/[slug]',
        query: { slug: post.fields.slug }
      }
      return acc
    }, {})
    const paths = {
      '/': { page: '/' },
      ...pathsToPosts
    }

    console.log('*'.repeat(80))
    console.log(paths)
    console.log('*'.repeat(80))

    return paths
  },
  env: {
    CDA_TOKEN: process.env.CDA_TOKEN
  }
}
