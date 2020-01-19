import { makeExecutableSchema } from '@zeusdeux/serverless-graphql'
import { ApolloServer } from 'apollo-server'
import { createClient } from 'contentful'
import { ctflConfig } from './dataFetcher'
import { resolvers, typeDefs } from './schema'

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: {
    ctfl: createClient(ctflConfig)
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`) // tslint:disable-line
})
