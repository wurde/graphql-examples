/**
 * Define resolvers
 */

function feed(parent, args, context, info) {
  return context.prisma.links()
}

/**
 * Export resolvers
 */

module.exports = {
  feed,
}
