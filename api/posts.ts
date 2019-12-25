import { NowRequest, NowResponse } from '@now/node'

// tslint:disable-next-line:variable-name
export default async function(_req: NowRequest, res: NowResponse) {
  res.end(
    JSON.stringify([
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
    ])
  )
}
