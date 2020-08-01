import React from "react";
import Comment from "./Comment";

class Reply extends React.Component {
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
        this.setState({ item: result, isLoading: false });
      });
  }

  empty = () => {
    return <div>Loading ...</div>;
  };

  loaded = () => {
    console.log(this.state.item);
    return (
      <div
        style={{ border: "1px solid black", marginLeft: 25 }}
        onClick={() => this.setState({ showChild: true })}
      >
        <div dangerouslySetInnerHTML={{ __html: this.state.item.text }} />
        {/* {this.state.showChild &&
          this.state.item.kids.map((id) => <div>{id}</div>)} */}
        {
          /*this.state.showChild &&*/ this.state.item.kids && (
            <div style={{ borderLeft: "5px solid green" }}>
              {this.state.item.kids.map((id) => (
                <Comment key={id} id={id} />
              ))}
            </div>
          )
        }
      </div>
    );
  };
  render() {
    return <div>{this.state.isLoading ? this.empty() : this.loaded()}</div>;
  }
}

export default Reply;
