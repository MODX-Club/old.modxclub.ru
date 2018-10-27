

/**
 * Теги, сгруппированные по имени
 */

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxTagModule extends PrismaModule {


  constructor(props) {

    super(props)

    this.Tag = {
  
      // Topics: (source, args, ctx, info) => this.Topics(source, args, ctx, info),
  
    }
    
  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      tag: this.tag,
      tags: this.tags,
      tagsConnection: this.tagsConnection,
    });

    Object.assign(resolvers, {
      Tag: this.Tag,
    });

    return resolvers;

  }




  // Topics(source, args, ctx, info) {

  //   const {
  //     topic_ids,
  //   } = source || {};


  //   if (!topic_ids || !topic_ids.length) {
  //     return [];
  //   }

  //   let {
  //     where,
  //   } = args;

  //   args.where = {
  //     ...where,
  //     id_in: topic_ids,
  //   }

  //   return ctx.modx.query.topics(null, args, ctx, info);

  // }


  tag(source, args, ctx, info) {

    return ctx.modx.query.tag(source, args, ctx, info);

  }

  tags(source, args, ctx, info) {

    return ctx.modx.query.tags(source, args, ctx, info);

  }


  tagsConnection(source, args, ctx, info) {

    return ctx.modx.query.tagsConnection(source, args, ctx, info);

  }

}


export default ModxTagModule;