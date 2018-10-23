import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from "material-ui/styles/withStyles";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

import {
  styles,
  TableView,
} from "@modxclub/ui/src/list-view";


let customStyles = theme => {

  const {
    palette: {
      background: {
        default: defaultBackground,
      },
    },
  } = theme;

  return {
    ...styles,

    tag: {
      display: "inline-block",
      padding: "3px 5px",
      borderRadius: 5,
      background: defaultBackground,
    },
  }

}


class ForumView extends TableView {


  // static propTypes = {

  // };

  static defaultProps = {
    ...TableView.defaultProps,
    title: "Топики",
    columnData: [],
  }


  getColumns() {

    const {
      classes,
    } = this.props;

    let columns = [
      {
        id: "topic",
        renderer: (value, record) => {

          console.log("Topic record", record);

          const {
            id: topicId,
            name,
            uri,
            Tags,
          } = record;


          let tagsList = [];

          Tags && Tags.map(tag => {

            const {
              id,
              name,
            } = tag;

            tagsList.push(<Typography
              key={id}
              color="textSecondary"
              component="span"
              className={classes.tag}
            >
              {name}
            </Typography>);
          });

          return <div>
            <Typography>
              {name}
            </Typography>

            <div
              className={classes.tags}
            >
              {tagsList}
            </div>
          </div>;
        },
      }
    ]

    return columns;

  }

}


export {
  customStyles as styles,
  ForumView as TableView,
}


export default withStyles(customStyles)(ForumView);