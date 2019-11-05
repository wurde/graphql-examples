/**
 * Define and export resolvers
 */

exports.id = (parent) => {
  return parent.id
}

exports.description = (parent) => {
  return parent.description
}

exports.url = (parent) => {
  return parent.url
}

exports.postedBy = (parent, _, context) => {
  return context.prisma.link({ id: parent.id }).postedBy()
}

exports.votes = (parent, _, context) => {
  return context.prisma.link({ id: parent.id }).votes()
}
