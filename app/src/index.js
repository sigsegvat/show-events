import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {auth, getEvents} from './AWS'


if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    //navigator.serviceWorker.register('/sw.js');
  });
}

ReactDOM.render(<App/>, document.getElementById('root'));