import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Body from './Body.js';

class App extends Component {
  
  render() {
    return (
      <div>
        <Route path="" component={Body}/>
      </div>
    )
  }
}

export default App;
