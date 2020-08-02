import React from "react";
import Reply from "./Reply";

class Comment extends React.Component {
  state = {
    id: this.props.id,
    item: [],
    isLoading: true,
    showChild: false,
  };

  componentDidMount() {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${this.state.id}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({ item: result, isLoading: false, showChild: true });
      });
  }

  empty = () => {
    return <div>Loading ...</div>;
  };

  loaded = () => {
    const { title, url, by, time, kids, text } = this.state.item;
    return (
      <div style={{ border: "1px solid black", margin: 15, marginRight: 0 }}>
        <span>
          <strong>{this.state.item.by}</strong> {"  "} {this.state.item.time}{" "}
          {"  "}
        </span>
        <span
          onClick={() => this.setState({ showChild: !this.state.showChild })}
        >
          [{this.state.showChild ? "hide" : "show"} - {kids ? kids.length : "0"}
          ]
        </span>
        {this.state.showChild && (
          <div dangerouslySetInnerHTML={{ __html: this.state.item.text }} />
        )}
        {this.state.showChild && this.state.item.kids && (
          <div style={{ borderLeft: "5px solid green" }}>
            {this.state.item.kids.map((id) => (
              <Reply key={id} id={id} />
            ))}
          </div>
        )}
      </div>
    );
  };
  render() {
    return <div>{this.state.isLoading ? this.empty() : this.loaded()}</div>;
  }
}

export default Comment;
