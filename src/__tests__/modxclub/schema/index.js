
import expect from 'expect'

import chalk from "chalk";


import TestModule from "../../../server/modules";

const { parse, print } = require('graphql');

const module = new TestModule();


/**
 */

const requiredTypes = [
  {
    name: "Query",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "me",
        "user",
        "users",
        "usersConnection",
        "company",
        "companies",
        "companiesConnection",
        "service",
        "services",
        "servicesConnection",
        "notice",
        "notices",
        "noticesConnection",
        "userNotice",
        "userNotices",
        "userNoticesConnection",
        "project",
        "projects",
        "projectsConnection",
        "blog",
        "blogs",
        "blogsConnection",
        "topic",
        "topics",
        "topicsConnection",
        "comment",
        "comments",
        "commentsConnection",
        "thread",
        "threads",
        "threadsConnection",
        "vote",
        "votes",
        "votesConnection",
        "topicTag",
        "topicTags",
        "topicTagsConnection",
      ],
    },
  },
  {
    name: "User",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "createdAt",
        "Companies",
        "Services",
        "Notices",
        "Projects",
      ],
    },
  },
  {
    name: "Company",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "name",
        "uri",
        "resource_id",
        "Resource",
        "createdAt",
        "createdby",
        "CreatedBy",
        "owner",
        "Owner",
      ],
    },
  },
  {
    name: "Service",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "name",
        "uri",
        "Users",
      ],
    },
  },
  {
    name: "UserNotice",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "user_id",
        "notice_id",
        "active",
        "User",
        "Notice",
      ],
    },
  },
  {
    name: "Notice",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "name",
        "comment",
        "rank",
        "UsersNotices",
      ],
    },
  },
  {
    name: "Project",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "name",
        "uri",
        "site_url",
        "Members",
      ],
    },
  },
  {
    name: "ProjectMember",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "status",
        "project_id",
        "Project",
        "user_id",
        "User",
        "service_id",
        "Service",
      ],
    },
  },
  {
    name: "Resource",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "pagetitle",
        "longtitle",
        "content",
        "alias",
        "published",
        "deleted",
        "hidemenu",
        "searchable",
        "class_key",
        "context_key",
        "uri",
        "uri_override",
        "createdby",
        "template",
        "publishedon",
        "createdon",
        "editedon",
        "CreatedBy",
      ],
    },
  },
  {
    name: "Blog",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "name",
        "pagetitle",
        "longtitle",
        "content",
        "alias",
        "published",
        "deleted",
        "hidemenu",
        "searchable",
        "class_key",
        "context_key",
        "uri",
        "uri_override",
        "createdby",
        "template",
        "publishedon",
        "createdAt",
        "updatedAt",
        "CreatedBy",
        "personal",
        "Topics",
      ],
    },
  },
  {
    name: "Topic",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "name",
        "pagetitle",
        "longtitle",
        "content",
        "createdAt",
        "updatedAt",
        "alias",
        "published",
        "deleted",
        "hidemenu",
        "searchable",
        "class_key",
        "context_key",
        "uri",
        "uri_override",
        "createdby",
        "template",
        "publishedon",
        "CreatedBy",
        "Tags",
        "blog_id",
        "Blog",
      ],
    },
  },
  {
    name: "TopicTag",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "name",
        "count",
        "topic_ids",
        "Topics",
      ],
    },
  },
  {
    name: "Comment",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "createdAt",
        "updatedAt",
        "text",
        "createdby",
        "Author",
        "parent",
        "Parent",
        "deleted",
        "published",
        "comments_count",
        "thread_id",
        "Thread",
      ],
    },
  },
  {
    name: "Thread",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "target_id",
        "target_class",
        "comments_count",
        "createdAt",
        "updatedAt",
        "rating",
        "positive_votes",
        "negative_votes",
        "neutral_votes",
        "Comments",
      ],
    },
  },
  {
    name: "Vote",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "target_id",
        "target_class",
        "thread_id",
        "Thread",
        "user_id",
        "direction",
        "value",
        "createdAt",
      ],
    },
  },
]


