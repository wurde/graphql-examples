'use strict'

/**
 * Dependencies
 */

const path = require('path')
const { GraphQLServer } = require('graphql-yoga')

/**
 * Constants
 */

const port = process.env.PORT || 3000

/**
 * Locals
 */

let links = [{
  id: 0,
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL.'
}, {
  id: 0,
  url: 'www.andybettisworth.com',
  description: 'Personal website of Andy Bettisworth.'
}]

/**
 * Define resolvers
 */

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

/**
 * Define server
 */

const server = new GraphQLServer({
  typeDefs: path.resolve(path.join(__dirname, 'schema.graphql')),
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
