const cwd = process.cwd();

require('@babel/register')({
  extensions: ['.js'],
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "transform-es2015-modules-commonjs",
    "@babel/plugin-proposal-class-properties"
  ],

  // ignore: [function (filename) {

  //   return filename.indexOf(cwd + `/node_modules/`) === 0;
  // }],
});

require("@babel/polyfill");


const CoreModule = require("./modules").default;
const coreModule = new CoreModule({
});
const resolvers = coreModule.getResolvers();

const imagesMiddleware = require("./middleware/ImageThumb");

const {
  default: ModxDB,
} = require("./modules/modx/db");

switch (process.env.action) {

  case "build-schema":

    require("./schema").default(process.env.schemaType);

    break;

  case "start-server":

    const startServer = require("@prisma-cms/server").default;

    // console.log("startServer", startServer); 

    const {
      MYSQL_HOST = "localhost",
      MYSQL_USER = "root",
      MYSQL_PASSWORD = "",
      MYSQL_DB,
      MYSQL_TABLE_PREFIX = "modx_",
    } = process.env;


    if (!MYSQL_DB) {
      throw new Error("Environment MYSQL_DB required");
    }


    startServer({
      typeDefs: 'src/schema/generated/api.graphql',
      resolvers,
      imagesMiddleware,
      contextOptions: {
        db: null,
        getCurrentUser: (request) => {
          // console.log("getCurrentUser", request.headers);
        },
        modx: new ModxDB({
          tablePrefix: MYSQL_TABLE_PREFIX,
        }),
      },
      Mailer: null,
      knexOptions: {
        connection: {
          host: MYSQL_HOST,
          user: MYSQL_USER,
          database: MYSQL_DB,
          password: MYSQL_PASSWORD,
        },
      },
    });

    break;

  // default: throw (new Error("action env not defined"))

}


