

import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

import PrismaModule from "@prisma-cms/prisma-module";

import UserModule from "./modules/user";
import ResourceModule from "./modules/resource";


import { GraphQLScalarType } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'The `DateTime` scalar type represents timestamp values as Date',
  serialize(value) {
    return value ? new Date(value * 1000) : value;
  },
});


class ModxModule extends PrismaModule {


  constructor() {

    super();

    this.mergeModules([
      UserModule,
      ResourceModule,
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



  getResolvers() {


    let resolvers = super.getResolvers();

    // Object.assign(resolvers.Query, {
    // });

    Object.assign(resolvers, {
      DateTime,
      Json: GraphQLJSON,
    });

    return resolvers;

  }


}


export default ModxModule;