
import React from "react";


import UsersPage from "@prisma-cms/front/lib/modules/pages/UsersPage";

import UserPage from "../pages/UsersPage/UserPage";

import PrismaRendererCmsRenderer from "../../../Renderer";

import MainPage from "../pages/MainPage";

import withStyles from "material-ui/styles/withStyles";

import MainMenu from "../main/mainMenu";

export const styles = theme => {

  console.log("theme", theme);

  const {
    typography: {
      fontFamily,
      fontSize,
    },
    palette: {
      text: {
        primary,
      },
    },
  } = theme;

  return {
    root: {
      fontFamily,
      fontSize,
      color: primary,
    },
  }

}


export class Renderer extends PrismaRendererCmsRenderer {


  getRoutes() {

    let baseRoutes = super.getRoutes();

    let mainPageIndex = baseRoutes.findIndex(n => n.path === "/");
    if (mainPageIndex) {
      baseRoutes.splice(mainPageIndex, 1);
    }



    var routeIndex;

    while ((routeIndex = baseRoutes.findIndex(n => n.path.startsWith("/user"))) !== -1) {

      baseRoutes.splice(routeIndex, 1);

    };


    let routes = [
      {
        exact: true,
        path: "/people",
        component: UsersPage,
      },
      {
        exact: true,
        path: "/",
        component: MainPage,
      }, {
        exact: true,
        path: "/profile/:username",
        render: (props) => {
          const {
            params,
          } = props.match;

          const {
            username,
          } = params || {};

          return <UserPage
            key={username}
            where={{
              username,
            }}
            {...props}
          />
        }
      },
    ].concat(baseRoutes);


    console.log("routes", routes);

    return routes;
  }


  renderMenu() {

    return <MainMenu />;
  }

}

export default withStyles(styles)(Renderer);
