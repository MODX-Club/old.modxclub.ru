

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxCommentModule extends PrismaModule {



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


  Comment = {

    // CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),
    text: (source, args, ctx, info) => this.text(source, args, ctx, info),

  }


  // CreatedBy(source, args, ctx, info) {

  //   const {
  //     createdby,
  //   } = source || {};

  //   return createdby ? ctx.modx.query.user(null, {
  //     where: {
  //       id: createdby,
  //     },
  //   }, ctx, info) : null;

  // }


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