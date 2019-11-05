/**
 * Define and export resolvers
 */

exports.id = (parent) => {
  return parent.id
}

exports.name = (parent) => {
  return parent.name
}

exports.email = (parent) => {
  return parent.email
}

exports.links = (parent, args, context) => {
  return context.prisma.links()
}

exports.votes = (parent, _, context) => {
  return context.prisma.user({ id: parent.id }).votes()
}
