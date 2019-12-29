import { makeExecutableSchema } from '@zeusdeux/serverless-graphql'
import { ApolloServer } from 'apollo-server'
import { createClient } from 'contentful'
import { resolvers, typeDefs } from './schema'

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: {
    ctfl: createClient({
      space: 'pe315guv55pz',
      accessToken: process.env.CDA_TOKEN!
    })
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`) // tslint:disable-line
})
