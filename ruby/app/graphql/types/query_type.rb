module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    # `all_links` is automatically camelcased to `allLinks`.
    field :all_links, function: Resolvers::LinksSearch
    field :all_users, [UserType], null: false

    def all_users
      User.all
    end
  end
end
