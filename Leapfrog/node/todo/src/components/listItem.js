import React from "react";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
      edit: this.props.item.description,
    };
    this.textInput = React.createRef(null);
  }

  setEdit = (e) => {
    this.setState({ edit: e.target.value });
  };

  onKeyPressed = (e) => {
    if (e.key === "Enter") {
      if (this.state.edit)
        this.props.updateItem(this.props.item.id, this.state.edit);
      this.setState({ isEdited: false });
    }
  };
  render() {
    const { item, completeItem, deleteItem } = this.props;
    let textStyle = item.is_complete
      ? "list-item__span text-cross"
      : "list-item__span";
    return (
      <li className="list-item clearfix">
        <input
          className="list-item__checkbox"
          type="checkbox"
          checked={item.is_complete}
          onChange={() => completeItem(item.id)}
        />
        {!this.state.isEdited && (
          <span className={textStyle} onClick={() => completeItem(item.id)}>
            {item.description}
          </span>
        )}
        {this.state.isEdited && (
          <input
            className="list-item__input"
            placeholder="new value"
            value={this.state.edit}
            onChange={this.setEdit}
            onKeyDown={this.onKeyPressed}
            ref={this.textInput}
            onBlur={() => {
              this.setState({ isEdited: false });
            }}
          />
        )}
        <span
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
        </span>
        <span
          className="list-item__btn"
          onClick={() => {
            this.textInput.current && this.textInput.current.focus();
            this.setState({ isEdited: !this.state.isEdited });
          }}
          href="#"
          title="update"
        >
          <img
            className="icons"
            src={require("../images/edit.png")}
            alt={"delete icon"}
          />
        </span>
      </li>
    );
  }
}
export default ListItem;
