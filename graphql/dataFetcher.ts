import { gql, QueryRunnerOptions } from '@zeusdeux/serverless-graphql'
import { createClient } from 'contentful'
import { runQuery } from './schema'
import {
  GetPostQuery,
  GetPostQueryVariables,
  GetPostsQuery,
  GetPostsQueryVariables
} from './types.generated'

export const ctflConfig =
  process.env.NODE_ENV === 'production' && process.env.FORCE_PREVIEW !== 'true' // FORCE_PREVIEW to deploy a preview version from localhost
    ? {
        space: process.env.SPACE_ID!,
        accessToken: process.env.CDA_TOKEN! // comes from next.config.js and there from the env itself
      }
    : {
        space: process.env.SPACE_ID!,
        accessToken: process.env.PREVIEW_TOKEN!, // // comes from next.config.js and there from the env itselfP
        host: 'preview.contentful.com'
      }

const ctfl = createClient(ctflConfig)

async function fetchViaGql<T>(args: QueryRunnerOptions) {
  const argsWithContext: QueryRunnerOptions = {
    ...args,
    context: {
      ctfl
    }
  }
  const { data, errors } = await runQuery<T>(argsWithContext)

  if (errors) {
    console.log(errors) // tslint:disable-line
    throw new Error(errors[0].message)
  }

  return data
}

export async function getPosts(variables: GetPostsQueryVariables = {}): Promise<GetPostsQuery> {
  const result = await fetchViaGql<GetPostsQuery>({
    req: gql`
      query getPosts {
        posts {
          id
          slug
          title
        }
      }
    `,
    variables
  })

  if (!result) {
    throw new Error(`Unexpected result ${result} for getPosts query`)
  }

  return result
}

export async function getPost(variables: GetPostQueryVariables): Promise<GetPostQuery> {
  const result = await fetchViaGql<GetPostQuery>({
    req: gql`
      query getPost($slug: String!) {
        post(slug: $slug) {
          metadata {
            id
            slug
            title
          }
          body
          tags
          previous {
            id
            slug
            title
          }
          next {
            id
            slug
            title
          }
        }
      }
    `,
    variables
  })

  if (!result) {
    throw new Error(`Unexpected result ${result} for getPost query`)
  }

  return result
}
