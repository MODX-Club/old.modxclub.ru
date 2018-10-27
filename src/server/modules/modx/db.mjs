
import chalk from "chalk";

// import {
//   unserialize,
// } from 'php-unserialize';

import unserialize from 'php-session-unserialize';

export class ModxDB {


  constructor(config) {

    Object.assign(this, {
      config,
    });

    this.query = {

      resource: (source, args, ctx, info) => this.resource(source, args, ctx, info),
      resources: (source, args, ctx, info) => this.resources(source, args, ctx, info),
      resourcesConnection: (source, args, ctx, info) => this.resourcesConnection(source, args, ctx, info),

      user: (source, args, ctx, info) => this.user(source, args, ctx, info),
      users: (source, args, ctx, info) => this.users(source, args, ctx, info),
      usersConnection: (source, args, ctx, info) => this.usersConnection(source, args, ctx, info),
      usersDebug: (source, args, ctx, info) => this.usersDebug(source, args, ctx, info),

      userBySession: (source, args, ctx, info) => this.userBySession(source, args, ctx, info),

    }

  }




  getConfig() {
    return this.config || {}
  }


  getTablePrefix() {

    const {
      tablePrefix,
    } = this.getConfig();

    return tablePrefix;
  }


  getTableName(tableName, alias) {

    const tablePrefix = this.getTablePrefix();

    let name = `${tablePrefix}${tableName}`;

    if (alias !== null) {
      name += ` as ${alias || tableName}`;
    }

    return name;
  }


  async resource(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.resources(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null

  }


  async resources(source, args, ctx, info) {

    return this.getResourcesQuery(args, ctx);

  }


  async user(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let users = await this.users(null, {
      where,
      limit: 1,
    }, ctx, info);

    return users && users[0] || null
  }


  users(source, args, ctx, info) {

    return this.getUsersQuery(args, ctx);

  }


  usersConnection(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getUsersQuery(args, ctx);

    return this.objectsConnection(ctx, query, "users.id");

  }


  resourcesConnection(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getResourcesQuery(args, ctx);

    return this.objectsConnection(ctx, query, "resource.id");

  }


  userResources(source, args, ctx, info) {

    const {
      id: userId,
    } = source || {};


    let {
      where = {},
      ...other
    } = args;

    where.createdby = userId;

    return userId ? ctx.modx.query.resources(null, {
      where,
      ...other,
    }, ctx, info) : null;

  }

  async usersDebug(source, args, ctx, info) {

    let query = this.getUsersQuery(args, ctx);

    let error;

    let success = false;

    let users = await this.request(query).then(r => {
      success = true;
      return r;
    })
      .catch(e => {
        error = e.message;
      })

    return {
      success,
      error,
      SQL: this.debugQuery(query),
      users: users || [],
    }
  }


  debugQuery(query) {

    const tablePrefix = this.getTablePrefix();

    return query.toString().replace(new RegExp(tablePrefix, 'g'), '');
  }


  getUsersQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let users = knex(this.getTableName("users", "user"))
      .innerJoin(this.getTableName("user_attributes", "profile"), "user.id", "profile.internalKey")
      .as("users")
      .select("user.*")
      .select("profile.email")
      .select("profile.fullname")
      .select("profile.phone")
      .select("profile.mobilephone")
      .select("profile.blocked")
      .select("profile.blockeduntil")
      .select("profile.blockedafter")
      .select("profile.logincount")
      .select("profile.lastlogin")
      .select("profile.thislogin")
      .select("profile.failedlogincount")
      .select("profile.sessionid")
      .select("profile.dob")
      .select("profile.gender")
      .select("profile.address")
      .select("profile.country")
      .select("profile.city")
      .select("profile.photo as image")
      .select("profile.comment")
      .select("profile.id as profileId")
      ;

    this.prepareUsersQuery(users, ctx);

    let query = knex(users).as("users");

    return this.getQuery(args, ctx, "users", "users", query);

  }


  prepareUsersQuery(query, ctx) {

    return query;
  }


