# GraphQL API implemented in Ruby

## Installation

Install dependencies:

```
bundle install

rails db:create
rails db:migrate
rails db:seed
```

Starting the server:

```
rails server
```

Opening the application:

```
open http://localhost:3000/
```

## Interesting Files:

- [GraphqlController](app/controllers/graphql_controller.rb) - GraphQL controller (api entry point)
- [Mutations](app/graphql/types/mutation_type.rb) - root mutations
- [Queries](app/graphql/types/query_type.rb) - root queries
- [UserType](app/graphql/types/user_type.rb) - record type
- [VoteType](app/graphql/types/vote_type.rb) - record type
- [LinkType](app/graphql/types/link_type.rb) - record type
- [DateTimeType](app/graphql/types/date_time_type.rb) - scalar type
- [LinksSearch](app/graphql/resolvers/links_search.rb) - complex search resolver and its [tests](test/graphql/resolvers/links_search_test.rb)
- [CreateLink](app/graphql/mutations/create_link.rb) - mutation and its [tests](test/graphql/mutations/create_link_test.rb)
- [CreateUser](app/graphql/mutations/create_user.rb) - mutation and its [tests](test/graphql/mutations/create_user_test.rb)
- [CreateVote](app/graphql/mutations/create_vote.rb) - mutation and its [tests](test/graphql/mutations/create_vote_test.rb)
- [SignInUser](app/graphql/mutations/sign_in_user.rb) - mutation and its [tests](test/graphql/mutations/sign_in_user_test.rb)

## Sample GraphQL Queries

List first 10 links, containing "example":

```graphql
{
  allLinks(first: 10, filter: {descriptionContains: "example"}) {
    id
    url
    description
    createdAt
    postedBy {
      id
      name
    }
  }
}

```

Creates new user:

```graphql
mutation {
  createUser(
    name: "Radoslav Stankov",
    authProvider: {
      email: { email: "rado@example.com", password: "123456" }
    }
  ) {
    id
    email
    name
  }
}
```

Creates new user token:

```graphql
mutation {
  signinUser(email: {email: "rado@example.com", password: "123456"}) {
    token
    user {
      id
      email
      name
    }
  }
}
```

Creates new link:

```graphql
mutation {
  createLink(url:"http://example.com", description:"Example") {
    id
    url
    description
    postedBy {
      id
      name
    }
  }
}
```

Creates new vote:

```graphql
mutation {
  createVote(linkId:"TGluay0yMQ==") {
    user {
      id
      name
    }
    link {
      id
      url
      description
    }
  }
}
```

## Refences

- https://www.howtographql.com/graphql-ruby/0-introduction/
