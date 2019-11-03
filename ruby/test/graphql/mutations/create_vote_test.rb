require 'test_helper'

class Mutations::CreateVoteTest < ActiveSupport::TestCase
  def perform(user: nil, **args)
    Mutations::CreateVote.new(object: nil, context: { current_user: user }).resolve(args)
  end

  def create_user
    User.create!(
      name: 'Test User',
      email: 'email@example.com',
      password: '[omitted]',
    )
  end

  def create_link(user)
    Link.create!(
      url: 'http://dev.apollodata.com/',
      description: 'Awesome GraphQL Client.',
      user_id: user.id
    )
  end

  test 'success' do
    user = create_user
    link = create_link(user)

    vote = perform(
      user: user,
      link_id: link.id
    )

    assert vote.persisted?
    assert_equal vote.user, user
    assert_equal vote.link, link
  end
end
