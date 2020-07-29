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
          value={item.isCompleted}
          onClick={() => completeItem(item.id)}
        />
        <span className={textStyle}>{item.body}</span>
        <button className="list-item__btn" onClick={() => deleteItem(item.id)}>
          Delete
        </button>
      </div>
    );
  }
}
export default ListItem;
