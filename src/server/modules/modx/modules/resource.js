

import PrismaModule from "@prisma-cms/prisma-module";


class ModxResourceModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      resources: this.resources,
    });

    Object.assign(resolvers, {
      Resource: this.Resource,
    });

    return resolvers;

  }

  Resource = {

    CreatedBy: (source, args, ctx, info) => {

      const {
        createdby,
      } = source || {};

      return createdby ? ctx.modx.query.user(null, {
        where: {
          id: createdby,
        },
      }, ctx, info) : null;

    }
  }

  resources(source, args, ctx, info) {

    return ctx.modx.query.resources(source, args, ctx, info);
 
  }

}


export default ModxResourceModule;