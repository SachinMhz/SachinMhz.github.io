import React from "react";

class ListItem extends React.Component {
  state = {
    isEdited: false,
    edit: this.props.item.body,
  };

  setEdit = (e) => {
    this.setState({ edit: e.target.value });
  };

  onKeyPressed = (e) => {
    if (e.key === "Enter") {
      this.props.updateItem(this.props.item.id, this.state.edit);
      this.setState({ isEdited: false });
    }
  };
  render() {
    const { item, completeItem, deleteItem, updateItem } = this.props;
    let textStyle = item.isCompleted
      ? "list-item__span text-cross"
      : "list-item__span";
    return (
      <li className="list-item clearfix">
        <input
          className="list-item__checkbox"
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => completeItem(item.id)}
        />
        {!this.state.isEdited && (
          <span className={textStyle} onClick={() => completeItem(item.id)}>
            {item.body}
          </span>
        )}
        {this.state.isEdited && (
          <input
            className="list-item__input"
            placeholder="new value"
            value={this.state.edit}
            onChange={this.setEdit}
            onKeyDown={this.onKeyPressed}
          />
        )}
        <a
          className="list-item__btn"
          onClick={() => deleteItem(item.id)}
          href="#"
          title="delete"
        >
          <img
            className="icons"
            src={require("../images/delete.png")}
            alt={"delete icon"}
          />
        </a>
        <a
          className="list-item__btn"
          onClick={() => this.setState({ isEdited: !this.state.isEdited })}
          href="#"
          title="delete"
        >
          <img
            className="icons"
            src={require("../images/edit.png")}
            alt={"delete icon"}
          />
        </a>
      </li>
    );
  }
}
export default ListItem;
