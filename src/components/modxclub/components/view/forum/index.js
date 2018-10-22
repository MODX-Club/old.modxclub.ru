import React, { Component } from 'react';
import PropTypes from 'prop-types';


import PrismaCmsComponent from "@prisma-cms/component";


export class ForumConnector extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    getQueryFragment: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        ForumConnector
      </div>
    );
  }
}


export default ForumConnector;