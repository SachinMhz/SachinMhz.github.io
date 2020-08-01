import React from "react";

import Headline from "./components/Headline";

class App extends React.Component {
  state = {
    data: [],
    isLoading: true,
  };
  componentDidMount() {
    console.log("mounting");
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((res) => res.json())
      .then((result) =>
        this.setState({ data: result.slice(0, 2), isLoading: false }, () => {
          console.log(this.state.data);
        })
      );
  }
  render() {
    return (
      <div className="App">
        {this.state.isLoading ? (
          <h1> loading...</h1>
        ) : (
          <div>
            {this.state.data.map((id) => (
              <Headline key={id} id={id} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
