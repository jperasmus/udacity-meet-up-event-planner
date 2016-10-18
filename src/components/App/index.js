import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-wrap">
          <Header />
          <main className="app-container">{this.props.children}</main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
