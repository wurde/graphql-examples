module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    # `all_links` is automatically camelcased to `allLinks`.
    field :all_links, [LinkType], null: false

    # this method is invoked, when `all_link` fields is being resolved
    def all_links
      Link.all
    end
  end
end
