import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";

import {
  CommentsConnector,
} from "./query";

import View from "./View";

class CommentsPage extends Page {

  static propTypes = {
    ...Page.propTypes,
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
  };


  static defaultProps = {
    ...Page.defaultProps,
    first: 10,
    orderBy: "id_DESC",
    View,
  }

  render() {

    const {
      ...other
    } = this.props;

    const {
      uri,
    } = this.context;


    const {
      page,
    } = uri.query(true);

    return super.render(
      <CommentsConnector
        page={page ? parseInt(page) : undefined}
        {...other}
      />
    );
  }
}


export default CommentsPage;