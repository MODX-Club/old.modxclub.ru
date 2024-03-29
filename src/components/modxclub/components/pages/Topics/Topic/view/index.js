import React, { Component } from 'react';
import PropTypes from 'prop-types';


import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

// import Card, {
//   CardHeader,
//   CardContent,
//   CardMedia,
//   CardActions,
// } from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import withStyles from 'material-ui/styles/withStyles';

import moment from "moment";

import {
  TopicLink,
  UserLink,
  BlogLink,
} from "@modxclub/ui"


// import TextEditor from "@modxclub/react-editor";
import Editor from "@modxclub/react-editor";
import { Typography } from 'material-ui';

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import CommentsView from "./Comments"; 

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
    // '& a': {
    //   textDecoration: 'none',
    // },
    marginBottom: 30,
  },
}


class TopicView extends EditableView {


  static defaultProps = {
    ...EditableView.defaultProps,
  }

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
      CreatedBy,
    } = this.getObjectWithMutations() || {};


    const {
      id: createdById,
    } = CreatedBy || {}

    return !id || (createdById && createdById === currentUserId) || sudo === true;

  }


  getCacheKey() {

    const {
      id,
    } = this.getObject() || {};

    return `item_${id || "new"}`;
  }



  addMessage = () => {

    console.log("addMessage");

  }



  renderHeader() {

    const {
      classes,
    } = this.props;

    const object = this.getObjectWithMutations();

    const {
      id: topicId,
      topic_tags,
      CreatedBy,
      createdAt,
    } = object || {}



    const inEditMode = this.isInEditMode();

    return <div
      className={classes.header}
    >
      <Grid
        container
        spacing={16}
      >

        {CreatedBy
          ?
          <Grid
            item
          >

            <UserLink
              user={CreatedBy}
              showName={false}
              avatarProps={{
                size: "medium",
              }}
            />
          </Grid>
          : null
        }

        <Grid
          item
        >
          {CreatedBy
            ?
            <UserLink
              user={CreatedBy}
              withAvatar={false}
            />
            :
            null
          }

          {createdAt ? <Typography
            variant="caption"
            color="textSecondary"
          >
            {moment(createdAt).format('lll')}
          </Typography> : null}

        </Grid>

        <Grid
          item
          xs={12}
        >
          <Typography
            variant="display1"
            component="h1"
          >
            {this.getTitle()} {this.getButtons()}

          </Typography>

          {inEditMode ? this.getTextField({
            name: "name",
            label: "Название топика",
            helperText: "Укажите название топика",
          }) : null}

          {inEditMode && !topicId ? this.getTextField({
            name: "topic_tags",
            label: "Теги",
            helperText: "Перечислите теги через запятую",
            value: topic_tags && topic_tags.join(",") || "",
            onChange: event => {

              const {
                name,
                value,
              } = event.target;

              this.updateObject({
                [name]: value && value.split(",").map(n => n && n.trim() || "") || [],
              });

            }
          }) : null}

        </Grid>

      </Grid>
    </div>

  }


  renderDefaultView() {

    const object = this.getObjectWithMutations();

    if (!object) {
      return null;
    }

    // console.log("renderDefaultView", object);

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

    return <div
      className={classes.root}
    >

      {/* {inEditMode !== true ?
        <div
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


        </div>
        :
        <div>
          <TextField
          // name="name"
          // value={name}
          // label="Название топика"
          // error={errors.name && errors.name != ""}
          // onFocus={() => { this.clearError() }}
          // onChange={(e, value) => { this.onChangename(e, value) }}
          />
        </div>
      } */}

      <div>

        <Editor
          className="topic-editor"
          content={content}
          inEditMode={inEditMode || false}
          fullView={true}
          allow_edit={allow_edit}
          onChange={(state, rawContent) => {
            // console.log("onChange newState", state);
            // console.log("onChange rawContent", rawContent);

            this.updateObject({
              content: rawContent,
            });

          }}
        />


      </div>

      <CommentsView
        topic={object}
      />


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
    </div>;


  }


  renderEditableView() {

    return this.renderDefaultView();

  }

}


export default withStyles(styles)(TopicView);