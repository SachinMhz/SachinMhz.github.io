import React from "react";
// import "./styles/style.css";
// import "./styles/reset.css";
import Header from "../components/header";
import ListHeader from "../components/listHeader";
import TabBar from "../components/TabBar";
import ListItem from "../components/listItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.cookies = props.cookies;
    this.state = {
      search: "",
      show: "all",
      list: [],
      redirect: false,
    };
  }

  async componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.cookies.cookies.token,
      },
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
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.cookies.cookies.token,
      },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo/" + id,
      requestOptions
    );
    const data = await response.json();
    const newList = this.state.list.map((todo) => {
      if (todo.id !== data.id) return todo;
      else return data;
    });
    this.setState({ list: newList });
  };

  updateItem = async (id, description) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.cookies.cookies.token,
      },
      body: JSON.stringify({ id, description }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo/" + id,
      requestOptions
    );
    const data = await response.json();
    const newList = this.state.list.map((todo) => {
      if (todo.id !== data.id) return todo;
      else return data;
    });
    this.setState({ list: newList });
  };

  deleteItem = async (id) => {
    console.log(this.state.list);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.cookies.cookies.token,
      },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo/" + id,
      requestOptions
    );
    const data = await response.json();
    const newList = this.state.list.filter((todo) => todo.id !== data.id);
    this.setState({ list: newList });
  };

  changeVisibility = async (show) => {
    let display = show == "all" ? "" : show;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.cookies.cookies.token,
      },
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

  postData = async (description) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.cookies.cookies.token,
      },
      body: JSON.stringify({ description }),
    };
    const response = await fetch(
      "http://localhost:8000/api/todo",
      requestOptions
    );
    const data = await response.json();
    this.setState({ list: [...this.state.list, data] });
  };

  render() {
    return (
      <div className="App">
        <Header cookies={this.props.cookies} />
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
      </div>
    );
  }
}

export default App;
