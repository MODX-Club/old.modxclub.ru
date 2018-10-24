
import React from "react";

import gql from "graphql-tag";

import {graphql} from "react-apollo";


export const topicFragment = `
  fragment topicFragment on Topic{
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
`


export const topicsListFragment = `
  fragment topicsListFragment on Topic{
    ...topicFragment
  }

  ${topicFragment}
`;


export const topicsFullFragment = `
  fragment topicsFullFragment on Topic{
    ...topicFragment
  }

  ${topicFragment}
`;


export const topicsConnectionQuery = gql`

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
          ...topicsListFragment
        }
      }
    }
  }

  ${topicsListFragment}

`;


export const topicQuery = gql`

  query topic(
    $where: TopicWhereUniqueInput
  ){
    object: topic(
      where: $where
    ){ 
      ...topicsFullFragment
    }
  }

  ${topicsFullFragment}

`;

 

const TopicsQuery = graphql(topicsConnectionQuery);

const TopicQuery = graphql(topicQuery);


export const TopicConnector = TopicQuery(props => {

  const {
    View,
    ...other
  } = props;

  return <View 
    {...other}
  />;
});


export const TopicsConnector = TopicsQuery(props => {

  const {
    View,
    ...other
  } = props;

  return <View 
    {...other}
  />;
});


