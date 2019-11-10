/**
 * Dependencies
 */

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';

/**
 * Define helpers
 */

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

/**
 * Define component
 */

function App() {
  return (
    <ApolloProvider client={client}>
      <CreateLink />
      <LinkList />
    </ApolloProvider>
  );
}

/**
 * Export component
 */

export default App;
