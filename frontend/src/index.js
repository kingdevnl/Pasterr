require('file-loader?name=[name].[ext]!./index.html');
import { setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import "@fortawesome/fontawesome-free/css/all.css";

setConfig({ reloadHooks: false });


ReactDOM.render(<App />, document.getElementById('app'));

