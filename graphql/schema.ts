import { getQueryRunner, gql } from '@zeusdeux/serverless-graphql'
import { ContentfulClientApi } from 'contentful'
import { BlogPostFields } from '../contentful/types'
import { Post, PostMetadata } from './types'

export const typeDefs = gql`
  type Query {
    posts: [PostMetadata]!
    post(slug: String!): Post!
  }

  type PostMetadata {
    id: String!
    slug: String!
    title: String!
  }

  type Post {
    metadata: PostMetadata!
    body: String!
    tags: [String!]!
    previous: PostMetadata
    next: PostMetadata
  }
`

export const resolvers = {
  Query: {
    async posts(
      _parent: any,
      _args: any,
      { ctfl }: { ctfl: ContentfulClientApi }
    ): Promise<PostMetadata[]> {
      const posts = await ctfl.getEntries<BlogPostFields>({
        content_type: 'blogPost',
        order: '-sys.createdAt'
      })

      const result: PostMetadata[] = posts.items.map(post => ({
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
      const posts = await ctfl.getEntries<BlogPostFields>({
        content_type: 'blogPost',
        'fields.slug': slug
      })

      // TODO: build the previous and next fields out correctly
      const result: Post[] = posts.items.map(post => {
        return {
          metadata: { id: post.sys.id, slug: post.fields.slug, title: post.fields.title },
          body: post.fields.body,
          tags: post.fields.tags,
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
export const { graphql: runQuery } = getQueryRunner<{ post: Post } | { posts: PostMetadata[] }>({
  typeDefs,
  resolvers
})
