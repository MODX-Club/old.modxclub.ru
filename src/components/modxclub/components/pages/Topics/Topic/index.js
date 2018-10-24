

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

    const {
      data: {
        object: topic,
      },
    } = this.props;


    if (!topic) {
      return;
    }

    const {
      name,
      longtitle,
    } = topic;

    return super.setPageMeta({
      title: longtitle || name,
    });

  }


  render() {

    const {
      View,
      ...other
    } = this.props;

    return super.render(<View
      {...other}
    />);


  }

}


const test = (props) => {

  const {
    getCommentsText = true,
  } = props;

  return <Connector
    View={TopicPage}
    getCommentsText={getCommentsText}
    {...props}
  />

}

// export default TopicPage;
export default test;
