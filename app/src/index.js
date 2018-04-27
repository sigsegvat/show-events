import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AWS from 'aws-sdk'
AWS.config.region = 'eu-west-1'

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    //navigator.serviceWorker.register('/sw.js');
  });
}

ReactDOM.render(<App/>, document.getElementById('root'));