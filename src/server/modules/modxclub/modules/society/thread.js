

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxThreadModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      threads: this.threads,
      threadsConnection: this.threadsConnection,
    });

    Object.assign(resolvers, {
      Thread: this.Thread,
    });

    return resolvers;

  }


  Thread = {

    // CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),

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


  threads(source, args, ctx, info) {

    return ctx.modx.query.threads(source, args, ctx, info);

  }


  threadsConnection(source, args, ctx, info) {

    return ctx.modx.query.threadsConnection(source, args, ctx, info);

  }

}


export default ModxThreadModule;