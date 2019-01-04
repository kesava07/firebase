import React, { Component } from 'react';
import firebase from '../Firebase/Firebase';

export default class Home extends Component {
  handleLogout = () => {
    console.log('sndkj')
    firebase
      .auth()
      .signOut()
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <button className="btn btn-lg btn-danger" onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}
