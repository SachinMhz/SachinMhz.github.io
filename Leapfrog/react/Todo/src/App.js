import React from "react";
import "./styles/style.css";
import "./styles/reset.css";

import Header from "./components/Header";
import ListHeader from "./components/ListHeader";
import TabBar from "./components/TabBar";
import ListItem from "./components/ListItem";

class App extends React.Component {
  state = {
    search: "",
    show: "all",
    list: [],
  };

  onSearchChange = (e) => {
    this.setState({ search: e.target.value });
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

  updateItem = (id, body) => {
    let newList = this.state.list.map((item) => {
      if (item.id === id) {
        item.body = body;
      }
      return item;
    });
    this.setState({ list: newList });
  };
  deleteItem = (id) => {
    let newList = this.state.list.filter((item) => item.id !== id);
    this.setState({ list: newList });
  };

  changeVisibility = (show) => {
    this.setState({ show });
  };

  filterList = (list) => {
    return this.state.show === "all"
      ? list
      : this.state.show === "completed"
      ? list.filter((item) => item.isCompleted)
      : list.filter((item) => !item.isCompleted);
  };

  searchList = (list) => {
    return list.filter((item) =>
      item.body.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="search">
          <input
            className="search__input"
            placeholder="Search"
            value={this.state.search}
            onChange={this.onSearchChange}
          />
        </div>
        <ListHeader addItem={this.addItem} />
        <TabBar changeVisibility={this.changeVisibility} />
        <ul className="todo-list">
          {this.filterList(this.searchList(this.state.list)).map(
            (item, index) => {
              return (
                <ListItem
                  key={index}
                  item={item}
                  deleteItem={this.deleteItem}
                  completeItem={this.completeItem}
                  updateItem={this.updateItem}
                />
              );
            }
          )}
        </ul>
      </div>
    );
  }
}

export default App;
