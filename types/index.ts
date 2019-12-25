export interface PostMetadata {
  id: string
  slug: string
  title: string
}

export interface Post extends PostMetadata {
  markdown: string
  previous?: PostMetadata
  next?: PostMetadata
}
