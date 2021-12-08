import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Home from "./Home";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header code={code} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard code={code} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
