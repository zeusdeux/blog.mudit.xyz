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
                <a>{post.title}</a>
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
        title: 'My second post'
      },
      {
        id: '3456',
        slug: 'third-post',
        title: 'My third post'
      }
    ]
  }
}

export default Index
