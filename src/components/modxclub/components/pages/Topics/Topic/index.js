

import React, { Component } from 'react';

import PropTypes from "prop-types";

import Page from '../../layout';




import View from "./view";

import { TopicConnector as Connector } from "../query";


export class TopicPage extends Page {


  static propTypes = {
    ...Page.propTypes,
    View: PropTypes.func.isRequired,
  }


  static defaultProps = {
    ...Page.defaultProps,
    View,
  }

  setPageMeta(meta = {}) {

    return super.setPageMeta({
      title: "Топик",
    });

  }

 
  render() {

    const {
      ...other
    } = this.props;

    return <Connector
      {...other}
    />;


  }

}

export default TopicPage;
