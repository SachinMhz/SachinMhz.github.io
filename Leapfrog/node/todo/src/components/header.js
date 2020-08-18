import React from "react";
import { Link } from "react-router-dom";

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
      <div class="header-container">
        {this.props.cookies.cookies.email && (
          <div className="float-right">
            Logged In User's Email : {this.props.cookies.cookies.email}
          </div>
        )}
        <div className="header">Todo List</div>
        <Link className="logOut-button" to="/login" onClick={this.logOut}>
          Log out
        </Link>
      </div>
    );
  }
}
export default Header;
