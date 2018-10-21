

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

class ModxUserModule extends PrismaModule {



  getResolvers() {

    let resolvers = super.getResolvers();


    // console.log("resolvers", resolvers);


    Object.assign(resolvers.Query, {
      user: this.user,
      users: this.users,
      usersDebug: this.usersDebug,
      usersConnection: this.usersConnection,
      me: (source, args, ctx, info) => {

        const {
          currentUser,
        } = ctx;

        return currentUser;
      },
      userGroups: () => [],
    });


    Object.assign(resolvers.Mutation, {
      signin: this.signin,
    });


    Object.assign(resolvers, {
      User: this.User,
      AuthPayload: this.AuthPayload,
    });

    return resolvers;

  }


  User = {

    Resources: (source, args, ctx, info) => {

      return ctx.modx.userResources(source, args, ctx, info);

    },

    email: (source, args, ctx, info) => {

      const {
        currentUser,
      } = ctx;

      const {
        email,
      } = source || {}

      return email && currentUser && currentUser.email === email ? email : null;

    },

  }



  user(source, args, ctx, info) {

    return ctx.modx.query.user(source, args, ctx, info);
  }

  users(source, args, ctx, info) {

    return ctx.modx.query.users(source, args, ctx, info);

  }

  usersDebug(source, args, ctx, info) {

    return ctx.modx.query.usersDebug(source, args, ctx, info);

  }

  usersConnection(source, args, ctx, info) {

    return ctx.modx.query.usersConnection(source, args, ctx, info);

  }



  /**
   * Авторизация
   */
  async signin(source, args, ctx, info) {

    // console.log(chalk.green("signin args"), args);

    const {
      modxRequest,
      response,
    } = ctx;

    let {
      where,
      password,
    } = args;

    let {
      username,
    } = where;


    const result = await modxRequest("/connectors/security/login.php", {
      data: {
        username,
        password,
        login_context: "web",
        pub_action: "login",
      },
    }, ctx)
      .then(async r => {

        for (var i in r.headers) {

          // console.log(chalk.green(`signin response headers "${i}"`), r.headers[i]);

        }

        const {
          headers,
        } = r;


        const cookie = headers.get("set-cookie");

        console.log(chalk.green("signin response cookie"), cookie);

        response.cookie(cookie);

        let json = await r.json();

        let {
          success = false,
          message = '',
          // data = [],
          object,
        } = json || {};


        let data;
        let errors = []
        let token;

        if (success) {

          data = where;
          token = "true";

          // console.log(chalk.green("signin response json"), json);

        }


        return {
          success,
          message,
          errors,
          token,
          data,
        }
      });

    return result;
  }

  AuthPayload = {

    data: async (source, args, ctx, info) => {

      const {
        username,
      } = source && source.data || {}

      return username ? await ctx.modx.query.user(null, {
        where: {
          username,
        },
      }, ctx, info) : null;

    },

  }


}


export default ModxUserModule;