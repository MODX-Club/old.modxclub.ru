
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import PrismaCmsPageLayout from "@prisma-cms/front/lib/modules/pages/layout";


export default class PageLayout extends PrismaCmsPageLayout {


  static contextTypes = {
    ...PrismaCmsPageLayout.contextTypes,
    getQueryFragment: PropTypes.func.isRequired,
  }


  render(content) {

    return content === null ? null : super.render(<div
      style={{
        padding: "20px 10px",
      }}
    >
      {content}
    </div>);
  }

}