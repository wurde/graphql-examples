/**
 * Dependencies
 */

import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

/**
 * Define queries
 */

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

/**
 * Define component
 */

class Search extends Component {
  state = {
    links: [],
    filter: ''
  };

  executeSearch = async () => {
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;
    this.setState({ links });
  };

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type="text"
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this.executeSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    );
  }
}

/**
 * Export component
 */

export default withApollo(Search);
