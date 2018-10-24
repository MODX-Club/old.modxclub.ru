import React, { Component } from 'react';
import PropTypes from 'prop-types';


import EditableView from 'apollo-cms/lib/DataView/Object/Editable';


class TopicView extends EditableView {

  // propTypes = {

  // };


  // constructor(props){

  //   super(props);

  //   console.log("TopicView constructor", this);

  // }


  canEdit(){

    const {
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
      sudo,
    } = currentUser || {};


    const {
      id,
    } = this.getObjectWithMutations() || {};

    return !id || sudo === true;

  }


  // render() {
  //   return (
  //     <div>
  //       TopicView {Math.random()}
  //     </div>
  //   );
  // }
}
 

export default TopicView;