import React, {Component} from 'react';

class Joker extends Component {

  constructor() {
    super();

    this.state = {
       initialized: false,
       error: false
     };

    this.loadAnother = this.loadAnother.bind(this);
  }

  componentDidMount() {
    this.callGetJoke();
  }

  render() {
    return this.renderLoader() || this.renderError() || this.renderApp();
  }

  loadAnother() {
    this.setState({
       initialized: false,
       error: false
     });
    this.callGetJoke();
  }

  async callGetJoke() {
    try {
      const jokeData = await this.props.getJoke();

      this.setState({
        initialized: true,
        joke: jokeData.value
      });
    } catch (error) {
      this.setState({error: error});
    }
  }

  renderLoader() {
    return !this.state.initialized && !this.state.error ? <p>Loading</p> : null;
  }

  renderError() {
    return !this.state.initialized && this.state.error ? <p>{this.state.error}</p> : null;
  }

  renderApp() {
    return (
      <div>
        <span>{this.state.joke}</span>
        <button onClick={this.loadAnother}>
          Load another..
        </button>
      </div>
    )
  }

}

export default Joker;
