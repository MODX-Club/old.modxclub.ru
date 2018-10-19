
import chalk from "chalk";

export class ModxDB {


  constructor(config) {

    Object.assign(this, {
      config,
    });

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

  resources = async (source, args, ctx, info) => {


    const {
      knex,
    } = ctx;

    let {
      first,
      skip,
      where: argsWhere = {},
    } = args;

    const query = knex(this.getTableName("site_content"));

    let where = {}
    let whereIn = {}


    for (var field in argsWhere) {

      let condition = argsWhere[field];

      let whereNotInMatch = field.match(/(.*)\_not_in$/);

      if (whereNotInMatch) {
        query.whereNotIn(whereNotInMatch[1], condition);
        continue;
      }

      let whereInMatch = field.match(/(.*)\_in$/);

      if (whereInMatch) {
        query.whereIn(whereInMatch[1], condition);
        continue;
      }


      // else 
      where[field] = condition;

    }



    if (first) {
      query.limit(first);
    }

    if (skip) {
      query.offset(skip);
    }

    query.where(where);


    return query.then();

  }


  user = async (source, args, ctx, info) => {

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


  users = async (source, args, ctx, info) => {

    return this.getUsersQuery(args, ctx);

  }


  usersConnection = async (source, args, ctx, info) => {

    const {
      knex,
    } = ctx;

    const query = this.getUsersQuery(args, ctx);

    let countQuery = query.clone();

    let users = await query.then();

    countQuery.clearWhere();
    countQuery.clearOrder();
    countQuery.clearSelect();
    countQuery.select("user.id");

    // console.log("countQuery", countQuery);
    console.log(chalk.green("countQuery toString"), countQuery.toString());

    Object.assign(countQuery._single, {
      limit: undefined,
      offset: undefined,
    });


    console.log("countQuery singl", countQuery._single);
    // console.log("users", users);

    // let qQuery = knex.count("t1.username as count").from(countQuery.as("t1"));
    let qQuery = knex.count("* as count").from(countQuery.as("t1"));


    console.log("qQuery", qQuery.toString());


    let count = await qQuery.then(r => r && r[0].count || 0);

    return {
      aggregate: {
        count,
      },
      edges: users && users.map(node => ({
        node,
      })) || [],
    }

  }


  getUsersQuery = (args, ctx) => {
    const {
      knex,
    } = ctx;

    let {
      first,
      skip,
      where: argsWhere = {},
    } = args;

    const query = knex(this.getTableName("users", "user"))
      .innerJoin(this.getTableName("user_attributes", "profile"), "user.id", "profile.internalKey")
      .select("profile.*")
      .select("user.*")
      .select("profile.id as profileId")
      // .options({rowMode: 'array'})
      // .select([
      //   "users.*",
      //   "profile.*",
      // ])
      ;

    let where = {}
    let whereIn = {}

    // query.whereRaw("user.id != profile.internalKey");

    for (var field in argsWhere) {

      let condition = argsWhere[field];

      let match = field.match(/(.*)\_in$/);

      if (match) {
        query.whereIn(`user.${match[1]}`, condition);
      }
      else {
        where[`user.${field}`] = condition;
      }

    }


    if (first) {
      query.limit(first);
    }

    if (skip) {
      query.offset(skip);
    }

    query.where(where);

    console.log("query.toString()", query.toString());

    return query;
  }


  usersDebug = async (source, args, ctx, info) => {

    let query = this.getUsersQuery(args, ctx);

    let users = await query.then()

    return {
      users,
      SQL: this.debugQuery(query),
    }
  }


  debugQuery = (query) => {

    const tablePrefix = this.getTablePrefix();

    return query.toString().replace(new RegExp(tablePrefix, 'g'), '');
  }

  query = {

    resources: this.resources,

    user: this.user,
    users: this.users,
    usersConnection: this.usersConnection,
    usersDebug: this.usersDebug,

  }


}

export default ModxDB;