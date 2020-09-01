export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Post {
  __typename?: 'Post'
  metadata: PostMetadata
  body: Scalars['String']
  tags: Array<Scalars['String']>
  previous?: Maybe<PostMetadata>
  next?: Maybe<PostMetadata>
}

export interface PostMetadata {
  __typename?: 'PostMetadata'
  id: Scalars['String']
  slug: Scalars['String']
  title: Scalars['String']
}

export interface Query {
  __typename?: 'Query'
  posts: Array<PostMetadata>
  post: Post
}

export interface QueryPostArgs {
  slug: Scalars['String']
}

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>

export type GetPostsQuery = {
  __typename?: 'Query'
  posts: Array<{ __typename?: 'PostMetadata'; id: string; slug: string; title: string }>
}

export type GetPostQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type GetPostQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'Post'
    body: string
    tags: Array<string>
    metadata: { __typename?: 'PostMetadata'; id: string; slug: string; title: string }
    previous?: Maybe<{ __typename?: 'PostMetadata'; id: string; slug: string; title: string }>
    next?: Maybe<{ __typename?: 'PostMetadata'; id: string; slug: string; title: string }>
  }
}
