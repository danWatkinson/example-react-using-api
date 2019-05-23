import React, {Component} from 'react';

class Joker extends Component {

  constructor() {
    super();
    this.clearState();
    this.loadAnother = this.loadAnother.bind(this);
  }

  async callGetJoke() {
    try {
      const jokeData = await this.props.getJoke();

      this.setState({
        initialized: true,
        joke: jokeData.value
      });
    } catch (error) {
      this.setState({
        error: error
      });
    }
  }

  async componentDidMount() {
    this.callGetJoke();
  }

  clearState() {
    this.state = {
       initialized: false,
       error: false
     }
  }

  async loadAnother() {
    this.clearState();
    this.callGetJoke();
  }

  render() {
    return this.renderLoader() || this.renderError() || this.renderApp();
  }

  renderError() {
    return !this.state.initialized && this.state.error ? <p>{this.state.error}</p> : null;
  }

  renderLoader() {
    return !this.state.initialized && !this.state.error ? <p>Loading</p> : null;
  }

  renderApp() {
    const thisComponent = this;
    return (
      <div>
        <span>{this.state.joke}</span>
        <button onClick={thisComponent.loadAnother}>
          Load another..
        </button>
      </div>
    )
  }

}

export default Joker;
