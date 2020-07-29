import React from "react";
import "./App.css";

import Header from "./components/header";
// import SearchBar from "./components/searchBar";
import ListHeader from "./components/listHeader";
import ListItem from "./components/listItem";

class App extends React.Component {
  state = {
    searchText: "",
    list: [{ id: Date.now(), body: "this is a task", isCompleted: false }],
  };

  searchItem = (val) => {
    let newList = this.state.list.filter(
      (item) => item.body.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
    this.setState({ searchList: newList });
  };

  onSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
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
    const filteredList = this.state.list.filter(
      (item) =>
        item.body.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !==
        -1
    );
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
        {filteredList.map((item, index) => {
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
