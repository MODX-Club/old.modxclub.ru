
import ModxDB from "../modx/db";


export class ModxclubDB extends ModxDB {


  constructor(props) {

    super(props);

    Object.assign(this.query, {
      companies: (source, args, ctx, info) => this.companies(source, args, ctx, info),
      companiesConnection: (source, args, ctx, info) => this.companiesConnection(source, args, ctx, info),
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

    // console.log("companiesConnection SQL", query.toString());

    return this.request(query);

  }


  companiesConnection(source, args, ctx, info) {

    const {
      knex,
    } = ctx;

    const query = this.getCompaniesQuery(args, ctx);

    // console.log("companiesConnection SQL", query.toString());

    return this.objectsConnection(ctx, query, "company.id");

  }


  getCompaniesQuery(args, ctx) {

    const {
      knex,
    } = ctx;

    let companies = knex(this.getTableName("modxsite_view_companies", "company"))
      .select("company.*")
      .select("company.company_name as name")
      .select("company.company_resource_id as resource_id")
      .select("company.createdon as createdAt")
      // .innerJoin(this.getTableName("user_attributes", "profile"), "user.id", "profile.internalKey")
      // .as("users")
      // .select("user.*")
      // .select("profile.email")
      // .select("profile.fullname")
      ;

    // this.prepareUsersQuery(users, ctx);

    // let query = knex(companies).as("companies");

    return this.getQuery(args, ctx, "companies", "company", companies);

  }

}

export default ModxclubDB;