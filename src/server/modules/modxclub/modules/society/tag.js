

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxTopicTagModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      topicTag: this.topicTag,
      topicTags: this.topicTags,
      topicTagsConnection: this.topicTagsConnection,
    });

    Object.assign(resolvers, {
      TopicTag: this.TopicTag,
    });

    return resolvers;

  }


  TopicTag = {

    Topics: (source, args, ctx, info) => this.Topics(source, args, ctx, info),

  }


  Topics(source, args, ctx, info) {

    const {
      topic_ids,
    } = source || {};


    if (!topic_ids || !topic_ids.length) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      id_in: topic_ids,
    }

    return ctx.modx.query.topics(null, args, ctx, info);

  }


  topicTag(source, args, ctx, info) {

    return ctx.modx.query.topicTag(source, args, ctx, info);

  }

  topicTags(source, args, ctx, info) {

    return ctx.modx.query.topicTags(source, args, ctx, info);

  }


  topicTagsConnection(source, args, ctx, info) {

    return ctx.modx.query.topicTagsConnection(source, args, ctx, info);

  }

}


export default ModxTopicTagModule;