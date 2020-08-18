import React from "react";
import { Link, Redirect } from "react-router-dom";
import config from "../config";

class Login extends React.Component {
  constructor(props) {
    super();
    this.cookies = props.cookies;
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: this.cookies.cookies.email ? true : false,
      err: "",
    };
  }

  setEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  setPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  login = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
    const response = await fetch(
      config.BASE_URL + config.endPoints.login,
      requestOptions
    );

    const data = await response.json();
    // console.log(data);
    if (data.data) {
      this.cookies.set("email", data.data.email);
      this.cookies.set("token", data.token);
      this.setState({ redirect: true });
    } else {
      this.setState({ err: data.msg });
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="login-container">
        <h1 className="login-header">Login</h1>
        <div className="input-container">
          <div className="login-label">Email Address</div>
          <input
            className="login-input"
            value={this.state.email}
            onChange={this.setEmail}
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <div className="login-label">Password</div>
          <input
            className="login-input"
            value={this.state.password}
            onChange={this.setPassword}
            type="password"
            placeholder="Password"
          />
        </div>

        <button className="button" onClick={this.login}>
          Login
        </button>
        <Link className="button" to="/register">
          <button className="button">Register</button>
        </Link>
        {this.state.err ? (
          <div className="login-error">{this.state.err}</div>
        ) : null}
        {/* {this.state.redirect && <Redirect to="/home" />} */}
      </div>
    );
  }
}

export default Login;
