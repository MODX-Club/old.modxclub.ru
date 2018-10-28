

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";


import Processor from "@prisma-cms/prisma-processor";


class CommentProcessor extends Processor {



  async update(objectType, args, info) {


    let {
      data: {
        Comment_tags,
        ...data
      },
      where,
    } = args;

    const {
      ctx,
    } = this;


    const {
      modx,
    } = ctx;


    const {
      id: CommentId,
    } = where || {};


    /**
     * Получаем теги
     */

    if (Comment_tags === undefined) {

      const tags = await modx.query.tags(null, {
        where: {
          Comment_id: CommentId,
        },
      }, ctx);

      Comment_tags = tags.map(n => n.name);

    }



    args.data = {
      ...data,
      Comment_tags,
    }

    return super.update(objectType, args, info);
  }


  async mutate(method, args, info) {

    const {
      ctx,
    } = this;

    const {
      modxRequest,
    } = ctx;


    let {
      data: {
        text,
        topic_id: target_id,
        ...data
      },
      where,
    } = args;


    const {
      id,
    } = where || {};


    if (text && typeof text === "object") {

      try {

        text = JSON.stringify(text)

      }
      catch (error) {
        throw (error);
      }
    }



    const result = await modxRequest("/assets/components/modxsite/connectors/connector.php", {
      data: {
        pub_action: id ? "chat/message/update" : "chat/postmessage",
        id,
        text,
        target_id,
        plainText: "mock",
        ...data,
      },
    }, ctx)
      .then(async r => {

        // return await r.text();
        return await r.json();

      })
      .catch(error => {
        console.error(chalk.red("Response error"), error);
        this.addError(error);
      });

    console.log(chalk.green("result"), result);


    const {
      success,
      message,
      data: errors,
      object,
    } = result || {}



    if (success && object) {

      return object;

    }
    else {

      this.addError(message || "Ошибка выполнения запроса");

      errors && errors.map(error => {

        let {
          id: key,
          msg: message,
        } = error || {}


        // switch (key) {

        //   case "pagetitle":

        //     key = "name";
        //     break;

        // }

        if (key && message) {
          this.addFieldError(key, message);
        }

      });

    }

    return;
  }

}

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

    this.CommentResponse = {

      data: (source, args, ctx, info) => {

        const {
          id,
        } = source.data || {}

        return id ? ctx.modx.query.comment(null, {
          where: {
            id,
          },
        }, ctx, info) : null;

      },

    }

  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      comment: this.comment,
      comments: this.comments,
      commentsConnection: this.commentsConnection,
    });

    Object.assign(resolvers.Mutation, {
      createCommentProcessor: this.createCommentProcessor,
      updateCommentProcessor: this.updateCommentProcessor,
    });

    Object.assign(resolvers, {
      Comment: this.Comment,
      CommentResponse: this.CommentResponse,
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


  createCommentProcessor(source, args, ctx, info) {

    return new CommentProcessor(ctx).createWithResponse("Comment", args, info);

  }


  updateCommentProcessor(source, args, ctx, info) {

    return new CommentProcessor(ctx).updateWithResponse("Comment", args, info);

  }

}


export default ModxCommentModule;