import React, {Component} from 'react';

class Joker extends Component {

  constructor() {
    super();
    this.state = {
       initialized: false,
       error: false
     }
  }

  async componentDidMount() {
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
    return <span>{this.state.joke}</span>
  }

}

export default Joker;
