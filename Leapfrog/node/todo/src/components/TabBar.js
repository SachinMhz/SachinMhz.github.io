import React from "react";

class TabBar extends React.Component {
  state = {
    all: true,
    completed: false,
    remaining: false,
  };

  changeTab = (tab) => {
    this.setState({
      all: false,
      completed: false,
      remaining: false,
      [tab]: true,
    });
  };

  render() {
    const { changeVisibility } = this.props;
    const { all, completed, remaining } = this.state;
    return (
      <ul className="nav clearFix">
        <li
          className={`nav__item ${all && "active"}`}
          onClick={() => {
            changeVisibility("all");
            this.changeTab("all");
          }}
        >
          <span title="show all" className="nav__text">
            All
          </span>
        </li>
        <li
          className={`nav__item ${completed && "active"}`}
          onClick={() => {
            changeVisibility("completed");
            this.changeTab("completed");
          }}
        >
          <span title="show completed">Completed</span>
        </li>
        <li
          className={`nav__item ${remaining && "active"}`}
          onClick={() => {
            changeVisibility("remaining");
            this.changeTab("remaining");
          }}
        >
          <span title="show remaining">Remaining</span>
        </li>
      </ul>
    );
  }
}

export default TabBar;
