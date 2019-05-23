import React, {Component} from 'react';

class Joker extends Component {

  constructor() {
    super();
    this.clearState();
    this.loadAnother = this.loadAnother.bind(this);
  }

  clearState() {
    this.state = {
       initialized: false,
       error: false
     }
  }
  
  componentDidMount() {
    this.callGetJoke();
  }

  loadAnother() {
    this.clearState();
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
