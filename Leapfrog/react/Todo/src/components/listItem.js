import React from "react";

class ListItem extends React.Component {
  render() {
    const { item, completeItem, deleteItem } = this.props;
    let textStyle = item.isCompleted
      ? "list-item__span text-cross"
      : "list-item__span";
    return (
      <div className="list-item clearfix">
        <input
          className="list-item__input"
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => completeItem(item.id)}
        />
        <span className={textStyle}>{item.body}</span>
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
      </div>
    );
  }
}
export default ListItem;
