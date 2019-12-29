import { getQueryRunner, gql } from '@zeusdeux/serverless-graphql'

const typeDefs = gql`
  type Query {
    hello: String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
}

export default getQueryRunner({ typeDefs, resolvers })
