import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Mix } from './components/Mix'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Mix} />
            <Route exact path='/mix' component={Mix} />
            {/* <Route exact path='/mix/:id' component={Detail} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
