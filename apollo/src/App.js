/**
 * Dependencies
 */

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
      <div>
        Apollo
      </div>
    </ApolloProvider>
  );
}

/**
 * Export component
 */

export default App;
