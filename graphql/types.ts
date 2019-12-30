type Maybe<T> = T | null
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Post = {
  metadata: PostMetadata
  body: Scalars['String']
  tags: Array<Scalars['String']>
  previous?: Maybe<PostMetadata>
  next?: Maybe<PostMetadata>
}

export type PostMetadata = {
  id: Scalars['String']
  slug: Scalars['String']
  title: Scalars['String']
}

export type Query = {
  posts: Array<Maybe<PostMetadata>>
  post: Post
}

export type QueryPostArgs = {
  slug: Scalars['String']
}
