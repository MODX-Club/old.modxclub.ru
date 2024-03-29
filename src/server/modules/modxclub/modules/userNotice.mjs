

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxUserNoticeModule extends PrismaModule {

  constructor(props) {

    super(props)

    this.UserNotice = {
  
      User: (source, args, ctx, info) => this.User(source, args, ctx, info),
      Notice: (source, args, ctx, info) => this.Notice(source, args, ctx, info),
  
    }
    
  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      userNotice: this.userNotice,
      userNotices: this.userNotices,
      userNoticesConnection: this.userNoticesConnection,
    });

    Object.assign(resolvers, {
      UserNotice: this.UserNotice,
    });

    return resolvers;

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


  Notice(source, args, ctx, info) {

    const {
      notice_id,
    } = source || {};

    return notice_id ? ctx.modx.query.notice(null, {
      where: {
        id: notice_id,
      },
    }, ctx, info) : null;

  }




  userNotice(source, args, ctx, info) {

    return ctx.modx.query.userNotice(source, args, ctx, info);

  }

  userNotices(source, args, ctx, info) {

    return ctx.modx.query.userNotices(source, args, ctx, info);

  }


  userNoticesConnection(source, args, ctx, info) {

    return ctx.modx.query.userNoticesConnection(source, args, ctx, info);

  }



}


export default ModxUserNoticeModule;