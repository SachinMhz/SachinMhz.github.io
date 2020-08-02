import React from "react";
import Headline from "../components/Headline";

class HomePage extends React.Component {
  state = {
    data: [],
    isLoading: true,
    headlineNo: 15,
  };
  componentDidMount() {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((res) => res.json())
      .then((result) =>
        this.setState(
          { data: result.slice(0, this.state.headlineNo), isLoading: false },
          () => {
            console.log(this.state.data);
          }
        )
      );
  }

  showMoreContent = () => {
    let headlineNo = this.state.headlineNo;
    if (headlineNo < 490) {
      headlineNo += 10;
      this.setState({ headlineNo });
    }
  };

  render() {
    return (
      <div className="Main">
        <h1 className="heading">Hacker News Stories</h1>
        {this.state.isLoading ? (
          <h1> loading...</h1>
        ) : (
          <div>
            {this.state.data.map((id) => (
              <Headline key={id} id={id} />
            ))}
          </div>
        )}
        <button onClick={() => this.showMoreContent()}>Show More</button>
      </div>
    );
  }
}

export default HomePage;
