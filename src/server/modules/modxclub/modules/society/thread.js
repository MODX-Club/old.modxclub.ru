

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxThreadModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      thread: this.thread,
      threads: this.threads,
      threadsConnection: this.threadsConnection,
    });

    Object.assign(resolvers, {
      Thread: this.Thread,
    });

    return resolvers;

  }


  Thread = {

    Comments: (source, args, ctx, info) => this.Comments(source, args, ctx, info),
    Votes: (source, args, ctx, info) => this.Votes(source, args, ctx, info),

  }


  Comments(source, args, ctx, info) {

    const {
      id: thread_id,
    } = source || {};


    if (!thread_id) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      thread_id,
    }

    return ctx.modx.query.comments(null, args, ctx, info);

  }


  Votes(source, args, ctx, info) {

    const {
      id: thread_id,
    } = source || {};


    if (!thread_id) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      thread_id,
    }

    return ctx.modx.query.votes(null, args, ctx, info);

  }


  thread(source, args, ctx, info) {

    return ctx.modx.query.thread(source, args, ctx, info);

  }

  threads(source, args, ctx, info) {

    return ctx.modx.query.threads(source, args, ctx, info);

  }


  threadsConnection(source, args, ctx, info) {

    return ctx.modx.query.threadsConnection(source, args, ctx, info);

  }

}


export default ModxThreadModule;