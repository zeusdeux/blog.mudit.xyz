const got = require('got')

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/posts/first-post': { page: '/posts/[slug]', query: { slug: 'first-post' } },
      '/posts/second-post': { page: '/posts/[slug]', query: { slug: 'second-post' } },
      '/posts/third-post': { page: '/posts/[slug]', query: { slug: 'third-post' } }
    }

    // generate more paths from blogs from contentful here,
    // add it to the paths object above and return paths

    return paths
  }
}
