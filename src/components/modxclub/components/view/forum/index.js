import React, { Component } from 'react';
import PropTypes from 'prop-types';


import PrismaCmsComponent from "@prisma-cms/component";


import gql from "graphql-tag";

import { graphql } from "react-apollo";

import View from "./view";


export class ForumConnector extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    getQueryFragment: PropTypes.func.isRequired,
    View: PropTypes.func.isRequired,
    first: PropTypes.number.isRequired,
  };


  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    View,
    first: 10,
  }


  componentWillMount() {

    this.prepareQuery();

    super.componentWillMount && super.componentWillMount()
  }


  prepareQuery() {

    const {
      View,
    } = this.props;

    let query = gql`

      query topicsConnection(
        $first:Int!
        $skip:Int
      ){
        objectsConnection: topicsConnection(
          orderBy: createdAt_DESC
          first: $first
          skip:$skip
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...topicsConnectionFields
            }
          }
        }
      }

      fragment topicsConnectionFields on Topic{
        id
        name
        longtitle
        uri
        thread_id
        CreatedBy{
          ...TopicUserNoNesting
        }
        Comments{
          id
          CreatedBy{
            ...TopicUserNoNesting
          }
        }
        Blog{
          id
          name
          longtitle
          uri
        }
        Thread{
          id
          rating
          Votes{
            ...VoteNoNesting
          }
        }
        Tags{
          id
          name
        }
      }
      

      fragment TopicUserNoNesting on User {
        id
        username
        fullname
        photo
      }

      fragment VoteNoNesting on Vote {
        id
        target_id
        target_class
        thread_id
        user_id
        direction
        value
        createdAt
      }

    `;


    this.Query = graphql(query)(View);

  }


  render() {


    const {
      Query,
    } = this;

    const {
      ...other
    } = this.props;

    return (
      <Query
        {...other}
      />
    );
  }
}


export default ForumConnector;