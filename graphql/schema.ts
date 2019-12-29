import { getQueryRunner, gql } from '@zeusdeux/serverless-graphql'
import { ContentfulClientApi, Entry } from 'contentful'
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
    async post(
      _parent: any,
      { slug }: { slug: string },
      { ctfl }: { ctfl: ContentfulClientApi }
    ): Promise<Post> {
      type BlogPostEntryType = Omit<Post, 'id' | 'previous' | 'next'> & {
        previous?: Entry<BlogPostEntryType>
        next?: Entry<BlogPostEntryType>
      }
      const posts = await ctfl.getEntries<BlogPostEntryType>({
        content_type: 'blogPost',
        'fields.slug': slug
      })

      // TODO: build the previous and next fields out correctly
      const result: Post[] = posts.items.map(post => {
        return {
          id: post.sys.id,
          slug: post.fields.slug,
          title: post.fields.title,
          body: post.fields.body,
          previous: post.fields.previous && {
            id: post.fields.previous.sys.id,
            slug: post.fields.previous.fields.slug,
            title: post.fields.previous.fields.title
          },
          next: post.fields.next && {
            id: post.fields.next.sys.id,
            slug: post.fields.next.fields.slug,
            title: post.fields.next.fields.title
          }
        }
      })
      return result[0]
    }
  }
}

// mappings in the generic params taken from the typedefs for Query above
export const runQuery = getQueryRunner<{ post: Post } | { posts: PostMetadata[] }>({
  typeDefs,
  resolvers
})
