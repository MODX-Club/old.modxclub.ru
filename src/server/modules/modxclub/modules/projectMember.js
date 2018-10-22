

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxProjectMemberModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      projectMember: this.projectMember,
      projectMembers: this.projectMembers,
      projectMembersConnection: this.projectMembersConnection,
    });

    Object.assign(resolvers, {
      ProjectMember: this.ProjectMember,
    });

    return resolvers;

  }


  ProjectMember = {

    Project: (source, args, ctx, info) => this.Project(source, args, ctx, info),
    User: (source, args, ctx, info) => this.User(source, args, ctx, info),
    Service: (source, args, ctx, info) => this.Service(source, args, ctx, info),

  }



  Project(source, args, ctx, info) {

    const {
      project_id,
    } = source || {};

    return project_id ? ctx.modx.query.project(null, {
      where: {
        id: project_id,
      },
    }, ctx, info) : null;

  }
  

  User(source, args, ctx, info) {

    const {
      user_id,
    } = source || {};

    return user_id ? ctx.modx.query.user(null, {
      where: {
        id: user_id,
      },
    }, ctx, info) : null;

  }
  

  Service(source, args, ctx, info) {

    const {
      service_id,
    } = source || {};

    return service_id ? ctx.modx.query.service(null, {
      where: {
        id: service_id,
      },
    }, ctx, info) : null;

  }

  // UsersProjectMembers(source, args, ctx, info) {

  //   const {
  //     id: projectMemberId,
  //   } = source || {}

  //   if (!projectMemberId) {
  //     return [];
  //   }

  //   let {
  //     where,
  //   } = args;

  //   where = {
  //     ...where,
  //     projectMember_id: projectMemberId,
  //   }

  //   args.where = where;

  //   return ctx.modx.userProjectMembers(source, args, ctx, info);

  // }




  projectMember(source, args, ctx, info) {

    return ctx.modx.query.projectMember(source, args, ctx, info);

  }

  projectMembers(source, args, ctx, info) {

    return ctx.modx.query.projectMembers(source, args, ctx, info);

  }


  projectMembersConnection(source, args, ctx, info) {

    return ctx.modx.query.projectMembersConnection(source, args, ctx, info);

  }

}


export default ModxProjectMemberModule;