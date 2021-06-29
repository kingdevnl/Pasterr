require('file-loader?name=[name].[ext]!./index.html');
import { setConfig } from 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

setConfig({ reloadHooks: false });


ReactDOM.render(<App />, document.getElementById('app'));

