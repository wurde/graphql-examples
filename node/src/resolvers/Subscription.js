/**
 * Define resolvers
 */

function newLinkSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
}

/**
 * Define and export AsyncIterators
 */

exports.newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload
  },
}
