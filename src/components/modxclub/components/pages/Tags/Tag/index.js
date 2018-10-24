

import React, { Component } from 'react';

import PropTypes from "prop-types";

import Page from '../../layout';


import Forum from "../../../view/forum"


export class TagPage extends Page {


  static propTypes = {
    ...Page.propTypes,
    // View: PropTypes.func.isRequired,
    tagName: PropTypes.string.isRequired,
  }


  static defaultProps = {
    ...Page.defaultProps,
    // View,
  }

  setPageMeta(meta = {}) {

    const {
      tagName,
    } = this.props;

    return super.setPageMeta({
      title: `Топики с тегом "${tagName}"`,
    });

  }


  render() {

    const {
      tagName,
      ...other
    } = this.props;


    const {
      getQueryFragment,
    } = this.context;

    return super.render(<Forum
      tagName={tagName}
      {...other}
    />)
  }

}

export default TagPage;
