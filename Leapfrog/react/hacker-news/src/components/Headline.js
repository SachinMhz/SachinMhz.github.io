import React from "react";
import Story from "./Story";

class Headline extends React.Component {
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
    const { title, score, kids, time, by, url } = this.state.item;
    return (
      <div style={{ border: "1px solid black", marginBottom: 15 }}>
        __by {by}
        __time {time}
        <div>
          <a href={url} title={url}>
            {title}{" "}
          </a>
        </div>
        __score {score}
        <div
          onClick={() => this.setState({ showChild: !this.state.showChild })}
        >
          __kids {kids && kids.length}
        </div>
        <div>
          {
          this.state.showChild && 
          kids && (
            <div style={{ borderLeft: "5px solid red" }}>
              {this.state.item.kids.map((id) => (
                <Story key={id} id={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  render() {
    return <div>{this.state.isLoading ? this.empty() : this.loaded()}</div>;
  }
}

export default Headline;
