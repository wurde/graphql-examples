/**
 * Dependencies
 */

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './config/constants';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Header from './components/Header';
import Login from './components/Login';
import Search from './components/Search';

/**
 * Define helpers
 */

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

/**
 * Define component
 */

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="center w85">
          <Header />
          <div className="ph3 pv1 background-gray">
            <Switch>
              <Route exact path="/" component={LinkList} />
              <Route exact path="/create" component={CreateLink} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/search" component={Search} />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

/**
 * Export component
 */

export default App;
