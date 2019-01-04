import React, { Component } from 'react';
import './App.css';
import Routing from './App/AppRouting/Routing';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Routing/>
      </React.Fragment>
    );
  }
}

export default App;
