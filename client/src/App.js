import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Home from "./Home";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Header code={code} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard code={code} />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;

const Wrapper = styled.div``;
