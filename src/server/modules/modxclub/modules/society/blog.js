

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxBlogModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      blogs: this.blogs,
      blogsConnection: this.blogsConnection,
    });

    Object.assign(resolvers, {
      Blog: this.Blog,
    });

    return resolvers;

  }


  Blog = {

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


  blogs(source, args, ctx, info) {

    return ctx.modx.query.blogs(source, args, ctx, info);

  }


  blogsConnection(source, args, ctx, info) {

    return ctx.modx.query.blogsConnection(source, args, ctx, info);

  }

}


export default ModxBlogModule;