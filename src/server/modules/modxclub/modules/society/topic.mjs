

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxTopicModule extends PrismaModule {


  constructor(props) {

    super(props)

    this.Topic = {

      CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),
      Blog: (source, args, ctx, info) => this.Blog(source, args, ctx, info),
      Comments: (source, args, ctx, info) => this.Comments(source, args, ctx, info),
      Tags: (source, args, ctx, info) => this.Tags(source, args, ctx, info),
      Thread: (source, args, ctx, info) => this.Thread(source, args, ctx, info),
      content: (source, args, ctx, info) => this.content(source, args, ctx, info),

    }


  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      topic: this.topic,
      topics: this.topics,
      topicsConnection: this.topicsConnection,
      // topicsByTagsConnection: this.topicsByTagsConnection,
    });

    Object.assign(resolvers, {
      Topic: this.Topic,
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


  Blog(source, args, ctx, info) {

    const {
      blog_id,
    } = source || {};

    return blog_id ? ctx.modx.query.blog(null, {
      where: {
        id: blog_id,
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


  Comments(source, args, ctx, info) {

    const {
      id: topic_id,
    } = source || {};

    if (!topic_id) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      topic_id,
    }

    return ctx.modx.query.comments(null, args, ctx, info);

  }


  Tags(source, args, ctx, info) {

    const {
      id: topic_id,
    } = source || {};

    if (!topic_id) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      topic_id,
    }

    return ctx.modx.query.topicTags(null, args, ctx, info);

  }


  content(source, args, ctx, info) {

    let {
      content,
    } = source || {}


    if (content) {

      try {

        let json = JSON.parse(content);

        if (json) {
          content = json;
        }

      }
      catch (error) {

      }

    }

    return content;
  }


  topic(source, args, ctx, info) {

    return ctx.modx.query.topic(source, args, ctx, info);

  }

  topics(source, args, ctx, info) {

    return ctx.modx.query.topics(source, args, ctx, info);

  }


  topicsConnection(source, args, ctx, info) {

    return ctx.modx.query.topicsConnection(source, args, ctx, info);

  }


  /**
   * Получаем топики с учетом тега
   */
  // topicsByTagsConnection(source, args, ctx, info) {

  //   return ctx.modx.query.topicsByTagsConnection(source, args, ctx, info);

  // }

}


export default ModxTopicModule;