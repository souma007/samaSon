import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UseAuthProvider from "./UseAuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <UseAuthProvider>
      <App />
    </UseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
