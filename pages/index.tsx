import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import { PostMetadata } from '../types'

const Index: NextPage<{ posts: PostMetadata[] }> = ({ posts }) => {
  return (
    <Layout>
      <div>
        <h1>Mudit’s thought dump</h1>
        <p>Hello internet stranger!</p>
        <p>
          Below are list of things I have had rattling around in my head, dumped on your screen.
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

Index.getInitialProps = async function(): Promise<{ posts: PostMetadata[] }> {
  return {
    posts: [
      {
        id: '1234',
        slug: 'first-post',
        title: 'My first post'
      },
      {
        id: '2345',
        slug: 'second-post',
        title: 'Easy perceived performance wins for websites'
      },
      {
        id: '3456',
        slug: 'third-post',
        title: 'My third post omg this is a big ass name what do i do now omgomgomgomgomgomgomg'
      }
    ]
  }
}

export default Index
