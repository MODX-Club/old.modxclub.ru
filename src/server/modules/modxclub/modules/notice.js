

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxNoticeModule extends PrismaModule {



  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      notice: this.notice,
      notices: this.notices,
      noticesConnection: this.noticesConnection,
    });

    Object.assign(resolvers, {
      Notice: this.Notice,
    });

    return resolvers;

  }


  Notice = {

    // CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),
    UsersNotices: (source, args, ctx, info) => this.UsersNotices(source, args, ctx, info),

    // content: (source, args, ctx, info) => this.content(source, args, ctx, info),

  }


  UsersNotices(source, args, ctx, info) {

    const {
      id: noticeId,
    } = source || {}

    if (!noticeId) {
      return [];
    }

    let {
      where,
    } = args;

    where = {
      ...where,
      notice_id: noticeId,
    }

    args.where = where;

    return ctx.modx.userNotices(source, args, ctx, info);

  }




  notice(source, args, ctx, info) {

    return ctx.modx.query.notice(source, args, ctx, info);

  }

  notices(source, args, ctx, info) {

    return ctx.modx.query.notices(source, args, ctx, info);

  }


  noticesConnection(source, args, ctx, info) {

    return ctx.modx.query.noticesConnection(source, args, ctx, info);

  }

}


export default ModxNoticeModule;