
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

      topic: (source, args, ctx, info) => this.topic(source, args, ctx, info),
      topics: (source, args, ctx, info) => this.topics(source, args, ctx, info),
      topicsConnection: (source, args, ctx, info) => this.topicsConnection(source, args, ctx, info),

      thread: (source, args, ctx, info) => this.thread(source, args, ctx, info),
      threads: (source, args, ctx, info) => this.threads(source, args, ctx, info),
      threadsConnection: (source, args, ctx, info) => this.threadsConnection(source, args, ctx, info),

      tag: (source, args, ctx, info) => this.tag(source, args, ctx, info),
      tags: (source, args, ctx, info) => this.tags(source, args, ctx, info),
      tagsConnection: (source, args, ctx, info) => this.tagsConnection(source, args, ctx, info),

      topicTag: (source, args, ctx, info) => this.topicTag(source, args, ctx, info),
      topicTags: (source, args, ctx, info) => this.topicTags(source, args, ctx, info),
      topicTagsConnection: (source, args, ctx, info) => this.topicTagsConnection(source, args, ctx, info),

      comment: (source, args, ctx, info) => this.comment(source, args, ctx, info),
      comments: (source, args, ctx, info) => this.comments(source, args, ctx, info),
      commentsConnection: (source, args, ctx, info) => this.commentsConnection(source, args, ctx, info),

      vote: (source, args, ctx, info) => this.vote(source, args, ctx, info),
      votes: (source, args, ctx, info) => this.votes(source, args, ctx, info),
      votesConnection: (source, args, ctx, info) => this.votesConnection(source, args, ctx, info),

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

  async projectMember(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.projectMembers(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }


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

  async blog(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.blogs(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }


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
      .select("blogs.createdon as createdAt")
      .select("blogs.editedon as updatedAt")
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



  /**
   * Topics
   */

  async topic(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.topics(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }

  topics(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getTopicsQuery(args, ctx);

    return this.request(query);

  }


  topicsConnection(source, args, ctx, info) {


    const query = this.getTopicsQuery(args, ctx);


    return this.objectsConnection(ctx, query, "topic.id");

  }



  getTopicsQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let topics = knex(this.getTableName("site_content", "topics"))
      .innerJoin(this.getTableName("society_blog_topic", "topicBlog"), "topicBlog.topicid", "topics.id")
      .leftJoin(
        this.getTableName("society_threads", "thread"),
        knex.raw(`thread.target_class = 'modResource' AND thread.target_id = topics.id`)
      )
      .where({
        parent: 309,
      })
      .select("topics.*")
      .select("topics.pagetitle as name")
      .select("topics.createdon as createdAt")
      .select("topics.editedon as updatedAt")
      .select(knex.raw("if(topics.template = 16, 1, 0) as personal"))
      .select("topicBlog.blogid as blog_id")
      .select("thread.id as thread_id")
      .as("topic")
      ;

    this.prepareResourcesQuery(topics);


    let query = knex(topics).as("topic");


    return this.getQuery(args, ctx, "topics", "topic", query);

  }

  /**
   * Eof Topics
   */


  /**
   * Threads
   */

  async thread(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.threads(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }

  threads(source, args, ctx, info) {


    const query = this.getThreadsQuery(args, ctx);

    return this.request(query);

  }


  threadsConnection(source, args, ctx, info) {

    const query = this.getThreadsQuery(args, ctx);


    return this.objectsConnection(ctx, query, "thread.id");

  }



  getThreadsQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let threads = knex(this.getTableName("society_threads", "threads"))
      .select("threads.*")
      .select("threads.createdon as createdAt")
      .select("threads.editedon as updatedAt")
      .as("thread")
      ;


    let query = knex(threads).as("thread");

    return this.getQuery(args, ctx, "society_threads", "thread", query);


  }

  /**
   * Eof Threads
   */

  /**
   * tags
   */

  async tag(source, args, ctx, info) {


    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.tags(null, {
      where,
      limit: 1,
    }, ctx, info);


    return objects && objects[0] || null
  }


  async tags(source, args, ctx, info) {


    const query = this.gettagsQuery(args, ctx);

    let objects = await this.request(query);


    return this.preparetags(objects);
  }


  preparetags(objects) {

    objects.map(object => {

      let {
        topic_ids,
      } = object;

      topic_ids = topic_ids && topic_ids.split(",").map(n => parseInt(n)).filter(n => n) || []

      Object.assign(object, {
        topic_ids,
      });

    });

    return objects;

  }


  async tagsConnection(source, args, ctx, info) {

    const query = this.gettagsQuery(args, ctx);


    let result = await this.objectsConnection(ctx, query, "tag.name");

    let {
      edges,
    } = result || {}


    if (edges && edges.length) {
      result.edges = this.preparetags(edges.map(({ node }) => node)).map(node => ({ node }));
    }

    return result;

  }



  gettagsQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let tags = knex(this.getTableName("society_topic_tags", "tags"))
      .count("* as count")
      .select(knex.raw("GROUP_CONCAT(topic_id) as topic_ids"))
      .select("tags.tag as name")
      .groupBy("tag")
      .as("tag")
      ;


    let query = knex(tags).as("tag");


    return this.getQuery(args, ctx, "society_tags", "tag", query);


  }

  /**
   * Eof tags
   */



  /**
   * topicTags
   */

  async topicTag(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.topicTags(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }

  topicTags(source, args, ctx, info) {


    const query = this.getTopicTagsQuery(args, ctx);

    return this.request(query);

  }


  topicTagsConnection(source, args, ctx, info) {

    const query = this.getTopicTagsQuery(args, ctx);


    return this.objectsConnection(ctx, query, "topicTag.id");

  }



  getTopicTagsQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let topicTags = knex(this.getTableName("society_topic_tags", "topicTags"))
      .select("topicTags.*")
      .select("topicTags.tag as name")
      .as("topicTag")
      ;


    let query = knex(topicTags).as("topicTag");

    return this.getQuery(args, ctx, "society_topicTags", "topicTag", query);


  }

  /**
   * Eof topicTags
   */



  /**
   * Comments
   */

  async comment(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.comments(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }

  comments(source, args, ctx, info) {


    const query = this.getCommentsQuery(args, ctx);

    return this.request(query);

  }


  commentsConnection(source, args, ctx, info) {

    const query = this.getCommentsQuery(args, ctx);


    return this.objectsConnection(ctx, query, "comment.id");

  }



  getCommentsQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let comments = knex(this.getTableName("society_comments", "comments"))
      .leftJoin(
        this.getTableName("society_threads", "thread"),
        knex.raw(`thread.id = comments.thread_id`)
        // knex.raw(`thread.id = comments.thread_id AND thread.target_class = 'modResource'`)
      )
      .select("comments.*")
      .select(knex.raw(`UNIX_TIMESTAMP(comments.createdon) as createdAt`))
      .select(knex.raw(`UNIX_TIMESTAMP(comments.editedon) as updatedAt`))
      .select("thread.target_id as topic_id")
      .as("comment")
      ;

    // console.log(chalk.green("comments query "), comments.toString());

    let query = knex(comments).as("comment");

    return this.getQuery(args, ctx, "society_comments", "comment", query);


  }

  /**
   * Eof Comments
   */

  /**
   * Votes
   */

  async vote(source, args, ctx, info) {

    let {
      where,
    } = args;

    if (!Object.keys(where).length) {
      throw new Error("Where args required");
    }

    let objects = await this.votes(null, {
      where,
      limit: 1,
    }, ctx, info);

    return objects && objects[0] || null
  }

  votes(source, args, ctx, info) {


    const query = this.getVotesQuery(args, ctx);

    return this.request(query);

  }


  votesConnection(source, args, ctx, info) {

    const query = this.getVotesQuery(args, ctx);


    return this.objectsConnection(ctx, query, "vote.id");

  }



  getVotesQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let votes = knex(this.getTableName("society_votes", "votes"))
      .select("votes.*")
      .select(knex.raw(`IF(votes.vote_direction = '1' , 'Positive', if(votes.vote_direction = '-1', 'Negative', 'Neutral')) as direction`))
      .select(knex.raw(`unix_timestamp(votes.vote_date) as createdAt`))
      .select("votes.vote_value as value")
      .as("vote")
      ;


    let query = knex(votes).as("vote");

    return this.getQuery(args, ctx, "society_votes", "vote", query);


  }

  /**
   * Eof Votes
   */

}

export default ModxclubDB;