  getResourcesQuery(args, ctx) {


    let query = this.getQuery(args, ctx, "site_content", "resource");

    this.prepareResourcesQuery(query);

    return query;
  }


  prepareResourcesQuery(query) {

    query.where({
      deleted: 0,
      published: 1,
    });

    // console.log("prepareResourcesQuery SQL", query.toString());

    return query;
  }


  getQuery(args, ctx, tableName, alias, query) {

    const {
      knex,
    } = ctx;

    let {
      first,
      skip,
      where,
      orderBy,
    } = args;


    if (!query) {
      query = knex(this.getTableName(tableName, alias));
    }


    const tableAlias = alias || tableName;


    this.where(query, where, tableAlias);


    if (orderBy) {

      let match = orderBy.match(/^(.+)\_(ASC|DESC)$/);

      let by;
      let dir;

      if (match) {
        by = match[1];
        dir = match[2].toLowerCase();
      }
      else {
        by = orderBy;
      }

      query.orderBy(`${tableAlias}.${by}`, dir);

    }


    if (first) {
      query.limit(first);
    }

    if (skip) {
      query.offset(skip);
    }

    return query

  }


  where(query, argsWhere, tableAlias, OR = false) {

    let where = {}


    query[OR ? "orWhere" : "andWhere"](builder => {


      for (var field in argsWhere) {

        let condition = argsWhere[field];

        if (field === "OR") {

          builder.andWhere(builder => {

            condition.map(n => {

              this.where(builder, n, tableAlias, true);

            });

          });

          continue;
        }


        let whereNotInMatch = field.match(/(.*)\_not_in$/);

        if (whereNotInMatch) {

          const field = `${tableAlias}.${whereNotInMatch[1]}`;

          builder.orWhereNotIn(field, condition);

          continue;
        }

        let whereInMatch = field.match(/(.*)\_in$/);

        if (whereInMatch) {

          const field = `${tableAlias}.${whereInMatch[1]}`;

          builder.orWhereIn(field, condition);
          continue;
        }

        // else 
        where[`${tableAlias}.${field}`] = condition;

      }

      return builder.where(where);

    });

    return query;


  }


  async objectsConnection(ctx, query, uniqueColumn) {

    const {
      knex,
    } = ctx;


    let countQuery = query.clone();

    let objects = await this.request(query).then()

    // countQuery.clearWhere();
    countQuery.clearOrder();
    countQuery.clearSelect();
    countQuery.select(uniqueColumn);


    Object.assign(countQuery._single, {
      limit: undefined,
      offset: undefined,
    });


    // let qQuery = knex.count("t1.username as count").from(countQuery.as("t1"));
    let qQuery = knex.count("* as count").from(countQuery.as("t1"));


    let count = await this.request(qQuery)
      .then(r => r && r[0].count || 0)
      .catch(error => {

        console.error(chalk.red("SQL error"), "Error");

        throw new Error("Error");

      });

    return {
      aggregate: {
        count,
      },
      edges: objects && objects.map(node => ({
        node,
      })) || [],
    }

  }


  async request(query) {

    return await query
      .catch(error => {

        console.error(chalk.red("SQL error"), error);

        throw new Error("SQL Error");

      });
  }


  async userBySession(source, args, ctx, info) {

    const {
      PHPSESSID,
    } = args;

    const {
      knex,
    } = ctx;

    if (!PHPSESSID) {
      return null;
    }

    const result = await knex(this.getTableName("session"))
      .where({
        id: PHPSESSID,
      })
      .then(r => r && r[0] || null);



    const {
      data,
    } = result || {};

    let userId;

    if (data) {

      let unserialized;

      try {

        unserialized = unserialize(data);


        if (unserialized) {

          const {
            "modx.user.contextTokens": contextTokens,
          } = unserialized;


          const {
            web,
          } = contextTokens || {}

          userId = web;

        }

      }
      catch (error) {
        console.error(chalk.red("Error"), error);
        throw new Error("Auth error");
      }

    }


    return userId ? this.user(null, {
      where: {
        id: userId,
      },
    }, ctx) : null;

  }

}

export default ModxDB;