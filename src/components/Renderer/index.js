
import React from "react";

import { Renderer as PrismaCmsRenderer } from "@prisma-cms/front";

import UserPage from "@prisma-cms/front/lib/modules/pages/UsersPage/UserPage";

export default class BoilerplateRenderer extends PrismaCmsRenderer {

  getRoutes() {

    let routers = super.getRoutes();

    routers.unshift({
      exact: true,
      path: "/users/:userId",
      render: (props) => {
        const {
          params,
        } = props.match;

        const {
          userId,
        } = params || {};

        return <UserPage
          key={userId}
          where={{
            id: parseInt(userId),
          }}
          {...props}
        />
      }
    });

    return routers;
  }

}

