import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApiStore} from './store'
import {Provider} from 'mobx-react'

ReactDOM.render(<Provider apiStore={new ApiStore()}><App /></Provider>, document.getElementById('root'));

