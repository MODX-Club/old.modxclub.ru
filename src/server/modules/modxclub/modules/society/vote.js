

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxVoteModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      vote: this.vote,
      votes: this.votes,
      votesConnection: this.votesConnection,
    });

    Object.assign(resolvers, {
      Vote: this.Vote,
    });

    return resolvers;

  }


  Vote = {

    // Topics: (source, args, ctx, info) => this.Topics(source, args, ctx, info),
    User: (source, args, ctx, info) => this.User(source, args, ctx, info),
    Thread: (source, args, ctx, info) => this.Thread(source, args, ctx, info),

  }


  // Topics(source, args, ctx, info) {

  //   const {
  //     topic_ids,
  //   } = source || {};

  //   let {
  //     where,
  //   } = args;

  //   args.where = {
  //     ...where,
  //     id_in: topic_ids,
  //   }

  //   return topic_ids && topic_ids.length ? ctx.modx.query.topics(null, args, ctx, info) : null;

  // }

  User(source, args, ctx, info) {

    const {
      user_id,
    } = source || {};

    return user_id ? ctx.modx.query.user(null, {
      where: {
        id: user_id,
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


  vote(source, args, ctx, info) {

    return ctx.modx.query.vote(source, args, ctx, info);

  }

  votes(source, args, ctx, info) {

    return ctx.modx.query.votes(source, args, ctx, info);

  }


  votesConnection(source, args, ctx, info) {

    return ctx.modx.query.votesConnection(source, args, ctx, info);

  }

}


export default ModxVoteModule;