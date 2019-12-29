import { ApolloServer } from 'apollo-server'
import { gql, makeExecutableSchema } from '@zeusdeux/serverless-graphql'
import { createClient } from 'contentful'

const typeDefs = gql`
  type Query {
    hello: String!
    posts: [PostMetadata]!
    post(slug: String!): Post!
  }

  interface Metadata {
    id: String!
    slug: String!
    title: String!
  }

  type PostMetadata implements Metadata {
    id: String!
    slug: String!
    title: String!
  }

  type Post implements Metadata {
    id: String!
    slug: String!
    title: String!
    body: String!
    previous: PostMetadata
    next: PostMetadata
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    async posts(_parent, _args, { ctfl }) {
      const posts = await ctfl.getEntries({
        content_type: 'blogPost'
      })

      const result = posts.items.map(post => ({
        id: post.sys.id,
        slug: post.fields.slug,
        title: post.fields.title
      }))

      return result
    },
    async post(_parent, { slug }, { ctfl }) {
      // rename markdown to body in the Post interface
      const posts = await ctfl.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug
      })

      const result = posts.items.map(post => ({
        id: post.sys.id,
        slug: post.fields.slug,
        title: post.fields.title,
        body: post.fields.body,
        previous: post.fields.previous,
        next: post.fields.next
      }))

      return result[0]
    }
  }
}

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: {
    ctfl: createClient({
      space: 'pe315guv55pz',
      accessToken: 'W-Mj-z-cobNrpPC8oWGu9Dw5DdiiqvUdcygG0gxqyNk'
    })
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`) // tslint:disable-line
})
