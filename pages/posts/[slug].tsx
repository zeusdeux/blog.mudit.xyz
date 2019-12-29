import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Markdown from 'react-markdown'
import { Post } from '../../types'
import Layout from '../../components/Layout'
import fetchViaGql from '../../utils/dataFetcher'
import { gql } from '@zeusdeux/serverless-graphql'

const Nav: React.FC<{ post: Post }> = ({ post }) => {
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
const PostPage: NextPage<{ post: Post }> = ({ post }) => {
  const body = `# ${post.title}

${post.body}`

  return (
    <Layout>
      <div>
        <Markdown source={body} className="blog-post" linkTarget="_blank" />
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
            padding: 2rem calc(100% / 6);
          }

          div > :global(.blog-post) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2rem;
            width: 100%;
          }

          div > :global(.blog-post blockquote) {
            font-style: italic;
            font-family: serif;
          }
        `}
      </style>
    </Layout>
  )
}

PostPage.getInitialProps = async function(context): Promise<{ post: Post }> {
  const slug = (context.query.slug as unknown) as string

  return fetchViaGql({
    req: gql`
      query getPosts($slug: String!) {
        post(slug: $slug) {
          id
          slug
          title
          body
          previous {
            id
          }
          next {
            id
          }
        }
      }
    `,
    variables: {
      slug
    }
  })
}

export default PostPage
