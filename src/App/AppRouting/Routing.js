import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from '../Components/Home';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';

export default class Routing extends Component {
  render() {
    return (
      <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
      </Switch>
    )
  }
};
