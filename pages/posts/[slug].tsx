import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'
import { getPost, getPosts } from '../../graphql/dataFetcher'
import { GetPostQuery } from '../../graphql/types.generated'

const Nav: React.FC<GetPostQuery> = ({ post }) => {
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
  return (
    <Layout>
      <Head>
        <title>Mudit’s Blog - {post.metadata.title}</title>
        <meta name="description" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.title} />
        <meta name="twitter:description" content={post.metadata.title} />
        <meta name="keywords" content={post.tags.join(', ')} />
      </Head>
      <div>
        <article className="blog-post" dangerouslySetInnerHTML={{ __html: post.body }} />
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
            padding: 0 calc(100% / 15) 2rem;
          }

          article {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2rem;
            width: 100%;
          }

          :global(article.blog-post blockquote) {
            font-style: italic;
          }

          :global(article.blog-post blockquote > *:before) {
            content: '“';
          }

          :global(article.blog-post blockquote > *:after) {
            content: '”';
          }

          :global(article.blog-post img) {
            width: 100%;
          }

          :global(article.blog-post pre) {
            width: 100%;
          }

          :global(article.blog-post p) {
            width: 100%;
          }

          :global(article.blog-post ul) {
            width: 100%;
          }

          :global(article.blog-post a.permalink) {
            color: inherit;
            text-decoration: none;
          }
        `}
      </style>
    </Layout>
  )
}

// TODO: Replace context: any with a type that comes from next
// once getStaticProps stabilizes.
export async function getStaticProps(context: any) {
  const slug = (context.params.slug as unknown) as string

  const post = await getPost({ slug })

  return {
    props: post
  }
}

export async function getStaticPaths() {
  const { posts } = await getPosts()

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: false
  }
}

export default PostPage
