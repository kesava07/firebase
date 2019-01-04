import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
/*import $ from 'jquery';*/
/*import Popper from 'popper.js';*/
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));
serviceWorker.unregister();
