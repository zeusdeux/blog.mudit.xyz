type Maybe<T> = T | null
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Metadata = {
  id: Scalars['String']
  slug: Scalars['String']
  title: Scalars['String']
}

export type Post = Metadata & {
  id: Scalars['String']
  slug: Scalars['String']
  title: Scalars['String']
  body: Scalars['String']
  tags: Array<Scalars['String']>
  previous?: Maybe<PostMetadata>
  next?: Maybe<PostMetadata>
}

export type PostMetadata = Metadata & {
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
