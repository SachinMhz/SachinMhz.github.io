import React from "react";
import { Redirect } from "react-router-dom";
import config from "../config";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    error: "",
  };
  setEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  setPassword = (e) => {
    this.setState({ password: e.target.value });
  };
  register = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
    const response = await fetch(
      config.BASE_URL + config.endPoints.register,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (data.status === 200) this.setState({ redirect: true });
    else this.setState({ error: data.msg });
  };
  render() {
    return (
      <div className="login-container">
        <h1 className="login-header">Register</h1>
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
        <button className="button" onClick={this.register}>
          Register
        </button>
        {this.state.error ? (
          <div className="login-error">{this.state.error}</div>
        ) : null}
        {this.state.redirect && <Redirect to="/login" />}
      </div>
    );
  }
}

export default Register;
