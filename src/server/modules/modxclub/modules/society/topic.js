

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxTopicModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      topics: this.topics,
      topicsConnection: this.topicsConnection,
    });

    Object.assign(resolvers, {
      Topic: this.Topic,
    });

    return resolvers;

  }


  Topic = {

    CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),

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


  topics(source, args, ctx, info) {

    return ctx.modx.query.topics(source, args, ctx, info);

  }


  topicsConnection(source, args, ctx, info) {

    return ctx.modx.query.topicsConnection(source, args, ctx, info);

  }

}


export default ModxTopicModule;