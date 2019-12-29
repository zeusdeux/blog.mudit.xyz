import { QueryRunnerOptions } from '@zeusdeux/serverless-graphql'
import { createClient } from 'contentful'

import { runQuery } from './schema'

export default async function(args: QueryRunnerOptions) {
  const argsWithContext: QueryRunnerOptions = {
    ...args,
    context: {
      ctfl: createClient({
        space: 'pe315guv55pz',
        accessToken: process.env.CDA_TOKEN! // comes from next.config.js and there from the env itself
      })
    }
  }
  const { data, errors } = await runQuery(argsWithContext)

  if (errors) {
    console.log(errors) // tslint:disable-line
    throw new Error(errors[0].message)
  }

  return data
}
