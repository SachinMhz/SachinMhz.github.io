import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";

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
            <Route path="/" exact component={() => <Redirect to="/login" />} />
            <Route
              path="/login"
              component={() => <Login cookies={this.props.cookies} />}
            />
            <Route
              path="/register"
              component={() => <Register cookies={this.props.cookies} />}
            />
            <Route
              path="/home"
              component={() => <Main cookies={this.props.cookies} />}
            />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default withCookies(App);
