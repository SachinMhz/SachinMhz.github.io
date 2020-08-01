import React from "react";

class WithItem extends React.Component {
  state = {
    id: this.props.id,
    item: [],
    isLoading: true,
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
    return <div>{this.state.item.title}</div>;
  };
  render() {
    return <div>{this.state.isLoading ? this.empty() : this.loaded()}</div>;
  }
}

export default WithItem;
