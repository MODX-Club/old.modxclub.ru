

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxCompanyModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      companies: this.companies,
      companiesConnection: this.companiesConnection,
    });

    Object.assign(resolvers, {
      Company: this.Company,
    });

    return resolvers;

  }


  Company = {

    // CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),
    Resource: (source, args, ctx, info) => this.Resource(source, args, ctx, info),

    // content: (source, args, ctx, info) => this.content(source, args, ctx, info),

  }


  Owner(source, args, ctx, info) {

    // const {
    //   createdby,
    // } = source || {};

    // return createdby ? ctx.modx.query.user(null, {
    //   where: {
    //     id: createdby,
    //   },
    // }, ctx, info) : null;

  }


  Resource(source, args, ctx, info) {

    const {
      resource_id,
    } = source || {};

    return resource_id ? ctx.modx.query.resource(null, {
      where: {
        id: resource_id,
      },
    }, ctx, info) : null;

  }




  companies(source, args, ctx, info) {

    return ctx.modx.query.companies(source, args, ctx, info);

  }


  companiesConnection(source, args, ctx, info) {

    return ctx.modx.query.companiesConnection(source, args, ctx, info);

  }

}


export default ModxCompanyModule;