import React from "react";
import "./styles/style.css";
import "./styles/reset.css";

import Header from "./components/header";
import ListHeader from "./components/listHeader";
import TabBar from "./components/TabBar";
import ListItem from "./components/listItem";

class App extends React.Component {
  state = {
    search: "",
    show: "all",
    list: [],
  };

  async componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://localhost:8000/api/todo",
      requestOptions
    );
    const data = await response.json();
    this.setState({ list: data });
  }

  onSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  addItem = (description) => {
    if (description === "") return;
    this.postData(description);
  };

  completeItem = async (id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo/" + id,
      requestOptions
    );
    const data = await response.json();
    this.setState({ list: data });
  };

  updateItem = async (id, description) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, description }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo/" + id,
      requestOptions
    );
    const data = await response.json();
    this.setState({ list: data });
  };
  
  deleteItem = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo/" + id,
      requestOptions
    );
    const data = await response.json();
    this.setState({ list: data });
  };

  changeVisibility = async (show) => {
    let display = show == "all" ? "" : show;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://localhost:8000/api/todo/" + display,
      requestOptions
    );

    const data = await response.json();
    this.setState({ list: data, show });
  };

  filterList = (list) => {
    return this.state.show === "all"
      ? list
      : this.state.show === "completed"
      ? list.filter((item) => item.is_complete)
      : list.filter((item) => !item.is_complete);
  };

  searchList = (list) => {
    return list.filter((item) =>
      item.description.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };

  fetchData = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://localhost:8000/api/todo",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  };

  postData = async (description) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo",
      requestOptions
    );
    const data = await response.json();
    this.setState({ list: data });
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
        {this.state.list.length ? (
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
        ) : null}
        <button onClick={this.fetchData}>fetch</button>
      </div>
    );
  }
}

export default App;
