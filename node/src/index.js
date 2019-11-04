'use strict'

/**
 * Dependencies
 */

const { GraphQLServer } = require('graphql-yoga')

/**
 * Constants
 */

const port = process.env.PORT || 3000

/**
 * Define types
 */

const typeDefs = `
type Query {
  info: String!
}
`

/**
 * Define resolvers
 */

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}

/**
 * Define server
 */

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

/**
 * Start server
 */

if (module === require.main) {
  server.start({port}, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

/**
 * Export server
 */

module.exports = server
