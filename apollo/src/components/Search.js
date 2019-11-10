/**
 * Dependencies
 */

import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

/**
 * Define component
 */

class Search extends Component {
  state = {
    links: [],
    filter: ''
  };

  executeSearch = async () => {
    // ... you'll implement this 🔜
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
