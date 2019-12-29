import { gql } from '@zeusdeux/serverless-graphql'
import { ContentfulClientApi } from 'contentful'
import { Post, PostMetadata } from './types'

export const typeDefs = gql`
  type Query {
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

export const resolvers = {
  Query: {
    async posts(_parent: any, _args: any, { ctfl }: { ctfl: ContentfulClientApi }) {
      const posts = await ctfl.getEntries<Omit<PostMetadata, 'id'>>({
        content_type: 'blogPost'
      })

      const result = posts.items.map(post => ({
        id: post.sys.id,
        slug: post.fields.slug,
        title: post.fields.title
      }))

      return result
    },
    async post(_parent: any, { slug }: { slug: string }, { ctfl }: { ctfl: ContentfulClientApi }) {
      const posts = await ctfl.getEntries<Omit<Post, 'id'>>({
        content_type: 'blogPost',
        'fields.slug': slug
      })

      // TODO: build the previous and next fields out correctly
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
