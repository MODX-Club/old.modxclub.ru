
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import PrismaCmsPageLayout from "@prisma-cms/front/lib/modules/pages/layout";


export default class PageLayout extends PrismaCmsPageLayout {


  render(content) {

    return content === null ? null : super.render(<div
      style={{
        padding: "20px 10px",
        maxWidth: 1260,
        margin: "0 auto",
      }}
    >
      {content}
    </div>);
  }

}