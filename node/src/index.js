'use strict'

/**
 * Dependencies
 */

const path = require('path')
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

/**
 * Constants
 */

const port = process.env.PORT || 3000

/**
 * Define resolvers
 */

const resolvers = {
  Query: require('./resolvers/Query'),
  Mutation: require('./resolvers/Mutation'),
  User: require('./resolvers/User'),
  Link: require('./resolvers/Link')
}

/**
 * Define server
 */

const server = new GraphQLServer({
  typeDefs: path.resolve(path.join(__dirname, 'schema.graphql')),
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
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
