/**
 * Dependencies
 */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

/**
 * Define queries
 */

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
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

class LinkList extends Component {
  updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  };

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, data, error }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link
                  key={link.id}
                  link={link}
                  index={index}
                  updateCacheAfterVote={this.updateCacheAfterVote}
                />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

/**
 * Export component
 */

export default LinkList;
