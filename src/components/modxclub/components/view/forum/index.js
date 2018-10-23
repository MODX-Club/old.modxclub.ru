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
    orderBy: PropTypes.string.isRequired,
  };


  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    View,
    first: 12,
    // where: {
    //   id: 796,
    // },
    orderBy: "createdAt_DESC",
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
        $where: TopicWhereInput
        $orderBy: TopicOrderByInput!
      ){
        objectsConnection: topicsConnection(
          orderBy: $orderBy
          first: $first
          skip: $skip
          where: $where
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
        createdAt
        updatedAt
        CreatedBy{
          ...TopicUserNoNesting
        }
        Comments(
          orderBy: id_DESC
        ){
          id
          createdAt
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
        image
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