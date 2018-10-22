
import ModxDB from "../modx/db";


export class ModxclubDB extends ModxDB {


  constructor(props) {

    super(props);

    Object.assign(this.query, {

      companies: (source, args, ctx, info) => this.companies(source, args, ctx, info),
      companiesConnection: (source, args, ctx, info) => this.companiesConnection(source, args, ctx, info),

      notice: (source, args, ctx, info) => this.notice(source, args, ctx, info),
      notices: (source, args, ctx, info) => this.notices(source, args, ctx, info),
      noticesConnection: (source, args, ctx, info) => this.noticesConnection(source, args, ctx, info),

      userNotices: (source, args, ctx, info) => this.userNotices(source, args, ctx, info),
      userNoticesConnection: (source, args, ctx, info) => this.userNoticesConnection(source, args, ctx, info),

    });

  }


  prepareUsersQuery(query, ctx) {

    super.prepareUsersQuery(query, ctx);

    query
      .innerJoin(this.getTableName("society_user_attributes", "societyProfile"), "user.id", "societyProfile.internalKey")
      .select("societyProfile.createdon as createdAt")

    return query;

  }




  companies(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getCompaniesQuery(args, ctx);

    return this.request(query);

  }


  companiesConnection(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getCompaniesQuery(args, ctx);


    return this.objectsConnection(ctx, query, "company.id");

  }


  getCompaniesQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let companies = knex(this.getTableName("modxsite_view_companies", "company"))
      .as("company")
      .select("company.*")
      .select("company.company_name as name")
      .select("company.company_resource_id as resource_id")
      .select("company.createdon as createdAt")
      .select("company.company_owner as owner")
      // .innerJoin(this.getTableName("user_attributes", "profile"), "user.id", "profile.internalKey")
      // .as("users")
      // .select("user.*")
      // .select("profile.email")
      // .select("profile.fullname")
      ;

    // this.prepareUsersQuery(users, ctx);

    let query = knex(companies).as("companies");

    return this.getQuery(args, ctx, "companies", "company", query);

  }


  /**
   * Notices
   */


  async notice(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.notices(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }


  notices(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getNoticesQuery(args, ctx);

    return this.request(query);

  }


  noticesConnection(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getNoticesQuery(args, ctx);


    return this.objectsConnection(ctx, query, "notice.id");

  }


  getNoticesQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let notices = knex(this.getTableName("society_notice_types", "notice"))
      .select("notice.*")
      .select("notice.type as name")
      ;


    return this.getQuery(args, ctx, "notices", "notice", notices);

  }

  /**
   * Eof Notices
   */

  /**
   * UserUserNotices
   */

  userNotices(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getUserNoticesQuery(args, ctx);

    return this.request(query);

  }


  userNoticesConnection(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getUserNoticesQuery(args, ctx);


    return this.objectsConnection(ctx, query, "userNotice.id");

  }


  getUserNoticesQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let userNotices = knex(this.getTableName("society_notice_users", "userNotice"))
      .select("userNotice.*")
      ;


    return this.getQuery(args, ctx, "userNotices", "userNotice", userNotices);

  }

  /**
   * Eof UserNotices
   */


}

export default ModxclubDB;