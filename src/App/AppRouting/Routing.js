import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from '../Components/Home';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import Forgetpassword from '../Components/Forgetpassword';

export default class Routing extends Component {
  render() {
    return (
      <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/forgetpassword" component={Forgetpassword}/>
      </Switch>
    )
  }
};
