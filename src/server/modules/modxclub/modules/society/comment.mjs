

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxCommentModule extends PrismaModule {


  constructor(props) {

    super(props)
    
    this.Comment = {
  
      CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),
      Topic: (source, args, ctx, info) => this.Topic(source, args, ctx, info),
      Parent: (source, args, ctx, info) => this.Parent(source, args, ctx, info),
      Thread: (source, args, ctx, info) => this.Thread(source, args, ctx, info),
      Childs: (source, args, ctx, info) => this.Childs(source, args, ctx, info),
  
      text: (source, args, ctx, info) => this.text(source, args, ctx, info),
  
    }

  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      comment: this.comment,
      comments: this.comments,
      commentsConnection: this.commentsConnection,
    });

    Object.assign(resolvers, {
      Comment: this.Comment,
    });

    return resolvers;

  }




  CreatedBy(source, args, ctx, info) {

    const {
      createdby,
    } = source || {};

    return createdby ? ctx.modx.query.user(null, {
      where: {
        id: createdby,
      },
    }, ctx, info) : null;

  }


  Topic(source, args, ctx, info) {

    const {
      topic_id,
    } = source || {};

    return topic_id ? ctx.modx.query.topic(null, {
      where: {
        id: topic_id,
      },
    }, ctx, info) : null;

  }


  Parent(source, args, ctx, info) {

    const {
      parent,
    } = source || {};

    return parent ? ctx.modx.query.comment(null, {
      where: {
        id: parent,
      },
    }, ctx, info) : null;

  }


  Thread(source, args, ctx, info) {

    const {
      thread_id,
    } = source || {};

    return thread_id ? ctx.modx.query.thread(null, {
      where: {
        id: thread_id,
      },
    }, ctx, info) : null;

  }


  Childs(source, args, ctx, info) {

    const {
      id: comment_id,
    } = source || {};


    if (!comment_id) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      parent: comment_id,
    }

    return ctx.modx.query.comments(null, args, ctx, info);

  }


  text(source, args, ctx, info) {

    let {
      text,
    } = source || {}


    if (text) {

      try {

        let json = JSON.parse(text);

        if (json) {
          text = json;
        }

      }
      catch (error) {

      }

    }

    return text;
  }

  comment(source, args, ctx, info) {

    return ctx.modx.query.comment(source, args, ctx, info);

  }


  comments(source, args, ctx, info) {

    return ctx.modx.query.comments(source, args, ctx, info);

  }


  commentsConnection(source, args, ctx, info) {

    return ctx.modx.query.commentsConnection(source, args, ctx, info);

  }

}


export default ModxCommentModule;