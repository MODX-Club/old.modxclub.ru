import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import SingleUploaderInput from '../../../../../react-cms-uploads/src/components/uploader/SingleUploader';

import Button from 'material-ui/Button/Button';

import NoPhoto from 'material-ui-icons/PersonOutline';

import Avatar from '@modxclub/ui/src/Avatar';

import {Uploader} from "@prisma-cms/ui/lib/Uploader";
 

export default class UserProfileAvatar extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
  }


  constructor(props) {

    super(props);

    this.state = {
      // file: null,
    };

  }


  onUpload(r) {

    const {
      singleUpload,
    } = r.data;

    const {
      updateUser,
    } = this.props;


    updateUser(singleUpload)

  }


  render() {

    const {
      file,
    } = this.state;

    const {
      user,
      editable,
    } = this.props;

    if (!user) {
      return null;
    }
 

    return (
      <Uploader
        onUpload={result => this.onUpload(result)}
        // FileInput={FileInput}
        editable={editable}
      />
    )
  }
}
