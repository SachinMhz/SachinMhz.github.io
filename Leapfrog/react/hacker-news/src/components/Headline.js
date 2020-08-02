import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

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
    const { title, score, kids, time, by, url } = this.state.item;
    return (
      <div className={"headline"}>
        <a className="headline__title" href={url} title={url}>
          {title}
        </a>
        <span className="headline__score">{score} points</span>
        <span className="headline__user">
          by <strong>{by}</strong>
        </span>
        <span className="headline__time">{time}</span>
        <Link to={`/story/${this.state.id}`}>
          <span
            className="headline__comment"
            onClick={() => this.setState({ showChild: !this.state.showChild })}
          >
            {kids ? kids.length : "0"} comments
          </span>
        </Link>
        <div>
          {this.state.showChild && kids && (
            <div style={{ borderLeft: "5px solid red" }}>
              {this.state.item.kids.map((id) => (
                <Comment key={id} id={id} />
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
