import React from "react";

class SearchBar extends React.Component {
  state = {
    input: "",
  };

  onInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    return (
      <div className='search'>
        <input className='search__input' value={this.state.input} onChange={this.onInputChange} />
        <button onClick={() => this.props.searchItem(this.state.input)}>
          Search
        </button>
      </div>
    );
  }
}
export default SearchBar;
