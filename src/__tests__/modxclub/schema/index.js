
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
        "companies",
        "companiesConnection",
        "services",
        "servicesConnection",
        "notices",
        "noticesConnection",
        "userNotices",
        "userNoticesConnection",
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