describe('Get prisma Schema', () => {


  const schema = module.getSchema();

  const ast = parse(schema);

  const {
    definitions,
  } = ast;


  const types = definitions.filter(n => n.kind === "ObjectTypeDefinition");


  // types.map(type => {

  //   const {
  //     name: {
  //       value: name,
  //     },
  //     fields,
  //   } = type;

  //   console.log(chalk.bgGreen.black("Type name"), name);

  //   fields.map(field => {

  //     const {
  //       name: {
  //         value: fieldName,
  //       },
  //     } = field;

  //     console.log(chalk.bgWhite.blue("Type filed name"), fieldName);

  //   });

  // });


  requiredTypes.map(type => {

    // const type = requiredTypes[name];

    const {
      name,
      fields: typeFields,
    } = type;


    const {
      both = [],
      prisma = [],
    } = typeFields;

    let requiredFields = [...new Set(both.concat(prisma))]


    if (!requiredFields.length) {
      return;
    }


    it(`Try to find type ${name}`, () => {


      // console.log(chalk.green("required Type"), type);

      // console.log(chalk.green(`Try to find type ${name}`));
      const definition = definitions.find(n => n.kind === "ObjectTypeDefinition" && n.name.value === name);

      // console.log(chalk.green("definition"), definition);

      expect(typeof definition === "object").toBe(true);

      requiredFields.map(fieldName => {

        // console.log(chalk.green("field 0"), definition.fields[0].name.value);

        // console.log(chalk.green(`Try to find field ${name}:${fieldName}`));
        const field = definition.fields.find(n => n.kind === "FieldDefinition" && n.name.value === fieldName);

        // console.log(chalk.green("field"), field);

        try {
          expect(typeof field === "object").toBe(true);
        }
        catch (error) {
          throw (`Can not find field ${name}:${fieldName}`);
        }


      })

    })

  });


});


describe('Get API Schema', () => {



  const schema = module.getApiSchema();

  const ast = parse(schema);

  const {
    definitions,
  } = ast;


  const types = definitions.filter(n => n.kind === "ObjectTypeDefinition");


  // types.map(type => {

  //   const {
  //     name: {
  //       value: name,
  //     },
  //     fields,
  //   } = type;

  //   // console.log(chalk.green("Type"), name);
  //   console.log(chalk.bgGreen.black("Type name"), name);

  //   fields.map(field => {

  //     const {
  //       name: {
  //         value: fieldName,
  //       },
  //     } = field;

  //     console.log(chalk.bgWhite.blue("Type filed name"), fieldName);

  //   });

  // });



  requiredTypes.map(type => {

    // const type = requiredTypes[name];

    const {
      name,
      fields: typeFields,
    } = type;


    const {
      both = [],
      api = [],
    } = typeFields;

    let requiredFields = [...new Set(both.concat(api))]


    if (!requiredFields.length) {
      return;
    }


    it(`Try to find type ${name}`, () => {


      // console.log(chalk.green("required Type"), type);

      // console.log(chalk.green(`Try to find type ${name}`));
      const definition = definitions.find(n => n.kind === "ObjectTypeDefinition" && n.name.value === name);

      // console.log(chalk.green("definition"), definition);

      expect(typeof definition === "object").toBe(true);

      requiredFields.map(fieldName => {


        // console.log(chalk.green("field 0"), definition.fields[0].name.value);

        // console.log(chalk.green(`Try to find field ${name}:${fieldName}`));
        const field = definition.fields.find(n => n.kind === "FieldDefinition" && n.name.value === fieldName);

        // console.log(chalk.green("field"), field);

        try {
          expect(typeof field === "object").toBe(true);
        }
        catch (error) {
          throw (`Can not find field ${name}:${fieldName}`);
        }

      })

    })

  });



})
