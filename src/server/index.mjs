

import CoreModule from "./modules"

import { ImagesMiddleware } from "@prisma-cms/upload-module";

import FormData from "form-data";

import ModxDB from "./modules/modxclub/db";

import startServer from "@prisma-cms/server"

const coreModule = new CoreModule({
});
const resolvers = coreModule.getResolvers();

const imagesMiddleware = new ImagesMiddleware().processRequest;




async function modxRequest(url, options, ctx) {



  let {
    // rejectUnauthorized = false,
    headers = {},
    method = "POST",
    data,
    body,
    ...other
  } = options || {}

  let {
    request,
    response,
  } = ctx;

  // const siteUrl = process.env.siteUrl;

  const {
    headers: {
      modauth,
      cookie,
      // siteurl: siteUrl,
      token,
    },
  } = request;


  data = {
    cache: false,
    format: "json",
    ...data
  }



  const siteUrl = process.env.siteUrl;

  if (!siteUrl) {
    throw new Error("siteUrl environment required");
  }

  url = `${siteUrl}${url}`;

  // body = JSON.stringify(data);


  body = body || new FormData();

  if (data) {


    for (var field in data) {
      let value = data[field];



      if (typeof value === "undefined") {
        continue;
      }
      else if (typeof value === "boolean") {
        value = value === true ? 1 : 0;
      }
      else if (typeof value === "object") {

        for (var i in value) {


          let f = `${field}[${i}]`;
          let v = value[i];

          if (typeof v === "boolean") {
            v = v === true ? 1 : 0;
          }


          body.append(f, v);

        }

        continue;
      }
      else {

      }

      body.append(field, value);
    }


  }



  if (modauth) {
    body.append("HTTP_MODAUTH", modauth);
  }

  token && body.append("t", token);





  // return;

  return await fetch(url, {
    credentials: 'same-origin',
    timeout: 15000,
    method,
    headers: {
      ...headers,
      cookie,
    },
    body,
    ...options,
  })
    .catch(error => {
      // this.error(error);
      throw (error);
    });

}


let getCurrentUser = async function (ctx) {
  //

  let currentUser;

  const {
    request,
    modx,
  } = ctx;

  if (!request) {
    return null;
  }




  const {
    headers: {
      cookie,
    },
  } = request;

  let PHPSESSID;


  cookie && cookie.split(";").map(n => {

    let {
      0: name,
      1: value,
    } = n.split("=");

    if (name && name.trim() === "PHPSESSID") {



      PHPSESSID = value && value.trim() || null;


    }

  })


  /**
   * Если был получен кукис, пытаемся получить сессию из базы
   */
  if (PHPSESSID) {

    currentUser = await modx.query.userBySession(null, {
      PHPSESSID,
    }, ctx);




  }

  return currentUser;

}



//

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

const modx = new ModxDB({
  tablePrefix: MYSQL_TABLE_PREFIX,
});



startServer({
  typeDefs: 'src/schema/generated/api.graphql',
  resolvers,
  imagesMiddleware,
  contextOptions: {
    db: null,
    getCurrentUser,
    modx,
    modxRequest,
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

