import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Markdown from 'react-markdown'
import { Post } from '../../types'
import Layout from '../../components/Layout'

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
        ) : (
          <Link href="/">
            <a title="Mudit’s blog post listing">Contents</a>
          </Link>
        )}
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
  return (
    <Layout>
      <div>
        <Markdown source={post.markdown} className="blog-post" />
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

  if (slug === 'first-post') {
    return {
      post: {
        id: '1234',
        slug: 'first-post',
        title: 'My first post',
        markdown: `# First post

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis urna pretium, suscipit diam et, tincidunt nibh. Ut posuere, magna nec fringilla fringilla, lacus ipsum vestibulum mi, at aliquet nibh orci sed nunc. In efficitur sed massa eu hendrerit. Donec scelerisque porttitor felis a porta. Aenean feugiat semper blandit. Nam sem tellus, tempus sed nisi euismod, placerat blandit nisi. Maecenas suscipit odio vitae eros interdum, vitae elementum turpis molestie. Quisque pellentesque nunc elementum lacus mollis, pulvinar venenatis orci pellentesque.

## Subheading

Vestibulum pellentesque pharetra massa, commodo lobortis mauris ullamcorper non. Sed ac lectus vel libero scelerisque scelerisque et in libero. Etiam tincidunt feugiat nunc, nec facilisis nisi. Nam eleifend magna neque, vel dictum est vulputate non. Quisque condimentum neque faucibus metus efficitur, eu gravida enim interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit purus a accumsan elementum. Nunc cursus tempor magna non eleifend. Nulla luctus elit et mi dignissim, ut feugiat ligula condimentum.

\`code block\`

Morbi interdum felis et nisl luctus cursus. Aliquam nisi felis, consequat eu dictum sit amet, porta ut nibh. Donec elit risus, faucibus ut facilisis a, fermentum sit amet nunc. Duis eu viverra tortor. Nam viverra lectus vel felis mollis vulputate. Phasellus mauris ipsum, scelerisque eget gravida id, posuere id diam. Nunc et est volutpat, iaculis odio ac, facilisis felis. Duis non purus congue purus varius malesuada id sit amet augue. Vivamus sollicitudin mauris est, sed mollis elit molestie non. Proin lobortis imperdiet metus sit amet pellentesque. Sed dictum hendrerit nulla, vel condimentum ex pharetra eget. Aenean at placerat orci. Pellentesque et purus odio. Mauris vulputate feugiat neque, et blandit lectus ullamcorper sit amet. Phasellus et neque eget urna feugiat vulputate id nec mauris.

Nullam vel vehicula quam, sit amet eleifend justo. Etiam mi lectus, dignissim id blandit eget, malesuada a nisi. Maecenas tristique non risus quis euismod. Suspendisse vehicula commodo pharetra. Nulla ultrices dignissim nisl, in placerat nisl egestas sit amet. Nullam quis justo vel augue cursus ultricies non ac eros. Nullam a dapibus nunc, quis auctor quam. Donec quis dignissim justo. Aliquam ex nunc, aliquam et cursus sed, bibendum at elit. Proin pellentesque dapibus felis, ac suscipit orci vestibulum eget. Curabitur at mattis sapien. Nullam ac tincidunt elit.
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
          title: 'My third post omg this is a big ass name what do i do now omgomgomgomgomgomgomg'
        }
      }
    }
  } else {
    return {
      post: {
        id: '3456',
        slug: 'third-post',
        title: 'My third post omg this is a big ass name what do i do now omgomgomgomgomgomgomg',
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
