import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Prism from 'prismjs'
import React from 'react'
import Layout from '../../components/Layout'
import Markdown from '../../components/Markdown'
import { getPost, getPosts } from '../../graphql/dataFetcher'
import { GetPostQuery } from '../../graphql/types.generated'

const Nav: React.FC<GetPostQuery> = ({ post }) => {
  React.useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <nav>
        {post.previous ? (
          <Link href="/posts/[slug]" as={`/posts/${post.previous.slug}`}>
            <a title={post.previous.title}>{post.previous.title}</a>
          </Link>
        ) : (
          <Link href="/">
            <a title="Mudit’s blog post listing">Contents</a>
          </Link>
        )}

        {post.next ? (
          <Link href="/posts/[slug]" as={`/posts/${post.next.slug}`}>
            <a title={post.next.title}>{post.next.title}</a>
          </Link>
        ) : post.previous ? (
          <Link href="/">
            <a title="Mudit’s blog post listing">Contents</a>
          </Link>
        ) : null}
      </nav>

      <style jsx>
        {`
          nav {
            padding: 2rem;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            text-align: center;
            width: 100%;
          }

          nav > a {
            flex-basis: calc(100% / 3);
            min-width: 9rem;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>
    </>
  )
}
const PostPage: NextPage<GetPostQuery> = ({ post }) => {
  const body = `# ${post.metadata.title}

${post.body}`

  return (
    <Layout>
      <Head>
        <title>Mudit’s Blog - {post.metadata.title}</title>
        <meta name="description" content={post.metadata.title} />
        <meta name="keywords" content={post.tags.join(', ')} />
      </Head>
      <div>
        <Markdown source={body} className="blog-post" />
        <h2>🖖🏼</h2>
        <Nav post={post} />
      </div>
      <style jsx>
        {`
          div {
            align-self: center;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem calc(100% / 10);
          }

          :global(.blog-post) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2rem;
            width: 100%;
          }

          :global(.blog-post blockquote) {
            font-style: italic;
          }

          :global(.blog-post blockquote > *:before) {
            content: '“';
          }

          :global(.blog-post blockquote > *:after) {
            content: '”';
          }

          :global(.blog-post img) {
            width: 100%;
          }

          :global(.blog-post pre) {
            width: 100%;
          }

          :global(.blog-post p) {
            width: 100%;
          }
        `}
      </style>
    </Layout>
  )
}

// TODO: Replace context: any with a type that comes from next
// once getStaticProps stabilizes.
export async function unstable_getStaticProps(context: any) {
  const slug = (context.params.slug as unknown) as string

  const post = await getPost({ slug })

  return {
    props: post
  }
}

export async function unstable_getStaticPaths() {
  const { posts } = await getPosts()

  return posts.map(({ slug }) => ({
    params: { slug }
  }))
}

export default PostPage
