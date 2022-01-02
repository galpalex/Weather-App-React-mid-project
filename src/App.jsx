import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.css";
import Home from "./pages/Home";
import Display24Hours from "./pages/Display24Hours";
import Display5Days from "./pages/Display5Days";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/24Hours">
            <Display24Hours />
          </Route>
          <Route exact path="/5Days">
            <Display5Days />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
