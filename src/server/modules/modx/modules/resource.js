

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxResourceModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      resources: this.resources,
      resourcesConnection: this.resourcesConnection,
    });

    Object.assign(resolvers, {
      Resource: this.Resource,
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


  Resource = {

    CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),

    content: (source, args, ctx, info) => this.content(source, args, ctx, info),

  }



  resources(source, args, ctx, info) {

    return ctx.modx.query.resources(source, args, ctx, info);

  }


  resourcesConnection(source, args, ctx, info) {

    return ctx.modx.query.resourcesConnection(source, args, ctx, info);

  }

}


export default ModxResourceModule;