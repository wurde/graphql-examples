/**
 * Dependencies
 */

import React, { Component } from 'react';

/**
 * Define component
 */

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.link.description} ({this.props.link.url})
        </div>
      </div>
    );
  }
}

/**
 * Export component
 */

export default Link;
