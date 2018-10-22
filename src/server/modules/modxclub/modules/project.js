

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxProjectModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      projects: this.projects,
      projectsConnection: this.projectsConnection,
    });

    Object.assign(resolvers, {
      Project: this.Project,
    });

    return resolvers;

  }


  Project = {

    // UsersProjects: (source, args, ctx, info) => this.UsersProjects(source, args, ctx, info),

  }


  // UsersProjects(source, args, ctx, info) {

  //   const {
  //     id: projectId,
  //   } = source || {}

  //   if (!projectId) {
  //     return [];
  //   }

  //   let {
  //     where,
  //   } = args;

  //   where = {
  //     ...where,
  //     project_id: projectId,
  //   }

  //   args.where = where;

  //   return ctx.modx.userProjects(source, args, ctx, info);

  // }




  projects(source, args, ctx, info) {

    return ctx.modx.query.projects(source, args, ctx, info);

  }


  projectsConnection(source, args, ctx, info) {

    return ctx.modx.query.projectsConnection(source, args, ctx, info);

  }

}


export default ModxProjectModule;