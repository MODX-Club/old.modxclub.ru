

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";


class ModxUserModule extends PrismaModule {


  getResolvers() {

    let resolvers = super.getResolvers();





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
      signup: this.signup,
      updateUserProcessor: this.updateUserProcessor,
    });


    Object.assign(resolvers, {
      User: this.User,
      AuthPayload: this.AuthPayload,
      UserResponse: this.AuthPayload,
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

    Companies: (source, args, ctx, info) => this.Companies(source, args, ctx, info),
    
    Notices: (source, args, ctx, info) => this.Notices(source, args, ctx, info),

    Projects: (source, args, ctx, info) => this.Projects(source, args, ctx, info),

  }


  Companies(source, args, ctx, info) {

    const {
      id: userId,
    } = source || {}

    if (!userId) {
      return [];
    }

    let {
      where,
    } = args;

    where = {
      ...where,
      createdby: userId,
    }

    args.where = where;

    return ctx.modx.companies(source, args, ctx, info);

  }


  Notices(source, args, ctx, info) {

    const {
      id: userId,
    } = source || {}

    if (!userId) {
      return [];
    }

    let {
      where,
    } = args;

    where = {
      ...where,
      user_id: userId,
    }

    args.where = where;

    return ctx.modx.userNotices(source, args, ctx, info);

  }


  Projects(source, args, ctx, info) {

    const {
      id: userId,
    } = source || {}

    if (!userId) {
      return [];
    }

    let {
      where,
    } = args;

    where = {
      ...where,
      user_id: userId,
    }

    args.where = where;

    return ctx.modx.projectMembers(source, args, ctx, info);

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

        const {
          headers,
        } = r;


        const cookie = headers.get("set-cookie");


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

        if (success && cookie) {

          data = where;
          token = "true";

          response.cookie(cookie);

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



  async signup(source, args, ctx, info) {

    const {
      modxRequest,
      response,
    } = ctx;

    let {
      data: {
        password,
        username,
        email,
      },
    } = args;



    const result = await modxRequest("/assets/components/modxsite/connectors/connector.php", {
      data: {
        password,
        username,
        email,
        pub_action: "registration",
      },
    }, ctx)
      .then(async r => {


        const {
          headers,
        } = r;



        let json = await r.json();




        const cookie = headers.get("set-cookie");




        let {
          success = false,
          message = '',
          data: responseData = [],
          object,
        } = json || {};


        let data;
        let errors = []
        let token;

        if (success && cookie && object && object.id) {

          data = {
            id: parseInt(object.id),
          };

          token = "true";


          response.cookie(cookie);

        }
        else {

          if (responseData && responseData.length) {

            responseData.map(n => {

              const {
                id,
                msg,
              } = n || {};

              if (id && msg) {
                errors.push({
                  key: id,
                  message: msg
                });
              }

            });

          }

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


  async updateUserProcessor(source, args, ctx, info) {

    const {
      modxRequest,
      response,
    } = ctx;

    let {
      data: {
        password,
        ...data
      },
    } = args;



    const result = await modxRequest("/assets/components/modxsite/connectors/connector.php", {
      data: {
        ...data,
        password,
        new_password: password,
        pub_action: "user/own_profile/update",
      },
    }, ctx)
      .then(async r => {


        const {
          headers,
        } = r;



        let json = await r.json();




        const cookie = headers.get("set-cookie");




        let {
          success = false,
          message = '',
          data: responseData = [],
          object,
        } = json || {};


        let data;
        let errors = []
        let token;

        if (success && cookie && object && object.id) {

          data = {
            id: parseInt(object.id),
          };

          token = "true";


          response.cookie(cookie);

        }
        else {

          if (responseData && responseData.length) {

            responseData.map(n => {

              const {
                id,
                msg,
              } = n || {};

              if (id && msg) {
                errors.push({
                  key: id,
                  message: msg
                });
              }

            });

          }

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
        id,
        username,
      } = source && source.data || {}

      let where;

      if (id) {
        where = {
          id,
        }
      }
      else if (username) {
        where = {
          username,
        }
      }
      else {
        return null;
      }

      return await ctx.modx.query.user(null, {
        where,
      }, ctx, info);

    },

  }


}


export default ModxUserModule;