import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './register-serviceworker.js';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service worker registration failed, error:', error);
        });
}

registerServiceWorker()

ReactDOM.render(<App/>, document.getElementById('root'));