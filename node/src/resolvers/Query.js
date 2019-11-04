/**
 * Define and export resolvers
 */

exports.info = () => {
  return 'This is the API of a Hackernews Clone'
}

exports.allLinks = (parent, args, context) => {
  return context.prisma.links()
}

exports.findLink = (parent, args, context) => {
  // return links.filter(link => link.id === parseInt(args.id))[0]
  return 'TODO findLink'
}
