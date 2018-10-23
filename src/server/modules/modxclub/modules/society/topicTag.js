

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

    Topic: (source, args, ctx, info) => this.Topic(source, args, ctx, info),

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