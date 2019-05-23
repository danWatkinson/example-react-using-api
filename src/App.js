import React from 'react';
import './App.css';

import Joker from './components/Joker';
import fetchJokes from './api/chucknorris.io';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Joker
          getJoke={fetchJokes}
        />
      </header>
    </div>
  );
}

export default App;
