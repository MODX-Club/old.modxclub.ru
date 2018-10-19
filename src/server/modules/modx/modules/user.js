

import PrismaModule from "@prisma-cms/prisma-module";


class ModxUserModule extends PrismaModule {



  getResolvers() {

    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      user: this.user,
      users: this.users,
      usersDebug: this.usersDebug,
      usersConnection: this.usersConnection,
    });

    return resolvers;

  }


  user(source, args, ctx, info) {

    return ctx.modx.query.user(source, args, ctx, info);
  }

  users(source, args, ctx, info) {

    return ctx.modx.query.users(source, args, ctx, info);
 
  }

  usersDebug(source, args, ctx, info) {

    return ctx.modx.query.usersDebug(source, args, ctx, info);
 
  }

  usersConnection(source, args, ctx, info) {

    return ctx.modx.query.usersConnection(source, args, ctx, info);
 
  }

}


export default ModxUserModule;