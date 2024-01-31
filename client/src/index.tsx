import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import es from "javascript-time-ago/locale/es.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(es);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<App />, document.getElementById("root"));

// allows for live updating
if (module.hot !== undefined) {
  module.hot.accept();
}
