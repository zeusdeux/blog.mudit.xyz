import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Markdown from 'react-markdown'
import { Post } from '../../types'
import Layout from '../../components/Layout'

const PostPage: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <Layout>
      <div>
        <Markdown source={post.markdown} />
        <nav>
          {post.previous ? (
            <Link href="/posts/[slug]" as={`/posts/${post.previous.slug}`}>
              <a>{post.previous.title}</a>
            </Link>
          ) : null}
          {post.next ? (
            <Link href="/posts/[slug]" as={`/posts/${post.next.slug}`}>
              <a>{post.next.title}</a>
            </Link>
          ) : null}
        </nav>
      </div>
      <style jsx>
        {`
          div {
            align-self: center;
          }
        `}
      </style>
    </Layout>
  )
}

PostPage.getInitialProps = async function(context): Promise<{ post: Post }> {
  const slug = (context.query.slug as unknown) as string

  if (slug === 'first-post') {
    return {
      post: {
        id: '1234',
        slug: 'first-post',
        title: 'My first post',
        markdown: `# First post

Some example text

## Subheading

More awesome text

\`code block\`

`,
        next: {
          id: '2345',
          slug: 'second-post',
          title: 'My second post'
        }
      }
    }
  } else if (slug === 'second-post') {
    return {
      post: {
        id: '2345',
        slug: 'second-post',
        title: 'My second post',
        markdown: `# Second post

Some example text for second post

## Subheading

More awesome text

\`code block\`

### Sub subheading

omg man
`,
        previous: {
          id: '1234',
          slug: 'first-post',
          title: 'My first post'
        },
        next: {
          id: '3456',
          slug: 'third-post',
          title: 'My third post'
        }
      }
    }
  } else {
    return {
      post: {
        id: '3456',
        slug: 'third-post',
        title: 'My third post',
        markdown: `# Third and final post

Some example text for third post

## Subheading

Yoo wtf bro

\`code block\`

\`\`\`js
import React from 'react'

export default function() {
  return <h1>Hello!</h1>
}
\`\`\`

> Some note
`,
        previous: {
          id: '2345',
          slug: 'second-post',
          title: 'My second post'
        }
      }
    }
  }
}

export default PostPage
