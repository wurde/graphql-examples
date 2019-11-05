/**
 * Define and export resolvers
 */

exports.links = (parent, args, context) => {
  return context.prisma.links()
}
