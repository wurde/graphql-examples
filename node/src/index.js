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
  id: 1,
  url: 'www.andybettisworth.com',
  description: 'Personal website of Andy Bettisworth.'
}]
let linkID = links.length

/**
 * Define resolvers
 */

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    allLinks: () => links,
    findLink: (_, args) => links.filter(link =>  link.id === parseInt(args.id))[0]
  },
  Mutation: {
    createLink: (_, args) => {
      const link = {
        id: linkID++,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (_, args) => {
      links = links.map(link => {
        if (link.id === parseInt(args.id)) {
          if (args.description) link.description = args.description
          if (args.url) link.url = args.url
        }
        return link
      })
      const link = links.filter(link => link.id === parseInt(args.id))[0]
      return link
    },
    deleteLink: (_, args) => {
      const link = links.filter(link => link.id === parseInt(args.id))[0]
      links = links.filter(link => link.id !== parseInt(args.id))
      return link
    }
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
