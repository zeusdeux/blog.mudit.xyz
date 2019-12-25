import { NowRequest, NowResponse } from '@now/node'

// tslint:disable-next-line:variable-name
export default async function(_req: NowRequest, res: NowResponse) {
  res.end(
    JSON.stringify({
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
    })
  )
}
