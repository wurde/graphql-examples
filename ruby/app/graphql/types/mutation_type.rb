module Types
  class MutationType < Types::BaseObject
    field :create_link, LinkType, null: false,
      description: "Create a LinkType object."

      def create_link
        Link.create(url: 'http://example.com', description: '')
      end
    end
  end
end
