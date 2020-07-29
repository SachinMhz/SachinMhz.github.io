import React from "react";

class ListHeader extends React.Component {
  state = {
    input: "",
  };

  onInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  newList = () => {
    let list = {
      id: Date.now(),
      body: this.state.input,
      isCompleted: false,
    };
    this.setState({ input: "" });
    return list;
  };

  render() {
    return (
      <div className="list-header">
        <input
          className="list-header__input"
          placeholder="Add New List"
          value={this.state.input}
          onChange={this.onInputChange}
        />
        <button
          className="list-header__btn"
          onClick={() => this.props.addItem(this.newList())}
        >
          Add
        </button>
      </div>
    );
  }
}
export default ListHeader;
