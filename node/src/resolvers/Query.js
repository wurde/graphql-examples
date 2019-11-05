/**
 * Define and export resolvers
 */

exports.info = () => {
  return 'This is the API of a Hackernews Clone'
}

exports.allLinks = (parent, args, context) => {
  return context.prisma.links()
}

exports.allUsers = (parent, args, context) => {
  return context.prisma.users()
}

exports.allVotes = (parent, args, context) => {
  return context.prisma.votes()
}

exports.findLink = (parent, args, context) => {
  // return links.filter(link => link.id === parseInt(args.id))[0]
  return 'TODO findLink'
}

exports.feed = async (parent, args, context, info) => {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ],
  } : {}

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  })

  const count = await context.prisma
    .linksConnection({
      where,
    }).aggregate().count()

  return {
    links,
    count,
  }
}
