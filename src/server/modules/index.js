
import fs from "fs";

import chalk from "chalk";

import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

// import {CmsModule} from "@prisma-cms/server";
import CmsModule from "@prisma-cms/prisma-module";

import ModxModule from "./modx";

class CoreModule extends CmsModule {
  


  constructor(options = {}) {

    let {
      modules = [],
    } = options;

    modules = modules.concat([
    ]);
    
    Object.assign(options, {
      modules,
    });
    
    super(options);
    
    this.mergeModules([
      ModxModule,
    ]);

  }
  

  getSchema(types = []) {

    let schema = fileLoader(__dirname + '/schema/database/', {
      recursive: true,
    });


    if (schema) {
      types = types.concat(schema);
    }


    let typesArray = super.getSchema(types);

    return typesArray;

  }

  
  getApiSchema(types = []) {


    let apiSchema = super.getApiSchema(types, []);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

    return apiSchema;

  }


  getExcludableApiTypes(){

    return super.getExcludableApiTypes([
    ]);

  }


  getResolvers(){

    // console.log("getResolvers", super.getResolvers());

    let {
      Query,
      Mutation,
      Subscription,
      ...other
    } = super.getResolvers();
    
    let resolvers = {
      Query,
    };

    if(Object.keys(Mutation).length){
      resolvers.Mutation = Mutation;
    }

    if(Object.keys(Subscription).length){
      resolvers.Subscription = Subscription;
    }

    if(other && Object.keys(other).length){
      Object.assign(resolvers, other);
    }

    // console.log("getResolvers 2 ", resolvers);

    return resolvers;
  }

}


export default CoreModule;