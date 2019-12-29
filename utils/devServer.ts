import { makeExecutableSchema } from '@zeusdeux/serverless-graphql'
import { ApolloServer } from 'apollo-server'
import { createClient } from 'contentful'
import { resolvers, typeDefs } from './dataFetcher'

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: {
    ctfl: createClient({
      space: 'pe315guv55pz',
      accessToken: 'W-Mj-z-cobNrpPC8oWGu9Dw5DdiiqvUdcygG0gxqyNk'
    })
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`) // tslint:disable-line
})
