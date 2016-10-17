import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Meet-up Events</h2>
        </div>
        <p className="list-of-events">This will be a nice list of events.</p>
      </div>
    );
  }
}

export default App;
