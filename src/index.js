import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

window.onload = function() {
  if (window.location.pathname !== "/") {
    window.history.pushState(null, "Wakey Wakey", "/");
  }
  document.addEventListener(
    "contextmenu",
    function(e) {
      e.preventDefault();
    },
    false
  );
  document.addEventListener(
    "keydown",
    e => {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (
        e.keyCode === 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode === 85) {
        disabledEvent(e);
      }
      // "F12" key
      //   if (e.keyCode === 123) {
      //     disabledEvent(e);
      //   }
    },
    false
  );
  function disabledEvent(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
  }
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
