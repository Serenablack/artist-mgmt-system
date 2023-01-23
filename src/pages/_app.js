import React from "react";
import PropTypes from "prop-types";

MyApp.propTypes = {
  Component: PropTypes.elementType,
};

import store from "@redux/store";
import { Provider } from "react-redux";

export default function MyApp(props) {
  const { Component } = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
