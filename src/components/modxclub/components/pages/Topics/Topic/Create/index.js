import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import { TopicPage } from '../';


export class TopicCreatePage extends TopicPage {




  setPageMeta(meta) {

    return super.setPageMeta({
      title: "Добавить топик",
    });
  }


  onSave(result) {

    console.log("onSave", result);

    // if (result) {

    //   const {
    //     object,
    //   } = result.data || {}


    //   const {
    //     id,
    //   } = object || {};

    //   if (id) {

    //     const {
    //       history,
    //     } = this.props;

    //     history.replace(`/companies/${id}/`);
    //   }

    // }

  }


  // componentWillMount() {

  //   const {
  //     View,
  //   } = this.props;


  //   const Renderer = compose(
  //     graphql(createTopic, {
  //     }),

  //   )(View);

  //   Object.assign(this.state, {
  //     Renderer,
  //     data: {
  //       object: {},
  //     },
  //   });

  //   super.componentWillMount && super.componentWillMount();

  // }


  // render() {

  //   const {
  //     View,
  //     ...other
  //   } = this.props;


  //   const {
  //     Renderer,
  //     data,
  //   } = this.state;


  //   const {
  //     location: {
  //       search: {
  //         name,
  //         place,
  //         parent,
  //       },
  //     },
  //   } = this.context;


  //   return <Renderer
  //     data={data}
  //     onSave={result => this.onSave(result)}
  //     _dirty={{
  //       name,
  //       parent,
  //       place: place ? {
  //         id: place,
  //       } : undefined,
  //     }}
  //     {...other}
  //   />

  // }

}




export default class CreatePage extends Component {


  static contextTypes = {
    user: PropTypes.user,
  }

  render() {

    const {
      user: currentUser,
    } = this.context;


    return <TopicCreatePage
      {...this.props}
      data={{
        object: {
          CreatedBy: currentUser,
        },
      }}
      _dirty={{
        name: "",
      }}
    />;

  }
}