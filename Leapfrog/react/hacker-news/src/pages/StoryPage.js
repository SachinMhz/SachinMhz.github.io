import React from "react";
import Comment from "../components/Comment";

class StoryPage extends React.Component {
  state = {
    item: [],
    isLoading: true,
    showChild: false,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({ item: result, isLoading: false, showChild: true });
        });
    }
  }

  empty = () => {
    return <div>Loading ...</div>;
  };

  loaded = () => {
    const { title, url, by, time, kids, text } = this.state.item;
    return (
      <div>
        <a class="story__heading" href={url} title={url}>
          {title}
        </a>

        <div style={{ marginLeft: 10 }}>
          <span>
            <strong>{by}</strong> {"  "} {time} {"  "}
          </span>
          {this.state.showChild && (
            <div dangerouslySetInnerHTML={{ __html: text }} />
          )}
          {this.state.showChild && kids && (
            <div>
              {kids.map((id) => (
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

export default StoryPage;
