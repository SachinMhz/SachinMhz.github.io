import React from "react";
import { Link, Redirect } from "react-router-dom";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    redirect: false,
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
      "http://localhost:8000/api/auth/register",
      requestOptions
    );
    const data = await response.json();
    console.log(data)
    this.setState({ redirect: true });
  };
  render() {
    return (
      <div className="login-container">
        <div className="input-container">
          <input
            value={this.state.email}
            onChange={this.setEmail}
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <input
            value={this.state.password}
            onChange={this.setPassword}
            type="password"
            placeholder="Password"
          />
        </div>

        <button className="button" onClick={this.register}>
          Register
        </button>
        {this.state.redirect && <Redirect to="/home" />}
      </div>
    );
  }
}

export default Register;
