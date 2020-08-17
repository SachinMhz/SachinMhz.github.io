import React from "react";
import { HashRouter, Route } from "react-router-dom";

import "./styles/style.css";
import "./styles/reset.css";

import Login from "./views/login";
import Main from "./views/main";
import Register from "./views/register";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/home" component={Main} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
