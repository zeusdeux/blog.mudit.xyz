import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import { PostMetadata } from '../types'

const Index: NextPage<{ posts: PostMetadata[] }> = ({ posts }) => {
  return (
    <Layout>
      <div>
        <p>omg</p>
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
