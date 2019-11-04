/**
 * Define resolvers
 */

function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy()
}

/**
 * Export resolvers
 */

module.exports = {
  postedBy,
}
