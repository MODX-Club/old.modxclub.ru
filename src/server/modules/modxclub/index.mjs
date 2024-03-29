  

import PrismaModule from "@prisma-cms/prisma-module";


import CompanyModule from "./modules/company";
import NoticeModule from "./modules/notice";
import UserNoticeModule from "./modules/userNotice";
import ServiceModule from "./modules/service";
import ProjectModule from "./modules/project";
import ProjectMemberModule from "./modules/projectMember";

import BlogModule from "./modules/society/blog";
import TopicModule from "./modules/society/topic";
import ThreadModule from "./modules/society/thread";
import TagModule from "./modules/society/tag";
import TopicTagModule from "./modules/society/topicTag";
import CommentModule from "./modules/society/comment";
import VoteModule from "./modules/society/vote";

import MergeSchema from 'merge-graphql-schemas';

import path from 'path';

const moduleURL = new URL(import.meta.url);

const __dirname = path.dirname(moduleURL.pathname);

const { fileLoader, mergeTypes } = MergeSchema;

class ModxclubModules extends PrismaModule {


  constructor() {

    super();

    this.mergeModules([
      CompanyModule,
      NoticeModule,
      UserNoticeModule,
      ServiceModule,
      ProjectModule,
      ProjectMemberModule,

      BlogModule,
      TopicModule,
      ThreadModule,
      TagModule,
      TopicTagModule,
      CommentModule,
      VoteModule,
    ]);

  }

  getApiSchema(types = []) {


    let apiSchema = super.getApiSchema(types, []);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

    return apiSchema;

  }



  // getResolvers() {


  //   let resolvers = super.getResolvers();

  //   Object.assign(resolvers.Query, {
  //     users: this.users,
  //   });

  //   return resolvers;

  // }


}


export default ModxclubModules;