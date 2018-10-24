import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TopicView extends Component {

  // propTypes = {

  // };


  constructor(props){

    super(props);

    console.log("TopicView constructor", this);

  }


  render() {
    return (
      <div>
        TopicView {Math.random()}
      </div>
    );
  }
}
 

export default TopicView;