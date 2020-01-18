import { gql } from '@zeusdeux/serverless-graphql'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import fetchViaGql from '../graphql/dataFetcher'
import { PostMetadata } from '../graphql/types'

const Index: NextPage<{ posts: PostMetadata[] }> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>Mudit’s Blog - Contents</title>
      </Head>
      <div>
        <h1>My thoughts and ramblings..</h1>
        <p>Hello internet stranger! 👋🏼</p>
        <p>
          Below are a list of things I have had rattling around in my head, dumped on your screen.
          They are arranged from newest to oldest.
        </p>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                <a title={post.title}>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>
        {`
          div {
            padding: 2rem calc(100% / 6);
          }

          li > a {
            display: inline-block;
            width: calc(100vw / 2);
            max-width: 25rem;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>
    </Layout>
  )
}

export async function unstable_getStaticProps() {
  const posts = (await fetchViaGql({
    req: gql`
      {
        posts {
          id
          slug
          title
        }
      }
    `
  })) as { posts: PostMetadata[] }

  return {
    props: posts
  }
}

export default Index
