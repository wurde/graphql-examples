/**
 * Define and export resolvers
 */

exports.link = (parent, args, context) => {
  return context.prisma.vote({ id: parent.id }).link()
}

exports.user = (parent, _, context) => {
  return context.prisma.vote({ id: parent.id }).user()
}
