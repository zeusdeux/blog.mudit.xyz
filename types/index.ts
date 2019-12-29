export interface PostMetadata {
  id: string
  slug: string
  title: string
}

export interface Post extends PostMetadata {
  body: string
  previous?: PostMetadata
  next?: PostMetadata
}
