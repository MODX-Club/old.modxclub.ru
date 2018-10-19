
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

    return this.getResourcesQuery(args, ctx);

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

    return this.objectsConnection(ctx, query, "user.id");

  }


  resourcesConnection = async (source, args, ctx, info) => {

    const {
      knex,
    } = ctx;

    const query = this.getResourcesQuery(args, ctx);

    return this.objectsConnection(ctx, query, "resource.id");

  }


  userResources = (source, args, ctx, info) => {

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


  getUsersQuery = (args, ctx) => {


    return this.getQuery(args, ctx, "users", "user")
      .innerJoin(this.getTableName("user_attributes", "profile"), "user.id", "profile.internalKey")
      .select("profile.*")
      .select("user.*")
      .select("profile.id as profileId")
      ;

  }


  getResourcesQuery = (args, ctx) => {


    return this.getQuery(args, ctx, "site_content", "resource");

  }


  getQuery = (args, ctx, tableName, alias) => {


    const {
      knex,
    } = ctx;

    let {
      first,
      skip,
      where: argsWhere = {},
      orderBy,
    } = args;

    const query = knex(this.getTableName(tableName, alias));

    let where = {}
    let whereIn = {}

    const tableAlias = alias || tableName;

    for (var field in argsWhere) {

      let condition = argsWhere[field];

      let whereNotInMatch = field.match(/(.*)\_not_in$/);

      if (whereNotInMatch) {
        query.whereNotIn(`${tableAlias}.${whereNotInMatch[1]}`, condition);
        continue;
      }

      let whereInMatch = field.match(/(.*)\_in$/);

      if (whereInMatch) {
        query.whereIn(`${tableAlias}.${whereNotInMatch[1]}`, condition);
        continue;
      }

      // else 
      where[`${tableAlias}.${field}`] = condition;

    }


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

    query.where(where);

    return query;

  }


  objectsConnection = async (ctx, query, uniqueColumn) => {

    const {
      knex,
    } = ctx;


    let countQuery = query.clone();

    let objects = await query.then();

    countQuery.clearWhere();
    countQuery.clearOrder();
    countQuery.clearSelect();
    countQuery.select(uniqueColumn);


    Object.assign(countQuery._single, {
      limit: undefined,
      offset: undefined,
    });


    // let qQuery = knex.count("t1.username as count").from(countQuery.as("t1"));
    let qQuery = knex.count("* as count").from(countQuery.as("t1"));


    let count = await qQuery.then(r => r && r[0].count || 0);

    return {
      aggregate: {
        count,
      },
      edges: objects && objects.map(node => ({
        node,
      })) || [],
    }

  }


  query = {

    resources: this.resources,
    resourcesConnection: this.resourcesConnection,

    user: this.user,
    users: this.users,
    usersConnection: this.usersConnection,
    usersDebug: this.usersDebug,

  }

}

export default ModxDB;