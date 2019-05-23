import React, {Component} from 'react';

class Joker extends Component {

  constructor() {
    super();
    this.state = {
      joke: ''
    };
  }

  componentDidMount() {
    fetch('https://api.chucknorris.io/jokes/random')
      .then( results => results.json() )
      .then( (data) => {
        this.setState({joke: data.value});
      });
  }

  render() {
    return (
      <div className="joke">
        <span>{this.state.joke}</span>
      </div>
    )
  }
}

export default Joker;
