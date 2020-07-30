import React from "react";
import "./styles/App.css";
import "./styles/reset.css";

import Header from "./components/header";
// import SearchBar from "./components/searchBar";
import ListHeader from "./components/listHeader";
import ListItem from "./components/listItem";

class App extends React.Component {
  state = {
    searchText: "",
    show: "all",
    list: [],
    filteredList: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.list !== prevState.list ||
      this.state.show !== prevState.show
    ) {
      let newList = this.state.list.filter(
        (item) =>
          item.body
            .toLowerCase()
            .indexOf(this.state.searchText.toLowerCase()) !== -1
      );
      let newCompletedlist = this.state.list.filter(
        (item) =>
          item.body
            .toLowerCase()
            .indexOf(this.state.searchText.toLowerCase()) !== -1 &&
          item.isCompleted === true
      );
      let newRemainingList = this.state.list.filter(
        (item) =>
          item.body
            .toLowerCase()
            .indexOf(this.state.searchText.toLowerCase()) !== -1 &&
          item.isCompleted === false
      );
      if (this.state.show === "all") this.setState({ filteredList: newList });
      if (this.state.show === "completed")
        this.setState({ filteredList: newCompletedlist });
      if (this.state.show === "remaining")
        this.setState({ filteredList: newRemainingList });
    }
  }

  onSearchChange = (e) => {
    let input = e.target.value;
    let newList = this.state.list.filter(
      (item) => item.body.toLowerCase().indexOf(input.toLowerCase()) !== -1
    );
    this.setState({ searchText: input, filteredList: newList });
  };

  addItem = (obj) => {
    if (obj.body === "") return;
    this.setState({
      list: [...this.state.list, obj],
    });
  };

  completeItem = (id) => {
    let newList = this.state.list.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    this.setState({ list: newList });
  };

  deleteItem = (id) => {
    let newList = this.state.list.filter((item) => item.id !== id);
    this.setState({ list: newList });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="search">
          <input
            className="search__input"
            placeholder="Search"
            value={this.state.searchText}
            onChange={this.onSearchChange}
          />
        </div>
        <ListHeader addItem={this.addItem} />
        <ul className="nav clearFix">
          <li
            className="nav__item"
            onClick={() => {
              this.setState({ show: "all" });
            }}
          >
            <a href="#" title="show all">
              All
            </a>
          </li>
          <li
            className="nav__item"
            onClick={() => {
              this.setState({ show: "completed" });
            }}
          >
            <a href="#" title="show completed">
              Completed
            </a>
          </li>
          <li
            className="nav__item"
            onClick={() => {
              this.setState({ show: "remaining" });
            }}
          >
            <a href="#" title="show remaining">
              Remaining
            </a>
          </li>
        </ul>
        <br />
        {this.state.filteredList.map((item, index) => {
          return (
            <ListItem
              key={index}
              item={item}
              deleteItem={this.deleteItem}
              completeItem={this.completeItem}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
