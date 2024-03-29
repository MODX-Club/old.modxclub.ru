

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxProjectModule extends PrismaModule {


  constructor(props) {

    super(props)

    this.Project = {
  
      Members: (source, args, ctx, info) => this.Members(source, args, ctx, info),
  
    }
    
  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      project: this.project,
      projects: this.projects,
      projectsConnection: this.projectsConnection,
    });

    Object.assign(resolvers, {
      Project: this.Project,
    });

    return resolvers;

  }




  Members(source, args, ctx, info) {

    const {
      id: projectId,
    } = source || {}

    if (!projectId) {
      return [];
    }

    let {
      where,
    } = args;

    where = {
      ...where,
      project_id: projectId,
    }

    args.where = where;

    return ctx.modx.projectMembers(source, args, ctx, info);

  }




  project(source, args, ctx, info) {

    return ctx.modx.query.project(source, args, ctx, info);

  }

  projects(source, args, ctx, info) {

    return ctx.modx.query.projects(source, args, ctx, info);

  }


  projectsConnection(source, args, ctx, info) {

    return ctx.modx.query.projectsConnection(source, args, ctx, info);

  }

}


export default ModxProjectModule;