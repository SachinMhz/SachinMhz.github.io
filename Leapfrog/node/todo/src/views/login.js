import React from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends React.Component {
  constructor(props) {
    super();
    this.cookies = props.cookies;
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: this.cookies.cookies.email ? true : false,
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
      "http://localhost:8000/api/auth/login",
      requestOptions
    );

    const data = await response.json();
    // console.log(data);
    cookies.set("token", data.token, { path: "/" });
    this.cookies.set("email", data.data.email);
    this.cookies.set("token", data.token);

    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
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

        <button className="button" onClick={this.login}>
          Login
        </button>
        {/* {this.state.redirect && <Redirect to="/home" />} */}
      </div>
    );
  }
}

export default Login;
