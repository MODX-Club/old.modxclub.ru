

import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

import PrismaModule from "@prisma-cms/prisma-module";


import CompanyModule from "./modules/company";
import NoticeModule from "./modules/notice";
import UserNoticeModule from "./modules/userNotice";

class ModxclubModules extends PrismaModule {


  constructor() {

    super();

    this.mergeModules([
      CompanyModule,
      NoticeModule,
      UserNoticeModule,
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