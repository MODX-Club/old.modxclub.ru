

import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";


import Processor from "@prisma-cms/prisma-processor";


class TopicProcessor extends Processor {



  // async create(objectType, args, info) {

  //   // return await this.mutate(`create${objectType}`, args, info)
  //   //   .catch(error => {
  //   //     this.error({
  //   //       message: error,
  //   //       objectType,
  //   //     });
  //   //     this.addError(error);
  //   //     throw (error);
  //   //   })
  //   //   ;

  //   // // return this.prepareResponse();

  // }


  async update(objectType, args, info) {


    let {
      data: {
        // name,
        // content,
        topic_tags,
        ...data
      },
      where,
    } = args;

    const {
      ctx,
    } = this;


    const {
      modx,
    } = ctx;


    const {
      id: topicId,
    } = where || {};

    /**
     * Получаем топик
     */
    // const topic = await modx.query.topic(null, {
    //   where,
    // }, ctx);


    // console.log(chalk.green("update topic"), topic);

    // if (!topic) {
    //   return this.addError("Не был получен топик");
    // }

    // const {
    //   id: topic_id,
    //   name: topicName,
    //   content: topicContent,
    // } = topic;


    // if (name === undefined) {
    //   name = topicName;
    // }

    // if (content === undefined) {
    //   content = topicContent;
    // }

    /**
     * Получаем теги
     */

    if (topic_tags === undefined) {

      const tags = await modx.query.tags(null, {
        where: {
          topic_id: topicId,
        },
      }, ctx);

      // console.log(chalk.green("update topic tags"), tags);

      topic_tags = tags.map(n => n.name);

    }



    args.data = {
      ...data,
      // pagetitle: name,
      // content,
      topic_tags,
    }

    return super.update(objectType, args, info);
  }


  async mutate(method, args, info) {

    // const {
    //   db,
    // } = this.ctx;

    // // console.log("mutatoin db", db);
    // // console.log("mutatoin db", args);
    // // console.log("mutatoin info", info);

    // if (!this.hasErrors()) {
    //   const result = await db.mutation[method](args, info)
    //     .catch(error => {
    //       this.addError(error);
    //       this.error(error);
    //       throw (error);
    //     });

    //   return result;
    // }

    const {
      ctx,
    } = this;

    const {
      modxRequest,
    } = ctx;


    let {
      data: {
        name: pagetitle,
        content,
        ...data
      },
      where,
    } = args;

    
    const {
      id,
    } = where || {};


    if (content && typeof content === "object") {

      try {

        content = JSON.stringify(content)

      }
      catch (error) {
        throw (error);
      }
    }



    const result = await modxRequest("/assets/components/modxsite/connectors/connector.php", {
      data: {
        pub_action: id ? "topics/update" : "topics/create",
        id,
        pagetitle,
        content,
        plainText: "mock",
        ...data,
      },
    }, ctx)
      .then(async r => {

        return await r.json();

      })
      .catch(error => {
        console.error(chalk.red("Response error"), error);
        this.addError(error);
      });

    // console.log(chalk.green("result"), result);


    const {
      success,
      message,
      data: errors,
      object,
    } = result || {}



    if (success && object) {

      return object;

    }
    else {

      this.addError(message || "Ошибка выполнения запроса");

      errors && errors.map(error => {

        let {
          id: key,
          msg: message,
        } = error || {}


        switch (key) {

          case "pagetitle":

            key = "name";
            break;

        }


        if (key && message) {
          this.addFieldError(key, message);
        }

      });

    }

    return;
  }

}


class ModxTopicModule extends PrismaModule {


  constructor(props) {

    super(props)

    this.Topic = {

      CreatedBy: (source, args, ctx, info) => this.CreatedBy(source, args, ctx, info),
      Blog: (source, args, ctx, info) => this.Blog(source, args, ctx, info),
      Comments: (source, args, ctx, info) => this.Comments(source, args, ctx, info),
      Tags: (source, args, ctx, info) => this.Tags(source, args, ctx, info),
      Thread: (source, args, ctx, info) => this.Thread(source, args, ctx, info),
      content: (source, args, ctx, info) => this.content(source, args, ctx, info),

    }

    this.TopicResponse = {

      data: (source, args, ctx, info) => {

        const {
          id,
        } = source.data || {}

        return id ? ctx.modx.query.topic(null, {
          where: {
            id,
          },
        }, ctx, info) : null;

      },

    }


  }

  getResolvers() {


    let resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      topic: this.topic,
      topics: this.topics,
      topicsConnection: this.topicsConnection,
    });

    Object.assign(resolvers.Mutation, {
      createTopicProcessor: this.createTopicProcessor,
      updateTopicProcessor: this.updateTopicProcessor,
    });

    Object.assign(resolvers, {
      Topic: this.Topic,
      TopicResponse: this.TopicResponse,
    });

    return resolvers;

  }


  CreatedBy(source, args, ctx, info) {

    const {
      createdby,
    } = source || {};

    return createdby ? ctx.modx.query.user(null, {
      where: {
        id: createdby,
      },
    }, ctx, info) : null;

  }


  Blog(source, args, ctx, info) {

    const {
      blog_id,
    } = source || {};

    return blog_id ? ctx.modx.query.blog(null, {
      where: {
        id: blog_id,
      },
    }, ctx, info) : null;

  }


  Thread(source, args, ctx, info) {

    const {
      thread_id,
    } = source || {};


    return thread_id ? ctx.modx.query.thread(null, {
      where: {
        id: thread_id,
      },
    }, ctx, info) : null;

  }


  Comments(source, args, ctx, info) {

    const {
      id: topic_id,
    } = source || {};

    if (!topic_id) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      topic_id,
    }

    return ctx.modx.query.comments(null, args, ctx, info);

  }


  Tags(source, args, ctx, info) {

    const {
      id: topic_id,
    } = source || {};

    if (!topic_id) {
      return [];
    }

    let {
      where,
    } = args;

    args.where = {
      ...where,
      topic_id,
    }

    return ctx.modx.query.topicTags(null, args, ctx, info);

  }


  content(source, args, ctx, info) {

    let {
      content,
    } = source || {}


    if (content) {

      try {

        let json = JSON.parse(content);

        if (json) {
          content = json;
        }

      }
      catch (error) {

      }

    }

    return content;
  }


  topic(source, args, ctx, info) {

    return ctx.modx.query.topic(source, args, ctx, info);

  }

  topics(source, args, ctx, info) {

    return ctx.modx.query.topics(source, args, ctx, info);

  }


  topicsConnection(source, args, ctx, info) {

    return ctx.modx.query.topicsConnection(source, args, ctx, info);

  }


  createTopicProcessor(source, args, ctx, info) {

    return new TopicProcessor(ctx).createWithResponse("Topic", args, info);

  }


  updateTopicProcessor(source, args, ctx, info) {

    return new TopicProcessor(ctx).updateWithResponse("Topic", args, info);

  }


}


export default ModxTopicModule;