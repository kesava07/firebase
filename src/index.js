import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
/*import $ from 'jquery';*/
/*import Popper from 'popper.js';*/
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import firebase from './App/Firebase/Firebase'
import Loader from './App/Components/Loader';

class AppRoute extends React.Component {
    state = {
        loader: true
    }
    componentDidMount() {
        this.authenticateUser();
    }
    authenticateUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user && user.emailVerified) {
                    this.setState({loader:false})
                    this.props.history.push('/')
                } else {
                    this.setState({ errors: "Please verify Account details" })
                }
            } else {
                this.setState({loader:false})
                this.props.history.push('/login')
            }
        })
    };
    render() {
        return this.state.loader ? <Loader/> : <App/>
    }
}
const AppAuth = withRouter(AppRoute);
ReactDOM.render(
    <Router>
        <AppAuth />
    </Router>
    , document.getElementById('root'));
serviceWorker.unregister();
