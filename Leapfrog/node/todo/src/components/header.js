import React from "react";
import { Redirect, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super();
    this.cookies = props.cookies;
  }

  logOut = () => {
    this.cookies.set("email", "");
    this.cookies.set("token", "");
  };
  render() {
    return (
      <div>
        <div className="header">Todo List</div>;
        <Link className="button" to="/login" onClick={this.logOut}>
          Log out
        </Link>
      </div>
    );
  }
}
export default Header;
