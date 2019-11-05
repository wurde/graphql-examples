/**
 * Dependencies
 */

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const getUserId = require('../helpers/getUserId.js')
const { APP_SECRET } = require('../config/secrets')

/**
 * Define and export resolvers
 */

exports.signup = async (parent, args, context, _) => {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

exports.login = async (parent, args, context, _) => {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

exports.createLink = (parent, args, context) => {
  const userId = getUserId(context)

  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  })
}

exports.updateLink = (parent, args) => {
  links = links.map(link => {
    if (link.id === parseInt(args.id)) {
      if (args.description) link.description = args.description
      if (args.url) link.url = args.url
    }
    return link
  })
  const link = links.filter(link => link.id === parseInt(args.id))[0]
  return { id: 0, url: 'TODO updateLink', description: 'Pending' }
}

exports.deleteLink = (parent, args) => {
  const link = links.filter(link => link.id === parseInt(args.id))[0]
  links = links.filter(link => link.id !== parseInt(args.id))
  return { id: 0, url: 'TODO deleteLink', description: 'Pending' }
}

exports.vote = async (parent, args, context, info) => {
  const userId = getUserId(context)

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  })
}
