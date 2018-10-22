
import ModxDB from "../modx/db";

import chalk from "chalk";

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

      service: (source, args, ctx, info) => this.service(source, args, ctx, info),
      services: (source, args, ctx, info) => this.services(source, args, ctx, info),
      servicesConnection: (source, args, ctx, info) => this.servicesConnection(source, args, ctx, info),

      project: (source, args, ctx, info) => this.project(source, args, ctx, info),
      projects: (source, args, ctx, info) => this.projects(source, args, ctx, info),
      projectsConnection: (source, args, ctx, info) => this.projectsConnection(source, args, ctx, info),

      projectMember: (source, args, ctx, info) => this.projectMember(source, args, ctx, info),
      projectMembers: (source, args, ctx, info) => this.projectMembers(source, args, ctx, info),
      projectMembersConnection: (source, args, ctx, info) => this.projectMembersConnection(source, args, ctx, info),

      blog: (source, args, ctx, info) => this.blog(source, args, ctx, info),
      blogs: (source, args, ctx, info) => this.blogs(source, args, ctx, info),
      blogsConnection: (source, args, ctx, info) => this.blogsConnection(source, args, ctx, info),

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


  /**
   * Services
   */

  async service(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.services(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }


  services(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getServicesQuery(args, ctx);

    return this.request(query);

  }


  servicesConnection(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getServicesQuery(args, ctx);


    return this.objectsConnection(ctx, query, "service.id");

  }



  getServicesQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let services = knex(this.getTableName("site_content", "services"))
      .where({
        parent: 1473,
      })
      .select("services.*")
      .select("services.pagetitle as name")
      .as("service")
      ;

    this.prepareResourcesQuery(services);


    let query = knex(services).as("service");



    return this.getQuery(args, ctx, "services", "service", query);


  }


  /**
   * Eof Services
   */


  /**
   * Projects
   */

  async project(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.projects(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }


  projects(source, args, ctx, info) {

    const query = this.getProjectsQuery(args, ctx);

    return this.request(query);

  }


  projectsConnection(source, args, ctx, info) {


    const query = this.getProjectsQuery(args, ctx);


    return this.objectsConnection(ctx, query, "project.id");

  }



  getProjectsQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let projects = knex(this.getTableName("site_content", "projects"))
      .where({
        parent: 1443,
      })
      .select("projects.*")
      .select("projects.longtitle as name")
      .select("projects.pagetitle as site_url")
      .as("project")
      ;

    this.prepareResourcesQuery(projects);


    let query = knex(projects).as("project");



    return this.getQuery(args, ctx, "projects", "project", query);


  }

  /**
   * Eof Projects
   */



  /**
   * ProjectMembers
   */

  projectMembers(source, args, ctx, info) {


    const query = this.getProjectMembersQuery(args, ctx);

    return this.request(query);

  }


  projectMembersConnection(source, args, ctx, info) {

    const query = this.getProjectMembersQuery(args, ctx);


    return this.objectsConnection(ctx, query, "projectMember.id");

  }



  getProjectMembersQuery(args, ctx) {

    return this.getQuery(args, ctx, "modxsite_projects_members", "projectMember");


  }

  /**
   * Eof ProjectMembers
   */

  /**
   * Blogs
   */

  blogs(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getBlogsQuery(args, ctx);

    return this.request(query);

  }


  blogsConnection(source, args, ctx, info) {


    const query = this.getBlogsQuery(args, ctx);


    return this.objectsConnection(ctx, query, "blog.id");

  }



  getBlogsQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let blogs = knex(this.getTableName("site_content", "blogs"))
      .where({
        parent: 23,
      })
      .select("blogs.*")
      .select("blogs.pagetitle as name")
      .select(knex.raw("if(blogs.template = 16, 1, 0) as personal"))
      .as("blog")
      ;

    this.prepareResourcesQuery(blogs);


    let query = knex(blogs).as("blog");


    return this.getQuery(args, ctx, "blogs", "blog", query);

  }

  /**
   * Eof Blogs
   */


}

export default ModxclubDB;