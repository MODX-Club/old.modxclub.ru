

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxServiceModule extends PrismaModule {


  constructor(props) {

    super(props)

    this.Service = {
  
      // UsersServices: (source, args, ctx, info) => this.UsersServices(source, args, ctx, info),
  
    }
    
  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      service: this.service,
      services: this.services,
      servicesConnection: this.servicesConnection,
    });

    Object.assign(resolvers, {
      Service: this.Service,
    });

    return resolvers;

  }




  // UsersServices(source, args, ctx, info) {

  //   const {
  //     id: serviceId,
  //   } = source || {}

  //   if (!serviceId) {
  //     return [];
  //   }

  //   let {
  //     where,
  //   } = args;

  //   where = {
  //     ...where,
  //     service_id: serviceId,
  //   }

  //   args.where = where;

  //   return ctx.modx.userServices(source, args, ctx, info);

  // }




  service(source, args, ctx, info) {

    return ctx.modx.query.service(source, args, ctx, info);

  }

  services(source, args, ctx, info) {

    return ctx.modx.query.services(source, args, ctx, info);

  }


  servicesConnection(source, args, ctx, info) {

    return ctx.modx.query.servicesConnection(source, args, ctx, info);

  }

}


export default ModxServiceModule;