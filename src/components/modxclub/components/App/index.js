

import { Component } from "react";

import { App as PrismaApp } from "@prisma-cms/front";

import Renderer from "../Renderer";

import * as queryFragments from "../../../../schema/generated/api.fragments";


import { createMuiTheme } from 'material-ui/styles';

import pink from 'material-ui/colors/pink';
import { darken } from 'material-ui/styles/colorManipulator';
import blue from 'material-ui/colors/blue';

export {
  Renderer,
  queryFragments,
}

export const getTheme = function (uiTheme) {

  const {
    direction,
    paletteType,
    typography,
    ...other
  } = uiTheme;

  const theme = createMuiTheme({
    direction,
    nprogress: {
      color: paletteType === 'light' ? '#000' : '#fff',
    },
    palette: {
      primary: {
        ...blue,
        // main: "#ff0000",
      },
      secondary: {
        // Darken so we reach the AA contrast ratio level.
        main: darken(pink.A400, 0.08),
      },
      type: paletteType,
      background: {
        default: "#fff",
      },
    },
    typography: {
      fontFamily: "'Open Sans', sans-serif,Tahoma, Helvetica",
      fontSize: 14,
      ...typography,
    },
    ...other,
  });

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    global.theme = theme;
  }

  return theme;
}

export default class App extends PrismaApp {

  static defaultProps = {
    ...PrismaApp.defaultProps,
    Renderer,
    queryFragments,
    lang: "ru",
    themeOptions: {
      direction: 'ltr',
      paletteType: 'light',
    },
  }



  getTheme() {

    const {
      themeOptions,
    } = this.state;

    return getTheme({
      ...themeOptions,
    });
  }

}
