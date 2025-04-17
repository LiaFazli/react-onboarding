import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import EditRecipe from "./pages/EditRecipe";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/create" component={CreateRecipe} />
              <Route path="/edit/:id" component={EditRecipe} />
          </Switch>
      </Router>
  );
}

export default App;
