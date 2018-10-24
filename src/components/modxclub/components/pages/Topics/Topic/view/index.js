import React, { Component } from 'react';
import PropTypes from 'prop-types';


import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import Card, {
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import withStyles from 'material-ui/styles/withStyles';

import moment from "moment";

import {
  TopicLink,
  UserLink,
  BlogLink,
} from "@modxclub/ui"


// import TextEditor from "@modxclub/react-editor";
import TopicEditor from "@modxclub/react-editor";
// import TopicEditor from "@modxclub/old/editor/topiceditor";

const styles = {
  root: {

    marginTop: 15,
    marginBottom: 30,

    '& pre': {
      whiteSpace: 'pre-line',
    },
  },
  bullet: {
  },
  header: {
    '& a': {
      textDecoration: 'none',
    },
  },
}


class TopicView extends EditableView {


  canEdit() {

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




  addMessage = () => {

    console.log("addMessage");

  }


  renderDefaultView() {

    const object = this.getObjectWithMutations();

    if (!object) {
      return null;
    }

    const {
      classes,
      fullView,
      ...other
    } = this.props;


    const {
      errors = [],
    } = this.state;

    const {
      id,
      CreatedBy,
      createdAt,
      Blog,
      name,
      content,
    } = object;

    const date = createdAt;

    const inEditMode = this.isInEditMode();

    const allow_edit = this.canEdit();

    return <Card
      className={classes.root}
    >

      {inEditMode !== true ?
        <CardHeader
          className={classes.header}
          avatar={<UserLink
            user={CreatedBy}
          />}
          title={<TopicLink
            object={object}
            className="Card--title"
          />}
          subheader={<div>{(date ? moment(date).format('YYYY.MM.DD HH:mm') + " " : null)}
            {Blog ? <BlogLink
              object={Blog}
            /> : null}
          </div>}
        >


        </CardHeader>
        :
        <CardContent>
          <TextField
            // name="name"
            // value={name}
            // label="Название топика"
            // error={errors.name && errors.name != ""}
            // onFocus={() => { this.clearError() }}
            // onChange={(e, value) => { this.onChangename(e, value) }}
          />
        </CardContent>
      }

      <CardContent>

        <TopicEditor
          id={id}
          className="topic-editor"
          content={content}
          // name={name}
          // inEditMode={inEditMode || false}
          // fullView={fullView === true || inEditMode}
          // allow_edit={allow_edit}
          // onRequestComplite={(state) => this.onRequestComplite(state)}
          // setFullView={this.setFullView}
        />


      </CardContent>
 

      {/* {fullView === true && (id > 0 && inEditMode !== true) ? <ArticleInfoComments
        comments={comments}
        user={this.props.user}
      /> : null} */}

      {/* {fullView === true && (id > 0 && inEditMode !== true) ? <TextEditor
        inEditMode={true}
        allow_edit={true}
        target_id={id}
        onMessageEdded={this.addMessage}
        clearOnSave={true}
      /> : null} */}
    </Card>;


  }


  renderEditableView() {

  }

}


export default withStyles(styles)(TopicView);